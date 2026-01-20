import { useState, type FormEvent } from 'react';
import { ApiError } from '../../api/types';
import { createCharacter } from '../../api/characters';
import { useAuth } from '../../auth/AuthContext.tsx';

export function CharactersPage() {
  const { isAdmin } = useAuth();
  const [idolGroupId, setIdolGroupId] = useState<number>(1);
  const [name, setName] = useState('');
  const [seiyuu, setSeiyuu] = useState('');
  const [role, setRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const result = await createCharacter({
        idolGroupId,
        name,
        seiyuu: seiyuu || undefined,
        role: role || undefined,
        imageUrl: imageUrl || undefined,
      });
      setMessage(`Created character #${result.id}: ${result.name}`);
      setName('');
      setSeiyuu('');
      setRole('');
      setImageUrl('');
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Tạo nhân vật thất bại';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Characters</h1>
      <p className="muted">
        BE hiện chưa có endpoint list character, nên trang này demo tạo mới.
      </p>

      {!isAdmin ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            User thường chỉ xem. Admin mới thấy thao tác Thêm/Sửa/Xóa.
          </p>
        </div>
      ) : (
        <form className="card" onSubmit={onSubmit}>
        <label className="field">
          <span>Idol Group ID</span>
          <input
            type="number"
            value={idolGroupId}
            onChange={(e) => setIdolGroupId(Number(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          <span>Seiyuu</span>
          <input value={seiyuu} onChange={(e) => setSeiyuu(e.target.value)} />
        </label>
        <label className="field">
          <span>Role</span>
          <input value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className="field">
          <span>Image URL</span>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        {message && <div className="ok">{message}</div>}
        {error && <div className="error">{error}</div>}

        <button className="btn" type="submit" disabled={loading || !name}>
          {loading ? 'Đang tạo…' : 'Create'}
        </button>
      </form>
      )}
    </div>
  );
}
