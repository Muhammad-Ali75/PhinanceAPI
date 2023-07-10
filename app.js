import express from "express";
import cors from "cors";
import user from "./src/routes/user.js";
import budget from "./src/routes/budget.js";
import expense from "./src/routes/expense.js";
import dbConnect from "./src/middleware/dbConnect.js";

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
