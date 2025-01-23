import React, { useEffect, useRef, useState } from "react";
import { useFullscreen, useToggle, useVideo } from "react-use";
import clsx from "clsx";

import { Icon } from "@base/index";
import { baseUrl } from "@store/api/reducer";

import { ALL_ICONS } from "@constants/icons";
import s from "./BaseVideo.module.scss";

type PropsType = {
  src: string;
  className?: string;
};

const BaseVideo = ({ src, className = "" }: PropsType) => {
  const baseFrameRef = useRef(null);

  const [showControlsPlate, setShowControlsPlate] = useState(true);
  const [mouseOnControlPlate, setMouseOnControlPlate] = useState(false);

  const [showFullscreen, toggleFullscreen] = useToggle(false);
  const isFullscreen = useFullscreen(baseFrameRef, showFullscreen, {
    onClose: () => toggleFullscreen(false),
  });

  const [video, state, controls] = useVideo(
    <video className={s.VideoFrame} src={`${baseUrl}/${src}`} />
  );

  const handleClickOnVideo = () => {
    if (state.playing) {
      return controls.pause();
    }
    if (state.paused) {
      return controls.play();
    }
  };

  const handleClickMute = () => {
    if (state.muted) {
      // controls.volume(100);
      controls.unmute();
    } else {
      // controls.volume(0);
      controls.mute();
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  };

  const [countdown, toggleCountdown] = useToggle(false);

  const progressBar = useRef<HTMLDivElement>(null);

  //клик по прогресс бару перематывает на нужное время
  // const handleClickOnBar = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) => {
  //   if (progressBar.current) {
  //     const rect = progressBar.current.getBoundingClientRect();
  //     const offsetX = event.clientX - rect.left;
  //     const percentBar = (offsetX / rect.width) * 100;
  //     const valueSeek = (percentBar / 100) * state.duration;
  //
  //     controls.seek(valueSeek);
  //   }
  // };

  const calculateValueDuration = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (progressBar.current) {
      const rect = progressBar.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentBar = (offsetX / rect.width) * 100;

      return (percentBar / 100) * state.duration;
    }

    return 0;
  };

  const [mouseDownDuration, setMouseDownDuration] = useState<boolean>(false);
  const handleMouseDownDurationBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setMouseDownDuration(true);
    const valueDuration = +calculateValueDuration(event).toFixed(0);
    controls.seek(valueDuration);
  };
  const handleMouseMoveDurationBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (mouseDownDuration) {
      const valueDuration = +calculateValueDuration(event).toFixed(0);
      controls.seek(valueDuration);
    }
  };
  const handleMouseUpDurationBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (mouseDownDuration) {
      const valueDuration = +calculateValueDuration(event).toFixed(0);
      controls.seek(valueDuration);
      setMouseDownDuration(false);
    }
  };

  const [showVolumeBar, setShowVolumeBar] = useState(false);

  //клик по волюм бару меняет громкость
  const volumeBar = useRef<HTMLDivElement>(null);

  const calculateValueVertical = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (volumeBar.current) {
      const rect = volumeBar.current.getBoundingClientRect();
      const offsetY = event.clientY - rect.bottom;
      const percentBar = Math.min(
        Math.max((offsetY / rect.height) * -100, 0),
        100
      );
      return percentBar / 100;
    }
    return 0;
  };

  // const handleClickVolumeBar = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) => {
  //   event.preventDefault();
  //   if (volumeBar.current) {
  //     console.log("click");
  //
  //     const valueVolume = calculateValueVertical(event);
  //
  //     controls.volume(valueVolume);
  //   }
  // };
  const [mouseDownVolume, setMouseDownVolume] = useState<boolean>(false);

  // Обработчик события нажатия на бар громкости
  const handleMouseDownVolumeBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setMouseDownVolume(true);
    const valueVolume = +calculateValueVertical(event).toFixed(2);
    controls.volume(valueVolume);
  };

  // Обработчик события перетаскивания бара громкости
  const handleMouseMoveVolumeBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (mouseDownVolume) {
      const valueVolume = +calculateValueVertical(event).toFixed(2);
      controls.volume(valueVolume);
    }
  };

  // Обработчик события отпускания кнопки мыши после перетаскивания бара громкости
  const handleMouseUpVolumeBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (mouseDownVolume) {
      setMouseDownVolume(false);
      const valueVolume = +calculateValueVertical(event).toFixed(2);
      controls.volume(valueVolume);
    }
  };

  // скрытие controls плашки

  const [hidePlateTimeoutId, setHidePlateTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showFullscreen && !state.paused && !mouseOnControlPlate) {
      // console.log("условие true");
      if (hidePlateTimeoutId === null) {
        // console.log("таймаут в нуль");
        const timeoutId = setTimeout(() => {
          setShowControlsPlate(false);
        }, 5000);
        setHidePlateTimeoutId(timeoutId);
        // console.log("засетили таймаут");
      }
    } else if (mouseOnControlPlate || state.paused) {
      // console.log("условие false");
      if (hidePlateTimeoutId !== null) {
        // console.log("таймаут не нуль, очищаем");
        clearTimeout(hidePlateTimeoutId);
        setHidePlateTimeoutId(null);
      }
      setShowControlsPlate(true);
      // console.log("Показываем плашку");
    }
  }, [state, mouseOnControlPlate]);

  // overlay громкости как на ютубе со скрытием

  const [hideOverlayTimeoutId, setHideOverlayTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const hideAfterTime = () => {
    if (hideOverlayTimeoutId !== null) {
      clearTimeout(hideOverlayTimeoutId);
      setHideOverlayTimeoutId(null);
    }
    const timedId = setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
    setHideOverlayTimeoutId(timedId);
  };

  const handleKeyArrowUp = () => {
    controls.volume(state.volume + 0.05);
    controls.unmute();

    setShowOverlay(true);
    setOverlayIcon("PLAYER_VOLUME_FULL_ICON");

    hideAfterTime();
  };

  const handleKeyArrowDown = () => {
    controls.volume(state.volume - 0.05);
    controls.unmute();

    setShowOverlay(true);
    setOverlayIcon("PLAYER_VOLUME_HALF_ICON");

    hideAfterTime();
  };

  // Обработчик нажатия на клавишу
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      handleClickOnVideo();
    }
    if (event.code === "ArrowLeft") {
      controls.seek(state.time - 5);
    }
    if (event.code === "ArrowRight") {
      controls.seek(state.time + 5);
    }
    if (event.code === "KeyF") {
      toggleFullscreen();
    }
    if (event.code === "ArrowUp") {
      handleKeyArrowUp();
    }
    if (event.code === "ArrowDown") {
      handleKeyArrowDown();
    }
    if (event.code === "KeyM") {
      handleClickMute();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIcon, setOverlayIcon] = useState<
    "PLAYER_VOLUME_FULL_ICON" | "PLAYER_VOLUME_HALF_ICON"
  >("PLAYER_VOLUME_FULL_ICON");

  return (
    <>
      <div
        className={clsx({
          [s.BaseVideo]: true,
          [s.Fullscreen]: isFullscreen,
          [className]: !!className,
        })}
        onClick={(event) => {
          event.preventDefault();
          handleClickOnVideo();
        }}
        onDoubleClick={() => toggleFullscreen()}
        ref={baseFrameRef}
        onMouseEnter={() => setShowControlsPlate(true)}
        onMouseLeave={() => setShowControlsPlate(false)}
        onMouseMove={() => {
          if (!showControlsPlate) {
            // console.log("двигается?");
            setShowControlsPlate(true);
            if (hidePlateTimeoutId !== null) {
              // console.log("таймаут не нуль, очищаем");
              clearTimeout(hidePlateTimeoutId);
              setHidePlateTimeoutId(null);
            }
          }
        }}
      >
        {video}

        {state.paused && (
          <div className={s.ControlsPlayCenter}>
            <div className={s.ControlsPlayCenter__Box}>
              <Icon
                icon={ALL_ICONS.PLAY_ICON}
                viewBox={"0 0 58 58"}
                className={s.ControlsPlayCenter__Icon}
              />
            </div>
          </div>
        )}

        <div
          className={clsx({
            [s.ControlsPlate]: true,
            [s.ControlsPlateShow]: showControlsPlate,
          })}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onMouseEnter={() => setMouseOnControlPlate(true)}
          onMouseLeave={() => setMouseOnControlPlate(false)}
        >
          <div
            className={s.ProgressBar}
            // onClick={handleClickOnBar}
            onMouseDown={handleMouseDownDurationBar}
            onMouseMove={handleMouseMoveDurationBar}
            onMouseUp={handleMouseUpDurationBar}
            onMouseLeave={handleMouseUpDurationBar}
            ref={progressBar}
          >
            <div className={s.Empty}>
              {state.buffered.map((value, index) => (
                <div
                  key={index}
                  className={s.BufferedFill}
                  style={{
                    left: `${(value.start / state.duration) * 100}%`,
                    width: `${((value.end - value.start) / state.duration) * 100}%`,
                  }}
                />
              ))}

              <div
                className={s.Fill}
                style={{ width: `${(state.time / state.duration) * 100}%` }}
              />
            </div>
          </div>

          <div className={s.ControlsBot}>
            <div className={s.ControlsBot__Left}>
              <button
                className={s.ControlsButton}
                onClick={state.paused ? controls.play : controls.pause}
              >
                <Icon
                  icon={
                    state.paused
                      ? ALL_ICONS.PLAY_ICON
                      : ALL_ICONS.PLAYER_PAUSE_ICON
                  }
                  viewBox={"0 0 58 58"}
                  className={s.ControlsPlayCenter__Icon}
                />
              </button>

              <button
                className={s.ControlsButton}
                onClick={() => controls.seek(state.time - 15)}
              >
                <Icon
                  icon={ALL_ICONS.PLAYER_BACKWARDS_ICON}
                  viewBox={"0 0 32 34"}
                  className={s.ControlsPlayCenter__Icon}
                />
              </button>

              <button
                className={s.ControlsButton}
                onClick={() => controls.seek(state.time + 15)}
              >
                <Icon
                  icon={ALL_ICONS.PLAYER_FORWARDS_ICON}
                  viewBox={"0 0 32 34"}
                  className={s.ControlsPlayCenter__Icon}
                />
              </button>

              <div onClick={() => toggleCountdown()}>
                <span className={s.ControlsCountdown}>
                  {countdown
                    ? "-" + formatTime(state.duration - state.time)
                    : formatTime(state.time)}{" "}
                  / {formatTime(state.duration)}
                </span>
              </div>
            </div>

            <div className={s.ControlsBot__Right}>
              <div
                className={s.VolumeFrame}
                onMouseEnter={() => setShowVolumeBar(true)}
                onMouseLeave={() => setShowVolumeBar(false)}
              >
                <button className={s.ControlsButton} onClick={handleClickMute}>
                  <Icon
                    icon={
                      state.volume === 0 || state.muted
                        ? ALL_ICONS.PLAYER_VOLUME_MUTE_ICON
                        : state.volume <= 0.5
                          ? ALL_ICONS.PLAYER_VOLUME_HALF_ICON
                          : ALL_ICONS.PLAYER_VOLUME_FULL_ICON
                    }
                    viewBox={"0 0 24 24"}
                    className={s.ControlsPlayCenter__Icon}
                  />
                </button>

                <div
                  className={clsx({
                    [s.VolumeBarWrapper]: true,
                    [s.VolumeBarWrapper__Hide]: !showVolumeBar,
                  })}
                >
                  <div
                    className={s.VolumeBar}
                    // onClick={handleClickVolumeBar}
                    onMouseDown={handleMouseDownVolumeBar}
                    onMouseMove={handleMouseMoveVolumeBar}
                    onMouseUp={handleMouseUpVolumeBar}
                    onMouseLeave={handleMouseUpVolumeBar}
                    ref={volumeBar}
                  >
                    <div className={s.Empty}>
                      <div
                        className={s.Fill}
                        style={
                          state.muted
                            ? { height: `0%` }
                            : { height: `${state.volume * 100}%` }
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                className={s.ControlsButton}
                onClick={() => toggleFullscreen()}
              >
                <Icon
                  icon={
                    showFullscreen
                      ? ALL_ICONS.PLAYER_CLOSE_FULLSCREEN_ICON
                      : ALL_ICONS.PLAYER_OPEN_FULLSCREEN_ICON
                  }
                  viewBox={"0 0 24 24"}
                  className={s.ControlsPlayCenter__Icon}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className={clsx({
            [s.Overlay]: true,
            [s.Overlay__Show]: showOverlay,
          })}
        >
          <div className={s.Overlay__Text}>
            {Math.round(state.volume * 100)}%
          </div>

          {!state.paused ? (
            <div className={s.Overlay__Icon}>
              <Icon
                // icon={`${ALL_ICONS}.${overlayIcon}`}
                icon={`${overlayIcon}`}
                viewBox={"0 0 24 24"}
                className={s.ControlsPlayCenter__Icon}
              />
            </div>
          ) : (
            <div />
          )}

          <div />
        </div>

        {/*<div style={{*/}
        {/*  display: "block",*/}
        {/*  position: "fixed",*/}
        {/*  right: 0,*/}
        {/*  bottom: 0,*/}
        {/*  backgroundColor: "#000000",*/}
        {/*  fontSize: "10px",*/}
        {/*}}>*/}
        {/*  <pre>{JSON.stringify(state, null, 2)}</pre>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default BaseVideo;
