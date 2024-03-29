import { AppContext } from '@/Context/AppContext';
import { exportTodo, importTodo } from '@/ExportImport';
import { AppContextType, todosProps } from '@/types';
import {
  ChangeEvent,
  MouseEventHandler,
  RefObject,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiFileCopy2Fill, RiLogoutBoxFill, RiTimeFill } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
type HeaderDropDownProps = {
  theme: string;
  isLoggingOut: boolean;
  opentools: boolean;
  settodos: Function;
  setTheme: Function;
  setmounted: Function;
  setopentools: Function;
  todos: todosProps[] | null[];
  dropdownRef: RefObject<HTMLDivElement>;
  logoutHandle: MouseEventHandler<HTMLButtonElement>;
};
export default function HeaderDropDown(props: HeaderDropDownProps) {
  const {
    dropdownRef,
    todos,
    theme,
    settodos,
    setTheme,
    opentools,
    setmounted,
    setopentools,
    isLoggingOut,
    logoutHandle,
  } = props;
  const { dateLocale, setDateLocale, setisPrevent } = useContext(AppContext) as AppContextType;
  interface ToolsAnimate {
    animation: string;
    pointerEvents:
      | 'none'
      | 'initial'
      | 'inherit'
      | 'unset'
      | 'visiblePainted'
      | 'visibleFill'
      | 'visibleStroke'
      | 'visible';
  }
  const enterTools: ToolsAnimate = {
    animation: 'enterTools forwards 300ms ease-in',
    pointerEvents: 'initial',
  };
  const exitTools: ToolsAnimate = {
    animation: 'exitTools forwards 500ms ease-in',
    pointerEvents: 'initial',
  };
  const { loading } = useContext(AppContext) as AppContextType;
  const toolsAnimate = opentools ? enterTools : exitTools;
  useEffect(() => {
    opentools ? setisPrevent(true) : setisPrevent(false);
  }, [opentools]);

  const exportHandle = useCallback(
    function () {
      exportTodo(todos);
    },
    [todos]
  );
  function importHandle() {
    let fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();
    fileInput.addEventListener('change', fileChangeHandle, false);
    function fileChangeHandle() {
      importTodo(settodos, setisPrevent, setopentools, fileInput, todos);
    }
  }
  useEffect(() => {
    // function handleClose(e: MouseEvent) {
    //   if (e.target?.className === 'header-image' || dropdownRef.current?.contains(e.target)) return;
    //   setopentools(false);
    // }
    function handleClose(e: MouseEvent) {
      const target = e.target as HTMLDivElement;
      if (target?.className === 'header-image' || dropdownRef.current?.contains(target)) return;
      setopentools(false);
    }
    window.addEventListener('mousedown', handleClose);
    return () => {
      window.removeEventListener('mousedown', handleClose);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      onAnimationEnd={() => {
        if (!opentools) {
          setmounted(false);
        }
      }}
    >
      <div style={toolsAnimate} className={`tools `}>
        <div className="tools-container">
          <button
            onClick={() => {
              setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
              setopentools(false);
            }}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
            <span>Theme</span>
          </button>
          <button
            className={loading ? 'disabled' : 'exportBtn'}
            disabled={loading}
            onClick={exportHandle}
          >
            <RiFileCopy2Fill />
            <span>Export Data</span>
          </button>
          <button onClick={importHandle}>
            <VscAdd />
            <span>Import Data</span>
          </button>
          <button>
            <RiTimeFill />
            <select
              defaultValue={dateLocale}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                localStorage.setItem('dateLocale', e.target.value);
                setDateLocale(e.target.value);
              }}
            >
              <option value={'Myanmar'}>Myanmar</option>
              <option value={'English'}>English</option>
            </select>
          </button>
          <button disabled={isLoggingOut} onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>{isLoggingOut ? 'Logging out' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
