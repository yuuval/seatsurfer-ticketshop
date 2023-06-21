import styles from "./index.module.css"
import {useEffect, useState} from "react";
import {createEvent, createTicket, createUser, getAllEvents, getAllUsers} from "@lib/api";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function IndexPage() {

    const [event, setEvent] = useState([])
    const [updateUIFlag, setUpdateUIFlag] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")



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

    return (
        <div className={styles.posts}>

            <h3 className={styles.searchBarTitle}>Searchbar <span>&#128270;</span></h3>
            <Form.Control className={styles.searchBar} type={"text"} placeholder="Search..." onChange={event => {
                setSearchTerm(event.target.value)
            }}/>
            <Link className={styles.searchBarTitle} href={"/events/create"} passHref><a>Create Event</a></Link>
            {
                event.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.location.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => {
                    return (
                        <div key={event.id} className={styles.key}>
                            <h1 className={styles.title}>{event.name}</h1>
                            <p>Location: {event.location}.-</p>
                            <p>Description: {event.description.slice(0, 25) + "..."}</p>
                            <Link href={`/events/${event._id}`} passHref>
                                <a>Read more</a>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}