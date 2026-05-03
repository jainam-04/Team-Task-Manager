const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
      origin: "*"
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URI)
      .then(() => console.log("Database connected"))
      .catch((error) => console.log(error));

const port = process.env.PORT;

app.use("/api/auth", require("./routes/AuthRoutes.js"));
app.use("/api/users", require("./routes/UserRoutes.js"));
app.use("/api/projects", require("./routes/ProjectRoutes.js"));
app.use("/api/tasks", require("./routes/TaskRoutes.js"));

app.listen(port, () => console.log(`Server is running on: http://localhost:${port}`));