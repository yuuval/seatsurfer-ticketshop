import styles from "./Header.module.css"
import Link from "next/link";

export default function Header({ children }) {
    return (
        <header className={styles.header}>
            {children}
        </header>
    )
}