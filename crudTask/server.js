const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb://RenDB:databaseUAS@cluster0-shard-00-00.0sesy.mongodb.net:27017,cluster0-shard-00-01.0sesy.mongodb.net:27017,cluster0-shard-00-02.0sesy.mongodb.net:27017/newitemsDB?ssl=true&replicaSet=atlas-f0m3vf-shard-0&authSource=admin&retryWrites=true&w=majority"
);

const itemSchema = {
  title: String,
  description: String,
  date: String,
  file: String,
};

const Item = mongoose.model("Item", itemSchema);

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/newitem", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    file: req.body.file,
  });

  newItem
    .save()
    .then((item) => console.log(item))
    .catch((err) => res.status(400).json("Error " + err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("Assignment deleted");
    } else {
      console.log(err);
    }
  });
});

app.put("/put/:id", (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    file: req.body.file,
  };

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log("Assignment updated");
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(port, function () {
  console.log("Express is running");
});
