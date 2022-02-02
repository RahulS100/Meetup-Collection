import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

export default function MeetUp(props) {
    return (<MeetupDetail image={props.image} title={props.title} address={props.address} description={props.description} />);
}


//define our path and then nextjs generate the every version of that page according to dynamic
//paths and serve to the user and also we can define most commonly used paths only and 
//if user need some other path we can pass the fallback flag as true in return of the 
//getStaticPath() function and then it generate page for that user request from server and 
//get send back that page to user and it saves alot of space and unwanted page generation
//getStatePath() return a object with fallback key and paths key path key hold ad array and every
//element of this array is and object that must need to hold another key called param and again
//param hold an object that hold our data or id for dynamic path and it tells the next js
//to generate static site for these dynamic pages and if user request for a page that not 
//in existance and fallback falg in return object is false it will give a predfined 404 not found 
//page for us and this is how the getStaticPath() function work
export async function getStaticPaths() {

  const ConnectionString = process.env.MONGODB_CONN;

        //Connect to MongoDB Using the Native Driver
       const client = await MongoClient.connect(ConnectionString);
       const MeetDB = client.db();

       const meetCollections = MeetDB.collection("Meetups");

       const AllMeetups = await meetCollections.find().toArray();

       client.close();
  
    return {
      fallback: false,
      paths: AllMeetups.map(meetup => {return {params: {meetupId: meetup._id.toString()}}})
    }
  }




  export async function getStaticProps(requestData) {
    const path = requestData.params.meetupId;

    const ConnectionString = "mongodb+srv://StemMeet:Stem100@meetup.m4at8.mongodb.net/StemMeet";

        //Connect to MongoDB Using the Native Driver
       const client = await MongoClient.connect(ConnectionString);
       const MeetDB = client.db();

       const meetCollections = MeetDB.collection("Meetups");

       const OneMeetUp = await meetCollections.findOne({_id: ObjectId(path)})

       client.close();

       console.log(OneMeetUp);

    return {
        props: {
            image: OneMeetUp.image,
            title: OneMeetUp.title,
            address: OneMeetUp.address,
            description: OneMeetUp.description
        }
    }
  }