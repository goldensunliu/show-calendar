import React from 'react'

const fullDayWidth = 850;
const mediumDayWidth = 500;

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeekHeader = () => {
  return (
    <div className="header radial-black-bg">
      {weekDays.map((dayString) => (
        <React.Fragment key={dayString}>
          <div className="day">{dayString}</div>
          <div className="mediumDay">{dayString.substring(0, 3)}</div>
          <div className="shortDay">{dayString.substring(0, 1)}</div>
        </React.Fragment>
      ))}
      { /*language=CSS*/ }
      <style jsx>{`
          .header {
            display: flex;
            background: radial-gradient(50% 135%,#2c2c2c 0,black 100%);
            padding: 15px 0;
          }
          .day, .shortDay, .mediumDay {
              width: calc(100%/7);
              text-align: center;
              font-weight: bold;
          }
          .shortDay, .mediumDay {
            display: none;
          }
          @media screen
          and (max-width : ${fullDayWidth}px) {
            .day {
                display: none;
            }
          }
          @media screen
          and (max-width : ${fullDayWidth}px)
          and (min-width : ${mediumDayWidth}px) {
            .mediumDay {
                display: block;
            }
          }
          @media screen and (max-width: ${mediumDayWidth}px) {
              .shortDay {
                  display: block;
              }
          }
      `}</style>
    </div>
  )
};

export default WeekHeader;