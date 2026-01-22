import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from '../../api/types.ts';
import { getAnimeById, type Anime, type Character, type IdolGroup, type Song } from '../../api/anime.ts';
import { deleteCharacter, updateCharacter, type UpdateCharacterRequest } from '../../api/characters.ts';
import { useAuth } from '../../auth/AuthContext.tsx';

function CharacterList({
  characters,
  isAdmin,
  busyId,
  editingId,
  editForm,
  onBeginEdit,
  onCancelEdit,
  onChange,
  onSave,
  onDelete,
}: {
  characters: Character[];
  isAdmin: boolean;
  busyId: number | null;
  editingId: number | null;
  editForm: UpdateCharacterRequest;
  onBeginEdit: (c: Character) => void;
  onCancelEdit: () => void;
  onChange: (patch: UpdateCharacterRequest) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  if (!characters.length) return <p className="muted">Chưa có nhân vật</p>;
  return (
    <div className="grid">
      {characters.map((c) => (
        <div key={c.id} className="card">
          {c.imageUrl && (
            <img
              className="thumb"
              src={c.imageUrl}
              alt={c.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="card__title">{c.name}</div>
          <div className="muted">{c.role || '—'}</div>
          {c.seiyuu && <div className="muted">Seiyuu: {c.seiyuu}</div>}

          {isAdmin && (
            <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
              <div className="row">
                {editingId === c.id ? (
                  <button className="btn btn--ghost" onClick={onCancelEdit} disabled={busyId === c.id}>
                    Hủy
                  </button>
                ) : (
                  <button className="btn btn--ghost" onClick={() => onBeginEdit(c)} disabled={busyId !== null}>
                    Sửa
                  </button>
                )}
                <button
                  className="btn"
                  onClick={() => onDelete(c.id)}
                  disabled={busyId !== null}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.55)', background: 'rgba(239, 68, 68, 0.14)' }}
                >
                  {busyId === c.id ? 'Đang…' : 'Xóa'}
                </button>
              </div>
            </div>
          )}

          {isAdmin && editingId === c.id && (
            <div style={{ marginTop: 12 }}>
              <div className="grid">
                <label className="field">
                  <span>Name *</span>
                  <input value={editForm.name ?? ''} onChange={(e) => onChange({ name: e.target.value })} disabled={busyId === c.id} />
                </label>
                <label className="field">
                  <span>Role</span>
                  <input value={editForm.role ?? ''} onChange={(e) => onChange({ role: e.target.value })} disabled={busyId === c.id} />
                </label>
                <label className="field">
                  <span>Seiyuu</span>
                  <input value={editForm.seiyuu ?? ''} onChange={(e) => onChange({ seiyuu: e.target.value })} disabled={busyId === c.id} />
                </label>
                <label className="field">
                  <span>Image URL</span>
                  <input value={editForm.imageUrl ?? ''} onChange={(e) => onChange({ imageUrl: e.target.value })} disabled={busyId === c.id} />
                </label>
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn" onClick={() => onSave(c.id)} disabled={busyId === c.id || !(editForm.name ?? '').trim()}>
                  {busyId === c.id ? 'Đang lưu…' : 'Lưu'}
                </button>
                <span className="muted">Admin only.</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function IdolGroupSection({
  group,
  isAdmin,
  busyId,
  editingId,
  editForm,
  onBeginEdit,
  onCancelEdit,
  onChange,
  onSave,
  onDelete,
}: {
  group: IdolGroup;
  isAdmin: boolean;
  busyId: number | null;
  editingId: number | null;
  editForm: UpdateCharacterRequest;
  onBeginEdit: (c: Character) => void;
  onCancelEdit: () => void;
  onChange: (patch: UpdateCharacterRequest) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const characters = Array.isArray(group.characters) ? group.characters : [];
  return (
    <section className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>{group.name}</h2>
        <span className="muted">#{group.id}</span>
      </div>
      {group.description && <p className="muted">{group.description}</p>}
      <h3 style={{ marginTop: 12 }}>Nhân vật</h3>
      <CharacterList
        characters={characters}
        isAdmin={isAdmin}
        busyId={busyId}
        editingId={editingId}
        editForm={editForm}
        onBeginEdit={onBeginEdit}
        onCancelEdit={onCancelEdit}
        onChange={onChange}
        onSave={onSave}
        onDelete={onDelete}
      />
    </section>
  );
}

function SongList({ songs }: { songs: Song[] }) {
  if (!songs.length) return <p className="muted">Chưa có bài hát</p>;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tên bài hát</th>
          <th>Artist</th>
          <th>Loại</th>
          <th>Đường dẫn</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((s) => (
          <tr key={s.id}>
            <td>{s.title}</td>
            <td>{s.artist ?? '—'}</td>
            <td>{s.songType}</td>
            <td>
              {s.youtubeUrl ? (
                <a href={s.youtubeUrl} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              ) : (
                '—'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AnimeDetailPage() {
  const { isAdmin } = useAuth();
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busyCharacterId, setBusyCharacterId] = useState<number | null>(null);
  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);
  const [characterForm, setCharacterForm] = useState<UpdateCharacterRequest>({});

  async function reloadAnime() {
    if (!Number.isFinite(id)) throw new ApiError('ID không hợp lệ');
    const data = await getAnimeById(id);
    setItem(data);
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        if (!Number.isFinite(id)) throw new ApiError('ID không hợp lệ');
        const data = await getAnimeById(id);
        if (mounted) setItem(data);
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : 'Không tải được anime';
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  function beginEditCharacter(c: Character) {
    setError(null);
    setEditingCharacterId(c.id);
    setCharacterForm({
      name: c.name ?? '',
      seiyuu: c.seiyuu ?? '',
      role: c.role ?? '',
      imageUrl: c.imageUrl ?? '',
    });
  }

  function cancelEditCharacter() {
    setEditingCharacterId(null);
    setCharacterForm({});
  }

  function patchCharacterForm(patch: UpdateCharacterRequest) {
    setCharacterForm((prev) => ({ ...prev, ...patch }));
  }

  async function onSaveCharacter(characterId: number) {
    setError(null);
    setBusyCharacterId(characterId);
    try {
      const payload: UpdateCharacterRequest = {
        name: (characterForm.name ?? '').trim(),
        seiyuu: (characterForm.seiyuu ?? '').trim() || undefined,
        role: (characterForm.role ?? '').trim() || undefined,
        imageUrl: (characterForm.imageUrl ?? '').trim() || undefined,
      };

      if (!payload.name) throw new ApiError('Tên nhân vật không được trống');

      await updateCharacter(characterId, payload);
      await reloadAnime();
      cancelEditCharacter();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Cập nhật nhân vật thất bại';
      setError(msg);
    } finally {
      setBusyCharacterId(null);
    }
  }

  async function onDeleteCharacter(characterId: number) {
    if (!confirm(`Xóa nhân vật #${characterId}?`)) return;
    setError(null);
    setBusyCharacterId(characterId);
    try {
      await deleteCharacter(characterId);
      await reloadAnime();
      if (editingCharacterId === characterId) cancelEditCharacter();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Xóa nhân vật thất bại';
      setError(msg);
    } finally {
      setBusyCharacterId(null);
    }
  }

  return (
    <div className="page">
      <div className="row">
        <Link to="/anime" className="btn btn--ghost">
          ← Quay lại
        </Link>
      </div>

      {loading && <p>Đang tải…</p>}
      {error && <p className="error">{error}</p>}

      {item && (
        <>
          <section className="card">
            <div className="detailHeader">
              {item.posterUrl && (
                <img
                  className="poster"
                  src={item.posterUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}

              <div className="detailHeader__info">
                <h1 style={{ marginTop: 0 }}>{item.title}</h1>
                <p className="muted">
                  {item.animationFormat} • {item.idolType} • {item.releaseYear ?? 'N/A'}
                </p>
                <p>
                  <b>Studio:</b> {item.studio}
                </p>
                {item.franchise && (
                  <p>
                    <b>Franchise:</b> {item.franchise}
                  </p>
                )}
              </div>
            </div>

            {item.description && <p>{item.description}</p>}
          </section>

          <section className="card">
            <h2 style={{ marginTop: 0 }}>Bài hát</h2>
            <SongList songs={Array.isArray(item.songs) ? item.songs : []} />
          </section>

          <section className="page">
            <h2>Nhóm</h2>
            {Array.isArray(item.idolGroups) && item.idolGroups.length > 0 ? (
              item.idolGroups.map((g) => (
                <IdolGroupSection
                  key={g.id}
                  group={g}
                  isAdmin={isAdmin}
                  busyId={busyCharacterId}
                  editingId={editingCharacterId}
                  editForm={characterForm}
                  onBeginEdit={beginEditCharacter}
                  onCancelEdit={cancelEditCharacter}
                  onChange={patchCharacterForm}
                  onSave={onSaveCharacter}
                  onDelete={onDeleteCharacter}
                />
              ))
            ) : (
              <p className="muted">Chưa có idol group</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
