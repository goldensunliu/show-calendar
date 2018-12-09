import Router from "next/router";


const redirectToThisMonth = (res) =>{
    const today = new Date();
    const calendarToday = `/calendar/${today.getFullYear()}/${today.getMonth()+1}`;
    if (res) {
      res.redirect(calendarToday)
    } else {
      Router.replace(calendarToday)
    }
};

export default redirectToThisMonth;