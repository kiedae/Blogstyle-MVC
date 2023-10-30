const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();
const sqlizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3000;
const path = require('path');
const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers: require('./utils/helpers') });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: 'secret',
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new sqlizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


const htmlRoutes = require('./controllers');

app.use(htmlRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});