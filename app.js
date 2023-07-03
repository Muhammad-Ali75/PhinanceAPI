const express = require("express");
const cors = require("cors");
const user = require("./src/routes/user");
const dbConnect = require("./src/middleware/dbConnect");

dbConnect();
const app = express();
app.use(cors());

app.use(express.json());

//Routes
app.use("/api/user", user);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
