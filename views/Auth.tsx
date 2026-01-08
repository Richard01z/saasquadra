
import React, { useState } from 'react';
import { validateCPF } from '../utils/validation';

interface AuthProps {
  onSuccess: (email?: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (mode === 'register') {
      if (!formData.name) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido';
      if (!validateCPF(formData.cpf)) newErrors.cpf = 'CPF inválido';
      if (formData.phone.length < 10) newErrors.phone = 'Telefone inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success
    onSuccess(formData.email);
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
          <p className="text-gray-500">
            {mode === 'login' ? 'Entre para gerenciar suas reservas' : 'Cadastre-se para reservar quadras'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Nome Completo</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 border outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">CPF</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 border outline-none focus:ring-2 focus:ring-indigo-500 ${errors.cpf ? 'border-red-500' : ''}`}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                />
                {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">WhatsApp / Telefone</label>
                <input 
                  type="tel" 
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 border outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">E-mail</label>
            <input 
              type="email" 
              className={`w-full px-4 py-3 rounded-2xl bg-gray-50 border outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Senha</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition"
          >
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-gray-500"
          >
            {mode === 'login' ? 'Ainda não tem conta? ' : 'Já tem conta? '}
            <span className="text-indigo-600 font-bold underline">
              {mode === 'login' ? 'Cadastre-se agora' : 'Faça login'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
