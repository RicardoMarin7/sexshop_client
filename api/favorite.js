import { BASE_PATH } from '../utils/constants'
import { authFetch } from '../utils/fetch'
import { size } from 'lodash'

export const isFavoriteApi = async (idUser, idProduct, logout) => {
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}&product=${idProduct}`
        return await authFetch(url,null,logout)
    } catch (error) {
        console.log(error)
        return null
    }
}

export const addFavoriteApi = async (idUser, idProduct , logout ) =>{
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout)
        if(size(dataFound) > 0 || !dataFound){
            return 'Already in your favorites'
        }else{
            const url = `${BASE_PATH}/favorites`
            const params = {
                method : "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user: idUser, product: idProduct})
            }
            const result = await authFetch(url, params, logout)
            return result
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const removeFavoriteApi = async (idUser, idProduct , logout ) =>{
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout)
        if(size(dataFound) === 0 || !dataFound){
            return 'Not in favorites'
        }else{
            const url = `${BASE_PATH}/favorites/${dataFound[0]._id}`
            const params = {
                method : "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user: idUser, product: idProduct})
            }
            const result = await authFetch(url, params, logout)
            return result
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getMyFavoritesApi = async (idUser,logout) =>{
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}`
        const result = await authFetch(url, null, logout)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}