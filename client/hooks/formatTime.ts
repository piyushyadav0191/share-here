import { useEffect, useState } from "react";

const useIndianTime = (time: any) => {
  const [indianTime, setIndianTime] = useState("");

  useEffect(() => {
    const convertToIndianTime = () => {
      const utcDate = new Date(time);
      const indianOffset = 5.5 * 60 * 60 * 1000; // Indian Standard Time offset in milliseconds
      const indianDate = new Date(utcDate.getTime() + indianOffset);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Kolkata",
      };

      const formattedTime = indianDate.toLocaleString("en-IN", options as any);
      setIndianTime(formattedTime);
    };

    convertToIndianTime();
  }, [time]);

  return indianTime;
};

export default useIndianTime;
