import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/CartReducer'


const CartContext = createContext();

const getLocalData = () => {
    let localData = localStorage.getItem("thapaCart")
    const parsedData = JSON.parse(localData)
    if(!Array.isArray(parsedData)) return [];
    return parsedData;
}

const intialState = {
    // cart: [],
    cart: getLocalData(),
    total_items: "",
    total_price: "",
    shipping_fee: 5000,
}

const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, intialState)


    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
      };

    const removeItem = (id) => {
        return dispatch({type: "REMOVE_ITEM", payload: id })
    }

    const setIncrease = (id) => {
        return dispatch({type: "SET_INCREASE", payload: id})
    }

    const setDecrease = (id) => {
        return dispatch({type: "SET_DECREASE", payload: id})
    }

    const clearCart = () => {
        return dispatch({type: "CLEAR_CART"})
    }

    

    useEffect(() => {
        dispatch({type: "TOTAL_CART_ITEMS"})
        dispatch({type: "CART_TOTAL_PRICE"})
        localStorage.setItem("thapaCart", JSON.stringify(state.cart))
    }, [state.cart])

    return (
        <CartContext.Provider value={{...state, addToCart, removeItem, setIncrease, setDecrease, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}


const useCartContext = () => {
    return (
        useContext(CartContext)
    )
}

export {CartContext, CartProvider, useCartContext}