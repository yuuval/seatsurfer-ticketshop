import styles from "./index.module.css"
import {useEffect, useState} from "react";
import {createEvent, createTicket, createUser, getAllEvents, getAllUsers} from "@lib/api";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function ProfilePage() {

    const [user, setUser] = useState([])
    const [updateUIFlag, setUpdateUIFlag] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")



    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await getAllUsers()
                setUser(users)
            } catch (e) {

            }
        }
        loadUsers()
    }, [updateUIFlag])

    return (
        <div className={styles.posts}>

            {
                user.map((users) => {
                    return (
                        <div key={users.id} className={styles.key}>
                            <h1 className={styles.title}>{users.firstname + " " + users.lastname}</h1>
                            <p>Birthdate: {users.birthdate}.-</p>
                            <p>Role: {users.role}</p>
                            <p>Email: {users.email}</p>
                            <Link href={`/users/${users._id}`} passHref>
                                <a>Read more</a>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}