import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {api} from "../api/axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/api/dashboard/me");
                setIsAuth(true);
            } catch (err) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;