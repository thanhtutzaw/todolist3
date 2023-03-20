import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { CSSProperties } from 'react';
import { CgChevronRightR } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Button from './Elements/Button/Button';

export default function Login() {
  const navigate = useNavigate();

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
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      alert(`Cannot Signin ! ${error.message}`);
    }
  };
  const email = 'testuser11@gmail.com';
  const password = '111111';
  const testUserSignInHandle = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(`Cannot Signin ! ${err.message}`);
      });
  };
  return (
    <main>
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <Button className="btn">
          <CgChevronRightR />
        </Button>
      </a>
      <Button onClick={signinHandle} style={loginStyle}>
        Google Sign-in
      </Button>
      <br></br>
      <div
        style={{
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={testUserSignInHandle}
      >
        <p>Sign in as testUser</p>
      </div>
    </main>
  );
}
