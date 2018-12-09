import React from 'react'
import {Link} from '../server/routes'
import LeftArrow from '../svgs/left-arrow.svg'
import RightArrow from '../svgs/right-arrow.svg'

const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MonthNav = ({ month }) => {
  const lastMonth = new Date(month);
  lastMonth.setMonth(month.getMonth() - 1);
  const nextMonth = new Date(month);
  nextMonth.setMonth(month.getMonth() + 1);
  return (
        <div className="nav paper radial-black-bg">
          <Link route='calendar' params={{year: lastMonth.getFullYear(), month: lastMonth.getMonth() + 1}}>
            <a>
              <LeftArrow/>
            </a>
          </Link>
          <div className="month">
            {`${monthStrings[month.getMonth()]} ${month.getFullYear()}`}
          </div>
          <Link route='calendar' params={{year: nextMonth.getFullYear(), month: nextMonth.getMonth() + 1}}>
            <a>
              <RightArrow/>
            </a>
          </Link>
          { /*language=CSS*/ }
          <style jsx>{`
              .nav {
                  font-size: 24px;
                  font-weight: bold;
                  color: white;
                  border-radius: 4px;
                  width: 100%;
                  box-sizing: border-box;
                  padding: .5em;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              .nav :global(a) {
                height: 1.5em;
              }
              .nav :global(svg) {
                  fill: white;
              }
              .month {
                width: 200px;
                text-align: center;
              }
          `}</style>
        </div>
  )
};

export default MonthNav