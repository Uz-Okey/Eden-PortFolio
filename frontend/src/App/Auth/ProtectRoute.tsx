
import { type JSX } from "react";
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentProfileThunk } from "../../Redux/Slice/authslice";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
    const {loading, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        // Fetch current user from backend
        dispatch(currentProfileThunk()).finally(() => setCheckedAuth(true));
    }, [dispatch]);

    if (!checkedAuth || loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/LoginPage" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectRoute
