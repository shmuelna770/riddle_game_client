import fs from "fs/promises"
import { json } from "stream/consumers"
// import Riddle from "../classes/Riddle"

//const FILE_PATH = 'C:/Users/shmuel nabul/Desktop/riddleGame/riddlesDB/json-riddle.txt'
// function to get all riddles
async function getallriddles() {
    console.log('showing all th riddles');
    const response = await fetch("http://localhost:3041/riddles");
    const riddles = await response.json();
    console.log('riddel', riddles);



    if (!riddles) {
        console.log("its empty");
        return;
    }
    for (let i = 0; i < riddles.length; i++) {
        const riddle = riddles[i]
        console.log(`id: ${riddle._id} riddle:  ${riddle.taskDescription} answer:  ${riddle.correctAnswer} `);

    }
}

//function to add a new riddle in the menu
async function createRiddle(riddlename, taskDescription, correctAnswer) {
    const newRiddle = {
        name: riddlename,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    }
    const response = await fetch("http://localhost:3041/riddles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRiddle)
    })
        if (!response.ok) {
        console.error("cannot add a riddle", response.status);
        return;
    }

    const result = await response.json();
    console.log('riddle secssfuly added', result);

}

// function to update a riddle
async function updateRiddle(id, newname, newtaskDescription, newcorrectAnswer) {
   const update = {
        name: newname,
        taskDescription: newtaskDescription,
        correctAnswer: newcorrectAnswer
    }
    console.log({id, newname, newtaskDescription, newcorrectAnswer});
    
   
    const response = await fetch(`http://localhost:3041/riddles/${id}`,{
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(update)
    })
   
   if(!response.ok){
    console.error("riddle didnt update",response.status)
    return;
   }
   const result = await response.json()
   console.log('riddle apdate sucssefuly',result); 
}

// function to delete a riddle
async function deleteRiddle(id) {
    const response = await fetch(`http://localhost:3041/riddles/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        console.error("failed to delete riddle:", response.status);
        return;
    }
    const result = await response.json();
    console.log(`Riddle ${id} deleted successfully:`, result);
}



// await getallriddles();
export { getallriddles, createRiddle, updateRiddle, deleteRiddle }
