import React from "react";
import clsx from "clsx";

import { Icon } from "@base/index";
import { ALL_ICONS } from "@constants/icons";

import s from "./PasswordCheckValidate.module.scss";

type PropsType = {
  field?: string;
};
const PasswordCheckValidate = ({ field = "" }: PropsType) => {
  const isMoreThan0 = field.length > 0;
  const isMoreThan8 = field.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(field);
  const hasNumber = /\d/.test(field);

  return (
    <div className={s.PasswordCheckValidate}>
      <span
        className={clsx({
          [s.PasswordCheckValidate__success]: isMoreThan0 && isMoreThan8,
          [s.PasswordCheckValidate__error]: isMoreThan0 && !isMoreThan8,
        })}
      >
        <Icon
          className={s.PasswordCheckValidate__icon}
          icon={ALL_ICONS.CHECK_VALIDATE}
          viewBox={"0 0 20 20"}
        />
        8+ characters
      </span>
      <span
        className={clsx({
          [s.PasswordCheckValidate__success]: isMoreThan0 && hasLetter,
          [s.PasswordCheckValidate__error]: isMoreThan0 && !hasLetter,
        })}
      >
        <Icon
          className={s.PasswordCheckValidate__icon}
          icon={ALL_ICONS.CHECK_VALIDATE}
          viewBox={"0 0 20 20"}
        />
        Letters
      </span>
      <span
        className={clsx({
          [s.PasswordCheckValidate__success]: isMoreThan0 && hasNumber,
          [s.PasswordCheckValidate__error]: isMoreThan0 && !hasNumber,
        })}
      >
        <Icon
          className={s.PasswordCheckValidate__icon}
          icon={ALL_ICONS.CHECK_VALIDATE}
          viewBox={"0 0 20 20"}
        />
        Nubmers
      </span>
    </div>
  );
};

export default PasswordCheckValidate;
