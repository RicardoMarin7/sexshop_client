import { BASE_PATH } from '../utils/constants'
import { authFetch } from '../utils/fetch'

export const createAddressApi = async (address, logout) => {
    try {
        const url = `${BASE_PATH}/addresses`
        const params = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(address)
        }
        const result = await authFetch(url, params, logout)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAddressesApi = async (idUser, logout) =>{
    try {
        const url = `${BASE_PATH}/addresses?user=${idUser}`
        const result = await authFetch(url, null, logout)
        if(result.statusCode === 500){
            throw 'Error en el Servidor'
        }
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteAddressessApi = async(id, logout) =>{
    try {
        const url = `${BASE_PATH}/addresses/${id}`
        const params = {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        }
        const result = await authFetch(url, params, logout)
        if(result.statusCode === 500) throw 'Internal Server Error'
        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateAddressApi = async(id, address, logout) =>{
    try {
        const url = `${BASE_PATH}/addresses/${id}`
        const params = {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(address)
        }
        const result = await authFetch(url, params, logout)
        return result
    } catch (error) {
        
    }
}
