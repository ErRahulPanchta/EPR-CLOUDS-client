import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard"); // redirect to dashboard
        } else {
            alert("Google login failed");
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return <div className="flex justify-center items-center h-screen">Logging in...</div>;
}
