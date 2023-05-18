// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// import fs from 'fs';
const fs = require('fs');
const { get } = require('http');
const { isModuleNamespaceObject } = require('util/types');

const database = 'carres';
use(database);

function getCollection(name) {
    if (!db.getCollectionNames().includes(name)) {
        db.createCollection(name);
    }
    coll = db.getCollection(name);
    coll.deleteMany({});
    coll.dropIndexes();
    return db.getCollection(name);
}

// Create a new collection.
// const accounts_db = getCollection("accounts");
// accounts_db.deleteMany({});
// accounts_db.dropIndexes();
// accounts_db.createIndex({ "username": 1 }, { unique: true });
// accounts_db.insertOne(
//     {
//         "username": "tester",
//         "role": 3,
//         "department": "",
//         "hashpassword": {
//             "$binary": {
//                 "base64": "JDJhJDEwJHZFYllLSzYvN0lRQTh3cC9HOHM3bWVoQklKR0Yyb0J6dzBKZDhidGVXd2FWUFRQQmJ1b2cy",
//                 "subType": "00"
//             }
//         },
//         "salt": {
//             "$binary": {
//                 "base64": "54zVElVJd0dKcgrCt1jtaQ==",
//                 "subType": "00"
//             }
//         }
//     }
// )

// if (!isCollectionExisted("carres")) {
//   db.createCollection("carres");
// }
const car_registry_db = getCollection("cars");
car_registry_db.deleteMany({});
car_registry_db.dropIndexes();
car_registry_db.createIndex({ "id": 1 }, { unique: true });

const center_coll = getCollection("centers");
center_coll.createIndex({ "id": 1 }, { unique: true });

// let data = fs.readFileSync("database/data/final/centers.json", 'utf-8');
// center_coll.insertMany(JSON.parse(data));

// const cars_coll = getCollection("cars");
// data = fs.readFileSync("database/data/final/cars.json", 'utf-8');
// data.forEach(el => {
//     temp = 
// });
// cars_coll.insertMany(JSON.parse(data));

// const people_coll = getCollection("owner");
// data = fs.readFileSync("database/data/final/people.json", 'utf-8');
// data = JSON.parse(data);
// data.forEach(el => {
//     temp = el.birthdate;
//     el.birthdate = new ISODate(temp);
// });
// people_coll.insertMany(data);

const cars_coll = getCollection("cars");
data = fs.readFileSync("database/data/final/cars.json", 'utf-8');
data = JSON.parse(data);
data.forEach(el => {
    let temp = el.least_recently_registered;
    el.least_recently_registered = new ISODate(temp);
    temp = el.invalidate_date;
    el.invalidate_date = new ISODate(temp);
});
cars_coll.insertMany(data);


// const test_coll = getCollection("test")
// test_coll.insertMany([
//     { _id: 0, type: "chocolate", orderDate: new ISODate("2020-05-18") },
//     { _id: 1, type: "strawberry", orderDate: new ISODate("2021-03-20T11:30:05Z") },
//     { _id: 2, type: "vanilla", orderDate: new ISODate("2021-01-15T06:31:15Z") }
// ])

// const centersJson = require('database/data/final/centers.json');
// console.log(centersJson);

// fs.readFile('database/data/final/centers.json', 'utf-8', function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     var json = JSON.stringify(data);

//     center_coll.insert(json);
// });

// const fs = require('fs');

// // use("test");

// // const document = db.employees.findOne();

// fs.writeFileSync('database/employee.txt', 'asdkfjaklsdjf');