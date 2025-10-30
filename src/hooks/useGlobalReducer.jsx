
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  


const StoreContext = createContext()


export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, (() => {
        const saved = localStorage.getItem('sw-store')
        return saved ? JSON.parse(saved) : initialStore()
    }))
    useEffect(() => {
        localStorage.setItem('sw-store', JSON.stringify(store))
    }, [store])
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}


export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}