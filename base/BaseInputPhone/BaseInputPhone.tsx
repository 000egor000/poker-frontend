import React, { forwardRef, HTMLProps, useState } from "react";
import { CountryFlag, PhoneInput } from "react-phone-input-beautify";
import clsx from "clsx";

import s from "./BaseInputPhone.module.scss";

type FormPhoneInputProps = {
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  value?: string | undefined;
} & Omit<HTMLProps<HTMLInputElement>, "value">;

const BaseInputPhone = forwardRef(
  (props: FormPhoneInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { onChange, name, error, disabled } = props;
    const [country, setCountry] = useState("US");
    const [search, setSearch] = useState("");

    return (
      <PhoneInput.Root
        className={clsx({
          [s.PhoneInput]: true,
          [s.Error]: error,
          [s.Disabled]: disabled,
        })}
        initialPhoneNumber={props.value}
        onCountryChange={(newCountry) => {
          setCountry(newCountry);
        }}
      >
        {({ countryList, open, phone, country }) => {
          return (
            <>
              {/*<div style={{width:"10px", height:"10px", backgroundColor: "red"}} ref={test}></div>*/}
              <PhoneInput.Trigger
                className={clsx({
                  [s.Trigger]: true,
                  [s.DisabledTrigger]: disabled,
                })}
              >
                <CountryFlag
                  className={s.CountryFlag}
                  country={country}
                  type="svg"
                />

                <ChevronSVG
                  className={s.Flag__Chevron}
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </PhoneInput.Trigger>

              <PhoneInput.Dialog
                className={s.Dialog}
                onOpenChange={() => {
                  setSearch("");
                }}
              >
                <>
                  <div className={s.Search}>
                    <LoupeSVG
                      className={clsx({
                        [s.SearchIcon]: true,
                      })}
                    />

                    {open && (
                      <input
                        onChange={(e) => setSearch(e.target.value)}
                        className={s.SearchInput}
                        placeholder="Search"
                        value={search}
                        autoFocus={true}
                      />
                    )}
                  </div>
                  <ul className={s.CountryList}>
                    {countryList
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((item) => (
                        <PhoneInput.Item
                          className={s.CountryItem}
                          country={item.alpha2}
                          data-value={item.alpha2}
                          key={item.alpha2}
                        >
                          <CountryFlag
                            className={s.CountryItem__Flag}
                            country={item.alpha2}
                            type="svg"
                          />
                          <span className={s.CountryItem__Label}>
                            {item.name}
                          </span>
                        </PhoneInput.Item>
                      ))}
                  </ul>
                </>
              </PhoneInput.Dialog>

              <PhoneInput.NumberInput
                placeholder={"Phone"}
                className={s.NumberInput}
                {...props}
                value={phone}
                name={name}
                onChange={onChange}
                ref={ref}
              />
            </>
          );
        }}
      </PhoneInput.Root>
    );
  }
);

BaseInputPhone.displayName = "InputPhone";

const ChevronSVG = ({ className, style }: SVGProps) => {
  // need add to svg -> className={className}
  // need add to svg -> style={style}
  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="21"
      viewBox="0 0 24 21"
      fill="none"
    >
      <path
        d="M19.5 7.375L12 13.625L4.5 7.375"
        stroke="white"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface SVGProps {
  className?: string;
  style?: React.CSSProperties;
}

const LoupeSVG = ({ className, style }: SVGProps) => {
  // need add to svg -> className={className}
  // need add to svg -> style={style}
  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.5 17.5L13.1694 13.1694M13.1694 13.1694C14.3004 12.0384 15 10.4759 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C10.4759 15 12.0384 14.3004 13.1694 13.1694Z"
        stroke="#808BA6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BaseInputPhone;
