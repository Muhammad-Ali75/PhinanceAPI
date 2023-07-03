const express = require("express");
const cors = require("cors");
const user = require("./src/routes/user");
const budget = require("./src/routes/budget");
const expense = require("./src/routes/expense");
const dbConnect = require("./src/middleware/dbConnect");

dbConnect();
const app = express();
app.use(cors());

app.use(express.json());

//Routes
app.use("/api/user", user);
app.use("/api/budget", budget);
app.use("/api/expense", expense);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
