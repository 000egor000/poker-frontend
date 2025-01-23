import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";

import { baseUrl } from "@store/api/reducer";

import s from "./BaseImage.module.scss";

type PropsType = ImageProps & {
  className?: string;
  onClick?: () => void;
};

const BaseImage = ({ className = "", src, alt, width = 200, height = 200, onClick, quality }: PropsType) => {
  const [imgSrc, setImgSrc] = useState(`${baseUrl}/${src}`);
  const [imgAlt] = useState(`${baseUrl}/${alt}`);

  return (
    <Image
      className={clsx({
        [s.BaseImage]: true,
        [className]: !!className,
      })}
      onClick={onClick}
      width={width}
      height={height}
      quality={quality}
      src={imgSrc}
      alt={imgAlt}
      onError={() => {
        setImgSrc("/preview.png");
      }}
    />
  );
};

export default BaseImage;
