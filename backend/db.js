const mongoose = require("mongoose");

const mongoURI =
  "mongodb://Nikita:shani@ac-czejupk-shard-00-00.e8wdets.mongodb.net:27017,ac-czejupk-shard-00-01.e8wdets.mongodb.net:27017,ac-czejupk-shard-00-02.e8wdets.mongodb.net:27017/?ssl=true&replicaSet=atlas-11o3y9-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          "foodItems"
        );

        fetched_data.find({}).toArray(async function (err, data) {
          const foodCat = await mongoose.connection.db.collection(
            "foodCategory"
          );

          foodCat.find({}).toArray(async function (err, catData) {
            if (err) console.log(err);
            else {
              global.foodItems = data;
              global.foodCategory = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;
