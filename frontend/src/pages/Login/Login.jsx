import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <main className='login-main'>
      <section className='login-main-content'>
        <div>
          <div>
            <h2>Welcome Back</h2>
            <p>Plan your time. Own your day.</p>
          </div>
          <form>
            <input type="email" placeholder="Email address"/>
            <input type="password" placeholder='Password'/>
            <button type="submit">Continue</button>
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