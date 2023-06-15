import { useDispatch } from "react-redux";
import styles from "./styles/buttons.module.scss";
import { useTranslation } from "react-i18next";
import { setDisplay } from "../../redux/Features/modalSlice";

export default function DottedTaskCard() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <button className={styles.dashed_task_card} onClick={() => dispatch(setDisplay(true))}>
            {t("button.addTask")}
        </button>
    );
}
