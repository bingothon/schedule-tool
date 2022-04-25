const dotenv = require('dotenv');
const express = require('express');

// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

const app = express();

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();
