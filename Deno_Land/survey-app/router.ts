import {
  Router,
  RouterContext,
} from "./deps.ts";

import authController from "./controllers/AuthController.ts";
import surveyController from './controllers/SurveyController.ts';

const router = new Router();

router
  .get("/", (ctx: RouterContext) => { ctx.response.body = "BEEP BOOP"; })
  // Users
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Surveys
  .get("/api/survey", surveyController.getAllForUser)
  .get("/api/survey/:id", surveyController.getSingle)
  .post("/api/survey", surveyController.create)
  .put("/api/survey/:id", surveyController.update)
  .delete("/api/survey/:id", surveyController.delete)


export default router;
