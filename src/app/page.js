'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nome_empresa: '',
    categoria: '',
    bairros: '',
    whatsapp: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwUg74QkoCOYgYMLK8on0N5sMc6gG3KPo82S9De8F_H6bicN_JYBagOzwdzohD60_dD/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        const whatsappMessage = `Olá Aelo do Brasil! Sou a empresa ${formData.nome_empresa} e quero divulgar por R$ 29,90.\n\nDados enviados:\n- Categoria: ${formData.categoria}\n- Bairros: ${formData.bairros}\n- WhatsApp: ${formData.whatsapp}\n\nJá enviarei o áudio e o comprovante.`;
        
        window.location.href = `https://wa.me/55149811506?text=${encodeURIComponent(whatsappMessage)}`;
      } else {
        setMessage('Erro ao enviar o formulário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Ocorreu um erro. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pré-cadastro de Empresas</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Preencha os dados e siga para o WhatsApp para finalizar o cadastro.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Nome da Empresa:
          <input
            type="text"
            name="nome_empresa"
            value={formData.nome_empresa}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Categoria:
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Bairros de Atendimento:
          <input
            type="text"
            name="bairros"
            value={formData.bairros}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          WhatsApp para Contato:
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px 20px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Enviando...' : 'Confirmar e seguir no WhatsApp'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', textAlign: 'center', color: loading ? 'blue' : 'red' }}>{message}</p>}
    </div>
  );
}