import React from "react";
import { ALL_ICONS } from "@constants/icons";
import { Icon } from "@base/index";
import s from "./BaseStatus.module.scss";
import clsx from "clsx";

interface BaseStatusProps {
  className?: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

const BaseStatus = ({ content }: BaseStatusProps) => {
  return (
    <div className={s.MainBaseStatus}>
      <div className={s.BaseStatus}>
        <Icon viewBox="0 0 50 50" icon={ALL_ICONS.СIRCLE_WITH_STAR} />
        <p>{content}</p>
      </div>
      <div className={s.subContent}>ssssssssssssssss</div>
    </div>
  );
};

export default BaseStatus;
