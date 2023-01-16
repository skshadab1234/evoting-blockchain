import React, {useEffect,} from 'react'
import { useRouter } from 'next/router'

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        fetch("/admin_logout", {
            method: "GET",
            headers: {
              Accept: "appllication/json",
              "Content-Type": "application/json"
            },
            credentials: "include"
          }).then((res) => {
            router.push("./Login")
            if(res.status != 200){
                throw new Error("Something went wrong!!")
            }
        }).catch(err => console.log(err))
    }, [])
    
}

export default Logout