/*
    Using mongoDB located at MongoLabs (free account .5GB)
    uri is:  mongodb://jeffrey:p4ssw0rd@ds039165.mongolab.com:39165/businessproducts
    database: products
    collection: products
*/
function connectionToMongoLabs() {
    var objCollection = {};
    var arrayCollection = [];

    // Connection URL
    var url = 'mongodb://jeffrey:p4ssw0rd@ds039165.mongolab.com:39165/businessproducts';
    // Use connect method to connect to the Server
    mongodb.connect(url, function (err, db) {
        if (err) {
            console.log("error with remote connection to MOngoLabs.");
            throw err;
        } else {
            console.log("connection worked fine");
            db.products.find().forEach(function loopTheCollection(doc) {
                objCollection.name = doc.name;
                objCollection.key = doc.key;
                objCollection.price = doc.prince;

                arrayCollection.push(objCollection);
            });
        }
        db.close();
        return arrayCollection;
    });
}