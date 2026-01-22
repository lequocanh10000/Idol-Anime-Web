import { useState } from 'react';
import { ApiError } from '../api/types';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    try {
      await register({ username, email, password });
      setMessage('Đăng ký thành công! Đang chuyển sang trang đăng nhập...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Đăng ký thất bại';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <form className="card" style={{ maxWidth: 340, margin: '40px auto' }} onSubmit={onSubmit}>
        <h2>Đăng ký</h2>
        <label className="field">
          <span>Username</span>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label className="field">
          <span>Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </label>
        <label className="field">
          <span>Password</span>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </label>
        <label className="field">
          <span>Confirm Password</span>
          <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" />
        </label>
        {error && <div className="error">{error}</div>}
        {message && <div className="ok">{message}</div>}
        <button className="btn" type="submit" disabled={loading || !username || !email || !password || !confirmPassword}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
}
