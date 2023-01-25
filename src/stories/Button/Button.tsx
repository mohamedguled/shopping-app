import React from 'react';
import './button.css';
import { motion, MotionStyle } from 'framer-motion';
interface ButtonProps {
  children?: React.ReactNode;
  color?: 'green' | 'blue' | 'gray' | 'red' | 'dark' | 'yellow';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: MotionStyle;
  disabled?: boolean;
}

export const Button = ({
  children = <p>Hello World</p>,
  color = 'gray',
  className,
  style,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      style={style}
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${color}`,
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
