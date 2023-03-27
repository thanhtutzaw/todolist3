import { ButtonHTMLAttributes, memo } from 'react';

interface Theme {
  color: string;
  backgroundColor: string;
}
interface ThemeProps {
  primary: Theme;
  danger: Theme;
  secondary: Theme;
}
const themes: ThemeProps = {
  primary: {
    color: 'white',
    // color: "black",
    backgroundColor: 'var(--btn-blue)',
    // backgroundColor: "transparent",
  },
  danger: {
    color: 'white',
    backgroundColor: '#eb3e3e',
  },
  secondary: {
    color: 'black',
    backgroundColor: 'transparent',
  },
};
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: keyof typeof themes;
};
function Button({ type = 'button', theme = 'primary', ...props }: ButtonProps) {
  const style = {
    backgroundColor: themes[theme].backgroundColor,
    color: themes[theme].color,
  };
  return (
    <button style={style} className="button" {...props}>
      {props.children}
    </button>
  );
}
export default memo(Button);
