import React, { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

import { Footer, Header } from "@components/common";
import { useCounter } from "@hooks/useCounter";
import { ModalCodeFromMail, ModalLogin, ModalNewPassword, ModalRecovery, ModalRegistration } from "@modals/index";
import { useAppDispatch } from "@hooks/redux";
import { modalSlice } from "@store/modals/reducer";

import s from "./Default.module.scss";

interface DefaultProps {
  children: ReactNode;
  isAuthorized?: boolean;
  footer?: boolean;
  footerLTD?: boolean;
  lenis?: boolean;
}

const Default = ({
  children,
  isAuthorized,
  footer = true,
  footerLTD = false,
  lenis = true,
}: DefaultProps) => {
  if (lenis) {
    return (
      <ReactLenis root>
        <div className={s.Default}>
          <Header isAuthorized={isAuthorized} />
          <main className={s.Wrapper}>{children}</main>
          {footer && <Footer />}
          {footerLTD && (
            <footer className={s.FooterLTD}>
              2024© Poker club for gents ltd
            </footer>
          )}
          <Modals />
        </div>
      </ReactLenis>
    );
  } else {
    return (
      <div className={s.Default}>
        <Header isAuthorized={isAuthorized} />
        <main className={s.Wrapper}>{children}</main>
        {footer && <Footer />}
        {footerLTD && (
          <footer className={s.FooterLTD}>
            2024© Poker club for gents ltd
          </footer>
        )}
        <Modals />
      </div>
    );
  }
};

const Modals = () => {
  // start modal
  const dispatch = useAppDispatch();
  const { setModal } = modalSlice.actions;
  const openModal = (modal: string) => () => dispatch(setModal({ modal }));
  const closeModal = () => dispatch(setModal({ modal: "" }));

  const openLogin = () => {
    closeModal();
    setTimeout(openModal("ModalLogin"), 0);
  };
  const openRegistration = () => {
    closeModal();
    setTimeout(openModal("ModalRegistration"), 0);
  };

  const openRecovery = () => {
    closeModal();
    setTimeout(openModal("ModalRecovery"), 0);
  };

  const openCodeFromMail = () => {
    closeModal();
    setTimeout(openModal("ModalCodeFromMail"), 0);
  };

  const openNewPassword = () => {
    closeModal();
    setTimeout(openModal("ModalNewPassword"), 0);
  };

  const { counter, setCounter } = useCounter(0);
  // end modal

  return (
    <>
      <ModalLogin
        onClose={closeModal}
        openRegistration={openRegistration}
        openRecovery={openRecovery}
      />
      <ModalRegistration onClose={closeModal} openLogin={openLogin} />
      <ModalRecovery
        onClose={closeModal}
        openLogin={openLogin}
        counter={counter}
        setCounter={setCounter}
        openCodeFromMail={openCodeFromMail}
      />
      <ModalCodeFromMail
        onBack={openRecovery}
        onClose={closeModal}
        counter={counter}
        setCounter={setCounter}
        openNewPassword={openNewPassword}
      />
      <ModalNewPassword onClose={closeModal} />
    </>
  );
};

export default Default;
