const sqlite3 = require("sqlite3");
const readline = require("readline");
const { table } = require("console");
const { totalmem } = require("os");

const db = new sqlite3.Database(
	"./database.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		} else {
			console.log("\nSuccess!\n");
		}
	}
);

// db.run("CREATE TABLE users(first_name, last_name, username, password, email, id)");

// let first_name = "Alfie";
// let last_name = "Sharp";
// let username = "Ulfyn";
// let password = "ez lol";
// let email = "Robert'); DROP TABLE users;--";
// let id = "2";

// const sql = `INSERT INTO users VALUES('${first_name}', '${last_name}', '${username}', '${password}', '${email}', '${id}')`;
// db.run(sql,(err)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("Row Created!");
//     }
// });

// const selectSQL = "SELECT * FROM users";
// db.all(selectSQL,(err, rows)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         rows.forEach((row)=>{
//         console.log(row);
//     });
//     }
// });

// const sql = "UPDATE users SET first_name = 'Samantha' WHERE first_name='testfirstname';";
// db.run(sql,(err)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("Row UPDATED!");
//     }
// });

// db.run("CREATE TABLE COMPANY(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL,AGE INTEGER NOT NULL,ADDRESS,SALARY REAL);");

// const sql = `INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY) VALUES('Bob', '22', '723 Ave. Rd.', '£2193.43')`;
// db.run(sql,(err)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("Row Created!");
//     }
// });

// const selectSQL = "SELECT * FROM COMPANY";
// db.all(selectSQL,(err, rows)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         rows.forEach((row)=>{
//         console.log(row);
//     });
//     }
// });

class DatabaseMaker {
	answer = null;
	loop = 1;
	tableName = "";
	tempArray = [];
    tempArray2=[];

	newTable(tablname) {
		let tempString;
		tempString = "CREATE TABLE ";
		tempString += tablname;
		tempString += "(";
		for (let i = 0; i < this.tempArray.length; i++) {
			if (i != 0) {
				tempString += ", ";
			}
			tempString += this.tempArray[i];
		}
        tempString += ")";
		db.run(`${tempString}`);
	}

	insertInTable(tablname) {
		let tempString;
		tempString = "INSERT INTO ";
		tempString += tablname;
        tempString+="("
        for (let i = 0; i < this.tempArray.length; i++) {
			if (i != 0) {
				tempString += ", ";
			}
			tempString += this.tempArray[i];
		}
        tempString+=")"
		tempString += " VALUES(";
        for (let i = 0; i < this.tempArray2.length; i++) {
			if (i !=0) {
				tempString += ", ";
			}
			tempString += this.tempArray2[i];
		}
		tempString+=")"
		const sql = `${tempString}`;
		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			} else {
				console.log("Row Created!");
			}
		});
	}

	selectInTable() {
		let tempString;
		tempString = "SELECT ";
		tempString += arguments[0];
		tempString += " FROM ";
		for (let i = 1; i < arguments.length; i++) {
			if (i != 1) {
				tempString += ", ";
			}
			tempString += arguments[i];
			const selectSQL = `${tempString}`;
			db.all(selectSQL, (err, rows) => {
				if (err) {
					return console.error(err.message);
				} else {
					rows.forEach((row) => {
						console.log(row);
					});
				}
			});
		}
	}

	updateInTable() {
		let tempString;
		tempString = "UPDATE ";
		tempString += arguments[0];
		tempString += " SET ";
		tempString += arguments[1];
		tempString += " WHERE ";
		tempString += arguments[2];
		const sql = `${tempString}`;
		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			} else {
				console.log("Row UPDATED!");
			}
		});
	}

	deleteInTable() {
		let tempString;
		tempString = "DELETE FROM ";
		tempString += arguments[0];
		tempString += " WHERE ";
		tempString += arguments[1];
		const sql = `${tempString}`;
		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			} else {
				console.log("Deleted!");
			}
		});
	}

	dropTable(tableToDrop) {
		db.run(`DROP TABLE '${tableToDrop}'`);
	}

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

	async UI() {
		while (this.loop == 1) {
			//while ((this.answer > 0 && this.answer < 7) || this.answer === null) {
				this.answer = await this.ask(
					"What would you like to do?\n1) Create new table.\n2) Insert into existing table.\n3) Update existing table.\n4) Delete in existing table.\n5) Delete existing table.\n6) Log existing table.\n"
				);
				switch (this.answer) {
					case "1":
						this.tableName = await this.ask("Enter name of new table: ");
						for (let j = 0; this.answer != "n"; j++) {
							this.tempArray[j] = await this.ask("Enter table parameter: ");
							this.answer = await this.ask(
								"Add another parameter? (y/n): "
							); 
						}
                        this.answer=null;
						this.newTable(`${this.tableName}`); //, "ID INTEGER PRIMARY KEY AUTOINCREMENT", "NAME TEXT NOT NULL", "IMAGELINK TEXT NOT NULL"
                        //this.newTable.apply(this, this.tempArray);
                        this.tempArray = [];
                        this.tempArray2=[];
						break;
					case "2":
						this.tableName = await this.ask(
							"Enter name of table to insert values into: "
						);
                        for (let j = 0; this.answer != "n"; j++) {
							this.tempArray[j] = await this.ask("Enter table parameter to recieve value: ");
                            this.tempArray2[j] = await this.ask("Enter table value for parameter: ");
							this.answer = await this.ask(
								"Add another value? (y/n): "
							); 
						}
                        this.answer=null;
						this.insertInTable(`${this.tableName}`);
                        //this.insertInTable.apply(this, this.tempArray);
                        //this.insertInTable.apply(this, this.tempArray2);
                        this.tempArray = [];
                        this.tempArray2=[];
						break;
					case "3":
						this.tableName = await this.ask(
							"Enter name of table to update values in: "
						);
						this.updateInTable(
							`"${this.tableName}"`,
							"NAME = 'Billybob'",
							"NAME='Bobby'"
						);
						break;
					case "4":
						this.tableName = await this.ask(
							"Enter name of table to delete values from: "
						);
						this.deleteInTable(`"${this.tableName}"`, "NAME='Bubby'");
						break;
					case "5":
						this.tableName = await this.ask(
							"Enter name of table to delete: "
						);
						this.dropTable(`${this.tableName}`);
						break;
					case "6":
						this.tableName = await this.ask(
							"Enter name of table to log from: "
						);
						this.selectInTable("*", `${this.tableName}`);
						break;
					default:
						break;
				}
			//}
            db.serialize(function () {
                db.all("select name from sqlite_master where type='table'", function (err, tables) {
                    console.log(tables);
                });
            });
			this.loop = await this.ask(`\nEnter 1 to continue:\n`);
		}

		db.close((err) => {
			if (err) {
				return console.error(err.message);
			} else {
				console.log("DB Closed");
			}
		});
	}
}

let testrun = new DatabaseMaker;
// testrun.UI();

// db.all("ALTER TABLE MenuItem ADD menu_id FOREIGN KEY")
// db.all("ALTER TABLE Menu ADD restaurant_id FOREIGN KEY")

let test22
//test22 = "SELECT Restaurant.name, menu.title FROM Restaurant JOIN menu ON Restaurant.id = Menu.restaurant_id WHERE Restaurant.id = 1"
//test22 = "SELECT COUNT(Menu.title), Restaurant.name FROM Menu JOIN Restaurant ON Restaurant.id = Menu.RESTAURANT_ID GROUP BY Restaurant.name"
//test22="SELECT MenuItem.menu_ID, SUM(price) AS 'TotalPrice' FROM Menuitem GROUP BY MenuItem.menu_ID ORDER BY TotalPrice DESC"//GROUP BY price"//GROUP BY Menuitem.price"//all the menus with total cost summed, and in descending order
// db.all(test22, (err, rows) => {
//     if (err) {
//         return console.error(err.message);
//     } else {
//         rows.forEach((row) => {
//             console.log(row);
//         });
//     }
// });

//ID INTEGER PRIMARY KEY AUTOINCREMENT

// Enter name of new table: tests
// Enter table parameter: test2
// Add another parameter? (y/n): y
// Enter table parameter: test4
// Add another parameter? (y/n): n

// Enter name of table to insert values into: tests
// Enter table parameter to recieve value: test2
// Enter table value for parameter: "dgghsd"
// Add another value? (y/n): y
// Enter table parameter to recieve value: test4
// Enter table value for parameter: "uhgfdk"
// Add another value? (y/n): n