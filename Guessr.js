const fs = require("fs");
const is_number = require("is-number");
const readline = require("readline");

class GuessrGame {
	userScore;
	continueGame;
	userNum;
	systemNum;
	userName;
	regex = /[/\\?%*:|"<>]/g;
	regResult;

	ask(query) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		return new Promise((resolve) =>
			rl.question(query, (ans) => {
				rl.close();
				resolve(ans);
			})
		);
	}

	async game() {

		for (let l = 0; l != 1; ) {
			this.userName = await this.ask("Enter Username: ");
			this.userName.toLowerCase();
			this.regResult = this.userName.match(this.regex);
			if ((!Array.isArray(this.regResult))) {
				l = 1;
			}
		}

		for (let i; i != 1; ) {
			this.systemNum = Math.floor(Math.random() * 5) + 1;
			for (let k; k != 1; ) {
				this.userNum = Math.floor(await this.ask("Enter number: "));
				if (
					is_number(this.userNum) &&
					this.userNum > 0 &&
					this.userNum < 7
				) {
					k = 1;
				}
			}
			if (fs.existsSync(`./Guessrdata${this.userName}.txt`)) {
				this.userScore = parseInt(
					fs.readFileSync(`./Guessrdata${this.userName}.txt`, {
						encoding: "utf8",
						flag: "r",
					})
				);
			} else {
				this.userScore = 0;
			}
			switch (this.userNum) {
				case this.systemNum:
					this.userScore += 2;
					break;
				case this.systemNum - 1:
				case this.systemNum + 1:
					this.userScore++;
					break;
				default:
					break;
			}
			fs.writeFileSync(
				`./Guessrdata${this.userName}.txt`,
				"" + this.userScore + ""
			);
			console.log(`System Number: ${this.systemNum}`);
			console.log(`User Number: ${this.userNum}`);
			console.log(`User Score: ${this.userScore}`);
			for (let j; j != 1; ) {
				this.continueGame = await this.ask("Continue? (y/n) ");
				if (this.continueGame === "n") {
					i = 1;
					j = 1;
				} else if (this.continueGame === "y") {
					j = 1;
				} else {
					this.continueGame = null;
				}
			}
		}
	}
}
let testGame = new GuessrGame();
testGame.game();
module.exports = GuessrGame;
