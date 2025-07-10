import readlineSync from 'readline-sync';
import Riddle from './classes/Riddle.js';
import Player from './classes/Player.js';
import fs from "fs"
import { getallriddles, createRiddle, updateRiddle, deleteRiddle } from './DAL/riddleDal.js';
import { welcome, deleteARiddle, updateRiddleUser, creatNewRidlle, startNewGame } from './menuFunction.js';

let continuPlaying = true;
let choice = ''


while (continuPlaying) {
 const choice =  welcome();

  switch (choice) {
    case "1":
      startNewGame();
      break;
    case "2":
      await creatNewRidlle();
      break;

    case "3":
      await getallriddles()

      break;

    case "4":
      await updateRiddleUser();

      break;

    case "5":
      await deleteARiddle();
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


