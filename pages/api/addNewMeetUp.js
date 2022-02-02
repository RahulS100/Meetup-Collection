import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if(req.method === "POST") {

        const data = req.body;

        const ConnectionString = process.env.MONGODB_CONN;

        //Connect to MongoDB Using the Native Driver
       const client = await MongoClient.connect(ConnectionString);
       const MeetDB = client.db();

       const meetCollections = MeetDB.collection("Meetups");

       const result =  await meetCollections.insertOne(data);
        
       console.log(result);

       client.close();

       res.status(200).json({message: "Data Inserted"});
    }
}

export default handler;