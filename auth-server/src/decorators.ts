import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppRouter } from './AppRouter';
import { Methods, MetadataKeys } from './enums';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder = (method: string) =>
  (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor): void => {
  Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
  Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
}

export const get = routeBinder(Methods.Get);
export const put = routeBinder(Methods.Put);
export const post = routeBinder(Methods.Post);
export const del = routeBinder(Methods.Del);
export const patch = routeBinder(Methods.Patch);

const bodyValidators = (keys: string): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {

  if (!req.body) {
    res.status(422).send('Invalid Request, no body');
    return;
  }

  for (const key of keys) {
    if (!req.body[key]) {
      res.status(422).send(`Missing property ${key}`);
      return;
    }
  }

  next();
}

export const controller = (routePrefix: string) => (target: Function): void => {
  const router = AppRouter.getInstance();

  for (const key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
    const method: Methods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);
    const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) || [];
    const requiredBodyProps = Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) || [];

    const validator = bodyValidators(requiredBodyProps);

    if (path) {
      router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
    }
  }
}

export const use = (middleware: RequestHandler) =>
  (target: any, key: string, desc: PropertyDescriptor): void => {

  const middlewares = Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

  Reflect.defineMetadata(MetadataKeys.Middleware, [...middlewares, middleware], target, key);
};

export const bodyValidator = (...keys: string[]) =>
  (target: any, key: string, desc: PropertyDescriptor): void => {
  Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
}
