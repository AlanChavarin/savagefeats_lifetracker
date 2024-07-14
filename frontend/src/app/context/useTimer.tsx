import { useEffect, useState } from "react";

const calculateProperTime = (time: number) => {
  const minutes = Math.floor(time / 60) 
  const seconds = (time % 60 > 9) ? time % 60 : `0${time % 60}`
  return `${minutes}:${seconds}`
}

const useTimer = () => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(0)
    const [properTime, setProperTime] = useState('0:00')
    const [pause, setPause] = useState(false)

    useEffect(() => {
      console.log('from useTimer: pause value is:' + pause)
    }, [pause])
  
    useEffect(() => {
      // exit early when we reach 0
      setProperTime(calculateProperTime(timeLeft))
      if (!timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        // console.log("from useTimer: pause: " + pause)
        if(!pause){
          setTimeLeft(timeLeft - 1);
        }
        
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft, pause]);
  
    return {timeLeft, setTimeLeft, properTime, pause, setPause}
  };

  export default useTimer