import {
  RouterContext
} from "../deps.ts";

class SurveyController {
  async getAllForUser(ctx: RouterContext) {
    ctx.response.body = [];
  }

  async getSingle(ctx: RouterContext) {

  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();
  }

  async update(ctx: RouterContext) {

  }

  async delete(ctx: RouterContext) {

  }
}

const surveyController = new SurveyController();
export default surveyController;
