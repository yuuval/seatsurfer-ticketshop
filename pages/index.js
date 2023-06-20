import styles from "./index.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {createEvent, createTask, createTicket, createUser, getAllEvents, getAllUsers} from "@lib/api";
import {Schema} from "mongoose";
import Link from "next/link";

export default function IndexPage() {

    const [input, setInput] = useState("")
    const [event, setEvent] = useState([])
    const [user, setUser] = useState([])
    const [updateUIFlag, setUpdateUIFlag] = useState(false)


    useEffect(() => {
        const loadEventsAndUsers = async () => {
            try {
                const events = await getAllEvents()
                setEvent(events)
            } catch (e) {

            }
            try {
                const users = await getAllUsers()
                setUser(users)
            } catch (e) {

            }
        }
        loadEventsAndUsers()
    }, [updateUIFlag])

    const handleSubmitEvent = async (e) => {
        setUpdateUIFlag(false)
        e.preventDefault();
        try {
            await createEvent({
                name: "123",
                location: "123",
                description: "123",
                host_id: "123",
                date: new Date(),
                ticket_amount: 123
            });
            setInput(""); // Clear the input field after successful submission
            setUpdateUIFlag(true)
        } catch (error) {
            console.error("Error creating event:", error);
            // Handle the error, such as displaying an error message to the user
        }
    }

    const handleSubmitTicket = async (e) => {
        setUpdateUIFlag(false)
        e.preventDefault();
        try {
            await createTicket({
                event_id: "123",
                price: 123,
                buyer_id: "123",
            });
            setInput(""); // Clear the input field after successful submission
            setUpdateUIFlag(true)
        } catch (error) {
            console.error("Error creating event:", error);
            // Handle the error, such as displaying an error message to the user
        }
    }

    const handleSubmitUser = async (e) => {
        setUpdateUIFlag(false)
        e.preventDefault();
        try {
            await createUser({
                firstname: "123",
                lastname: "123",
                birthdate: new Date(),
                role: "visitor",
                email: "valmir@gmail.com",
                password: "Non hashed passwort weil zu faul",
            });
            setInput(""); // Clear the input field after successful submission
            setUpdateUIFlag(true)
        } catch (error) {
            console.error("Error creating event:", error);
            // Handle the error, such as displaying an error message to the user
        }
    }

    return (
        <div className={styles.posts}>
            <h1>Event</h1>

            <form onSubmit={handleSubmitEvent}>
                <input type="text" value={input} onChange={(e) => {
                    setInput(e.target.value)
                }}/>
                <button type="submit">Send Event</button>
            </form>

            <h2>Get Events:</h2>
            {event.map((t) => {
                return (
                    <div key={t._id}>
                        {t.name}
                        <Link href={`/events/${t._id}`} passHref>
                            <a>Read more</a>
                        </Link>
                    </div>
                )
            })}

            <h1>Ticket</h1>

            <form onSubmit={handleSubmitTicket}>
                <input type="text" value={input} onChange={(e) => {
                    setInput(e.target.value)
                }}/>
                <button type="submit">Send Ticket</button>
            </form>

            <h1>User</h1>

            <form onSubmit={handleSubmitUser}>
                <input type="text" value={input} onChange={(e) => {
                    setInput(e.target.value)
                }}/>
                <button type="submit">Send User</button>
            </form>

            <h2>Get Users:</h2>
            {user.map((t) => {
                return (
                    <div key={t._id}>
                        {t.firstname}
                        <Link href={`/users/${t._id}`} passHref>
                            <a>Read more</a>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}