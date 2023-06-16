import styles from "./styles/login.module.scss";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createAccount, login } from "../api/resources";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [active, setActive] = useState(false);

    const onLoginIn = async (values: any) => {
        setError(false);
        try {
            const response = await login(values);
            if (response.detail) {
                throw new Error("Bad Credentials");
            }
            navigate("/");
        } catch (e) {
            setError(true);
        }
    };

    const onCreate = async (values: any) => {
        setError(false);
        try {
            const response = await createAccount(values);
            setActive(!active);
            return response;
        } catch (e) {
            setError(true);
        }
    };

    const handleClick = () => {
        setActive(!active);
        setError(false);
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
                                {error && <p className={styles.error}>Invalid Username or Password</p>}
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
                                {error && <p className={styles.error}>something went wrong!</p>}
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
                                rules={[{ required: true, message: "Passwords must match!" }]}
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
