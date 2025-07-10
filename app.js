import readlineSync from 'readline-sync';
import Riddle from './classes/Riddle.js';
import Player from './classes/Player.js';
import fs from "fs"
import { getallriddles, createRiddle, updateRiddle,deleteRiddle } from './DAL/riddleDal.js';


let continuPlaying = true;
let choice = ''


while (continuPlaying) {
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

      const riddlesRaw = fs.readFileSync('C:/Users/shmuel nabul/Desktop/riddleGame/riddlesDB/json-riddle.txt', "utf8");
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
        player.showStats();
      }
      break;
    case "2":
      console.log('creating a new riddle');
      const riddlename = readlineSync.question("Enter riddle name: ");
      const task = readlineSync.question("Enter the riddle question: ");
      const answer = readlineSync.question("Enter the correct answer: ");
      await createRiddle(riddlename, task, answer);
      break;

    case "3":
      await getallriddles()
      console.log('showing all th riddles');
      break;

    case "4":
      console.log('updating a riddele');
      const idUpdate = Number(readlineSync.question('enter the id number that you want to change:'))
      const newName = readlineSync.question('enter a new name: ')
      const newTask = readlineSync.question('enter a new riddle qustion:')
      const newAnswer = readlineSync.question('enter a new answer:')
      
      await updateRiddle(idUpdate, newName, newTask, newAnswer);

      break;

    case "5":
       await getallriddles()
      console.log('deliting a riddele');
      const idToDelete = Number(readlineSync.question('enter id number you whant to delete:'))
      await deleteRiddle(idToDelete)
      break;

    case "6":
      continuPlaying = false;
      console.log('good by');
      break;

    default:
      console.log('invalid choice , try again');
  }
  //cheks if the player whant to play again 
  if (continuPlaying) {
    const again = readlineSync.question("do you want to continue (y/n)? ")
    if (again !== 'y') {
      continuPlaying = false;
      console.log('bey bye');

    }
  }
}




