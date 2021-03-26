import { BASE_PATH } from '../utils/constants'

export const getHomeSettings = async () =>{
    try {
        const url = `${BASE_PATH}/home-config`
        const result = await fetch(url)
        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
        return null
    } 
}