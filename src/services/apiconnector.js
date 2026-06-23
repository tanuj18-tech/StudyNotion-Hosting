import axios from "axios";
// import { logout } from "../services/operations/authAPI"
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
//   const navigate = useNavigate()

// const dispatch = useDispatch();
export const axiosInstance = axios.create({});


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if(error.response?.status === 401){
//            dispatch(logout(navigate)) ;
//         }
//     }
// )

export const apiConnector = (method, url, bodyData, headers, params) => {
        return axiosInstance({
            method: `${method}`,
            url: `${url}`,
            data: bodyData,
            headers: headers || {},
            params: params? params: null
        });
}