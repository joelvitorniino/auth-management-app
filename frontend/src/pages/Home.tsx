function Home() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Bem-vindo ao Meu App!</h1>
          <p className="text-lg text-gray-700">Uma aplicação simples para gerenciamento de usuários e autenticação.</p>
        </header>
  
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Comece agora</h2>
          <p className="text-gray-600 mb-4">
            Cadastre-se para acessar recursos exclusivos e gerenciar seu perfil de usuário de forma fácil e rápida.
          </p>
          <div className="flex justify-center">
            <a href="/register">
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                Registrar
              </button>
            </a>
            <a href="/login" className="ml-4">
              <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-200">
                Login
              </button>
            </a>
          </div>
        </div>
  
        <footer className="mt-10 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Joel Vitor. Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }
  
  export default Home;
  