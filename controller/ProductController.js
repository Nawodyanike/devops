const productSchema = require('../model/ProductSchema');

// Create Product
const createProduct = async (req, res) => {
    try {
        const { description, unitprice, qty } = req.body;

        const newProduct = new productSchema({
            description,
            unitprice,
            qty
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { description, unitprice, qty } = req.body;

        const updatedProduct = await productSchema.findByIdAndUpdate(
            req.params.id,
            { description, unitprice, qty },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Find Product by ID
const findProduct = async (req, res) => {
    try {
        const product = await productSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product found', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error finding product', error: error.message });
    }
};

// Load All Products
const loadAllProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json({ message: 'Products loaded successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error loading products', error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProduct,
    loadAllProducts
};
