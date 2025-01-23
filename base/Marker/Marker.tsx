import React from "react";
import Image from "next/image";
import clsx from "clsx";

import styles from "./Marker.module.scss";

type PropsType = {
  className?: string;
  src: string;
  text: string;
};

export default function Marker({
  className = "",
  src = "",
  text
}: PropsType) {
  return (
    <div className={clsx(styles.Container, className)}>
      <div className={styles.Container__Circle}>
        <Image
          width={300}
          height={300}
          quality={100}
          alt="skill image"
          src={src}
          className={styles.Container__Circle_Image}
        />
      </div>
      <p className={styles.Container__Text}>{text}</p>
    </div>
  );
}
