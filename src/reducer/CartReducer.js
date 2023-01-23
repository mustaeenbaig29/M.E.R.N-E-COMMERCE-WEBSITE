const CartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART") {
        let {id, color, amount, product} = action.payload;

        let existingProduct = state.cart.find(
          (curItem) => curItem.id === id + color
        );
    
        if (existingProduct) {
          let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === id + color) {
              let newAmount = curElem.amount + amount;
    
              if (newAmount >= curElem.max) {
                newAmount = curElem.max;
              }
              return {
                ...curElem,
                amount: newAmount,
              };
            } else {
              return curElem;
            }
          });
          return {
            ...state,
            cart: updatedProduct,
          };
        } else {
          let cartProduct = {
            id: id + color,
            name: product.name,
            color,
            amount,
            image: product.image[0].url,
            price: product.price,
            max: product.stock,
          };
    
          return {
            ...state,
            cart: [...state.cart, cartProduct],
          };
        }
      }
    

    if(action.type === "REMOVE_ITEM"){
        let updatedCart = state.cart.filter(
            (curElem) => curElem.id !== action.payload
        )

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "SET_DECREASE") {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === action.payload) {
            let decAmount = curElem.amount - 1;
    
            if (decAmount <= 1) {
              decAmount = 1;
            }
    
            return {
              ...curElem,
              amount: decAmount,
            };
          } else {
            return curElem;
          }
        });
        return { ...state, cart: updatedProduct };
      }
    
      if (action.type === "SET_INCREASE") {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === action.payload) {
            let incAmount = curElem.amount + 1;
    
            if (incAmount >= curElem.max) {
              incAmount = curElem.max;
            }
    
            return {
              ...curElem,
              amount: incAmount,
            };
          } else {
            return curElem;
          }
        });
        return { ...state, cart: updatedProduct };
      }

      if(action.type === "TOTAL_CART_ITEMS") {
        let updatedProduct = state.cart.reduce((intialVal, curElem) => {
            let {amount} = curElem

            intialVal = intialVal + amount
            return intialVal
        },0)

        return {
            ...state,
            total_items: updatedProduct
        }
      }

      if(action.type === "CART_TOTAL_PRICE") {
        let total_price = state.cart.reduce((intialVal, curElem) => {
            let {price, amount} = curElem

            intialVal = intialVal + price * amount;
            return intialVal
        },0)

        return {
            ...state,
            total_price,
        }
      }

      if(action.type === "CLEAR_CART") {
        return {
          ...state,
          cart:[]
        }
      }

    return state;
}

export default CartReducer
