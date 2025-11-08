const orderSchema = require('../model/OrderSchema');

const createorder = async (req, res) => {
    try{
        const {date, totalCost, products, customer} = req.body;

        const createOrder = new orderSchema({
            date,
            totalCost,
            products,
            customer
        });

        await createOrder.save();
        res.status(201).json({message: 'Order created successfully', data: createOrder});
    } catch (error){
        res.status(500).json({message: 'Error creating order', error: error.message});
    }

}

const findallorders = async (req, res) => {
     try{
       

        const data = await orderSchema.find();
        res.status(201).json({message: 'Order created successfully', data: data});
    } catch (error){
        res.status(500).json({message: 'Error creating order', error: error.message});
    }
}

module.exports = {
    createorder,
    findallorders
}   