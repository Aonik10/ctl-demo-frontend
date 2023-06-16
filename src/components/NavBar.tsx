import styles from "./styles/navBar.module.scss";
import { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/Features/languageSlice";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
    image: string;
}

interface DropDownItemProps {
    content: string;
    icon: React.ReactNode;
    onClick: () => void;
}

function DropDownItem({ content, icon, onClick }: DropDownItemProps) {
    return (
        <div className={styles.dropdown_item} onClick={onClick}>
            {icon}
            <div className={styles.dropdown_item_content}>{content}</div>
        </div>
    );
}

export default function NavBar({ image }: NavBarProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    const handleChange = (value: "en" | "es") => {
        dispatch(setLanguage(value));
    };

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login");
    };

    return (
        <div>
            <div className={styles.logged_nav_bar}>
                <div className={styles.items_container}>
                    <h1 className={styles.welcome_message}>{t("main.welcome")}</h1>
                    <div className={styles.main_items}>
                        <Select defaultValue="en" className={styles.language_selector} onChange={handleChange}>
                            <Select.Option value="en">en</Select.Option>
                            <Select.Option value="es">es</Select.Option>
                        </Select>
                        <button
                            className={styles.profile_btn}
                            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
                            onClick={() => setActive(!active)}
                        ></button>
                        <div className={`${styles.dropdown_menu} ${active ? styles.menu_active : ""}`}>
                            <DropDownItem
                                content={t("main.profile")}
                                icon={<UserOutlined className={styles.dropdown_item_logo} />}
                                onClick={() => console.log("Not ready yet")}
                            />
                            <DropDownItem
                                content={t("main.logout")}
                                icon={<LogoutOutlined className={styles.dropdown_item_logo} />}
                                onClick={logout}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
