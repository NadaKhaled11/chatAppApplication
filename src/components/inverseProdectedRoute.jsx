import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function InverseProtectedRoutee({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("jwt")) {  
            navigate('/Chat');
        }else{
            navigate('/Login');
        }
    }, []);
    return children;
}
