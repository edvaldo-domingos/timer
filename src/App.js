import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newDateTime, setNewDateTime] = useState(null);
  const [timer, setTimer] = useState("00:00:00");

  const timeRef = useRef(null);

  const getTimeLeft = (datetime) => {
    const total = Date.parse(datetime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const setNewTime = (datetime) => {
    let { total, hours, minutes, seconds } = getTimeLeft(datetime);

    if (total >= 0) {
      const newHours = hours > 9 ? hours : "0" + hours;
      const newMinutes = minutes > 9 ? minutes : "0" + minutes;
      const newSeconds = seconds > 9 ? seconds : "0" + seconds;
      const time = `${newHours}:${newMinutes}:${newSeconds}`;

      setTimer(time);
    } else {
      resetTimer();
    }
  };

  const getCurrentDate = () => {
    let currentDate = new Date();

    return currentDate;
  };

  const clearTime = (datetime) => {
    // setTimer("00:00:00");
    // if (timeRef.current) {
    //   clearInterval(timeRef.current);
    // }
    // const newIntervalId = setInterval(() => {
    //   setNewTime(datetime);
    // }, 1000);
    // timeRef.current = newIntervalId;
  };

  const handleChangeMinute = (newMinutes) => {
    const currentDate = getCurrentDate();

    currentDate.setSeconds(currentDate.getSeconds());
    currentDate.setMinutes(currentDate.getMinutes() + newMinutes);

    setNewDateTime(currentDate);
    setNewTime(currentDate);

    // const newIntervalId = setInterval(() => {
    //   setNewTime(currentDate);
    // }, 1000);

    // timeRef.current = newIntervalId;
  };

  const onStart = () => {
    if (newDateTime) {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }

      const newIntervalId = setInterval(() => {
        setNewTime(newDateTime);
      }, 1000);

      timeRef.current = newIntervalId;
    }
  };

  const resetTimer = () => {
    setTimer("00:00:00");
    setNewDateTime(null);

    if (timeRef.current) {
      clearInterval(timeRef.current);
    }

    timeRef.current = null;
  };

  const onPause = () => {
    // wi irei terminar isso mais logo
    // const timeAsAnArray = timer.split(":");
    // const currentTimerMinutes = Number(timeAsAnArray[1]);
    // const currentTimerSeconds = Number(timeAsAnArray[2]);
    // const currentDateTime = getCurrentDate();
    // currentDateTime.setSeconds(currentTimerSeconds);
    // currentDateTime.setMinutes(currentTimerMinutes);
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    clearTime(currentDate);
  }, []);

  return (
    <div className="App">
      <div>{timer}</div>
      <div>
        <button onClick={() => handleChangeMinute(1)}>1 Min</button>
        <button onClick={() => handleChangeMinute(5)}>5 Min</button>
        <button onClick={() => handleChangeMinute(10)}>10 Min</button>
      </div>
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={resetTimer}>Stop</button>
    </div>
  );
}

export default App;
