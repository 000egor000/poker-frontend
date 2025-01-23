import React from "react";

import { toast as toaster, useToaster } from "react-hot-toast";
import { Icon } from "@base/index";
import { ALL_ICONS } from "@constants/icons";

import s from "./BaseAlert.module.scss";

const BaseAlert = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  // toast use
  // toast.success("success message", { duration: 3000 });
  // toast.error("error message", { duration: 3000 });
  // toast.custom('custom message', { duration: 3000 });

  return (
    <div
      className={s.BaseAlert}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 30,
        });

        const ref = (el: HTMLDivElement) => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };

        return (
          <div
            className={s.BaseAlert__toast}
            key={toast.id}
            ref={ref}
            style={{
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${-offset}px)`,
            }}
            {...toast.ariaProps}
          >
            <div className={s.BaseAlert__animation}>
              {/*<div className={s.BaseAlert__bg}></div>*/}
              <div className={s.BaseAlert__content}>
                {toast.type === "success" ? (
                  <Icon
                    icon={ALL_ICONS.CHECK_CIRCLE}
                    viewBox="0 0 44 44"
                    className={s.BaseAlert__contentIcon}
                  />
                ) : toast.type === "error" ? (
                  <Icon
                    icon={ALL_ICONS.CROSS_CIRCLE}
                    viewBox="0 0 44 44"
                    className={s.BaseAlert__contentIcon}
                  />
                ) : (
                  ""
                )}
                <span className={s.BaseAlert__content__text}>
                  {toast.message as string}
                </span>
              </div>

              <div
                className={s.BaseAlert__close}
                onClick={() => toaster.remove(toast.id)}
              >
                <Icon
                  className={s.CloseIcon}
                  icon={ALL_ICONS.CLOSE}
                  viewBox="0 0 24 25"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BaseAlert;
