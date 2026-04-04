import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <main>
      {/* Elegant Header Section */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Welcome Back</h2>
        <p style={{ color: "var(--primary-color)", fontStyle: "italic", fontSize: "1.1rem" }}>
          Step into the world where logic meets creativity.
        </p>
      </div>

      {error && <p className='error' style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "20px" }}>{error}</p>}
      
      {/* Centered, styled form */}
      <form className="styled-form" onSubmit={handleSubmit} style={{ maxWidth: "450px", margin: "0 auto" }}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input 
            type='email' 
            id="email"
            placeholder='example@email.com' 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type='password' 
            id="password"
            placeholder='Enter your password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "10px" }}>
          <button type='submit' className="btn" style={{ width: "100%", padding: "15px" }}>Login</button>
        </div>
      </form>
      
      {/* Footer Link */}
      <p style={{ textAlign: "center", marginTop: "30px", fontSize: "1.05rem" }}>
        Don't have an account?{' '}
        <Link to='/register' style={{ color: "var(--accent-pop)", fontWeight: "bold", textDecoration: "none", borderBottom: "1px solid var(--accent-pop)", paddingBottom: "2px" }}>
          Register here
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;