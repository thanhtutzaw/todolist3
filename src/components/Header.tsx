import useIndexDB from '@/hooks/useIndexDB';
import useTheme from '@/hooks/useTheme';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderDropDown } from './HeaderDropDown';
export default function Header(props: { todoCount: number; selecting: boolean }) {
  const { todoCount, selecting } = props;
  const { userphoto, userName } = useIndexDB();
  const { theme, setTheme } = useTheme();

  const [opentools, setopentools] = useState(false);
  const [mounted, setmounted] = useState(false);
  const [loading, setloading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const logoutHandle = async () => {
    setloading(true)
    try {
     setTimeout(async() => {
       await signOut(auth);
       navigate('/login');
     }, 800);
    } catch (error) {
      setloading(false)
      console.error('Signout Error ! ', error);
    }
  };
  const handleTools = () => {
    if (!mounted) setmounted(true);
    setopentools((prev) => !prev);
  };

  return (
    <>
      <header style={{ paddingTop: selecting ? '2rem' : '' }}>
        <div className="header-text">
          <h1>My tasks</h1>
          <p className="header-nobold">
            {todoCount} tasks for <span>Today</span>
          </p>
        </div>
        <div className="profile" onClick={handleTools}>
          {userName && (
            <img
              className="header-image"
              src={userphoto && userphoto}
              alt={userName ? `${userName}'s Profile` : ''}
            />
          )}
          {user && user.email === 'testuser11@gmail.com' && (
            <img
              alt="testUser Profile"
              className="header-image"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ></img>
          )}
        </div>
      </header>
      {mounted && (
        <HeaderDropDown
        loading={loading}
          setmounted={setmounted}
          theme={theme}
          setTheme={setTheme}
          opentools={opentools}
          setopentools={setopentools}
          logoutHandle={logoutHandle}
        ></HeaderDropDown>
      )}
    </>
  );
}
