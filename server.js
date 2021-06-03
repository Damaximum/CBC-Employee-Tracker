const express = require('express');
const connection = require('./config/connection');
const init = require('./lib/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.connect((err) => {
  if (err) throw err;
  printHeader();
  init();
});

function printHeader() {
  let header = []   
  header.push("╔════════════════════════════════╗")
  header.push("║    ┌─╴┌╮╮┌─╮╷  ╭─╮╷ ╷┌─╴┌─╴    ║")
  header.push("║    ├╴ │││├─╯│  │ │╰┬╯├╴ ├╴     ║")
  header.push("║    └─╴╵ ╵╵  └─╴╰─╯ ╵ └─╴└─╴    ║")
  header.push("║     ┌╮╮╭─╮┌╮╷╭─╮╭─╮┌─╴┌─╮      ║")
  header.push("║     │││├─┤│││├─┤│ ┐├─ ├┬╯      ║")
  header.push("║     ╵ ╵╵ ╵╵╰┘╵ ╵╰─╯└─╴╵╰─      ║")
  header.push("╚════════════════════════════════╝")
  console.log(header.join('\n'));
};
