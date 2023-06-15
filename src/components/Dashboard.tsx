import styles from "./styles/dashboard.module.scss";
import Modal from "./Modal";
import TaskCard from "./TaskCard";
import DottedTaskCard from "./buttons/DottedTaskCard";
import { Input, Radio } from "antd";
import { TaskResponse, TaskUpd } from "../api/interfaces";
import { useState, useEffect, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { deleteTaskById, getTasks, updateTaskById } from "../api/resources";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";

const { Search } = Input;

export default function Dashboard() {
    const { t } = useTranslation();
    const tasksFound = useLoaderData() as TaskResponse[];
    const modal = useSelector((state: RootState) => state.modal.display);

    const [tasks, setTasks] = useState(tasksFound);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const refreshTasks = useCallback(() => {
        getTasks(filter).then((tasks) => setTasks(tasks));
    }, [tasks]);

    useEffect(() => {
        getTasks(filter).then((tasks) => setTasks(tasks));
    }, [filter]);

    const isRendered = (task: TaskResponse) => {
        const baseString = `${task.description} ${task.title} ${
            task.completed ? "completed" : "pending"
        }`.toLowerCase();
        const searchCondition = baseString.includes(search.toLowerCase());
        return searchCondition;
    };

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const handleRadio = async (e: any) => {
        setFilter(e.target.value);
        await refreshTasks();
    };

    const deleteClick = async (id: number) => {
        await deleteTaskById(id);
        await refreshTasks();
    };

    const updateStatusClick = async (id: number, status: TaskUpd) => {
        await updateTaskById(id, status);
        await refreshTasks();
    };

    return (
        <div className={styles.dashboard}>
            {modal && <Modal refreshTasks={refreshTasks} />}
            <div className={styles.filters}>
                <Search
                    placeholder={t("placeholder.searchBar") as string}
                    onChange={handleSearch}
                    className={styles.search_bar}
                />
                <Radio.Group
                    defaultValue="all"
                    buttonStyle="solid"
                    onChange={handleRadio}
                    className={styles.radio_menu}
                >
                    <Radio.Button value="all">{t("radio.all")}</Radio.Button>
                    <Radio.Button value="completed">{t("radio.completed")}</Radio.Button>
                    <Radio.Button value="pending">{t("radio.pending")}</Radio.Button>
                </Radio.Group>
            </div>
            <div className={styles.tasks_container}>
                <div className={styles.current_tasks}>
                    {tasks.map(
                        (task) =>
                            isRendered(task) && (
                                <div key={task.id}>
                                    <TaskCard
                                        task={task}
                                        deleteClick={() => deleteClick(task.id)}
                                        updateClick={() => updateStatusClick(task.id, { completed: !task.completed })}
                                    />
                                </div>
                            )
                    )}
                    <DottedTaskCard />
                </div>
            </div>
        </div>
    );
}
