import React from "react";

interface TGreeting <
  TMorning extends string,
  TAfternoon extends string,
  TEvening extends string,
  TNight extends string
> {
  morning: TMorning,
  afternoon: TAfternoon,
  evening: TEvening,
  night: TNight
}

const getGreeting = <
  TMorning extends string,
  TAfternoon extends string, 
  TEvening extends string, 
  TNight extends string
>(time: number, {
  morning,
  afternoon,
  evening,
  night
}: {
  morning: TMorning,
  afternoon: TAfternoon,
  evening: TEvening,
  night: TNight
}) => {
  switch (true) {
    case time >= 5 && time < 12:
      return morning;
    case time >= 12 && time < 17:
      return afternoon;
    case time >= 17 && time < 20:
      return evening;
    case time >= 20 || time < 5:
    default:
      return night;
  }
}

export const useGreetings = <
  TMorning extends string,
  TAfternoon extends string, 
  TEvening extends string, 
  TNight extends string
>(greetings: {
  morning: TMorning,
  afternoon: TAfternoon,
  evening: TEvening,
  night: TNight
}) => {
  const [time, setTime] = React.useState(new Date().getHours());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return getGreeting(time, greetings);
}