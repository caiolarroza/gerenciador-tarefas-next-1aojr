import type { NextPage } from "next";
import { useState } from 'react';
import { executeRequest } from '../services/api';

type SignupProps = {
  setPage(s: string): void
}

export const Signup: NextPage<SignupProps> = ({ setPage }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const doSignup = async () => {
    try {
      setError('');
      if (!name || !email || !password) {
        setError('Favor preencher os campos!');
        return
      }

      setLoading(true);

      const body = {
        name,
        email: email,
        password
      };

      const result = await executeRequest('user', 'post', body);

      if (result && result.data) {
        const obj = result.data;
        setMessage(obj.msg);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (e: any) {
      console.log(`Erro ao efetuar o cadastro: ${e}`);
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
      } else {
        setError(`Erro ao efetuar cadastro, tente novamente.`);
      }
    }
    setLoading(false);
  }

  return (
    <div className="container-login">
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
      <div className="form">
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <div className="input">
          <img src="/mail.svg" alt="Nome usuário" />
          <input type="text" placeholder="Nome"
            value={name}
            onChange={evento => setName(evento.target.value)}
          />
        </div>
        <div className="input">
          <img src="/mail.svg" alt="Email Cadastro" />
          <input type="text" placeholder="Email"
            value={email}
            onChange={evento => setEmail(evento.target.value)}
          />
        </div>
        <div className="input">
          <img src="/lock.svg" alt="Senha Cadastro" />
          <input type="password" placeholder="Senha"
            value={password}
            onChange={evento => setPassword(evento.target.value)}
          />
        </div>
        <button onClick={doSignup} disabled={loading}>{loading ? 'Carregando....' : 'Cadastrar'}</button>

        <a className='link' onClick={() => setPage('login')}>Fazer login</a>
      </div>
    </div>
  )
}
