// Libs
import { createContext, useState, useEffect, useMemo, useCallback } from "react";

// Utils
import Storage from "../Utils/storage";

const AppCartContext = createContext();
const STORAGEKEY = "shopData";

const AppCartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoadingProds, setIsLoadingProd] = useState(true);

  const [productDetail, setProductDetail] = useState({});
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartDetailOpen, setIsCartDetailOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [onSearchValue, setOnSearchValue] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState("");

  const filterProdsByTitle = useCallback((products, title) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
  }, []);

  // Login/Sign up
  const [account, setAccount] = useState(Storage.getItem(STORAGEKEY)?.account);
  const [signOut, setSignOut] = useState(Storage.getItem(STORAGEKEY)?.signOut);

  const initStorage = useCallback(() => {
    const data = Storage.getItem(STORAGEKEY);
    if (!data) {
      const newData = {
        account: {},
        signOut: true,
      };
      Storage.setItem(STORAGEKEY, newData);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    const data = Storage.getItem(STORAGEKEY);
    data.signOut = true;
    Storage.setItem(STORAGEKEY, data);
    setSignOut(true);
  }, []);

  const handleLogIn = useCallback(() => {
    const data = Storage.getItem(STORAGEKEY);
    data.signOut = false;
    Storage.setItem(STORAGEKEY, data);
    setSignOut(false);
  }, []);

  const createAccount = useCallback((data) => {
    const storageData = Storage.getItem(STORAGEKEY);
    storageData.account = data;
    Storage.setItem(STORAGEKEY, storageData);
    setAccount(data);
    setSignOut(false);
  }, []);

  // Fetch products with optimization to prevent redundant requests
  const fetchProducts = useCallback(async () => {
    setIsLoadingProd(true);
    let response;
    const categoryQuery = searchByCategory ? `/category/${searchByCategory}` : "";
    try {
      response = await fetch(`https://fakestoreapi.com/products${categoryQuery}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoadingProd(false);
    }
  }, [searchByCategory]);

  useEffect(() => {
    initStorage();
  }, [initStorage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (onSearchValue) {
      const prodsFiltered = filterProdsByTitle(products, onSearchValue);
      setProductsFiltered(prodsFiltered);
    } else {
      setProductsFiltered(products);
    }
  }, [onSearchValue, products, filterProdsByTitle]);

  return (
    <AppCartContext.Provider
      value={{
        products,
        count,
        setCount,
        openProductDetail: () => setIsProductDetailOpen(true),
        closeProductDetail: () => setIsProductDetailOpen(false),
        isProductDetailOpen,
        setProductDetail,
        productDetail,
        isLoadingProds,
        setIsLoadingProd,
        cartProducts,
        setCartProducts,
        isCartDetailOpen,
        openCartDetail: () => setIsCartDetailOpen(true),
        closeCartDetail: () => setIsCartDetailOpen(false),
        order,
        setOrder,
        onSearchValue,
        setOnSearchValue,
        productsFiltered,
        setProducts,
        setSearchByCategory,
        account,
        setAccount,
        signOut,
        handleSignOut,
        createAccount,
        handleLogIn,
      }}
    >
      {children}
    </AppCartContext.Provider>
  );
};

export { AppCartContext, AppCartProvider };
