const express = require('express') // express server import
const cors= require('cors')    //  connect  clicnt to database for requesting
const { MongoClient } = require('mongodb') //  connet to mongodb server
const ObjectId = require('mongodb').ObjectId; // for Unique indentify
require('dotenv').config();   // dot env configure for environment variable
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
// Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrqkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database= client.db("Nastamiz-Interior");
        const servicesCollection = database.collection('services');
        // console.log("Connected successfully to server");
    //  Services Request GET API Method
    app.get('/services', async(req,res)=>{
        const cursor = servicesCollection.find({});
        const service = await cursor.toArray();
        res.json(service);
    })
        // Single Product GET API Method
    app.get('/service/:id', async(req,res)=>{
        const id= req.params.id;
        const query = {_id:ObjectId(id)}
        const singleService = await servicesCollection.findOne(query);
        res.json(singleService);
    })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Nastamiz Interior Server port ${port}`)
})