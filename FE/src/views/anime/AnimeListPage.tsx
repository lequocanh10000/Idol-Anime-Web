import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiError } from '../../api/types.ts';
import {
  createAnime,
  deleteAnime,
  getAllAnime,
  getAnimeById,
  updateAnime,
  type AnimationFormat,
  type Anime,
  type CreateAnimeRequest,
  type IdolType,
  type SongType,
  type UpdateAnimeRequest,
  type UpdateIdolGroupDto,
  type UpdateSongDto,
} from '../../api/anime.ts';
import { useAuth } from '../../auth/AuthContext.tsx';

export function AnimeListPage() {
  const { isAdmin } = useAuth();

  // Filter, search, pagination state
  const [items, setItems] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [idolType, setIdolType] = useState<IdolType | ''>('');
  const [animationFormat, setAnimationFormat] = useState<AnimationFormat | ''>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const idolTypeOptions: IdolType[] = useMemo(
    () => ['School', 'Professional', 'Virtual', 'Band', 'Khác'],
    []
  );
  const animationFormatOptions: AnimationFormat[] = useMemo(
    () => ['TV', 'Movie', 'OVA', 'ONA'],
    []
  );
  const songTypeOptions: SongType[] = useMemo(() => ['OP', 'ED', 'Insert', 'Khác'], []);

  const [form, setForm] = useState<CreateAnimeRequest>({
    title: '',
    studio: '',
    idolType: 'School',
    animationFormat: 'TV',
    description: '',
    franchise: '',
    posterUrl: '',
    releaseYear: undefined,
  });

  const [editForm, setEditForm] = useState<UpdateAnimeRequest>({});

  async function reload(params?: { page?: number; limit?: number }) {
    const data = await getAllAnime({
      search: search.trim() || undefined,
      idolType: idolType || undefined,
      animationFormat: animationFormat || undefined,
      page: params?.page ?? page,
      limit: params?.limit ?? limit,
    });
    setItems(Array.isArray(data.items) ? data.items : []);
    setTotalPages(data.paginationMeta.totalPages);
    setTotalItems(data.paginationMeta.totalItems);
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        await reload();
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : 'Không tải được danh sách anime';
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, idolType, animationFormat, page, limit]);

  function onFilterChange() {
    setPage(1);
    reload({ page: 1 });
  }

  async function onCreate() {
    setError(null);
    setCreating(true);
    try {
      await createAnime({
        ...form,
        description: form.description || undefined,
        franchise: form.franchise || undefined,
        posterUrl: form.posterUrl || undefined,
        releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined,
      });
      setShowCreate(false);
      setForm((prev) => ({
        ...prev,
        title: '',
        studio: '',
        description: '',
        franchise: '',
        posterUrl: '',
        releaseYear: undefined,
      }));
      await reload();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Tạo anime thất bại';
      setError(msg);
    } finally {
      setCreating(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm(`Xóa anime #${id}?`)) return;
    setError(null);
    setDeletingId(id);
    try {
      await deleteAnime(id);
      await reload();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Xóa anime thất bại';
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  }

  async function beginEdit(anime: Anime) {
    setError(null);
    setEditingId(anime.id);
    setLoadingEdit(true);
    try {
      const full = await getAnimeById(anime.id);
      setEditForm({
        title: full.title ?? '',
        studio: full.studio ?? '',
        idolType: full.idolType ?? 'School',
        animationFormat: full.animationFormat ?? 'TV',
        description: full.description ?? '',
        franchise: full.franchise ?? '',
        posterUrl: full.posterUrl ?? '',
        releaseYear: full.releaseYear ?? undefined,
        idolGroups: (full.idolGroups ?? []).map((g) => ({ id: g.id, name: g.name, description: g.description })),
        songs: (full.songs ?? []).map((s) => ({
          id: s.id,
          title: s.title,
          artist: s.artist,
          songType: s.songType,
          youtubeUrl: s.youtubeUrl,
        })),
      });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Không tải được dữ liệu anime để sửa';
      setError(msg);
      setEditingId(null);
    } finally {
      setLoadingEdit(false);
    }
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function upsertIdolGroup(index: number, patch: Partial<UpdateIdolGroupDto>) {
    setEditForm((prev) => {
      const nextGroups = [...(prev.idolGroups ?? [])];
      nextGroups[index] = { ...nextGroups[index], ...patch };
      return { ...prev, idolGroups: nextGroups };
    });
  }

  function addIdolGroup() {
    setEditForm((prev) => ({
      ...prev,
      idolGroups: [...(prev.idolGroups ?? []), { name: '', description: '' }],
    }));
  }

  function removeIdolGroup(index: number) {
    setEditForm((prev) => ({
      ...prev,
      idolGroups: (prev.idolGroups ?? []).filter((_, i) => i !== index),
    }));
  }

  function upsertSong(index: number, patch: Partial<UpdateSongDto>) {
    setEditForm((prev) => {
      const nextSongs = [...(prev.songs ?? [])];
      nextSongs[index] = { ...nextSongs[index], ...patch };
      return { ...prev, songs: nextSongs };
    });
  }

  function addSong() {
    setEditForm((prev) => ({
      ...prev,
      songs: [...(prev.songs ?? []), { title: '', artist: '', songType: 'OP', youtubeUrl: '' }],
    }));
  }

  function removeSong(index: number) {
    setEditForm((prev) => ({
      ...prev,
      songs: (prev.songs ?? []).filter((_, i) => i !== index),
    }));
  }

  const isEditValid = useMemo(() => {
    const titleOk = Boolean((editForm.title ?? '').trim());
    const studioOk = Boolean((editForm.studio ?? '').trim());

    const groupsOk = (editForm.idolGroups ?? []).every((g) => {
      const name = (g.name ?? '').trim();
      const desc = (g.description ?? '').trim();

      // Existing group: require name (avoid accidentally blanking it)
      if (g.id) return name.length > 0;

      // New group row: allow completely empty row (user may have clicked add)
      if (name.length === 0 && desc.length === 0) return true;

      // Partially filled new row: require name
      return name.length > 0;
    });

    const songsOk = (editForm.songs ?? []).every((s) => {
      const title = (s.title ?? '').trim();
      const artist = (s.artist ?? '').trim();
      const youtubeUrl = (s.youtubeUrl ?? '').trim();
      const hasAny = title.length > 0 || artist.length > 0 || youtubeUrl.length > 0;

      // Existing song: require title+artist+songType
      if (s.id) return title.length > 0 && artist.length > 0 && Boolean(s.songType);

      // New song row: allow completely empty row
      if (!hasAny) return true;

      // Partially filled new row: require title+artist+songType
      return title.length > 0 && artist.length > 0 && Boolean(s.songType);
    });

    return titleOk && studioOk && groupsOk && songsOk;
  }, [editForm]);

  async function onUpdate(id: number) {
    setError(null);
    setSaving(true);
    try {
      const payload: UpdateAnimeRequest = {
        ...editForm,
        title: (editForm.title ?? '').trim(),
        studio: (editForm.studio ?? '').trim(),
        description: (editForm.description ?? '').trim() || undefined,
        franchise: (editForm.franchise ?? '').trim() || undefined,
        posterUrl: (editForm.posterUrl ?? '').trim() || undefined,
        releaseYear: editForm.releaseYear ? Number(editForm.releaseYear) : undefined,
        idolGroups: (editForm.idolGroups ?? [])
          .map((g) => ({
            id: g.id,
            name: (g.name ?? '').trim(),
            description: (g.description ?? '').trim() || undefined,
          }))
          // Keep existing groups (id) and only keep new groups that have a name
          .filter((g) => Boolean(g.id) || g.name.length > 0),
        songs: (editForm.songs ?? [])
          .map((s) => ({
            id: s.id,
            title: (s.title ?? '').trim(),
            artist: (s.artist ?? '').trim(),
            songType: s.songType,
            youtubeUrl: (s.youtubeUrl ?? '').trim() || undefined,
          }))
          // Keep existing songs (id) and only keep new songs that have title+artist
          .filter((s) => Boolean(s.id) || (s.title.length > 0 && s.artist.length > 0)),
      };

      await updateAnime(id, payload);
      setEditingId(null);
      await reload();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Cập nhật anime thất bại';
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h1 style={{ margin: 0 }}>Anime</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="card" style={{ padding: 12, marginBottom: 0 }}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <input
                placeholder="Tìm kiếm theo tên..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') onFilterChange(); }}
                style={{ minWidth: 120 }}
              />
              <select value={idolType} onChange={e => { setIdolType(e.target.value as IdolType | ''); setPage(1); }}>
                <option value="">Tất cả loại idol</option>
                {idolTypeOptions.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <select value={animationFormat} onChange={e => { setAnimationFormat(e.target.value as AnimationFormat | ''); setPage(1); }}>
                <option value="">Tất cả định dạng</option>
                {animationFormatOptions.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <button className="btn" onClick={onFilterChange}>Lọc</button>
            </div>
          </div>
          {isAdmin && (
            <button className="btn" onClick={() => setShowCreate((v) => !v)}>
              {showCreate ? 'Đóng' : 'Thêm anime'}
            </button>
          )}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="row" style={{ margin: '12px 0', alignItems: 'center', gap: 12 }}>
        <span className="muted">Tổng: {totalItems}</span>
        <span className="muted">Trang:</span>
        <button className="btn btn--ghost" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Trước</button>
        <span>{page} / {totalPages}</span>
        <button className="btn btn--ghost" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Sau</button>
        <span className="muted">Hiển thị:</span>
        <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}>
          {[4, 8, 12, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {isAdmin && showCreate && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Tạo anime (Admin)</h3>
          <div className="grid">
            <label className="field">
              <span>Title *</span>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </label>
            <label className="field">
              <span>Studio *</span>``
              <input value={form.studio} onChange={(e) => setForm((p) => ({ ...p, studio: e.target.value }))} />
            </label>
            <label className="field">
              <span>Idol Type</span>
              <select value={form.idolType} onChange={(e) => setForm((p) => ({ ...p, idolType: e.target.value as IdolType }))}>
                {idolTypeOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Animation Format</span>
              <select
                value={form.animationFormat}
                onChange={(e) => setForm((p) => ({ ...p, animationFormat: e.target.value as AnimationFormat }))}
              >
                {animationFormatOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Release Year</span>
              <input
                type="number"
                value={form.releaseYear ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, releaseYear: e.target.value ? Number(e.target.value) : undefined }))}
              />
            </label>
            <label className="field">
              <span>Poster URL</span>
              <input value={form.posterUrl ?? ''} onChange={(e) => setForm((p) => ({ ...p, posterUrl: e.target.value }))} />
            </label>
          </div>

          <label className="field">
            <span>Description</span>
            <input value={form.description ?? ''} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </label>

          {error && <div className="error">{error}</div>}

          <div className="row">
            <button className="btn" onClick={onCreate} disabled={creating || !form.title.trim() || !form.studio.trim()}>
              {creating ? 'Đang tạo…' : 'Tạo'}
            </button>
            <span className="muted">User thường sẽ không thấy nút này.</span>
          </div>
        </div>
      )}

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {items.map((a) => (
          <div key={a.id} className="card">
            <div className="cardHeader">
              <Link
                className="card__title cardHeader__title"
                to={`/anime/${a.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {a.title}
              </Link>
              {isAdmin && (
                <div className="btnGroup cardHeader__actions">
                  <button className="btn btn--ghost" onClick={() => beginEdit(a)} disabled={editingId === a.id || saving || creating}>
                    Sửa
                  </button>
                  <button
                    className="btn"
                    onClick={() => onDelete(a.id)}
                    disabled={deletingId === a.id}
                    style={{ borderColor: 'rgba(239, 68, 68, 0.55)', background: 'rgba(239, 68, 68, 0.14)' }}
                  >
                    {deletingId === a.id ? 'Đang xóa…' : 'Xóa'}
                  </button>
                </div>
              )}
            </div>
            <div className="muted">
              {a.animationFormat} • {a.idolType}
            </div>
            <div className="muted">Studio: {a.studio}</div>

            {isAdmin && editingId === a.id && (
              <div style={{ marginTop: 12 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <strong>Sửa anime (Admin)</strong>
                  <button className="btn btn--ghost" onClick={cancelEdit} disabled={saving}>
                    Hủy
                  </button>
                </div>

                {loadingEdit && <p className="muted" style={{ margin: '10px 0 0' }}>Đang tải dữ liệu…</p>}

                <div className="grid" style={{ marginTop: 8 }}>
                  <label className="field">
                    <span>Title *</span>
                    <input
                      value={editForm.title ?? ''}
                      onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                      disabled={loadingEdit}
                    />
                  </label>
                  <label className="field">
                    <span>Studio *</span>
                    <input
                      value={editForm.studio ?? ''}
                      onChange={(e) => setEditForm((p) => ({ ...p, studio: e.target.value }))}
                      disabled={loadingEdit}
                    />
                  </label>
                  <label className="field">
                    <span>Idol Type</span>
                    <select
                      value={editForm.idolType ?? 'School'}
                      onChange={(e) => setEditForm((p) => ({ ...p, idolType: e.target.value as IdolType }))}
                      disabled={loadingEdit}
                    >
                      {idolTypeOptions.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Animation Format</span>
                    <select
                      value={editForm.animationFormat ?? 'TV'}
                      onChange={(e) => setEditForm((p) => ({ ...p, animationFormat: e.target.value as AnimationFormat }))}
                      disabled={loadingEdit}
                    >
                      {animationFormatOptions.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Release Year</span>
                    <input
                      type="number"
                      value={editForm.releaseYear ?? ''}
                      onChange={(e) => setEditForm((p) => ({ ...p, releaseYear: e.target.value ? Number(e.target.value) : undefined }))}
                      disabled={loadingEdit}
                    />
                  </label>
                  <label className="field">
                    <span>Poster URL</span>
                    <input
                      value={editForm.posterUrl ?? ''}
                      onChange={(e) => setEditForm((p) => ({ ...p, posterUrl: e.target.value }))}
                      disabled={loadingEdit}
                    />
                  </label>
                </div>

                <label className="field" style={{ marginTop: 8 }}>
                  <span>Franchise</span>
                  <input
                    value={editForm.franchise ?? ''}
                    onChange={(e) => setEditForm((p) => ({ ...p, franchise: e.target.value }))}
                    disabled={loadingEdit}
                  />
                </label>
                <label className="field" style={{ marginTop: 8 }}>
                  <span>Description</span>
                  <input
                    value={editForm.description ?? ''}
                    onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                    disabled={loadingEdit}
                  />
                </label>

                <div style={{ marginTop: 12 }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>Idol Groups</strong>
                    <button className="btn btn--ghost" onClick={addIdolGroup} disabled={loadingEdit}>
                      + Thêm group
                    </button>
                  </div>

                  {(editForm.idolGroups ?? []).length === 0 && <p className="muted" style={{ margin: '6px 0 0' }}>Chưa có group.</p>}

                  {(editForm.idolGroups ?? []).map((g, idx) => (
                    <div key={g.id ?? `new-${idx}`} className="card" style={{ marginTop: 8, padding: 12 }}>
                      <div className="row" style={{ justifyContent: 'space-between' }}>
                        <span className="muted">{g.id ? `#${g.id}` : 'New'}</span>
                        <button
                          className="btn btn--ghost"
                          onClick={() => removeIdolGroup(idx)}
                          disabled={loadingEdit}
                          title="Xóa group (sẽ bị xóa ở backend khi lưu)"
                        >
                          Xóa
                        </button>
                      </div>

                      <div className="grid" style={{ marginTop: 8 }}>
                        <label className="field">
                          <span>Name *</span>
                          <input
                            value={g.name ?? ''}
                            onChange={(e) => upsertIdolGroup(idx, { name: e.target.value })}
                            disabled={loadingEdit}
                          />
                        </label>
                        <label className="field">
                          <span>Description</span>
                          <input
                            value={g.description ?? ''}
                            onChange={(e) => upsertIdolGroup(idx, { description: e.target.value })}
                            disabled={loadingEdit}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12 }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>Songs</strong>
                    <button className="btn btn--ghost" onClick={addSong} disabled={loadingEdit}>
                      + Thêm song
                    </button>
                  </div>

                  {(editForm.songs ?? []).length === 0 && <p className="muted" style={{ margin: '6px 0 0' }}>Chưa có bài hát.</p>}

                  {(editForm.songs ?? []).map((s, idx) => (
                    <div key={s.id ?? `new-song-${idx}`} className="card" style={{ marginTop: 8, padding: 12 }}>
                      <div className="row" style={{ justifyContent: 'space-between' }}>
                        <span className="muted">{s.id ? `#${s.id}` : 'New'}</span>
                        <button
                          className="btn btn--ghost"
                          onClick={() => removeSong(idx)}
                          disabled={loadingEdit}
                          title="Xóa song (sẽ bị xóa ở backend khi lưu)"
                        >
                          Xóa
                        </button>
                      </div>

                      <div className="grid" style={{ marginTop: 8 }}>
                        <label className="field">
                          <span>Title *</span>
                          <input
                            value={s.title ?? ''}
                            onChange={(e) => upsertSong(idx, { title: e.target.value })}
                            disabled={loadingEdit}
                          />
                        </label>
                        <label className="field">
                          <span>Artist *</span>
                          <input
                            value={s.artist ?? ''}
                            onChange={(e) => upsertSong(idx, { artist: e.target.value })}
                            disabled={loadingEdit}
                          />
                        </label>
                        <label className="field">
                          <span>Song Type</span>
                          <select
                            value={s.songType ?? 'OP'}
                            onChange={(e) => upsertSong(idx, { songType: e.target.value as SongType })}
                            disabled={loadingEdit}
                          >
                            {songTypeOptions.map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="field">
                          <span>YouTube URL</span>
                          <input
                            value={s.youtubeUrl ?? ''}
                            onChange={(e) => upsertSong(idx, { youtubeUrl: e.target.value })}
                            disabled={loadingEdit}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row" style={{ marginTop: 10 }}>
                  <button
                    className="btn"
                    onClick={() => onUpdate(a.id)}
                    disabled={loadingEdit || saving || !isEditValid}
                  >
                    {saving ? 'Đang lưu…' : 'Lưu'}
                  </button>
                  <span className="muted">Thêm/sửa/xóa group & song sẽ sync theo backend.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
