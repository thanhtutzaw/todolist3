import { MouseEventHandler, useCallback } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
type HeaderDropDownProps = {
  setmounted: Function;
  theme: string;
  setTheme: Function;
  opentools: any;
  setopentools: Function;
  logoutHandle: MouseEventHandler<HTMLDivElement>;
};
export const HeaderDropDown = (props: HeaderDropDownProps) => {
  const { setmounted, theme, setTheme, opentools, setopentools, logoutHandle } = props;
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
          <div
            onClick={useCallback(() => {
              setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
              setopentools(false);
              // console.log("callback running");
            }, [theme, opentools])}
            className="setting-item"
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
            <span>Theme</span>
          </div>
          <div className="setting-item" onClick={logoutHandle}>
            <RiLogoutBoxFill />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
