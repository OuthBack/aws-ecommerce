import { Windmill } from "@windmill/react-ui";
import { ProductProvider } from "context/ProductContext";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./tailwind.output.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Windmill>
      <ProductProvider>
        <App />
      </ProductProvider>
    </Windmill>
  </HelmetProvider>
);
