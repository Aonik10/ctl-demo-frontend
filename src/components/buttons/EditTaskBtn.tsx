import { EditOutlined } from "@ant-design/icons";
import styles from "./styles/buttons.module.scss";
import { useDispatch } from "react-redux";
import { setDisplay, setTask } from "../../redux/Features/modalSlice";
import { TaskResponse } from "../../api/interfaces";

interface EditBtnProps {
    task: TaskResponse;
}

export default function EditBtn({ task }: EditBtnProps) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setTask(task));
        dispatch(setDisplay(true));
    };

    return (
        <button className={styles.edit_btn}>
            <EditOutlined className={styles.icon} onClick={handleClick} />
        </button>
    );
}
