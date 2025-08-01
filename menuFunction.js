import readlineSync from 'readline-sync';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';
import fs from "fs"
import { getallriddles, createRiddle, updateRiddle, deleteRiddle } from './DAL/riddleDal.js';

function welcome() {
    console.log("Welcome to the riddle game!");
    console.log("1. play the game");
    console.log("2. create a new riddle");
    console.log("3. show all riddels");
    console.log("4. update a riddle");
    console.log("5. delete a riddle");
    console.log("6. exit");

    const choice = readlineSync.question("chuse an option:");
    return choice;
}

async function deleteARiddle() {
    await getallriddles();
    console.log('deliting a riddele');
    const idToDelete = readlineSync.question('enter id number you whant to delete:');
    await deleteRiddle(idToDelete);
}

async function updateRiddleUser() {
    await getallriddles()
    console.log('updating a riddele');
    const idUpdate = readlineSync.question('enter the id number that you want to change:');
    const newName = readlineSync.question('enter a new name: ');
    const newTask = readlineSync.question('enter a new riddle qustion:');
    const newAnswer = readlineSync.question('enter a new answer:');

    await updateRiddle(idUpdate, newName, newTask, newAnswer);
}

async function creatNewRidlle() {
    console.log('creating a new riddle');
    const riddlename = readlineSync.question("Enter riddle name: ");
    const task = readlineSync.question("Enter the riddle question: ");
    const answer = readlineSync.question("Enter the correct answer: ");
    await createRiddle(riddlename, task, answer);
}

async function startNewGame() {
    console.log('strarting a new game');
    const name = readlineSync.question("what is your name? ");
    const player = new Player(name);
try {
    
        const response = await fetch("http://localhost:3041/riddles");
        const riddles = await response.json();
    
    
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
} catch (error) {
    console.log('start game :',error);
    
}
}

export { welcome, deleteARiddle, updateRiddleUser, creatNewRidlle, startNewGame }