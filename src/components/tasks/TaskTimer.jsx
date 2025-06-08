import { useEffect, useState } from "react";

const TaskTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const end = new Date(deadline);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("⏰ Час вичерпано");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`Залишилось: ${days}д ${hours}г ${minutes}хв`);
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [deadline]);

  return <p className="task-timer">{timeLeft}</p>;
};

export default TaskTimer;
