import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { useProductContext } from "./ProductContext";
import reducer from '../reducer/FilterReducer'


const FilterContext = createContext();

const intialState = {
    all_products: [],
    filter_products: [],
    grid_view: true,
    filters: {
        text: "",
        category: "all",
        color: "all",
        price: 0,
        maxPrice: 0,
        minPrice: 0,
    }
}


const FilterContextProvider = ({children}) => {

    const {products} = useProductContext();
    console.log(products)

    const [state, dispatch] = useReducer(reducer, intialState)


    const setGridView = () => {
        return dispatch({type: "SET_GRID_VIEW"})
    }

    const setListView = () => {
        return dispatch({type: "SET_LIST_VIEW"})
    }

    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type: "UPDATE_FILTER_VALUE", payload: {name, value}})
    }

    useEffect(() => {
        dispatch({type: "FILTER_VALIDATION"})
    }, [products, state.filters])

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUTCS", payload: products})
    }, [products])

    return (
        <FilterContext.Provider value={{...state, setListView, setGridView, updateFilterValue}}>
            {children}
        </FilterContext.Provider>
    )
}


const useFilterContext = () => {
    return (
        useContext(FilterContext)
    )
}

export {FilterContext, FilterContextProvider, useFilterContext}