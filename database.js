const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://erikkocurek:Q7OfxR9TKqNTLQ9P@imaginix.3kjmvlq.mongodb.net/?retryWrites=true&w=majority&appName=Imaginix";
const client = new MongoClient(uri);

let list = [];

fs.readFile('csv_files/sk/piratix.csv', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the data into lines
  const lines = data.trim().split('\n');

  // Iterate over each line
  for (const line of lines) {
    // Split the line into an array of values
    const values = line.split(';');

    if (values.length >= 8) {
      list.push(
        {
            name: values[0].trim(),
            intro: values[1].trim(),
            weapon: values[2].trim(),
            armor: values[3].trim(),
            magic: values[4].trim(),
            win: values[5].trim(),
            lose: values[6].trim(),
            place: values[7].trim()
        }
      )
    } else {
      console.error('Invalid line:', line);
    }
  }
});

async function main() {
  await client.connect();
  const db = client.db("Databazy");
  const collection = db.collection("pirati");

  // Delete all existing documents in the collection
  await collection.deleteMany({});

  // Insert new documents
  let result = await collection.insertMany(list);
  console.log(result);

  client.close();
}

main().catch(console.error);
