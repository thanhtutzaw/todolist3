import { AppContext } from '@/Context/AppContext';
import useIndexDB from '@/hooks/useIndexDB';
import useTheme from '@/hooks/useTheme';
import { AppContextType, todosProps } from '@/types';
import { getAuth, signOut } from 'firebase/auth';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';
const Header = memo(
  (props: {
    settodos: Function;
    todos: todosProps[] | null[];
    todoCount: number;
    selecting: boolean;
  }) => {
    const { todos, settodos, todoCount } = props;
    const { userphoto, userName } = useIndexDB();

    const [mounted, setmounted] = useState(false);
    const [opentools, setopentools] = useState(false);
    const [isLoggingOut, setisLoggingOut] = useState(false);
    const { theme, setTheme, setisPrevent } = useContext(AppContext) as AppContextType;
    const dropdownRef = useRef(null);
    const auth = getAuth();
    const user = auth.currentUser;

    const navigate = useNavigate();

    const logoutHandle = useCallback(async () => {
      setisLoggingOut(true);
      setisPrevent(false);
      try {
        setTimeout(async () => {
          await signOut(auth);
          navigate('/login');
        }, 800);
      } catch (error) {
        setisLoggingOut(false);
        console.error('Signout Error ! ', error);
      }
    }, []);
    const handleTools = () => {
      if (!mounted) setmounted(true);
      setopentools((prev) => !prev);
    };
    return (
      <header>
        {/* <header style={{ paddingTop: selecting ? '1.5rem' : '' }}> */}
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
              alt={`${userName ? userName : 'Unknown user'}'s Profile`}
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
        {mounted && (
          <HeaderDropDown
            dropdownRef={dropdownRef}
            todos={todos}
            settodos={settodos}
            isLoggingOut={isLoggingOut}
            setmounted={setmounted}
            theme={theme}
            setTheme={setTheme}
            opentools={opentools}
            setopentools={setopentools}
            logoutHandle={logoutHandle}
          ></HeaderDropDown>
        )}
      </header>
    );
  }
);
export default Header;
