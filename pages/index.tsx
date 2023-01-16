import { useEffect, useState } from 'react';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Signup } from '../containers/Signup';

export default function Index() {

  const [token, setToken] = useState<string | null>('');
  const [page, setPage] = useState<string>('');

  useEffect(() => {
    if (typeof window !== undefined) {
      const at = localStorage.getItem('accessToken');
      setToken(at);
    }
  }, []);

  if (token) {
    return <Home setToken={setToken} />
  } else {
    if (page === 'signup') {
      return <Signup setPage={setPage} />
    } else {
      return <Login setToken={setToken} setPage={setPage} />
    }
  }
}
