import {Router} from "../server/routes";
import {red, whiteBackground} from "../util/colors";


const SelectedDayShows = ({ shows, selectedDate }) => (
    <div className="container" onClick={() => {Router.pushRoute('calendar', { year : selectedDate.getFullYear(), month : selectedDate.getMonth() + 1 })}}>
      <div className="backdrop"/>
      <div className="modal paper">
        {shows.map(show => (
          <div key={show.title} className="showTitle">{show.title}</div>
        ))}
      </div>
      { /*language=CSS*/ }
      <style jsx>{`
          .showTitle {
            background-color: ${red};
            border-radius: 2px;
            padding: .25em;
            color: white;
            font-size: 16px;
            font-weight: bold;
          }
          .showTitle:not(:first-child) {
            margin-top: 5px;
          }
          .modal {
              padding: 2em;
              background-color: ${whiteBackground};
              border-radius: 4px;
              max-height: 80vh;
              margin: 2em;
              overflow-y: auto;
          }
          .container, .backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
          }
          .container {
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .backdrop {
              z-index: -1;
              background-color: rgba(0, 0, 0, 0.4);
          }
      `}</style>
    </div>
);

export default SelectedDayShows