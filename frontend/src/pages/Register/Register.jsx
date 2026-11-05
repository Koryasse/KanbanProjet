import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {

  return (
    <main className='register-main'>
      <section className='register-main-content'>
        <div>
          <div>
            <h2>Welcome to Dashr</h2>
            <p>Your day. Your priorities. Your productivity.</p>
          </div>
          <form>
            <input type="text" placeholder='Name'/>
            <input type="email" placeholder='Email address'/>
            <input type="password" placeholder='Password'/>
            <input type="password" placeholder='Confirm password'/>
            <button type="submit">Continue</button>
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