import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const LogOut = ({setUser}) => {
    const navigate = useNavigate() 

    useEffect(() => {
        fetch('/user/logOut').then(() => {
            setUser(null)
            navigate('/')
        }) 
    }, [])
    return null
}

export default LogOut