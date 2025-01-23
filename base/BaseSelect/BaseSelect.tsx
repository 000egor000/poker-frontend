import React, { SyntheticEvent, useRef, useState } from "react";
import clsx from "clsx";

import { useCloseByOutsideClick } from "@hooks/useCloseByOutsideClick";
import { Icon } from "@base/index";

import { ALL_ICONS } from "@constants/icons";
import s from "./BaseSelect.module.scss";

export type SelectProps = {
  value: SelectItem | null;
  onChange: (value: SelectItem) => void;
  options?: SelectItem[];
  className?: string;
}

export type SelectItem = {
  id: number,
  title: string,
  description: string,
  price: number
};


const BaseSelect = ({ value, onChange, options, className = "" }: SelectProps) => {
  console.log("value ==", value);

  const selectContainerRef = useRef(null);
  const [isExpanded, setExpanded] = useState(false);

  const toggle = (event: SyntheticEvent) => {
    event.preventDefault();
    setExpanded(!isExpanded);
  };

  const onChangeHandler = (option: SelectItem) => {
    onChange && onChange(option);
    setExpanded(false);
  };

  const clickOutsideHandler = () => {
    setExpanded(false);
  };

  useCloseByOutsideClick(selectContainerRef, clickOutsideHandler);

  return (
    <div className={clsx({
      [s.Select]: true,
      [className]: !!className
    })} ref={selectContainerRef}>
      <div onClick={toggle} className={s.SelectHeader}>
        {value ?
          <span>{value.title}</span>
          :
          <span>
            Select product type
          </span>
        }
        <Icon className={clsx({
          [s.Icon]: true,
          [s.Icon__open]: isExpanded,
        })} icon={ALL_ICONS.UP_ARROW} viewBox={"0 0 21 21"} />
      </div>
      {isExpanded &&
        <div className={s.SelectBody}>
          <ul className={s.List}>
            {options && options?.length > 0 ? (
              options?.map((option: SelectItem) => (
                <li key={option.id} className={s.Item} onClick={() => onChangeHandler(option)}>
              <span className={s.Item__Title}>
                {option.title} – ${option.price}
              </span>
                  <span className={s.Item__Description}>
                {option.description}
              </span>
                </li>
              ))
            ) : (
              <span className={s.Empty}>Nothing found</span>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default BaseSelect;
