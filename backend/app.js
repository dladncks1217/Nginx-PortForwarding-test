const express = require("express");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();
app.set("port", process.env.PORT || 8080);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버 대기중");
});
