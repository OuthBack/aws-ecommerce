const { z } = require("zod");
const productService = require("../services/product.service");
const { ErrorHandler } = require("../helpers/error");

const getAllProducts = async (req, res) => {
    const { page = 1 } = req.query;

    const products = await productService.getAllProducts(page);
    res.json(products);
};

const createProduct = async (req, res) => {
    const productSchema = z.object({
        name: z.string().max(50),
        price: z.number().gte(0),
        description: z.string(),
        image_url: z.string(),
    });

    const productParsed = productSchema.safeParse(req.body);

    if (!productParsed.success) {
        throw new ErrorHandler(400, productParsed.error.message);
    }

    const newProduct = await productService.addProduct(productParsed.data);
    res.status(200).json(newProduct);
};

const getProduct = async (req, res) => {
    const product = await productService.getProductById(req.params);
    res.status(200).json(product);
};

const getProductByName = async (req, res) => {
    const product = await productService.getProductByName(req.params);
    res.status(200).json(product);
};
const updateProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;

    const updatedProduct = await productService.updateProduct({
        name,
        price,
        description,
        id,
    });
    res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await productService.removeProduct(id);
    res.status(200).json(deletedProduct);
};

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductByName,
};
