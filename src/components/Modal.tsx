import styles from "./styles/modal.module.scss";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeTask, setDisplay } from "../redux/Features/modalSlice";

interface ModalProps {
    refreshTasks: () => void;
}

export default function Modal({ refreshTasks }: ModalProps) {
    const dispatch = useDispatch();
    const [exit, setExit] = useState(false);

    const closeModal = () => {
        setExit(true);
        setTimeout(() => {
            dispatch(setDisplay(false));
            dispatch(removeTask());
        }, 500);
    };

    const closeOnClickOutside = (e: any) => {
        if (e.target.id == "modal") closeModal();
    };

    return (
        <div className={`${styles.modal} ${exit ? styles.fadeOut : ""}`} id="modal" onClick={closeOnClickOutside}>
            <div className={styles.modal_container}>
                <TaskForm closeOnSubmit={closeModal} refreshTasks={refreshTasks} />
            </div>
        </div>
    );
}
