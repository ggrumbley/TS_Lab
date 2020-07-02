// Simple File Read
// $ deno run --allow-read file_system.ts sample.txt
// const path = Deno.args[0];
// console.log(path);

// const content = await Deno.readTextFile(path);
// console.log(content);

// Simple Dir Read
// $ deno run --allow-read --allow-write file_system.ts .
const dir = Deno.args[0]
console.log(dir);
const path = `${Deno.cwd()}/${dir}`;

for await (const directory of Deno.readDir(path)) {
  console.log(directory.name);
}

async function exists(path: string) {
  try {
    const stat = await Deno.lstat(path);
    return true;
  } catch(e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

console.log(await exists('test'));
console.log(await exists('sample.txt'));

// Create Directory
// await Deno.mkdir(`test`);
Deno.mkdirSync(`test`);

console.log(await exists('test'));

// Rename Directory or file
// await Deno.rename("test", "test2");
Deno.renameSync("test", "test2");

console.log(await exists('test2'));

// Delete Directory or file
await Deno.remove("test2");

console.log(await exists('test2'));


// Create file
// await Deno.writeTextFile("sample.txt", "Lorem ipsum");
Deno.writeTextFileSync("sample.txt", "Lorem ipsum");

// Read file
// const content = await Deno.readTextFile("sample.txt");
const content = Deno.readTextFileSync("sample.txt");
console.log(content);
