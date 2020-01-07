import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from '../decorators';


interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log('REQUEST!');
  next();
}

@controller('/auth')
export class LoginController {

  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;

    if (email === 'poop@aol.com' && password === 'p') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }

}


