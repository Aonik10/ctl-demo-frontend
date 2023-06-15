import styles from "./styles/spinners.module.scss";

export default function Spinner() {
    return (
        <div className={styles.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
