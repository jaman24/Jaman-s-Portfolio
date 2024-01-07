const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://atlas-sql-64ad4f05c9b58c7e4875adc3-ufnaw.a.query.mongodb.net/mycontacts-backend?ssl=true&authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

app.use(express.json());

const Item = mongoose.model("Item", {
    name: String,
    description: String,
});

app.post("/api/insert", async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
