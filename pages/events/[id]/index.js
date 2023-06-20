import {useEffect, useState} from "react";
import {deleteEvent, getEventById} from "@lib/api";
import {useRouter} from "next/router";

export default function IndexPage() {

    const [event, setEvent] = useState([])
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        if(!id) return
        const loadEventsById = async () => {
            try {
                const events = await getEventById(id)
                setEvent(events)
            } catch (e) {
                if (e.status === 404) await router.push("/404")
            }
        }
        loadEventsById()
    }, [id, router])

    return (
        <div>
            <h1>Event By Id: </h1>
            {event._id}
            {event.name}
            <button onClick={async () => {await deleteEvent(event._id)
                router.push("/")}}>Delete</button>
        </div>
    )
}