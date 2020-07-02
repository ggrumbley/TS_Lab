// $ deno run --allow-read --allow-env --unstable index.ts
import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);
const moment = require('moment');
const _ = require('lodash');

console.log(moment().format('MMMM Do YYYY'));
console.log(_.defaults({ a: 1}, { a: 3, b: 2}));

