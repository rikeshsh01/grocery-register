const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchCustomer = require("../middleware/fetchCustomer");
const jwt_secret = "grocery_123"


// Create a USER using POST "/api/auth/createuser". No login required

router.post('/createcustomer', [
    body('name', "Name must be at least of 3 charecter").isLength({ min: 3 }),
    body('phone', "Mobile number must be at least of 10 charecter").isLength({ min: 10 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let customer = await Customer.findOne({ phone: req.body.phone });

        if (customer) {
            return res.status(400).json({ error: "the customer with this phone is already exist" });
        }
        customer = await Customer.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            image:req.body.image
        });

        const data = {
            customer: {
                id: customer.id
            }
        }
        var token = jwt.sign(data, jwt_secret);
        // console.log(token)
        res.json({customer })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }

});

// Get all CustomerList using POST "/api/customer/getcustomer". 
router.get('/getcustomer/', async (req, res) => {
    try {
        // Customer.find({}).then( (customer)=> {
        //     res.send(customer);
        // });
        const customers = await Customer.find({});
        res.send(customers);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");

    }
});

// Get one Customer data using POST "/api/customer/getcustomer/id". 
router.post('/getcustomer/:id', async (req, res) => {
    try {
        const customers = await Customer.find({_id: req.params.id});
        res.send({customers});
        console.log(customers)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");

    }
});

// Update Customer using: post "/api/customer/updatecustomer". 
router.put('/updatecustomer/:id', async (req, res) => {
    try {

        // Customer.findOneAndUpdate({_id: req.params.id},req.body).then(function(customer){
        //     Customer.findOne({_id: req.params.id}).then(function(customer){
        //         res.send(customer);
        //     });
        // });
        const updatedCustomer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
        const customer = await Customer.findOne({ _id: req.params.id });
        res.send(customer);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");
    }
});



// Delete Customer using: Delete "/api/customer/deletecustomer".
router.delete('/deletecustomer/:id', async (req, res) => {

    try {
        // find the note to be delete and delete it 
        // Customer.findOneAndDelete({ _id: req.params.id }).then(function (customer) {
        //     res.send(customer);
        // });

        const deleteCustomer = await Customer.findOneAndDelete({ _id: req.params.id });
        res.send(deleteCustomer)
        console.log("deleted Successfully")

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");
    }

});

module.exports = router