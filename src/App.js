// import './App.css';
import React, { useState, useEffect } from "react";

export const App = () => {
  const [step, setStep] = useState(5);
  const [duration, setDuration] = useState(25);
  const [remainingTime, setRemainingTime] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    // Stop the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // Update the remaining time every second
    const newTimerId = setInterval(() => {
      setRemainingTime((prevState) => prevState - 1);
    }, 1000);

    setTimerId(newTimerId);

    if (remainingTime === 0) {
      clearInterval(newTimerId);
      setIsRunning(false);
    }

    // Stop the timer if the duration changes
    if (remainingTime === duration) {
      clearInterval(newTimerId);
      setTimerId(null);
      setIsRunning(false);
    }

    // Stop the timer if the component unmounts
    return () => clearInterval(newTimerId);
  }, [remainingTime, duration]);

  const handleStepIncrement = () => {
    if (step >= 60) {
      return;
    }
    setStep((prevState) => prevState + 1);
  };

  const handleStepDecrement = () => {
    if (step <= 1) {
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  const handleTimerToggle = () => {
    if (isRunning) {
      // Stop the timer
      clearInterval(timerId);
      setTimerId(null);
      setIsRunning(false);
    } else {
      // Start the timer
      const newTimerId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(newTimerId);
      setIsRunning(true);
    }
  };

  const handleDurationIncrement = () => {
    // Stop the timer
    clearInterval(timerId);
    setTimerId(null);
    setIsRunning(false);

    // Update the duration and remaining time
    if (duration >= 60) {
      return;
    }
    setDuration((prevState) => prevState + 1);
    setRemainingTime(duration * 60 + 60);
  };

  const handleDurationDecrement = () => {
    // Stop the timer
    clearInterval(timerId);
    setTimerId(null);
    setIsRunning(false);

    // Update the duration and remaining time
    if (duration <= 1) {
      return;
    }
    setDuration((prevState) => prevState - 1);
    setRemainingTime(duration * 60 + 60);
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeFormat = `${minutes.toString().padStart(2, "0")}
      :
    ${seconds.toString().padStart(2, "0")}`;

  console.log(isRunning);

  return (
    <div className="App">
      <div className="container-sm d-flex flex-column  justify-content-center align-items-center">
        <h1>25 + 5 clock</h1>
        <div className="d-flex w-50 justify-content-between">
          <div className="d-flex flex-column">
            <div id="break-label">Break Length</div>

            <div className="d-flex">
              <button id="break-decrement" onClick={handleStepDecrement}>
                -
              </button>
              <div id="break-length">{step}</div>
              <button id="break-increment" onClick={handleStepIncrement}>
                +
              </button>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div id="session-label">Session Length</div>
            <div className="d-flex">
              <button id="session-decrement" onClick={handleDurationDecrement}>
                -
              </button>
              <div id="session-length">{duration}</div>
              <button id="session-increment" onClick={handleDurationIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
        <div id="timer-label">Session</div>
        <div id="time-left">{timeFormat}</div>
        <button id="reset">
          <i className="fa fa-refresh fa-2x"></i>
        </button>
        <button id="start_stop" onClick={handleTimerToggle}>
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
      </div>
    </div>
  );
};
