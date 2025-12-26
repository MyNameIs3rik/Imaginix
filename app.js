const express = require("express");
const app = express();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Artigo:ArtigoLogin69420@imaginix.3kjmvlq.mongodb.net/?retryWrites=true&w=majority&appName=Imaginix";
const client = new MongoClient(uri)

app.listen(3000);


// Set up the view engine and middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/en", (req, res) => {
    res.render("index-en");
});

app.post("/new_game", (req, res) => {
    const tema = req.body.tema;
    const language = req.body.lang;
    const temy = ["viking", "mimozem", "pirati", "starovek", "videohra"];

    if (temy.includes(tema)) {
        main(req, res, tema, language);
    } else {
        res.send("Invalid theme");
    }
});

async function main(req, res, theme, lang) {
    let database
    if (lang === "en") {
        database = "Databazy-en";
    } else if (lang === "sk") {
        database = "Databazy";
    }
    try {
        await client.connect();
        const data = await read(client, theme, database);
        data.unshift([theme,lang]);
        console.log(data)
        res.render("game", { Data: data });
    } catch (err) {
        res.status(500).send("Internal Server Error" + err);
    } finally {
        await client.close();
    }
}

async function read(client, theme, database) {
    const distinctPromises = [
        client.db(database).collection(theme).distinct("name"),
        client.db(database).collection(theme).distinct("intro"),
        client.db(database).collection(theme).distinct("weapon"),
        client.db(database).collection(theme).distinct("armor"),
        client.db(database).collection(theme).distinct("magic"),
        client.db(database).collection(theme).distinct("win"),
        client.db(database).collection(theme).distinct("lose"),
        client.db(database).collection(theme).distinct("place")
    ];

    const results = await Promise.all(distinctPromises);
    const filteredResults = results.map(arr => arr.filter(item => item !== ''));
    return filteredResults;
}

