import { Children } from "react"
import { Navigate, NavLink } from "react-router-dom"
const ProtectedRoute = ({children}) =>{
    const user = JSON.parse(localStorage.getItem("user"))


    if (!user){
        return <Navigate to = "/login" />
    }
    return children

    
}
 export default ProtectedRoute