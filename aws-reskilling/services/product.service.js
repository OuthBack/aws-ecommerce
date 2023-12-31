const {
    getAllProductsDb,
    createProductDb,
    getProductDb,
    updateProductDb,
    deleteProductDb,
    getProductByNameDb,
    countAllProducts,
} = require("../db/product.db");
const { ErrorHandler } = require("../helpers/error");

class ProductService {
    getAllProducts = async (page) => {
        const limit = 12;
        const offset = (page - 1) * limit;
        try {
            const countProducts = await countAllProducts();
            const getAllProducts = await getAllProductsDb({ limit, offset });
            return { count: +countProducts.count, products: getAllProducts };
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    addProduct = async (data) => {
        try {
            return await createProductDb(data);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    getProductById = async (id) => {
        try {
            const product = await getProductDb(id);
            if (!product) {
                throw new ErrorHandler(404, "product not found");
            }
            return product;
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    getProductByName = async (name) => {
        try {
            const product = await getProductByNameDb(name);
            if (!product) {
                throw new ErrorHandler(404, "product not found");
            }
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    updateProduct = async (data) => {
        try {
            const product = await getProductDb(data.id);
            if (!product) {
                throw new ErrorHandler(404, "product not found");
            }
            return await updateProductDb(data);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };

    removeProduct = async (id) => {
        try {
            const product = await getProductDb(id);
            if (!product) {
                throw new ErrorHandler(404, "product not found");
            }
            return await deleteProductDb(id);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };
}

module.exports = new ProductService();
