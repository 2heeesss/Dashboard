import React from 'react';
import styled from 'styled-components';

interface TextProps {
  weight?: string;
  color?: string;
  size?: string;
  borderRadius?: string;
  backgroundColor?: string;
  margin?: string;
  children: JSX.Element | string;
  clickHandler: EventListener;
}

const StyledButton = styled.button<TextProps>`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  margin: ${(props) => props.margin};
`;

function Button({
  weight = 'normal',
  size = '16px',
  color = 'black',
  borderRadius = '0',
  backgroundColor = 'none',
  margin = '0',
  children,
  clickHandler,
}: TextProps) {
  return (
    <StyledButton
      weight={weight}
      color={color}
      size={size}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      margin={margin}
      onClick={clickHandler}
    >
      {children}
    </StyledButton>
  );
}
export default Button;
