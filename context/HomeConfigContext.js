import {createContext} from 'react'

const HomeConfigContext = createContext({
    homeConfig: null,
    getHomeConfig: () => null
})

export default HomeConfigContext