import {useEffect, useState} from "react";
import {deleteEvent, deleteUser, getAllTicketsByUserId, getEventById, getUserById} from "@lib/api";
import {useRouter} from "next/router";
import Link from "next/link";
import {Button} from "react-bootstrap";

export default function IndexPage() {

    const [user, setUser] = useState([])
    const [ticket, setTicket] = useState([])
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        if(!id) return
        const loadUserAndTicketsById = async () => {
            try {
                const user = await getUserById(id)
                setUser(user)
            } catch (e) {
                if (e.status === 404) await router.push("/404")
            }
            try {
                const ticket = await getAllTicketsByUserId(id)
                setTicket(ticket)
            } catch (e) {
                if (e.status === 404) await router.push("/404")
            }
        }
        loadUserAndTicketsById()
    }, [id, router])

    return (
        <div>
            <h1>User By Id: </h1>
            {user._id}
            <br/>
            {user.firstname}
            {user.lastname}
            <button onClick={async () => {await deleteUser(user._id)
                router.push("/")}}>Delete</button>

            {ticket.map((t) => {
                return (
                    <div key={t._id}>

                        {t.price}
                    </div>
                )
            })}
            <Button variant="outline-primary" href={`/users/${user._id}/edit`} passHref>
                <a className="button">Edit User</a>
            </Button>
        </div>
    )
}