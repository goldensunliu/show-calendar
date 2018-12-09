const routes = require('next-routes');


module.exports = routes()
.add('calendar', '/calendar/:year/:month/:date?', 'calendar');