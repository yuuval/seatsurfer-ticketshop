import {useEffect, useState} from "react";
import {deleteUser, getAllTicketsByUserId, getUserById} from "@lib/api";
import {useRouter} from "next/router";
import UserForm from "@components/UserForm";

export default function EditPage() {

    const [user, setUser] = useState(null)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        if(!id) return
        const loadUser = async () => {
            try {
                const user = await getUserById(id)
                setUser(user)
            } catch (e) {
                if (e.status === 404) await router.push("/404")
            }
        }
        loadUser()
    }, [id, router])

    return (
        <div>
            <h1><span>&#128296;</span>Edit Mode:</h1>
            {user && <UserForm userToEdit={user}/>}
        </div>
    )
}