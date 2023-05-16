print("Started Adding the Users.");
db = db.getSiblingDB("admin");

db.createUser({
    user: "superadmin",
    pwd: "QO%wpm101rO%NO9iYOPQ#4acbz36nj",
    roles: [{
        role: "root",
        db: "admin"
    }]
})

use("carres");
db.createUser({
    user: "carresadmin",
    pwd: "QO%wpm101rO%NO9iYOPQ#4acbz36nj",
    roles: [{
        role: "readWrite",
        db: "carres"
    }]
})

print("End Adding the Users.");