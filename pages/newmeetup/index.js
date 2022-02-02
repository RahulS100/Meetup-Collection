import { useRouter } from 'next/router';
import React from 'react';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

export default function index() {

    const router = useRouter();

    async function addNewMeetup(newMeetUpData) {
        const response = await fetch('/api/addNewMeetUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMeetUpData) 
        })

        if(!response.ok) {
            console.log("Error");
        }

        const insertionRes = await response.json();

        console.log(insertionRes);

        router.push('/');
    }

    return (<NewMeetUpForm onAddMeetup={addNewMeetup} />)
}
