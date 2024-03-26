import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import router from './routes/mainRouter';

/*// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});*/

const app = express();

app.use(cors());
app.use(
    session({
        secret: 'abc',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);
app.use(bodyParser.json());

app.use('/api/', router);

// make server listen on some port
((port = process.env.APP_PORT || 8000) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();
