import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Thêm confirmPassword cho đăng ký
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('') // Thêm state cho thông báo thành công
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match')  // Kiểm tra mật khẩu và confirm mật khẩu khi đăng ký
      return
    }

    let result
    if (isLogin) {
      // Đăng nhập
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      // Đăng ký
      result = await supabase.auth.signUp({ email, password })
    }

    if (result.error) {
      setErrorMessage(result.error.message)
      setSuccessMessage('') // Reset thông báo thành công nếu có lỗi
    } else {
      setErrorMessage('')
      if (!isLogin) {
        setSuccessMessage('Account created successfully! Please check your email to confirm your account.')  // Thông báo thành công khi đăng ký
      }
      setTimeout(() => {
        router.push('/')  // Chuyển hướng về trang chính sau khi đăng ký thành công
      }, 2000)  // Chờ 3 giây để người dùng đọc thông báo
    }
  }

  return (
    <div style={authPageStyle}>
      <div style={formContainer}>
        <h2 style={headingStyle}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={inputStyle} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={inputStyle} 
            required 
          />
          {!isLogin && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              style={inputStyle} 
              required 
            />
          )}
          {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
          {successMessage && <p style={successMessageStyle}>{successMessage}</p>} {/* Hiển thị thông báo thành công */}
          <button type="submit" style={buttonStyle}>{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={switchButtonStyle}>
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  )
}

// Custom styles
const authPageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f4',
  padding: '0 1rem',
}

const formContainer = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
}

const headingStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1.5rem',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const inputStyle = {
  padding: '0.75rem',
  margin: '0.5rem 0',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '1rem',
}

const errorMessageStyle = {
  color: 'red',
  fontSize: '0.9rem',
  textAlign: 'center',
  margin: '0.5rem 0',
}

const successMessageStyle = {
  color: 'green',
  fontSize: '0.9rem',
  textAlign: 'center',
  margin: '0.5rem 0',
}

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#000',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  marginTop: '1rem',
}

const switchButtonStyle = {
  background: 'none',
  color: '#0070f3',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: '1rem',
  fontSize: '1rem',
}
