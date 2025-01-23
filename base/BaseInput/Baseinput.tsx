import React, { FocusEvent, forwardRef, HTMLProps, useState } from "react";
import s from "./BaseInput.module.scss";
import clsx from "clsx";
import { ALL_ICONS } from "@constants/icons";
import { Icon } from "@base/index";

type InputProps = {
  type?: string;
  variant?: "light" | undefined;
  name?: string;
  label?: string;
  // min?: number;
  // max?: number;
  placeholder?: string;
  optional?: boolean;
  // required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  error?: string | boolean;
  value: string | number;
  icon?: string | boolean;
  maxLength?: number;
  editDone?: () => void;

  onChange?(value: string | number): void;

  changeDisabled?(value: boolean): void;

  onBlur?(): void;

  formatter?: (value: string | number) => string | number;
} & HTMLProps<HTMLInputElement>;

const BaseInput = forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      type = "text",
      value,
      label,
      error,
      name,
      // min,
      // max,
      // required = false,
      autoComplete,
      disabled = false,
      className = "",
      onChange,
      onBlur,
      formatter,
      changeDisabled,
      editDone,
      maxLength,
    } = props;

    const onChangeHandler = (e: FocusEvent<HTMLInputElement>) => {
      const current = e.target.value;
      const formatted = formatter ? formatter(current) : current;
      if (onChange) {
        onChange(formatted);
      }
    };
    const [typeIcon, setTypeIcon] = useState<string>("eye-off");
    const [newType, setType] = useState<string>(type);

    const changeType = (value: string) => {
      if (value == "eye") {
        setTypeIcon("eye");
        setType("text");
      } else {
        setTypeIcon("eye-off");
        setType("password");
      }
    };

    // const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    // const [autoFilled, setAutoFilled] = React.useState(false);
    //
    // React.useEffect(() => {
    //   const func = () => {
    //     if (!wrapperRef.current) {
    //       return;
    //     }
    //
    //     if (wrapperRef.current) {
    //       const autofilled = (wrapperRef.current as HTMLElement).querySelectorAll(
    //         ":-webkit-autofill"
    //       );
    //       if (autofilled?.length > 0) {
    //         setAutoFilled(true);
    //       }
    //     }
    //   };
    //   setTimeout(func, 100);
    //   setTimeout(func, 400);
    // }, []);

    // React.useEffect(() => {
    //   if (!value.toString().length) {
    //     setAutoFilled(false);
    //   }
    // }, [value]);

    return (
      <div
        className={clsx(s.BaseInput, className)}
        // ref={wrapperRef}
      >
        <input
          type={newType}
          className={clsx(s.Input, {
            [s.Input__Error]: !!error,
            // [s.Input__AutoFilled]: autoFilled,
            className,
          })}
          value={value}
          name={name}
          // min={min}
          // max={max}
          ref={ref}
          maxLength={maxLength}
          // required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChangeHandler}
        />
        <label
          className={clsx(s.Label, value ? s.Label__NoEmpty : "", className)}
        >
          {label}
        </label>
        {type === "password" && (
          <Icon
            viewBox="0 0 24 24"
            icon={typeIcon === "eye" ? ALL_ICONS.EYE_OPEN : ALL_ICONS.EYE_OFF}
            className={s.IconEye}
            onClick={() => changeType(typeIcon === "eye" ? "eye-off" : "eye")}
          />
        )}
        {type === "editable" &&
          (disabled ? (
            <Icon
              viewBox="0 0 24 24"
              icon={ALL_ICONS.PENCIL}
              className={s.IconEye}
              onClick={() => changeDisabled && changeDisabled(!disabled)}
            />
          ) : (
            <Icon
              viewBox="0 0 24 24"
              icon={ALL_ICONS.INPUT_CHECK}
              className={s.IconEye}
              onClick={() => {
                if (editDone) {
                  editDone();
                  // changeDisabled && changeDisabled(!disabled);
                }
              }}
            />
          ))}
        {typeof error === "string" ? (
          <p className={s.ErrorText}>{error}</p>
        ) : null}
      </div>
    );
  }
);

BaseInput.displayName = "Input";

export default BaseInput;
