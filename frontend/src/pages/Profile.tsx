import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
    email: string;
    name: string;
}

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = location.state?.user;
  const [user, setUser] = useState<User | null>(userData || null); 

  const [loading, setLoading] = useState(!user); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else if (!user) {
      fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    } else {
      setLoading(false); 
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Perfil</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Nome:</strong> {user?.name}</p>
      <button onClick={handleLogout} className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
}

export default Profile;
