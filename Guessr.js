const fs = require("fs");
const is_number = require("is-number");
const readline = require("readline");

function askQuestion(query) {
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
let userScore;
let continueGame;
let userNum;
let systemNum;
async function game() {
	for (i = 0; i != 1; ) {
		systemNum = Math.floor(Math.random() * 5) + 1;
		for (k = 0; k != 1; ) {
			userNum = Math.floor(await askQuestion("Enter number: "));
			if (is_number(userNum) && userNum > 0 && userNum < 7) {
				k = 1;
			}
		}
		if (fs.existsSync("./Guessrdata.txt")) {
			userScore = parseInt(
				fs.readFileSync("./Guessrdata.txt", {
					encoding: "utf8",
					flag: "r",
				})
			);
		} else {
			userScore = 0;
		}
		switch (userNum) {
			case systemNum:
				userScore += 2;
				break;
			case systemNum - 1:
			case systemNum + 1:
				userScore++;
				break;
			default:
				break;
		}
		fs.writeFileSync("./Guessrdata.txt", "" + userScore + "");
		console.log(`System Number: ${systemNum}`);
		console.log(`User Number: ${userNum}`);
		console.log(`User Score: ${userScore}`);
		for (j = 0; j != 1; ) {
			continueGame = await askQuestion("Continue? (y/n) ");
			if (continueGame === "n") {
				i = 1;
				j = 1;
			} else if (continueGame === "y") {
				i = 0;
				j = 1;
			} else {
				continueGame = null;
			}
		}
	}
}
game();
