import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

//onAuthStateChanged permite verificar si el usuario ha iniciado sesión

export const useAuthUser = () => {
    const { push, pathname } = useRouter();

    const { setisLogged } = useContext(AuthContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            let userLogged = user === null ? false : true;

            if(!userLogged) {
                push("/user_app/?loginType=login")
                setisLogged(false)
            }else{
                setisLogged(true)
                if(pathname === "/user_app/?loginType=register" || pathname === "//user_app/?loginType=login") {
                    push("/");
                }
            }
        });
    }, []);
};


