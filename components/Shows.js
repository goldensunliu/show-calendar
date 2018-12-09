import React from 'react';

import {Link} from '../server/routes'
import {red} from "../util/colors";

const Shows = ({ shows, date }) => {
  return (
    <Link route='calendar' params={{year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate()}}>
      <a>
        {shows.map(show => (
          <div className="showTitle" key={show.title}>{show.title}</div>
        ))}
        { /*language=CSS*/ }
        <style jsx>{`
            .showTitle {
              overflow: hidden;
              white-space: nowrap;
              background-color: ${red};
              border-radius: 2px;
              padding: 1px 2px;
              font-size: 12px;
              font-weight: bold;
              cursor: pointer;
            }
            .showTitle:not(:first-child) {
              margin-top: 2px;
            }
            a {
              color: white;
              text-decoration: none;
            }
        `}</style>
      </a>
    </Link>
  )
};

export default Shows;