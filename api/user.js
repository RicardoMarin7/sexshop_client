import { BASE_PATH } from '../utils/constants'
import { authFetch } from '../utils/fetch'

export const registerAPI = async formData =>{
    try {
        const url = `${BASE_PATH}/auth/local/register`
        const params = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch( url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const loginAPI = async formData =>{
    try {
        const url = `${BASE_PATH}/auth/local`
        const params = {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const resetPasswordAPI = async email =>{
    try {
        const urlApi = `${BASE_PATH}/auth/forgot-password`
        const url = 'https://varesbros.com/resetpassword'
        const params = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, url})
        }
        const response = await fetch(urlApi,params)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getMeAPI = async (logout) => {
    try {
        const url = `${BASE_PATH}/users/me`
        const result = await authFetch(url, null, logout)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updatePassword = async (idUser, password, logout) =>{
    try {
        const url = `${BASE_PATH}/users/${idUser}`
        const params={
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password})
        }
        const result = await authFetch(url, params, logout)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}