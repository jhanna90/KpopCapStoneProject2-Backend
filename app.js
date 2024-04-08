// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const { NotFoundError } = require("./expressError");

// app.use(bodyParser.json());

// // Routes
// app.use('/', routes);

// /** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError());
// });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//     if (process.env.NODE_ENV !== "test") console.error(err.stack);
//     const status = err.status || 500;
//     const message = err.message;

//     return res.status(status).json({
//         error: { message, status },
//     });
// });

// module.exports = app;

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const { NotFoundError } = require("./expressError");
// app.use(bodyParser.json());


// // Import route files
// const idolRoutes = require('./routes/idolRoutes');
// const groupRoutes = require('./routes/groupRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const userRoutes = require('./routes/userRoutes');

// // Mount route files
// app.use('/api/idols', idolRoutes);
// app.use('/api/idols/:name', idolRoutes);
// app.use('/api/boy-groups', groupRoutes);
// app.use('/api/girl-groups', groupRoutes);
// app.use('/api/boy-groups/:name', groupRoutes);
// app.use('/api/girl-groups/:name', groupRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/videos/:searchTerm', videoRoutes);
// app.use('/api/register', userRoutes);
// app.use('/api/login', userRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/users/:userId', userRoutes);
// app.use('/api/delete', userRoutes);

// /** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError());
// });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//     if (process.env.NODE_ENV !== "test") console.error(err.stack);
//     const status = err.status || 500;
//     const message = err.message;

//     return res.status(status).json({
//         error: { message, status },
//     });
// });

// module.exports = app;
const cors = require("cors");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { NotFoundError } = require("./expressError");
app.use(cors());
app.use(bodyParser.json());

// Import route files
const idolRoutes = require('./routes/idolRoutes');
const groupRoutes = require('./routes/groupRoutes');
const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');

// Idol routes
app.get('/api/idols', idolRoutes);
app.get('/api/idols/:name', idolRoutes);
app.post('/api/idols/', idolRoutes);
app.patch('/api/idols/:name', idolRoutes);

// Group routes
app.get('/api/boy-groups', groupRoutes);
app.get('/api/girl-groups', groupRoutes);
app.get('/api/boy-groups/:name', groupRoutes);
app.get('/api/girl-groups/:name', groupRoutes);
app.get('/api/groups', groupRoutes);
app.get('/api/groups/:name', groupRoutes);
app.post('/api/groups', groupRoutes);
app.patch('/api/groups/:name', groupRoutes);

// Video routes
app.get('/api/videos', videoRoutes);
app.post('/api/videos', videoRoutes);
app.get('/api/videos/:searchTerm', videoRoutes);

// User routes
app.post('/api/register', userRoutes);
app.post('/api/login', userRoutes);
app.get('/api/users', userRoutes);
app.get('/api/users/:userId', userRoutes);
app.patch('/api/users/:userId', userRoutes);
app.delete('/api/users/:userId', userRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
