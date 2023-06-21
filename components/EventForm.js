import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {createEvent} from "@lib/api";
import Form from 'react-bootstrap/Form';
import styles from "./UserForm.module.css"

// Das Standard Model des Formulares.
const defaultModel = {
    name: "", location: "", description: "", date: null, ticket_amount: "", host_id: "123"
}

// Funktion zum Valdieren des Modelles. Hierzu geben wir den erstellten Beitrag mit.
function validateModel(event) {
    const errors = {
        name: "", location: "", description: "", date: null, ticket_amount: ""
    }
    let isValid = true;

    // .trim nimmt jegliche Leerzeichen aus einem Text heraus.
    if (event.name.trim().length === 0) {
        errors.name = "Name can't be empty"
        isValid = false;
    }
    if (event.location.trim().length === 0) {
        errors.location = "Location can't be empty"
        isValid = false;
    }
    if (event.date === null) {
        errors.date = "Date can't be empty"
        isValid = false;
    }
    if (event.ticket_amount === 0) {
        errors.email = "Ticket can't 0"
        isValid = false;
    }

    // Geben die möglichen Error nachrichten aus und die isValid Variabel die überprüft, ob die Daten korrekt sind.
    return {errors, isValid}
}

// Konvertiert ein Bild zur Base64 Form
//const toBase64 = file => new Promise((resolve, reject) => {
//    const reader = new FileReader()
//    reader.readAsDataURL(file)
//    reader.onload = () => resolve(reader.result)
//    reader.onerror = error => reject(error)
//})


export default function EventForm({}) {
    const router = useRouter()
    const [event, setEvent] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)

    //const [base64Image, setBase64Image] = useState(null)
    //const [imagePath, setImagePath] = useState(null)


    //const fileInput = useRef(null)

    // Wenn das File geändert wird, brauchen wir diese Funktion
    //const onFileInputChange = async (e) => {
    //    const file = fileInput.current.files[0]
    //    if (!file) return
    //    const base64 = await toBase64(file)
    //    setBase64Image(base64)
    //}

    // Da überprüfen wir jegliche Eingaben des Benutzers und geben zuletzt das zurück, was er geschrieben hat.
    const handleChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        setEvent({
            ...event, [field]: value
        })
    }
    // Bild validierung
    //const handleImageValidation = () => {
    //    if (!base64Image) {
    //        errors.image = "Image cant be null"
    //    } else {
    //        errors.image = ""
    //    }
    //}

    // Beim abschicken des Formulars
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)
        //handleImageValidation(setIsLoading(false))

        const result = validateModel(event)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }
        //if (!base64Image) return

        // Schicken wir das Bild an dieses File, welches dies dann im Public Ordner speichert.
        //const response = await fetch("/api/upload", {
        //    method: "POST", headers: {
        //        "content-type": "application/json"
        //    }, body: JSON.stringify({
        //        base64Image
        //    })
        //})
        // Da nehmen wir die Response und setzen den Filepath in die Db herein
        //const data = await response.json()
        //setImagePath(data.filePath)
        //event.image = data.filePath

        // Wenn die PostId vorhanden ist gehen wir in den Edit Modus
        console.log(event)
        const newEvent = await createEvent(event)
        alert("Event created!")
        await router.push(`/events/${newEvent._id}`)
        setIsLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className={styles.form}>
                    <p>Name:</p>
                    <Form.Control type="text" name="name" onChange={handleChange} value={event.name}
                                  required/>
                    {errors.name && <div className={styles.error}>{errors.name}</div>}
                </fieldset>

                {/*<fieldset className={styles.form}>*/}
                {/*    <p>Image:</p>*/}

                {/*    <Form.Control*/}
                {/*        type="file"*/}
                {/*        accept=".png,.jpg"*/}
                {/*        ref={fileInput}*/}
                {/*        onChange={onFileInputChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*    {errors.image && <div className={styles.error}>{errors.image}</div>}*/}
                {/*</fieldset>*/}

                <fieldset className={styles.form}>
                    <p>Location:</p>
                    <Form.Control type="text" name="location" onChange={handleChange} value={event.location} required/>
                    {errors.location && <div className={styles.error}>{errors.location}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Description:</p>
                    <Form.Control name="description" onChange={handleChange} value={event.description} required/>
                    {errors.description && <div className={styles.error}>{errors.description}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Date:</p>
                    <Form.Control type="date" name="date" onChange={handleChange}
                                  value={event.date ? event.date : new Date()}/>
                    {errors.date && <div className={styles.error}>{errors.date}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Ticket Amount:</p>
                    <Form.Control type="number" name="ticket_amount" onChange={handleChange} value={event.ticket_amount} required/>
                    {errors.ticket_amount && <div className={styles.error}>{errors.ticket_amount}</div>}
                </fieldset>

                <fieldset style={{visibility: "hidden"}} className={styles.form}>
                    <Form.Control name="host_id" onChange={handleChange} value={event.host_id} required/>
                </fieldset>

                <button disabled={isLoading} onSubmit={handleSubmit}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>


        </>

    )
}