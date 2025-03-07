"use client";

import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex translate-x-[5px] items-center gap-3 sm:gap-6">
      {Object.entries(timeLeft).map(([key, value], index) => (
        <React.Fragment key={key}>
          <div className="flex flex-col items-center">
            <span className="text-black-100 text-xl font-semibold sm:text-2xl md:text-3xl">
              {value.toString().padStart(2, "0")}
            </span>
            <span className="text-black-40 text-xs capitalize sm:text-sm">
              {key}
            </span>
          </div>
          {index < 3 && (
            <span className="text-black-20 mb-6 text-xl font-semibold sm:text-2xl md:text-3xl">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
