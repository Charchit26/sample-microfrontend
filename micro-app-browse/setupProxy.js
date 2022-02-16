// This is used to enable CORS during `npm start` or when you are running development mode
// To enable CORS for production builds i.e. after `npm run build` we need to enable CORS on the web server itself
module.exports = app => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
};