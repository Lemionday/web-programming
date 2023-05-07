const database = "carres"
const collections = ["accounts"]

use(database)
for (const i of collections) {
    db.createCollection(i)
}

db = db.getSiblingDB("admin");
db.createUser({
    user: "carresAdmin",
    pwd: "i0Ru8TOsPr18nNkw",
    roles: [
        {
            role: "readWrite",
            db: "carres"
        }
    ]
})

use(database)
db.getCollection("accounts").insertMany([
    { "username": "temp1", "password": "temp1" },
    { "username": "temp2", "password": "temp2" },
])