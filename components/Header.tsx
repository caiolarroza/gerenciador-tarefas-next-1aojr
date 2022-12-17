import type { NextPage } from "next";
import { useEffect, useState } from 'react';

type HeaderProps = {
  sair(): void,
  showModal(): void
}
export const Header: NextPage<HeaderProps> = ({ sair, showModal }) => {

  const [username, setUsername] = useState<string | null>('');

  useEffect(() => {
    if (typeof window !== undefined) {
      const name = localStorage.getItem('name');
      setUsername(name);
    }
  }, []);

  return (
    <div className='container-header'>
      <img src="/logo.svg" alt="Logo Fiap" className='logo' />
      <button onClick={showModal}><span>+</span>Adicionar Tarefa</button>
      <div className='mobile'>
        <span>Olá, {username}</span>
        <img src="/exit-mobile.svg" alt="Sair" onClick={sair} />
      </div>
      <div className='desktop'>
        <span>Olá, {username}</span>
        <img src="/exit-desktop.svg" alt="Sair" onClick={sair} />
      </div>
    </div>
  );

}
