import { createContext, useContext, useEffect, useState } from "react";
import productService from "services/product.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [totalItems, setTotalItems] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    productService.getProducts(page).then((response) => {
      setProducts(response.data?.products);
      setTotalItems(response.data?.count);
      setIsLoading(false);
    });
  }, [page]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        page,
        setPage,
        totalItems,
        setTotalItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext, ProductProvider, useProduct };
