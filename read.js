const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://Artigo:ArtigoLogin69420@imaginix.3kjmvlq.mongodb.net/?retryWrites=true&w=majority&appName=Imaginix";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const name = await read(client);
        await writeToFile(name);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

async function read(client) {
    let name = await client.db("Databazy").collection("viking").distinct("name");
    return name.filter(item => item !== '');
}

async function writeToFile(data) {
    const filePath = 'toto.txt';
    const formattedData = data.map(item => `'${item}',`).join('\n');

    fs.writeFile(filePath, formattedData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data has been written to the file:', filePath);
        }
    });
}

main();