import styles from "./styles/taskForm.module.scss";
import TextArea from "antd/es/input/TextArea";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SERVER_URL, createTask, updateTaskById } from "../api/resources";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface TaskFormProps {
    closeOnSubmit: () => void;
    refreshTasks: () => void;
}

interface FormValues {
    title: string;
    description: string;
    date: Dayjs;
    status: string;
    image: any;
}

export default function TaskForm({ closeOnSubmit, refreshTasks }: TaskFormProps) {
    const { t } = useTranslation();
    const uploadUrl = SERVER_URL + "/upload-image";
    const task = useSelector((state: RootState) => state.modal.task);

    const [loading, setLoading] = useState(false);

    const parseValues = (values: FormValues) => {
        const parsedTask = {
            title: values.title,
            description: values.description,
            date: values.date,
            completed: values.status == "completed" ? true : false,
            image: values.image ? values.image.file.response.image : "no-image.jpg",
        };
        return parsedTask;
    };

    const handleCreate = async (values: FormValues) => {
        setLoading(true);
        try {
            const parsedTask = parseValues(values);
            await createTask(parsedTask);
        } catch (error) {
            console.log(error);
        }
        closeOnSubmit();
        refreshTasks();
        setLoading(false);
    };

    const handleUpdate = async (values: FormValues) => {
        if (!task) return closeOnSubmit();
        setLoading(true);
        try {
            const parsedTask = parseValues(values);
            await updateTaskById(task.id, parsedTask);
        } catch (error) {
            console.log(error);
        }
        closeOnSubmit();
        refreshTasks();
        setLoading(false);
    };

    const initialValues = {
        title: task?.title,
        description: task?.description,
        date: task?.date ? dayjs(task.date) : null,
        status: task?.completed ? "completed" : "pending",
    };

    return (
        <Form
            className={styles.task_form}
            requiredMark={false}
            layout="vertical"
            onFinish={task ? handleUpdate : handleCreate}
            initialValues={task ? initialValues : {}}
        >
            <section className={styles.input_section}>
                <div>
                    <Form.Item
                        name="title"
                        className={styles.labels}
                        label={
                            <label className={styles.labels} style={{ fontSize: "24px" }}>
                                {t("form.title")}
                            </label>
                        }
                    >
                        <Input placeholder={t("placeholder.title") as string} className={styles.form_input} required />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        className={styles.labels}
                        label={
                            <label className={styles.labels} style={{ fontSize: "24px" }}>
                                {t("form.date")}
                            </label>
                        }
                    >
                        <DatePicker className={styles.form_input} placeholder="Select a date" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        className={styles.labels}
                        label={
                            <label className={styles.labels} style={{ fontSize: "24px" }}>
                                {t("form.description")}
                            </label>
                        }
                    >
                        <TextArea
                            placeholder={t("placeholder.description") as string}
                            rows={4}
                            className={`${styles.form_input} ${styles.form_textarea}`}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        className={styles.labels}
                        label={
                            <label className={styles.labels} style={{ fontSize: "24px" }}>
                                {t("form.status")}
                            </label>
                        }
                    >
                        <Select defaultValue="pending">
                            <Select.Option value="pending">{t("button.pending")}</Select.Option>
                            <Select.Option value="completed">{t("button.completed")}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        className={styles.labels}
                        label={
                            <label className={styles.labels} style={{ fontSize: "24px" }}>
                                {t("form.image")}
                            </label>
                        }
                    >
                        <Upload
                            action={uploadUrl}
                            listType="picture"
                            accept="image/*"
                            className={styles.upload_item}
                            disabled={task != null} // por ahora
                        >
                            <Button icon={<UploadOutlined />}>{t("form.upload")}</Button>
                        </Upload>
                    </Form.Item>
                </div>

                {task ? (
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.submit_btn}
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? t("button.updatingTask") : t("button.updateTask")}
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.submit_btn}
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? t("button.creatingTask") : t("button.createTask")}
                    </Button>
                )}
            </section>
        </Form>
    );
}
