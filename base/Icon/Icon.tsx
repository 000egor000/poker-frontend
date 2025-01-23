import React from 'react';
import clsx from 'clsx';

import icons, { ALL_ICONS } from '@constants/icons';

type Props = {
  icon: keyof typeof ALL_ICONS;
  viewBox?: string;
  fill?: string;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Icon: React.FC<Props> = ({
  icon,
  viewBox = '',
  className = '',
  onClick,
  fill = 'none'
}) => (
  <svg
    className={clsx({
      [className]: className,
    })}
    viewBox={viewBox}
    onClick={onClick}
    fill={fill}
  >
    {icons[icon]}
  </svg>
);

export default Icon;