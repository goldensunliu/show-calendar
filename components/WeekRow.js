import React from 'react';
import {dividerColor} from "../util/colors";

const WeekRow = ({ isLastRow, children, numOfWeeks }) => {
  return (
      <div className="row">
        {children}
        { /*language=CSS*/ }
        <style jsx>{`
            .row {
                display: flex;
                height: calc(100%/${numOfWeeks});
                width: 100%;
                ${!isLastRow ? `box-shadow: inset 0 -1px 0 ${dividerColor};` : ""}
            }
        `}</style>
      </div>
  )
};

export default WeekRow;