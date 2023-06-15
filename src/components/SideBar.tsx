import AddTaskBtn from "./buttons/AddTaskBtn";
import styles from "./styles/sideBar.module.scss";
import { useTranslation } from "react-i18next";

export default function SideBar() {
    const { t } = useTranslation();

    return (
        <div className={styles.side_bar}>
            <div className={styles.item}>
                <h1>{t("main.title")}</h1>
            </div>
            <div className={styles.item}>
                <AddTaskBtn />
            </div>
            <div className={styles.item}></div>
        </div>
    );
}
