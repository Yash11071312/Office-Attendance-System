import { useEffect, useState } from "react";

function LiveClock() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const interval = setInterval(() => {

      setTime(new Date());

    },1000);

    return ()=>clearInterval(interval);

  },[]);

  return (

    <h2>

      {time.toLocaleDateString()}

      {" • "}

      {time.toLocaleTimeString()}

    </h2>

  );

}

export default LiveClock;