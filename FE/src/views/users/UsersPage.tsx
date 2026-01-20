import { useEffect, useState } from 'react';
import { ApiError } from '../../api/types.ts';
import { getAllUsers, type User } from '../../api/user.ts';

export function UsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getAllUsers({ page: 1, limit: 50 });
        if (mounted) setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : 'Không tải được users';
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="page">
      <h1>Users</h1>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.roleId}</td>
                <td>{String(u.isActive)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
