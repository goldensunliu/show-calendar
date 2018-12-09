import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-fetch';

import WeekHeader from "../components/WeekHeader";
import MonthNav from "../components/MonthNav";
import DayCell from "../components/DayCell";
import EmptyCell from "../components/EmptyCell";
import WeekRow from "../components/WeekRow";
import redirectToThisMonth from "../util/redirectToThisMonth";
import SelectedDayShows from "../components/SelectedDayShows";
import {whiteBackground} from "../util/colors";
import {getDateKey} from "../util/uiUtils";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { month } = this.props;
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1, 0);
    // the first sunday on the calendar
    const dayRef = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    const lastDayOfTheMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const lastDay = new Date(month.getFullYear(), month.getMonth(), 6 - lastDayOfTheMonth.getDay() + lastDayOfTheMonth.getDate());
    const numOfWeeks = Math.ceil((lastDay - dayRef) / (60 * 60 * 24 * 1000 * 7));
    let cells = [];
    const rows = [];
    while(dayRef <= lastDay) {
      if (dayRef > lastDayOfTheMonth || dayRef < firstDayOfMonth) {
        cells.push(<EmptyCell key={dayRef.toISOString()} firstOfTheWeek={cells.length > 0}/>)
      } else {
        cells.push(
          <DayCell key={dayRef.toISOString()} date={new Date(dayRef)} firstOfTheWeek={cells.length > 0} dateToShows={this.props.dateToShows}/>
        );
      }
      if (dayRef.getDay() === 6) {
        rows.push(
          <WeekRow key={dayRef.toISOString()} numOfWeeks={numOfWeeks} isLastRow={dayRef.getTime() === lastDay.getTime()}>
            {cells}
          </WeekRow>
        );
        cells = [];
      }
      dayRef.setDate(dayRef.getDate() + 1);
    }

    return (
      <div className="paper radial-black-bg">
        <WeekHeader/>
        {rows}
        { /*language=CSS*/ }
        <style jsx>{`
            div {
                display: flex;
                height: 100%;
                width: 100%;
                flex-direction: column;
                color: white;
                border-radius: 20px;
                overflow: hidden;
            }
        `}</style>
      </div>
    )
  }
}

const transformEventsResponse = function({ data }) {
  const dateToShows = {};
  data.forEach((show) => {
    const { id, launch_date, title } = show;
    const launchDate = new Date(launch_date);
    const dateKey = getDateKey(launchDate);
    if (!dateToShows[dateKey]) dateToShows[dateKey] = [];
    dateToShows[dateKey].push({ id, title });
  });
  return dateToShows;
};

class Index extends React.Component {
  static async getInitialProps({ query: { month, year }, req, res}) {
    const date = new Date(year, month);
    if (isNaN(date)) {
      redirectToThisMonth(res)
      return;
    }
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const dataResponse = await fetch(baseUrl + '/static/events.json');
    if (!dataResponse.ok) return { dateToShows: {} };
    const json = await dataResponse.json();
    return { dateToShows: transformEventsResponse(json) };
  }

  renderSelectedDayShows() {
    const { query: { month, year, date }} = this.props.url;
    const selectedDate = new Date(year, month-1, date);
    const shows = this.props.dateToShows[getDateKey(selectedDate)];
    if (!shows) return;
    return <SelectedDayShows shows={shows} selectedDate={selectedDate}/>
  }

  render() {
    const { query: { month, year, date }} = this.props.url;
    const monthDate = new Date(year, month-1);
    return (
    <div className="page">
        <Head>
          <title>Show Calendar</title>
          <meta name="description" content="Show Calendar"/>
          <link rel="shortcut icon" href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"/>
          <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <div className="nav">
          <MonthNav month={monthDate}/>
        </div>
        <div className="wrapper">
          <Calendar month={monthDate} dateToShows={this.props.dateToShows}/>
          {date ? this.renderSelectedDayShows() : null }
        </div>
        { /*language=CSS*/ }
        <style jsx>{`
            .page {
                height: 100vh;
                width: 100vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3em;
                box-sizing: border-box;
                background-color: ${whiteBackground};
            }
            .nav {
                margin-bottom: .4em;
                max-width: 100%;
            }
            .nav :global(svg) {
                fill: white;
                height: 1.5em;
            }
            .wrapper {
                flex: 1;
                width: 100%;
                max-height: 1200px;
                max-width: 1200px;
                box-sizing: border-box;
            }
            @media screen and (max-width: 600px), screen and (max-height: 600px){
                .page {
                    padding: 1em;
                }
            }
        `}</style>
        { /*language=CSS*/ }
        <style jsx global>{`
            body {
                margin: 0;
                font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
            }
            .paper {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            }
            .radial-black-bg {
                background: radial-gradient(50% 135%,#2c2c2c 0,#161616 100%);
            }
        `}</style>
      </div>
    )
  }
}
export default Index