import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {updateUser} from "@lib/api";
import Form from 'react-bootstrap/Form';
import styles from "./UserForm.module.css"

// Das Standard Model des Formulares.
const defaultModel = {
    firstname: "", lastname: "", birthdate: null, role: "", email: "", password: ""
}

// Funktion zum Valdieren des Modelles. Hierzu geben wir den erstellten Beitrag mit.
function validateModel(user) {
    const errors = {
        firstname: "", lastname: "", birthdate: null, role: "", email: "", password: ""
    }
    let isValid = true;

    // .trim nimmt jegliche Leerzeichen aus einem Text heraus.
    if (user.firstname.trim().length === 0) {
        errors.firstname = "Firstname can't be empty"
        isValid = false;
    }
    if (user.lastname.trim().length === 0) {
        errors.lastname = "Lastname can't be empty"
        isValid = false;
    }
    if (user.birthdate === null) {
        errors.birthdate = "Birthdate can't be empty"
        isValid = false;
    }
    if (user.role.trim().length === 0) {
        errors.role = "Role can't be empty"
        isValid = false;
    }
    if (user.email.trim().length === 0) {
        errors.email = "Email can't be empty"
        isValid = false;
    }
    if (user.password.trim().length === 0) {
        errors.password = "password can't be empty"
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


export default function UserForm({session, userToEdit}) {
    const router = useRouter()
    const [user, setUser] = useState(defaultModel)
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

    // Da überprüfen wir, ob der User im Edit Mode ist oder nicht
    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit)
        }
    }, [userToEdit])

    // Da überprüfen wir jegliche Eingaben des Benutzers und geben zuletzt das zurück, was er geschrieben hat.
    const handleChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        setUser({
            ...user, [field]: value
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

        const result = validateModel(user)

        //if (!result.isValid) {
        //    setErrors(result.errors)
        //    setIsLoading(false)
        //    return
        //}
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
        //user.image = data.filePath

        // Wenn die PostId vorhanden ist gehen wir in den Edit Modus
        if (user._id) {
            await updateUser(user)
            console.log(user)
            alert("User updated!")
            router.push(`/users/${user._id}`)
            // Sonst erstellen wir diesen Post.
        }
        //else {
        //    user.userId = session.user?.id
        //    const newPost = await createPost(user, session.accessToken)
        //    console.log(newPost)
        //    alert("Post created!")
        //    router.push(`/posts/${newPost.id}`)
        //}
        setIsLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className={styles.form}>
                    <p>Firstname:</p>
                    <Form.Control type="text" name="firstname" onChange={handleChange} value={user.firstname} required/>
                    {errors.firstname && <div className={styles.error}>{errors.firstname}</div>}
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
                    <p>Lastname:</p>
                    <Form.Control type="text" name="lastname" onChange={handleChange} value={user.lastname} required/>
                    {errors.lastname && <div className={styles.error}>{errors.lastname}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Birthdate:</p>
                    <Form.Control type="date" name="birthdate" onChange={handleChange} value={user.birthdate ? user.birthdate : new Date()}/>
                    {errors.birthdate && <div className={styles.error}>{errors.birthdate}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Role:</p>
                    <Form.Control name="role" onChange={handleChange} value={user.role} required/>
                    {errors.role && <div className={styles.error}>{errors.role}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Email:</p>
                    <Form.Control name="email" onChange={handleChange} value={user.email} required/>
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset className={styles.form}>
                    <p>Password:</p>
                    <Form.Control name="password" onChange={handleChange} value={user.password} required/>
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </fieldset>

                <button disabled={isLoading} onSubmit={handleSubmit}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>

            </form>


        </>

    )
}