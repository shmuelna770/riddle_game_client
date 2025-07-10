

function welcome() {
  console.log("Welcome to the riddle game!");
  console.log("1. play the game");
  console.log("2. create a new riddle");
  console.log("3. show all riddels");
  console.log("4. update a riddle");
  console.log("5. delete a riddle");
  console.log("6. exit");

  choice = readlineSync.question("chuse an option:");
}

async function deleteARiddle() {
  await getallriddles();
  console.log('deliting a riddele');
  const idToDelete = Number(readlineSync.question('enter id number you whant to delete:'));
  await deleteRiddle(idToDelete);
}

async function updateRiddleUser() {
  console.log('updating a riddele');
  const idUpdate = Number(readlineSync.question('enter the id number that you want to change:'));
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

function startNewGame() {
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
}

export {welcome,deleteARiddle,updateRiddleUser,creatNewRidlle,startNewGame}