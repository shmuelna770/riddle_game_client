import fs from "fs/promises"
import { json } from "stream/consumers"
// import Riddle from "../classes/Riddle"

const FILE_PATH = 'C:/Users/shmuel nabul/Desktop/riddleGame/riddlesDB/json-riddle.txt'
// function to get all riddles
async function getallriddles() {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    const riddles = JSON.parse(data)

    if (!data.trim()) {
        console.log("its empty");
        return;
    }
    for (let i = 0; i < riddles.length; i++) {
        const riddle = riddles[i]
        console.log(`id: ${riddle.id} riddle:  ${riddle.taskDescription} answer:  ${riddle.correctAnswer} `);

    }
}

//function to add a new riddle in th menu
async function createRiddle(riddlename, taskDescription, correctAnswer) {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    const riddles = JSON.parse(data)
    const newId = riddles[riddles.length - 1].id + 1;

    const newRiddle = {
        id: newId,
        name: riddlename,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    }
    riddles.push(newRiddle)

    await fs.writeFile(FILE_PATH, JSON.stringify(riddles, null, 2), 'utf-8')
    console.log('riddle secssfuly added');

}

// function to update a riddle
async function updateRiddle(id, newName, newtaskDescription, newcorrectAnswer) {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    const riddles = JSON.parse(data)

    const riddle = riddles.find(i => i.id === id)
    if (!riddle) {
        console.log('no riddle found in this id!');
        return;
    }
    riddle.name = newName || riddle.name;
    riddle.taskDescription = newtaskDescription || riddle.taskDescription
    riddle.correctAnswer = newcorrectAnswer || riddle.correctAnswer

    await fs.writeFile(FILE_PATH, JSON.stringify(riddles, null, 2), 'utf-8')
    console.log('riddle update successfully');

}

async function deleteRiddle(id) {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    let riddles = JSON.parse(data)

    const index = riddles.findIndex(i => i.id === id)
    if (index === -1) {
        console.log('index is not found');
        return;
    }
    riddles.splice(index, 1)
// recount the riddles
    riddles = riddles.map((riddle, idx) => ({
        ...riddle,
        id: idx + 1
    }));

    await fs.writeFile(FILE_PATH, JSON.stringify(riddles, null, 2), 'utf-8')
    console.log(`riddle number ${id} dleted successfully`);



}

// await getallriddles();
export { getallriddles, createRiddle, updateRiddle, deleteRiddle }