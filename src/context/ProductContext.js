import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/ProductReducer'


const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products"

const intialState = {
    products: [],
    featureProducts: [],
    isLoading: false,
    isError: false,
    singleProduct: {},
}

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, intialState);

    const getProducts = async (url) => {
        dispatch({type: "SET_LOADING"})
        try {
        const res = await axios.get(url)
        const products = await res.data
        dispatch({type: "SET_FEATURE_PRODUCTS", payload: products})
        } catch (error) {
            dispatch({type: "SET_ERROR"})
        }
    }

    // my 2nd api for single product
    
    const getSingleProduct = async (url) => {
        dispatch({type: "SET_LOADING"})
        try {
        const res = await axios.get(url)
        const singleProduct = await res.data
        dispatch({type: "SET_SINGLE_PRODUCT", payload: singleProduct})
        } catch (error) {
            dispatch({type: "SET_ERROR"})
        }
    }


    useEffect(() => {
        getProducts(API)
    },[])

    return (
        <AppContext.Provider value={{...state, getSingleProduct}}>
            {children}
        </AppContext.Provider>
    )
}


const useProductContext = () => {
    return (
        useContext(AppContext)
    )
}

export {AppContext, AppProvider, useProductContext}