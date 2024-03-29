import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Elements/Button/Button';
import GoogleLogo from './GoogleLogo';
import Logo from './Logo';
import { motion } from 'framer-motion';
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [EmailLoading, setEmailLoading] = useState(false);
  const loginStyle: CSSProperties = {
    gap: '10px',
    padding: '.7rem',
    color: 'white',
    backgroundColor: '#007af6',
    borderRadius: '5px',
    outline: 'none',
    border: '1px solid rgba(0,0,0,.1)',
    cursor: 'pointer',
    boxShadow: '0px 2px 20px #0000001f',
    // position: 'absolute',
    top: '50%',
    right: '50%',
    // transform: 'translate(50%, -50%)',
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
    <motion.main className="login">
      {/* <image src={"/public/assets/logo512.svg"}/> */}
      <Logo />
      <Button disabled={loading} onClick={signinHandle} style={loginStyle}>
        <GoogleLogo />
        <p className="loginLabel">{loading ? 'Signing in' : 'Continue with Google'}</p>
      </Button>
      {/* <button className="AppLoginButton AppLoginButton--full AppLoginButton--google" type="button">
        <div className="AppLoginButton__icon"></div>
        <div className="AppLoginButton__textContainer">
          <div className="AppLoginButton__titleContainer">Continue with Google</div>
          <div className="AppLoginButton__subtitleContainer">Secured log-in</div>
        </div>
      </button> */}
      <br></br>
      <div
        className="testUserLogin"
        style={{
          color: EmailLoading ? 'grey' : 'rgb(0, 122, 246)',
          textDecoration: EmailLoading ? 'initial' : 'underline',
          cursor: EmailLoading ? 'progress' : 'pointer',
        }}
        onClick={testUserSignInHandle}
      >
        <p>{EmailLoading ? 'Signing in as TestUser ...' : 'Sign in as TestUser'}</p>
      </div>
    </motion.main>
  );
}
