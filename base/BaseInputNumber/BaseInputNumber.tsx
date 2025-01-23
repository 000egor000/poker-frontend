import React, { FC, ForwardedRef, InputHTMLAttributes } from "react";
import s from "./BaseInputNumber.module.scss";
import clsx from "clsx";

interface InputProps {
  className?: string;
  autocomplete?: string;
  error?: any;
}

type PropsType = InputHTMLAttributes<HTMLInputElement> & InputProps;

const BaseInputNumber: FC<PropsType> = React.forwardRef(
  ({ className = "", error, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        className={clsx({
          [s.InputNumber]: true,
          [s.InputNumber__Error]: !!error,
          [className]: !!className,
        })}
        type="text"
        autoComplete="off"
        {...rest}
        ref={ref}
      />
    );
  }
);

BaseInputNumber.displayName = "BaseInputNumber";

export default BaseInputNumber;
