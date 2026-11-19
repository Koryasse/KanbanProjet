import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/api'
import { saveUser } from '../../services/auth'
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email.trim(), password);
      saveUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='login-main'>
      <section className='login-main-content'>
        <div>
          <div>
            <h2>Welcome Back</h2>
            <p>Plan your time. Own your day.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Continue'}</button>
          </form>
          <div>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </div>
      </section>
      <section className='login-bg'></section>
    </main>
  )
}

export default Login
