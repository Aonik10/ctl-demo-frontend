import styles from "./styles/buttons.module.scss";
import { useState } from "react";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface DeleteTaskBtnProps {
    onClick: () => Promise<void>;
}

export default function DeteleTaskBtn({ onClick }: DeleteTaskBtnProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    };

    return (
        <div className={styles.delete_task_btn} onClick={handleClick}>
            {loading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
            ) : (
                <DeleteOutlined className={styles.icon} />
            )}
        </div>
    );
}
