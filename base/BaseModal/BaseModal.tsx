import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { usePrevious } from "react-use";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { RootState } from "@store/store";
import { modalSlice } from "@store/modals/reducer";

import { useCloseByOutsideClick } from "@hooks/useCloseByOutsideClick";
import useScrollLock from "@hooks/useScrollLock";
import Portal from "@hooks/Portal";
import s from "./BaseModal.module.scss";
import { Icon } from "@base/index";
import { ALL_ICONS } from "@constants/icons";

type PropsType = {
  children: ReactNode | ReactNode[];
  blur?: boolean;
  className?: string;
  onClose?: () => void;
  closeByOutsideClick?: boolean;
};

const BaseModal = ({
  children,
  blur = false,
  onClose,
  className = "",
  closeByOutsideClick = true,
}: PropsType) => {
  const [isVisible, setIsVisible] = useState(false);
  const { modal } = useAppSelector((state: RootState) => state.modal);
  const prevModal = usePrevious(modal);
  const { setModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const thisClass = React.useRef<HTMLDivElement>(null);

  const showModal = useCallback(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    // document.body.style.height = "100vh";
  }, []);

  const hideModalFunc = (callCloseCallback = true) => {
    setIsVisible(false);
    document.body.style.overflow = "";
    // document.body.style.height = "";
    document.body.style.paddingRight = "";
    dispatch(setModal({ modal: "" }));
    if (typeof onClose === "function" && callCloseCallback) {
      onClose();
    }
  };

  const hideModalRef = useRef(hideModalFunc);
  useEffect(() => {
    hideModalRef.current = hideModalFunc;
  }, [hideModalFunc]);

  const hideModal = hideModalRef.current;

  useEffect(() => {
    if (thisClass.current?.classList.contains(modal)) {
      showModal();
    }
    if (
      !modal &&
      prevModal &&
      thisClass.current?.classList.contains(prevModal)
    ) {
      hideModal(false);
    }
  }, [modal, prevModal, showModal]);

  const thisModal = React.useRef<HTMLDivElement>(null);

  const clickOutsideHandler = useCallback(
    (e: any) => {
      if (thisClass.current?.classList.contains(modal) && closeByOutsideClick) {
        hideModal();
      }
    },
    [modal]
  );

  const handleCloseModal = () => {
    hideModal();
  };

  useCloseByOutsideClick(thisModal, clickOutsideHandler);
  useScrollLock(isVisible);

  return (
    <Portal>
      <div
        ref={thisClass}
        className={clsx({
          [s.Wrapper]: true,
          [s.Wrapper__blur]: blur,
          [s.Visible]: isVisible,
          [className]: !!className,
        })}
      >
        <div className={s.Close} onClick={handleCloseModal}>
          <Icon icon={ALL_ICONS.CLOSE} viewBox="0 0 24 24" />
        </div>
        <div ref={thisModal}>{children}</div>
      </div>
    </Portal>
  );
};

export default BaseModal;
