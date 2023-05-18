use("carres_test")
db.cakeSales.insertMany([
    { _id: 0, type: "chocolate", orderDate: new ISODate("2020-05-18T14:10:30Z") },
    { _id: 1, type: "strawberry", orderDate: new ISODate("2021-03-20T11:30:05Z") },
    { _id: 2, type: "vanilla", orderDate: new ISODate("2021-01-15T06:31:15Z") }
])