class Player {
    constructor(name) {
        this.name = name;
        this.times = []
    }

    
    recordTime(start, end) {
        const timeInSeconde = Math.floor((end - start) / 1000);
        this.times.push(timeInSeconde);
    }

    //show the status of the pleyer total and average
    showStats() {
        let total = 0
        for (let i = 0; i < this.times.length; i++) {
            total += this.times[i];
        }
        let average = 0
        if (this.times.length > 0) {
            average = total / this.times.length;
        }
        console.log(`\ngreat job, ${this.name}!`);
        console.log(`total time: ${total} seconds`);
        console.log(`your average time is: ${average} seconds`);
    }
}
export default Player;