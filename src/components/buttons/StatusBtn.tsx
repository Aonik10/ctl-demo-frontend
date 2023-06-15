import styles from "./styles/buttons.module.scss";
import { useState } from "react";
import { Button } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface StatusBtnProps {
    completed: boolean;
    onClick: () => Promise<void>;
}

export default function StatusBtn({ completed, onClick }: StatusBtnProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    };

    return (
        <Button
            className={`${styles.status_btn} ${completed ? styles.completed : styles.pending}`}
            type="primary"
            icon={completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
            loading={loading}
            onClick={handleClick}
        >
            {completed ? t("button.completed") : t("button.pending")}
        </Button>
    );
}
