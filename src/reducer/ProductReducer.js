const ProductReducer = (state, action) => {
  switch(action.type) {
    case "SET_LOADING":
        return {
            ...state,
            isLoading: true,
        }

    case "SET_FEATURE_PRODUCTS":
        const featureData = action.payload.filter((curElem) => {
            return curElem.featured === true
        })

        return {
            ...state,
            isLoading: false,
            products: action.payload,
            featureProducts: featureData,
        }

    case "SET_ERROR":
        return{
            ...state,
            isLoading: false,
        }    

    case "SET_SINGLE_PRODUCT":
        return {
            ...state,
            isLoading: false,
            singleProduct: action.payload,
        }    

    default:
    return state
  }
}

export default ProductReducer
