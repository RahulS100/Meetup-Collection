import React, { Fragment } from 'react';
import classes from '../../components/meetups/MeetupDetail.module.css';

export default function MeetupDetail(props) {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt="MeetUp Image" />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}
