import { TaskResponse } from "../api/interfaces";
import { SERVER_URL } from "../api/resources";
import EditBtn from "./buttons/EditTaskBtn";
import StatusBtn from "./buttons/StatusBtn";
import DeleteTaskBtn from "./buttons/DeleteTaskBtn";
import styles from "./styles/taskCard.module.scss";
import { Badge } from "antd";
import dayjs from "dayjs";

interface TaskCardProps {
    task: TaskResponse;
    deleteClick: () => Promise<void>;
    updateClick: () => Promise<void>;
}

export default function TaskCard({ task, deleteClick, updateClick }: TaskCardProps) {
    const imageUrl = SERVER_URL + "/images/" + task.image;

    return (
        <Badge.Ribbon
            style={task.date ? { visibility: "visible" } : { visibility: "hidden" }}
            text={dayjs(task.date).format("DD-MM-YYYY")}
        >
            <div className={styles.taskCard}>
                <div className={styles.task_img_container}>
                    <div className={styles.task_img} style={{ backgroundImage: `url(${imageUrl})` }}></div>
                </div>
                <div className={styles.card_content}>
                    <div>
                        <h1 className={styles.title}>{task.title}</h1>
                        <p className={styles.task_description}>{task.description}</p>
                    </div>
                    <div className={styles.btn_section}>
                        <StatusBtn completed={task.completed} onClick={updateClick} />
                        <div className={styles.delete_edit}>
                            <DeleteTaskBtn onClick={deleteClick} />
                            <EditBtn task={task} />
                        </div>
                    </div>
                </div>
            </div>
        </Badge.Ribbon>
    );
}
