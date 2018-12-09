import React from 'react';
import {dividerColor} from "../util/colors";
import css from 'styled-jsx/css';
import Shows from "./Shows";
import {getDateKey} from "../util/uiUtils";

{ /*language=CSS*/ }
export const day = css`
    .day {
        width: calc(100% / 7);
        padding: 5px;
        overflow: hidden;
    }
`;

export const getPossibleBoxShadow = (firstOfTheWeek) => firstOfTheWeek ? `box-shadow: -1px 0 0 ${dividerColor};` : "";

const DayCell = ({ date, firstOfTheWeek, dateToShows }) => {
  const dayKey = getDateKey(date);
  const shows = dateToShows[dayKey];
  const isToday = getDateKey(new Date()) === getDateKey(date);
  return (
    <div className="day">
      <div className="date">
        {date.getDate()}
        { isToday ? <div className="dot"/> : null }
      </div>
      { shows ? <Shows shows={shows} date={date}/> : null }
      { /*language=CSS*/ }
      <style jsx>{`
          .date {
            margin-bottom: .25em;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .dot {
            height: .6em;
            width: .6em;
            border-radius: 50%;
            background-color: white;
          }
          .day {
              ${getPossibleBoxShadow(firstOfTheWeek)}
          }
      `}</style>
      <style jsx>{day}</style>
    </div>
  )
};

export default DayCell