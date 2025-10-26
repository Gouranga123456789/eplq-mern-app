import React, { useState } from 'react';
import authService from '../services/auth.service';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(''); 

    try {
      let data;
      if (isLogin) {
        data = await authService.login(email, password);
        login(data); 
      } else {
        await authService.register(email, password);
        
        setSuccess('Registration successful! Please log in.');
        setIsLogin(true); 
        setEmail('');     
        setPassword('');  
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // This function will handle switching modes
  const handleSwitchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin); 
    setEmail('');     
    setPassword('');  
    setError('');    
    setSuccess('');   
  };
  

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? <div className="loader"></div> : isLogin ? 'Login' : 'Register'}
        </button>
        
       
        <button
          type="button"
          className="btn-secondary"
          onClick={handleSwitchMode} 
        >
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>

       
      </form>
    </div>
  );
};

export default AuthPage;