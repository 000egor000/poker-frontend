import React, { ReactNode, useMemo } from "react";
import clsx from "clsx";

import { Icon } from "@base/index";
import { ALL_ICONS } from "@constants/icons";

import s from "./BaseAccordion.module.scss";

type AccordionSlaveType = {
  className?: string;
  children?: ReactNode;
};

type AccordionMasterType = AccordionSlaveType & {
  onClick: () => void;
  isOpen: boolean;
};

const AccordionContext = React.createContext({});

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components cannot be rendered outside the Accordion component"
    );
  }

  return context as {
    isOpen: boolean;
    onClick: () => void;
  };
}

const Accordion = ({
  className = "",
  children,
  onClick,
  isOpen,
}: AccordionMasterType) => {
  const contextValue = useMemo(
    () => ({
      isOpen,
      onClick,
    }),
    [isOpen, onClick]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={clsx({
          [s.Accordion]: true,
          [className]: !!className,
        })}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Header = function AccordionHeaderFunc({
  className = "",
  children,
}: AccordionSlaveType) {
  const { isOpen, onClick } = useAccordionContext();

  return (
    <div
      className={clsx({
        [s.Header]: true,
        [className]: !!className,
      })}
      onClick={onClick}
    >
      {children}
      <Icon
        viewBox="0 0 40 41"
        icon={isOpen ? ALL_ICONS.MINUS_ACCORDION : ALL_ICONS.PLUS_ACCORDION}
        className={s.PlusSvg}
      />
    </div>
  );
};

Accordion.Body = function AccordionBody({
  className = "",
  children,
}: AccordionSlaveType) {
  const { isOpen } = useAccordionContext();

  const itemRef = React.useRef<HTMLDivElement | null>(null);
  const currentHeight = itemRef.current?.scrollHeight ?? 0;

  return (
    <div
      className={clsx({
        [s.Body]: true,
        [className]: !!className,
      })}
      ref={itemRef}
      style={isOpen ? { maxHeight: currentHeight } : { maxHeight: 0 }}
    >
      {children}
    </div>
  );
};

export default Accordion;
