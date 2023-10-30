import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import { ProductDetails, ProductList } from "pages";
import { CreateProduct } from "pages/CreateProduct";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Layout>
            <Spinner size={100} />
          </Layout>
        }
      >
        <Toaster position="top-right" />
        <Routes>
          <Route index element={<ProductList />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id/" element={<ProductDetails />} />
          <Route path="*" element={<h1>404 Error Found</h1>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
