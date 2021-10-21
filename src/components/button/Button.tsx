import React from 'react';
import classNames from 'classnames';

import { tuple } from '../_util/type';
import Icon from '../icon';
import './button.css';

const prefixCls = 'one-btn';

const ButtonTypes = tuple('default', 'primary', 'text');
type ButtonType = typeof ButtonTypes[number];

interface ButtonProps {
  type?: ButtonType;
  icon?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default', // TODO: default props
  icon,
  className,
  disabled,
  children,
  onClick,
}) => {
  console.log(children, type, icon);

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  return (
    <button className={classes} onClick={handleClick}>
      {icon && <Icon icon={icon} style={{ fontSize: 'inherit' }} />}
      {children}
    </button>
  );
};

export default Button;
