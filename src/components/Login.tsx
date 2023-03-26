import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { CSSProperties, useState } from 'react';
import { CgChevronRightR } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Button from './Elements/Button/Button';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [EmailLoading, setEmailLoading] = useState(false);
  const loginStyle: CSSProperties = {
    padding: '.7rem',
    color: 'white',
    backgroundColor: '#007af6',
    borderRadius: '5px',
    outline: 'none',
    border: '1px solid rgba(0,0,0,.1)',
    cursor: 'pointer',
    boxShadow: '0px 2px 20px #0000001f',
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%)',
    wordBreak: 'break-word',
    whiteSpace: 'nowrap',
  };

  const provider = new GoogleAuthProvider();

  const signinHandle = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        try {
          await signInWithPopup(auth, provider);
          navigate('/');
        } catch (error: any) {
          console.error(error.message);
          setLoading(false);
        }
      }, 700);
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
      setLoading(false);
    }
  };
  const email = 'testuser11@gmail.com';
  const password = '111111';
  const testUserSignInHandle = () => {
    setEmailLoading(true);
    try {
      setTimeout(async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/');
        } catch (error: any) {
          console.error(error.message);
          setLoading(false);
        }
      }, 700);
    } catch (error: any) {
      setEmailLoading(false);
      console.error(error);
      alert(`Cannot Signin ! ${error.message}`);
    }
  };
  return (
    <main>
      <Button disabled={loading} onClick={signinHandle} style={loginStyle}>
        {loading ? 'Signing in' : 'Google Sign-in'}
      </Button>
      <br></br>
      <div
        style={{
          color: EmailLoading ? 'grey' : 'blue',
          textDecoration: EmailLoading ? 'initial' : 'underline',
          cursor: EmailLoading ? 'progress' : 'pointer',
        }}
        onClick={testUserSignInHandle}
      >
        <p>{EmailLoading ? 'Signing in as TestUser ...' : 'Sign in as TestUser'}</p>
      </div>
    </main>
  );
}
