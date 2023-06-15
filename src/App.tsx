import styles from "./styles/app.module.scss";
import { createHashRouter, Outlet, RouterProvider, useNavigation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Error from "./components/Error";
import Spinner from "./components/Spinner";
import Dashboard from "./components/Dashboard";
import { getTasks } from "./api/resources";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import i18n from "./i18n";
import { useEffect } from "react";
import Login from "./components/Login";

export const router = createHashRouter([
    {
        path: "/",
        element: <AppContent />,
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <Dashboard />,
                loader: () => getTasks(),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function AppContent() {
    const { state } = useNavigation();
    const language = useSelector((state: RootState) => state.language.current);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <main className={styles.app}>
            <div className={styles.app_content}>
                <SideBar />
                <div className={styles.right_side}>
                    <NavBar image={"https://iili.io/H4uyVZF.webp"} />
                    {state === "loading" ? <Spinner /> : <Outlet />}
                </div>
            </div>
        </main>
    );
}

export default function App() {
    return <RouterProvider router={router} />;
}
