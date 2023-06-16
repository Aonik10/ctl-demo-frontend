import styles from "./styles/login.module.scss";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createAccount, login } from "../api/resources";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface OnLogInValues {
    username: string;
    password: string;
}

interface OnCreateUserValues {
    username: string;
    password: string;
    repeat_password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [active, setActive] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate_password = (pwd1: string, pwd2: string) => {
        const regexPattern = "^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$";
        if (pwd1 != pwd2) {
            setError("Passwords must match!");
            return false;
        }
        if (!pwd1.match(regexPattern)) {
            setError(
                "Invalid Password, it must contain at least 8 characters, one uppercase letter and one lowercase letter"
            );
            return false;
        }
        return true;
    };

    const onLoginIn = async (values: OnLogInValues) => {
        try {
            setError(null);
            const response = await login(values);
            if (response.error) return setError(response.error);
            navigate("/");
        } catch (error) {
            setError("Something went wrong");
        }
    };

    const onCreate = async (values: OnCreateUserValues) => {
        setError(null);
        if (!validate_password(values.password, values.repeat_password)) throw new Error("Bad Credentials");
        try {
            const response = await createAccount(values);
            setSuccess(true);
            setTimeout(() => {
                setActive(!active);
                setSuccess(false);
            }, 1000);
            return response;
        } catch (e) {
            setError("Something went wrong");
        }
    };

    const handleClick = () => {
        setActive(!active);
        setError(null);
    };

    return (
        <div className={styles.login}>
            <div className={`${styles.flip_card} ${active && styles.flip_card_active}`}>
                <div className={styles.flip_card_inner}>
                    <div className={styles.flip_card_front}>
                        <Form
                            name="normal_login"
                            className={styles.login_form}
                            initialValues={{ remember: true }}
                            onFinish={onLoginIn}
                        >
                            <div className={styles.error_container}>
                                {error && <p className={`${styles.error} ${styles.message}`}>{error}</p>}
                            </div>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: "Please input your Username!" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your Password!" }]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.login_btn}>
                                    Log in
                                </Button>
                            </Form.Item>
                            <a onClick={handleClick}>create account</a>
                        </Form>
                    </div>
                    <div className={styles.flip_card_back}>
                        <Form
                            name="create_account"
                            className={styles.login_form}
                            initialValues={{ remember: true }}
                            onFinish={onCreate}
                        >
                            <div className={styles.error_container}>
                                {error && <p className={`${styles.error} ${styles.message}`}>{error}</p>}
                                {success && <p className={`${styles.success} ${styles.message}`}>User created!</p>}
                            </div>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: "Please input your Username!" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your Password!" }]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="repeat_password"
                                rules={[{ required: true, message: "Please repeat your password!" }]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Repeat Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.login_btn}>
                                    Create Account
                                </Button>
                            </Form.Item>
                            <a onClick={handleClick}>I have an account already!</a>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
