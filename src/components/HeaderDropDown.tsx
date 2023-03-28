import useFirestoreData from '@/hooks/useFirestoreData';
import { MouseEventHandler } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiLogoutBoxFill, RiFileCopy2Fill } from 'react-icons/ri';
type HeaderDropDownProps = {
  theme: string;
  loading: boolean;
  opentools: boolean;
  setTheme: Function;
  setmounted: Function;
  setopentools: Function;
  logoutHandle: MouseEventHandler<HTMLButtonElement>;
};
export default function HeaderDropDown(props: HeaderDropDownProps) {
  const { loading, setmounted, theme, setTheme, opentools, setopentools, logoutHandle } = props;
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
  const toolsAnimate = opentools ? enterTools : exitTools;
  const { todos } = useFirestoreData();
  function exportHandle() {
    const dataStr = JSON.stringify(todos);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let fileName = 'data.json';
    let linkElement = document.createElement('a') as HTMLAnchorElement;
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
  }
  return (
    <div
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
          <button disabled={loading} onClick={exportHandle}>
            <RiFileCopy2Fill />
            <span>Export Data</span>
          </button>
          <button disabled={loading} onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>{loading ? 'Logging out' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
