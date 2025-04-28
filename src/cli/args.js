/* args.js - implement function that parses command line
   you don't need to validate it) and prints them to the console
   arguments (given in format --propName value --prop2Name value2,
   in the format propName is value, prop2Name is value2 */

const parseArgs = () => {
  const args = process.argv.slice(2);
  const res = [];

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].slice(2);
    const value = args[i + 1];
    res.push(`${key} is ${value}`);
  }

  console.log(res.join(', '));
};

parseArgs();
