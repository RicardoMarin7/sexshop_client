import { BASE_PATH } from '../utils/constants'

export const getCategoriesApi = async () =>{
    try {
        const url = `${BASE_PATH}/categories?_sort=title:asc`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCategoryApi = async(categoryID) =>{
    try {
        const url = `${BASE_PATH}/categories?slug=${categoryID}`
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}