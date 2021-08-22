import React from "react";
import * as S from "./styles";

const Button = ({ type = "default", text, action, disabled }) => {
  const handleClick = () => {
    action && action();
  };

  const defaultProps = {
    onClick: handleClick,
    disabled,
  };

  return {
    default: <S.Default {...defaultProps}>{text}</S.Default>,
  }[type];
};

export default Button;
