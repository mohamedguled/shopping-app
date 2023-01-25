import React from 'react';
import './outlinebutton.css';
import { motion, MotionStyle } from 'framer-motion';
import { BiCheck } from 'react-icons/bi';

interface OutlineButtonProps {
  children?: React.ReactNode;
  color?: 'green' | 'blue' | 'gray' | 'red' | 'dark' | 'yellow';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: MotionStyle;
  disabled?: boolean;
}

export const OutlineButton = ({
  children = <BiCheck />,
  className,
  color,
  onClick,
  style,
  disabled = false,
  ...props
}: OutlineButtonProps) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.95,
        backgroundColor: `var(--button-${color})`,
        color: 'black',
      }}
      transition={{ duration: 0.1 }}
      style={style}
      onClick={onClick}
      type="button"
      className={[
        'storybook-outlinebutton',
        `storybook-outlinebutton--${color}`,
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
