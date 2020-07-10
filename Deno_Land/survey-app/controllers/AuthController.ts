import {
  RouterContext,
  hashSync,
  compareSync,
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "../deps.ts";
import User from "../models/User.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

class AuthController {
  async login(ctx: RouterContext) {
    const { value: { email, password } } = await ctx.request.body();
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide email and password" };

      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "User email does not exist" };

      return;
    }

    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect password" };

      return;
    }

    const payload: Payload = {
      iss: user.email,
      exp: setExpiration(
        new Date().getTime() +
          parseInt(Deno.env.get("JWT_EXP_DURATION") || "0"),
      ),
    };

    const jwt = makeJwt(
      { key: Deno.env.get("JWT_SECRET_KEY") || "", header, payload },
    );

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    };
  }

  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    let user = await User.findOne({ email });

    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already in use" };
      return;
    }

    const hashedPW = hashSync(password);
    user = new User({ name, email, password: hashedPW });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
const authController = new AuthController();
export default authController;
