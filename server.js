import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import SequelizeStore from 'connect-session-sequelize';
import AuthRoute from './routes/AuthRoute.js';
import UserRouter from './routes/UserRouter.js';
import ReportRoute from './routes/ReportRoute.js';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(UserRouter);
app.use(ReportRoute);
app.use(AuthRoute);

// store.sync();

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', '*');
});

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running...');
});
