import { useEffect, useState } from "react";

const Timer = ({ arrivalTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const arrival = new Date(arrivalTime);
      const diff = arrival - now;

      if (diff <= 0) {
        const delay = Math.abs(diff);
        const mins = Math.floor(delay / 60000);
        const secs = Math.floor((delay % 60000) / 1000);
        setTimeLeft(`Delayed by ${mins}m ${secs}s`);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}m ${secs}s remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [arrivalTime]);

  return <div className="text-sm">{timeLeft}</div>;
};

export default Timer;
