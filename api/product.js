import { BASE_PATH } from '../utils/constants'

export const getLastProductsApi = async (limit) => {
    try {
        const url = `${BASE_PATH}/products?_limit=${limit}&sizes_null=false`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getProductByCategoryApi = async (category, limit, start) =>{
    try {
        const startItems = `_start=${start}`
        const sortItems = `_sort=title:asc`
        const limitItems = `_limit=${limit}`
        const url = `${BASE_PATH}/products?category.slug=${category}&${sortItems}&${startItems}&${limitItems}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getTotalProductsCategory = async (category) =>{
    try {
        const url = `${BASE_PATH}/products/count?category.slug=${category}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getProductBySlug = async (slug) =>{
    try {
        const url = `${BASE_PATH}/products?slug=${slug}`
        const response = await fetch(url)
        const result = await response.json()
        return result[0]

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getRelatedProducts = async (query,number) =>{
    try {
        const url = `${BASE_PATH}/products?_sample=size:${number}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log()
        return null
    }
}

export const searchProductApi = async (title) =>{
    try {
        const url = `${BASE_PATH}/products?_q=${title}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        null
    }
}