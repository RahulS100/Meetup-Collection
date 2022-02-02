import React, {Fragment} from 'react';
import MeetUpList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

export default function HomeComp(props) {
    return (<Fragment>
  <Head>
    <title>MeetUp Collector</title>
    <meta name='description' content='Create A Collection of Meetup Places with the People All Aorunf the World' />
  </Head>
    <MeetUpList meetups={props.meetups} />
    </Fragment>)
}



//this function not run at the build time like the getStaticProps()
//but it runs on every request and we make to server and 
//and out state page regenerated on every request and 
//we also can access the req and res http header using the 
//context passed to getServerSideProps() and perform authentication
// export function getServerSideProps(context) {
      // console.log(context);
      // console.log(context.req);
      // console.log(context.res);

//       return {
//         props: {
//           message: "hello"
//         }
//       }
// }

export async function getStaticProps() {
    // const param = requestData.param.meetid;
    //perfrom any data fetching here and next.js execute this function
    //here we can connect to our database or perform http requests and other stuff
    //the stuff that is asyc in behaveiour and


    const ConnectionString = process.env.MONGODB_CONN;

    //Connect to MongoDB Using the Native Driver
   const client = await MongoClient.connect(ConnectionString);
   const MeetDB = client.db();

   const meetCollections = MeetDB.collection("Meetups");

   const MeetupData = await meetCollections.find().toArray();

   console.log(MeetupData);

   const MeetUpDataTransformed = MeetupData.map(meetup => { return {
      title: meetup.title,
      image: meetup.image,
      description: meetup.description,
      id: meetup._id.toString(),
      address: meetup.address
   } });

    return {
      props: {
        meetups: MeetUpDataTransformed
      },
      revalidate: 10
    }

    //and it return and object that contain a key called props and that also hold a prop
    //that we can set to any value we calculated according to our aaysc code business
    //logic and send back to our page component ans this getaStateProps() we
    //can only execute in pages components only and next.js will take this function
    //and before start the static site generation it execute this function and then
    //execute out page component with props sended back by the getStaticProps() 
    //method and usage thaat data to perform static generation and after that react will
    //take over and perform operation on the client side 
    //we need to usage the server side api calling libraries because the getStaticProps()
    //will execute on the server side not on the client machine so our code and secret will
    //be safe here and we can perform any kind of operation here
    }