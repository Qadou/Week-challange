const express = require("express");
const router = require("./routes/postRoutes");
const app = express();
const port = 8080;
const { loggingMiddleware, errorHandlingMiddleware } = require('./middlewares');

app.use(express.json());

app.use(loggingMiddleware);
app.use("/", router);

// app.get('/test-error', (req, res, next) => {
//   const error = new Error('Test error');
//   next(error);
// });

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});