import readline from "readline-sync"

class Riddle {
    constructor(id, name, taskDescription, correctAnswer) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

    // ask the question and check if correct or not
    ask() {
        console.log(`\nRiddle ${this.id}: ${this.name}`);
        let answer = ``;
        while (answer !== this.correctAnswer) {
            answer = readline.question(`${this.taskDescription}`)
            if (answer !== this.correctAnswer) {
                console.log("try again")
            }
        }
        console.log(`good job`)
    }

}
export default Riddle;