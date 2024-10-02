import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  // Dados fictícios do usuário para teste
  const user = {
    email: 'usuario@exemplo.com',
    name: 'João Silva',
    createdAt: '2024-10-01', // Data fictícia de criação do usuário
  };

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica para logout, se necessário
    navigate('/login'); // Redirecionar para a página de login
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Perfil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Data de Criação:</strong> {user.createdAt}</p>
      <button onClick={handleLogout} className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
}

export default Profile;
