import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
    email: string;
    name: string;
    createdAt: string; // Altere para string se os dados chegarem como uma string de data
}

function Profile() {
  const navigate = useNavigate();
  const location = useLocation(); // Adiciona useLocation
  const userData = location.state?.user; // Obtém os dados do usuário do state
  const [user, setUser] = useState<User | null>(userData || null); // Definindo o tipo de estado como User ou null
  const [loading, setLoading] = useState(!user); // Inicializa loading com base na presença de user
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else if (!user) {
      // Se o user não estiver definido, faz a requisição para obter os dados
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
        setUser(data); // Define os dados do usuário
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    } else {
      setLoading(false); // Se o user já estiver disponível, não é necessário carregar mais
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
      <p><strong>Data de Criação:</strong> {new Date(user!.createdAt).toLocaleDateString()}</p>
      <button onClick={handleLogout} className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
}

export default Profile;
