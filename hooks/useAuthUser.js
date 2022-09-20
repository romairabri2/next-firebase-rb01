import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

//onAuthStateChanged permite verificar si el usuario ha iniciado sesión

export const useAuthUser = () => {
    const { push, pathname } = useRouter();

    useContext()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            let userLogged = user === null ? false : true;

            if(!userLogged) {
                push("/login")
            }else{
                if(pathname === "/login" || pathname === "/register") {
                    push("/");
                }
            }
        });
    }, []);
};


