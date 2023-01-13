const express = require("express");
const router = express.Router();
const CreditList = require("../models/CreditList");



// Create a Credits for a customer using POST "/api/creditlist/add_credits/:customer_id". No login required
router.post('/add_credits/:customer_id', async (req, res) => {

    try {
        const { name, description, quantity, price } = req.body;

        const creditItem = new CreditList({
            name, description, price, quantity, customer: req.params.customer_id
        })
        console.log(creditItem)

        const saveCreditItem = await creditItem.save();

        res.json({ saveCreditItem });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }


});

// Get all credits using: get "/api/creditlist/fetchallcredits/:customer_id".
router.get('/fetchallcredits/:customer_id', async (req, res) => {
    try {
        let allCreditList = await CreditList.find({ customer: req.params.customer_id });
        //   console.log(allCreditList)
        res.send(allCreditList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");
    }

});


// Update credit using: post "/api/creditliist/updatecredit". 
router.put('/updatecredit/:id', async (req, res) => {
    try {

        const updatedCredit = await CreditList.findOneAndUpdate({ _id: req.params.id }, req.body);
        const credit = await CreditList.findOne({ _id: req.params.id });
        res.send(credit);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");
    }
});


// Delete Credits using: Delete "/api/creditliist/deletecredit".
router.delete('/deletecredit/:id', async (req, res) => {

    try {

        const deleteCredit = await CreditList.findOneAndDelete({ _id: req.params.id });
        res.send(deleteCredit)
        console.log("deleted Successfully")

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");
    }

});

module.exports = router