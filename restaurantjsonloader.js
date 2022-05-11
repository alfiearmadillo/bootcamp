const fsp = require('fs').promises
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(
	"./restaurantsfromjsondb.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		} else {
			console.log("\nSuccess!\n"); 
		}
	}
);

async function load() {
    console.log('start');
    const buffer = await fsp.readFile('./restaurants.json');
    const restaurants = (JSON.parse(String(buffer))); 

    // for(i=0;i<restaurants.length;i++){
    //     db.run("INSERT INTO RESTAURANT(NAME, IMAGELINK) VALUES('"+restaurants[i].name+"', '"+restaurants[i].image+"')")

    //     for(j=0;j<restaurants[i].menus.length;j++){
    //         db.run("INSERT INTO Menu(TITLE, RESTAURANT_ID) VALUES('"+restaurants[i].menus[j].title+"', "+(i+1)+")")

    //         for(k=0;k<restaurants[i].menus[j].items.length;k++){
    //             db.run("INSERT INTO MenuItem(NAME, PRICE, MENU_ID) VALUES('"+restaurants[i].menus[j].items[k].name+"', "+restaurants[i].menus[j].items[k].price+", "+(j+1)+")")
    //         }

    //     }

    // }

    restaurants.forEach((row) => {
        console.log(row)
    });

    const selectSql = "SELECT RESTAURANT.name as 'Restaurant Name', menu.title as 'Menu', menuitem.name as 'Food item', menuitem.price FROM restaurant JOIN menu ON restaurant.id = menu.restaurant_id JOIN menuitem ON menu.id = menuitem.menu_id ORDER BY Restaurant.name;"; db.all(selectSql, (err, rows)=>{     if(err)     {         return console.error(err.message);     }     else     {     rows.forEach((row)=>{         console.log(row);     }); }})

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("DB Closed");
        }
    });


    return restaurants;




};

load()

// db.run("CREATE TABLE RESTAURANT(ID INTEGER PRIMARY KEY AUTOINCREMENT,NAME TEXT,IMAGELINK TEXT)")
// db.run("CREATE TABLE MENU(ID INTEGER PRIMARY KEY AUTOINCREMENT,TITLE TEXT,RESTAURANT_ID INTEGER, FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT(ID))")
// db.run("CREATE TABLE MENUITEM(ID INTEGER PRIMARY KEY AUTOINCREMENT,NAME TEXT,PRICE INTEGER,MENU_ID INTEGER, FOREIGN KEY (MENU_ID) REFERENCES MENU(ID))")

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     } else {
//         console.log("DB Closed");
//     }
// });
