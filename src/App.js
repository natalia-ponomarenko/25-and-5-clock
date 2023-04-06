import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import classnames from 'classnames';

export const App = () => {
  const [step, setStep] = useState(5);
  const [duration, setDuration] = useState(25);
  const [remainingTime, setRemainingTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const audioFile = useRef(null);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (remainingTime === 0) {
      audioFile.current.play();
      audioFile.current.currentTime = 0;

      setRemainingTime(isBreak ? duration * 60 : step * 60);
      setIsBreak(isBreak ? false : true);
    }
  }, [
    step,
    duration,
    remainingTime,
    isBreak,
    isRunning,
  ]);

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleStepIncrement = () => {
    if (step < 60) {
      setStep((prevState) => prevState + 1);
    }
  };

  const handleStepDecrement = () => {
    if (step > 1) {
      setStep((prevState) => prevState - 1);
    }
  };

  const handleDurationIncrement = () => {
    if (duration < 60) {
      setDuration((prevState) => prevState + 1);
      const newInitialTime = (duration + 1) * 60;
      setRemainingTime(newInitialTime);
    }
  };

  const handleDurationDecrement = () => {
    if (duration > 1) {
      setDuration((prevState) => prevState - 1);
      const newInitialTime = (duration - 1) * 60;
      setRemainingTime(newInitialTime);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime - minutes * 60;
    const formattedSeconds =
      seconds
        .toString()
        .padStart(2, "0");
    const formattedMinutes =
      minutes
        .toString()
        .padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleReset = () => {
    setDuration(25);
    setStep(5);
    setRemainingTime(1500);
    setIsBreak(false);
    setIsRunning(false);
    audioFile.current.load();
  };

  return (
    <div className="vh-100 d-flex align-items-center">
    <div className="container-sm d-flex flex-column justify-content-center align-items-center">
      <h1 className="h1 mb-4 text-primary">25 + 5 Clock</h1>
      <div className="d-flex w-75 justify-content-center mb-4">
        <div className="length d-flex flex-column align-items-center">
          <div id="break-label" className="mb-2 text-center h6">Break Length</div>
          <div className="d-flex">
            <button
              id="break-decrement"
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleStepDecrement}
              disabled={isRunning}
            >
              -
            </button>
            <div id="break-length" className="h4 mb-0">{step}</div>
            <button
              id="break-increment"
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={handleStepIncrement}
              disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
        <div className="length d-flex flex-column align-items-center">
          <div id="session-label" className="mb-2 text-center h6">Session Length</div>
          <div className="d-flex">
            <button
              id="session-decrement"
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleDurationDecrement}
              disabled={isRunning}
            >
              -
            </button>
            <div id="session-length" className="h4 mb-0">{duration}</div>
            <button
              id="session-increment"
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={handleDurationIncrement}
              disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="border border-primary border-4 rounded text-center px-3 py-1">
      <div id="timer-label" className="h4 mb-2">{isBreak ? "Break" : "Session"}</div>
        <div
          id="time-left"
          className={classnames("display-1 m-2", {
            'text-danger': isBreak
          })}>
          {formatTime()}
        </div>
      </div>
      <div className="button-group d-flex">
        <button
          id="start_stop"
          className="btn btn-primary btn-md btn-floating"
          onClick={handleTimerToggle}
        >
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button
          id="reset"
          className="btn btn-primary btn-md btn-floating me-4"
          onClick={handleReset}
        >
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      
    </div>
    <audio
      id="beep"
      preload="auto"
      ref={audioFile}
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
  </div>
  );
};
