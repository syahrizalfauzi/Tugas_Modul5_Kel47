import "./App.css";
import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import Selector from "./Components/Selector";

const initialProductState = {
  products: [],
  selectedProducts: [],
  categories: [],
  selectedCategory: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload };
    case "setCategory":
      return {
        ...state,
        categories: action.payload,
        selectedCategory: action.payload[0],
        selectedProducts: state.products.filter(
          (product) => product.category === action.payload[0]
        ),
      };
    case "changeCategory":
      return {
        ...state,
        selectedProducts: state.products.filter(
          (product) => product.category === action.payload
        ),
        selectedCategory: action.payload,
      };
    default:
      throw new Error();
  }
};

export const ProductStateContext = createContext();
export const ProductDispatchContext = createContext();
export const FetchingContext = createContext(false);

const App = () => {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios({
      url: "http://localhost:3000/products/",
      method: "get",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        productDispatch({ type: "setProducts", payload: data.data });
        return axios({
          url: "http://localhost:3000/categories/",
          method: "get",
          headers: {
            accept: "*/*",
          },
        });
      })
      .then((data) => {
        productDispatch({ type: "setCategory", payload: data.data });
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="App">
      <ProductDispatchContext.Provider value={productDispatch}>
        <ProductStateContext.Provider value={productState}>
          <FetchingContext.Provider value={isFetching}>
            <Selector />
          </FetchingContext.Provider>
        </ProductStateContext.Provider>
      </ProductDispatchContext.Provider>
    </div>
  );
};

export default App;
