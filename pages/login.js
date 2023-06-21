import {login} from "@lib/api"
import {useRouter} from "next/router"
import {useState} from "react"
import styles from "./login.module.css"
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Link from "next/link";

// Das Standard Model des Formulares.
const defaultModel = {
    email: "",
    password: "",
}

// Funktion zum Valdieren des Modelles, Hierzu geben wir die eingegebten Daten des Users mit.
function validateModel(model) {
    const errors = {
        email: "",
        password: "",
    }
    let isValid = true

    if (model.email.trim().length === 0 || !model.email.includes("@")) {
        errors.email = "Email can't be empty and must be valid email"
        isValid = false;
    }

    if (model.password.trim().length === 0 || model.password.length < 8) {
        errors.password = "Password can't be empty and must be at least 8 characters long"
        isValid = false;
    } else if (model.password.trim().length > 8) {
        errors.password = ""
        isValid = true
    }

    return {errors, isValid}
}

export default function LoginPage({session}) {

    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [model, setModel] = useState(defaultModel)

    // Da überprüfen wir jegliche Eingaben des Benutzers und geben zuletzt das zurück, was er geschrieben hat. Und mit .trim nehmen wir alle leerzeichen weg
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value?.trim()

        setModel({
            ...model,
            [name]: value
        })
    }
    // Beim abschicken des Formulars
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(model)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        try {
            const resp = await login(model)
            session.login(resp)
            console.log(resp)
            await router.push("/")
        } catch (e) {
            setErrors({
                ...errors,
                login: "Login failed"
            })
            console.log(e)
            setIsLoading(false)
        }
    }

    // Wenn der User schon eingeloggt ist und auf die URL /login gehen will, kommt er auf die Startseite.
    const checkIfLoggedIn = () => {
        if (session.user) {
            router.push("/")
        }
    }
    checkIfLoggedIn()

    return session.user ? null : (
        <div className={styles.login}>
            <h1>Login</h1>

            {errors.login && <h2 className={styles.error}>{errors.login}</h2>}

            <form onSubmit={handleSubmit} className={styles.loginform}>
                <fieldset>
                    <label className={styles.title}>Email:</label>
                    <Form.Control placeholder="name@example.com" type="email" name="email" onChange={handleChange}
                                  value={model.email} autoComplete="email"
                                  required/>
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset>
                    <label className={styles.title}>Password:</label>
                    <Form.Control placeholder="Must have at least 8 characters" type="password" name="password"
                                  onChange={handleChange} value={model.password}
                                  autoComplete="current-password" required/>
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </fieldset>

                <Nav
                    activeKey="/register"
                >
                    <Nav.Item>
                        <Nav.Link href="/users/create">Register now</Nav.Link>
                    </Nav.Item>
                </Nav>
                <fieldset>
                    <Button variant="outline-success" disabled={isLoading} type="submit">
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}
