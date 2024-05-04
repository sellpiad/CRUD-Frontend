import axios from "axios"
import store from "../redux/store"
import { changeToken } from "../redux/tokenSlice"

export const instance = axios.create()


instance.defaults.baseURL = '/'


instance.interceptors.request.use(
    (config) => {

        const accessToken = store.getState().accessToken.value

        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response.status === 401) {
            console.log("get 401 error, current accessToken - " + store.getState().accessToken.value)
            const accessToken = tokenRefresh(instance)
            error.config.headers.Authorization = `Bearer ${accessToken}`
            return instance(error.config);
        }
        return Promise.reject(error)
    }
)

const tokenRefresh = (instance) => {
    instance.get('/api/refresh')
        .then((res) => {
            store.dispatch(
                changeToken({
                    id: res.data.username,
                    value: res.data.accessToken
                })
            )
            console.log("get refresh response, current accessToken - " + store.getState().accessToken.value)
        })
        .catch((error) => console.log("refresh error! " + error))

        return store.getState().accessToken.value
}





