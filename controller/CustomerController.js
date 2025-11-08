const customerSchema = require('../model/CustomerSchema');

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const { name, address, salary, contact } = req.body;

        const newCustomer = new customerSchema({
            name,
            address,
            salary,
            contact
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully', data: newCustomer });
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
};

// Update Customer
const updatecustomer = async (req, res) => {
    try {
        const { name, address, salary, contact } = req.body;

        const updatedata = await customerSchema.findByIdAndUpdate(
            req.params.id,
            { name, address, salary, contact },
            { new: true }
        );

        if (!updatedata) {
            return res.status(404).json({ message: 'Customer not found' });

            const createdCustomer = new customerSchema({
                name,
                address,
                salary,
                contact
            }); 

            await createdCustomer.save();
            return res.status(201).json({ message: 'customer saved' });   
        }

        res.status(200).json({ message: 'Customer updated successfully', data: updatedata });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

// Delete Customer
const deletecustomer = async (req, res) => {
    try {
        const deleted = await customerSchema.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};

// Find Customer by ID
const findcustomer = async (req, res) => {
    try {
        const customer = await customerSchema.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer found', data: customer });
    } catch (error) {
        res.status(500).json({ message: 'Error finding customer', error: error.message });
    }
};

// Load All Customers
const loadallcustomers = async (req, res) => {
    try {
        const customers = await customerSchema.find();
        res.status(200).json({ message: 'Customers loaded successfully', data: customers });
    } catch (error) {
        res.status(500).json({ message: 'Error loading customers', error: error.message });
    }
};

module.exports = {
    createCustomer,
    updatecustomer,
    deletecustomer,
    findcustomer,
    loadallcustomers
};
