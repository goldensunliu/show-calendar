import React from 'react';
import {day, getPossibleBoxShadow} from "./DayCell";

const EmptyCell = ({ firstOfTheWeek }) => (
  <div className="day">
      { /*language=CSS*/ }
      <style jsx>{`
          .day {
              ${getPossibleBoxShadow(firstOfTheWeek)}
          }
      `}</style>
      <style jsx>{day}</style>
  </div>
);

export default EmptyCell;