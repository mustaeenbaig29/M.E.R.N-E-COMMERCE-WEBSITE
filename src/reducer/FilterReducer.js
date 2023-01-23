const FilterReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FILTER_PRODUTCS":
        
        let priceArr = action.payload.map((curElem) => curElem.price)


        let maxPrice = Math.max(...priceArr)
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {...state.filters, maxPrice, price: maxPrice}
            }

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            }    

            case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            }

            case "UPDATE_FILTER_VALUE":
              let {name, value} = action.payload

              return {
                ...state,
                filters:{
                    ...state.filters,
                    [name] : value
                }
              }

              case "FILTER_VALIDATION":
                let {all_products} = state
                let tempFilterProducts = [...all_products]

                const {text, category, price, color} = state.filters

                if (text) {
                    tempFilterProducts = tempFilterProducts.filter((curElem) => {
                      return curElem.name.toLowerCase().includes(text);
                    });
                  }

                if(category !== "all") {
                    tempFilterProducts = tempFilterProducts.filter(
                        (curElem) => curElem.category === category
                    )
                }

                if (color !== "all") {
                    tempFilterProducts = tempFilterProducts.filter((curElem) =>
                      curElem.colors.includes(color)
                    );
                  }

                if(price === 0){
                    tempFilterProducts = tempFilterProducts.filter(
                        (curElem) => curElem.price == price
                    )
                } else {
                    tempFilterProducts = tempFilterProducts.filter(
                        (curElem) => curElem.price <= price
                    )
                }

                return {
                    ...state,
                    filter_products: tempFilterProducts
                }

            default:
                return state
        }
}

export default FilterReducer
