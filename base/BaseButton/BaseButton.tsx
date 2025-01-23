import React from "react";
import clsx from "clsx";

import styles from "./BaseButton.module.scss";
import Icon from "../Icon/Icon";
import { ALL_ICONS } from "@constants/icons";

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant:
    | "SignUp"
    | "TryItNow"
    | "LogIn"
    | "BackCircle"
    | "Continue"
    | "BackArrow"
    | "LogOut";
  value: string;
  className?: string;
  disabled?: boolean;
};

const dictionary: Record<PropsType["variant"], string> = {
  SignUp: styles.Button__SignUp,
  TryItNow: styles.Button__TryItNow,
  LogIn: styles.Button__LogIn,
  BackCircle: styles.Button__BackCircle,
  Continue: styles.Button__Continue,
  BackArrow: styles.Button__BackArrow,
  LogOut: styles.Button__LogOut,
};

const icons: Partial<Record<PropsType["variant"], React.JSX.Element>> = {
  SignUp: (
    <Icon
      viewBox="0 0 36 36"
      fill="none"
      icon={ALL_ICONS.RIGHT_ARROW}
      className={styles.Button__SignUp_Icon}
    />
  ),
  TryItNow: (
    <Icon
      viewBox="0 0 36 36"
      fill="none"
      icon={ALL_ICONS.RIGHT_ARROW}
      className={styles.Button__TryItNow_Icon}
    />
  ),
  BackArrow: (
    <Icon
      viewBox="0 0 40 40"
      fill="none"
      icon={ALL_ICONS.LEFT_ARROW}
      className={styles.Button__BackArrow_Icon}
    />
  ),
  LogOut: (
    <Icon
      viewBox="0 0 40 40"
      fill="none"
      icon={ALL_ICONS.LOG_OUT}
      className={styles.Button__LogOut_Icon}
    />
  ),
};

export default function Button({
  className = "",
  variant,
  value,
  disabled = false,
  ...rest
}: PropsType) {
  return (
    <button
      className={clsx(styles.Button, dictionary[variant], className)}
      role="button"
      disabled={disabled}
      {...rest}
    >
      {(variant === "BackArrow" || variant === "LogOut") && icons[variant]}
      {value}
      {(variant === "SignUp" || variant === "TryItNow") && icons[variant]}
    </button>
  );
}
