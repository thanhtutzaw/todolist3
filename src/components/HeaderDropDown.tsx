import { MouseEventHandler } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
type HeaderDropDownProps = {
  setmounted: Function;
  theme: string;
  loading: boolean;
  setTheme: Function;
  opentools: any;
  setopentools: Function;
  logoutHandle: MouseEventHandler<HTMLButtonElement>;
};
export const HeaderDropDown = (props: HeaderDropDownProps) => {
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
          <button disabled={loading} onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>{loading ? 'Logging out' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
