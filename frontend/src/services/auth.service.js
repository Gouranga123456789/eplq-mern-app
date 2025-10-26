import api from './api';

const register = async (email, password) => {
  const { data } = await api.post('/auth/register', { email, password });
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;