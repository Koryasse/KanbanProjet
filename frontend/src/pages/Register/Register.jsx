import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/api'
import { saveUser } from '../../services/auth'
import './Register.css'

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      // L'inscription renvoie l'utilisateur créé : on le connecte directement
      const user = await register(name.trim(), email.trim(), password);
      saveUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='register-main'>
      <section className='register-main-content'>
        <div>
          <div>
            <h2>Welcome to Dashr</h2>
            <p>Your day. Your priorities. Your productivity.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm password' required value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Continue'}</button>
          </form>
          <div>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </section>
      <section className='register-bg'></section>
    </main>
  )
}

export default Register
