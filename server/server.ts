import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { auth } from "express-openid-connect";
import { connectToDatabase } from "./src/db/database";
import { itemRouter } from "./src/routes/item.routes";
import { taskRouter } from "./src/routes/task.routes";
import { userRouter } from "./src/routes/user.routes";
import { reminderRouter } from "./src/routes/reminder.routes";

// load env variables
dotenv.config();

const uri = process.env.DB_CONN_STRING;
const { AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_BASE_URL } =
  process.env;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL,
};

if (!uri) {
  console.log("No env variable found");
  process.exit(1);
}

connectToDatabase(uri)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(auth(config));
    app.use("/groceries", itemRouter);
    app.use("/tasks", taskRouter);
    app.use("/reminders", reminderRouter);
    app.use("/users", userRouter);
    app.get("/", (req, res) => {
      res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
    });
    app.use((error: any, req: any, res: any, next: any) => {
      console.error("SERVER ERROR: ", error);
      if (res.statusCode < 400) res.status(500);
      res.send({
        error: error.message,
        name: error.name,
        message: error.message,
      });
    });
    app.listen(5200, () => {
      console.log("Server running at http://localhost:5200");
    });
  })
  .catch((error) => console.error({ error: error.message }));
