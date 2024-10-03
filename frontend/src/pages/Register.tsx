import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Register() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password, name };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);

      // Verifica se a resposta está no intervalo de sucesso
      if (response.status >= 200 && response.status < 300) {
        setSuccess('Usuário registrado com sucesso!');

        navigate('/login');
      } else {
        throw new Error('Erro ao registrar o usuário.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Registrar</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
