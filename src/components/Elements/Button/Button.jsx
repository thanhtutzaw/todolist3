import React from "react";

export default function Button(props) {
  const { onClick, title, theme = "primary" } = props;
  const themes = {
    primary: {
      color: "red",
      backgroundColor: "black",
    },
    danger: {
      color: "white",
      backgroundColor: "#eb3e3e",
    },
    secondary: {
      color: "black",
      backgroundColor: "transparent",
    },
  };
  const style = {
    backgroundColor: themes[theme].backgroundColor,
    color: themes[theme].color,
  };
  const className = `button`;

  return (
    <button style={style} className={className} onClick={onClick}>
      {title}
    </button>
  );
}
