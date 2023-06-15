import { useDispatch } from "react-redux";
import styles from "./styles/buttons.module.scss";
import { setDisplay } from "../../redux/Features/modalSlice";
import { useTranslation } from "react-i18next";

export default function AddTaskBtn() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <button className={styles.add_task_btn} onClick={() => dispatch(setDisplay(true))}>
            {t("button.addTask")}
        </button>
    );
}
