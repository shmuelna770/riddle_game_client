import readlineSync from 'readline-sync';
import Riddle from './classes/Riddle.js';
import Player from './classes/Player.js';
import fs from "fs"

let choice = ''
while (choice !== "6") {
  console.log("Welcome to the riddle game!");
  console.log("1. play the game");
  console.log("2. create a new riddle");
  console.log("3. show all riddels");
  console.log("4. update a riddle");
  console.log("5. delete a riddle");
  console.log("6. exit");

  choice = readlineSync.question("chuse an option:")

  switch (choice) {
    case "1":
      console.log('strarting a new game');
      const name = readlineSync.question("what is your name? ");
      const player = new Player(name);

      const riddlesRaw = fs.readFileSync("riddles/json-riddle.txt", "utf8");
      const riddles = JSON.parse(riddlesRaw);
      for (let riddleData of riddles) {
        const riddle = new Riddle(
          riddleData.id,
          riddleData.name,
          riddleData.taskDescription,
          riddleData.correctAnswer
        );

        const start = Date.now();
        riddle.ask();
        const end = Date.now();

        player.recordTime(start, end);
      }
      break;

    case "2":
      console.log('creating a new riddele');
      break;

    case "3":
      console.log('showing all th players');
      break;

    case "4":
      console.log('updating a riddele');
      break;

    case "5":
      console.log('deliting a riddele');
      break;

    case "6":
      console.log('good by');
      break;

    default:
      console.log('invalid choice , try again');


  }
}



player.showStats();
