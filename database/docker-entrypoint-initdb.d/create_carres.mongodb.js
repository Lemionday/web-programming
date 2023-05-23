// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// import fs from 'fs';
const fs = require('fs');

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

const center_coll = getCollection("centers");
center_coll.createIndex({ "id": 1 }, { unique: true });
let data = fs.readFileSync("database/data/final/centers.json", 'utf-8');
center_coll.insertMany(JSON.parse(data));

const owner_coll = getCollection("owner");
data = fs.readFileSync("database/data/final/people.json", 'utf-8');
data = JSON.parse(data);
data.forEach(el => {
    temp = el.birthdate;
    el.birthdate = new ISODate(temp);
});
owner_coll.insertMany(data);

data = fs.readFileSync("database/data/final/companies.json", 'utf-8');
data = JSON.parse(data);
data.forEach(el => {
    temp = el.legal_representative.birthdate;
    el.legal_representative.birthdate = new ISODate(temp);
});
owner_coll.insertMany(data);

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