import axios from "axios"

export const baseURL = import.meta.env.VITE_DEFAULT_URL

const axiosInstance = axios.create({
    baseURL,
})

export const getAccessToken = () => localStorage.getItem("token")



axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const isLoginPage = window.location.pathname === "/auth"

        if (isLoginPage) {
            return Promise.reject(error)
        }

        if (status === 401 || status === 403) {
            localStorage.removeItem("token")
            sessionStorage.clear()

            window.location.href = "/auth"
            return Promise.reject(error)
        }

        return Promise.reject(error)
    }
)


export default axiosInstance
