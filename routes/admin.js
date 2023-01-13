const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const fetchuser = require("../middleware/fetchUser");
const Admin = require("../models/Admin");

var privateKey = "MynameisRicky";


// Create a USER using POST "/api/auth/createuser". No login required

router.post('/createadmin', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('phone').isLength({ min: 10 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);

    // Check wheather the user with the email exist already
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) {
            return res.status(400).json({error: "the user with this email is already exist" });
        }
        // Create new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            phone:req.body.phone,
            password: secPass,
        });
        const data = {
            admin: {
                id: admin.id
            }
        }

        const authToken = jwt.sign(data, privateKey);
        res.send({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")

    }
});

// Authenticate a Admin using POST "/api/auth/login". No login required
router.post('/login', [
    body('email',"Enter valid Email").isEmail(),
    body('password', "Password unvalid").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);

    // Check wheather the admin with the email exist already
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
console.log(req.body);
    const {email,password} = req.body;
    try {
        let admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({error: "Admin Doesnot exist" });
        }
        console.log(admin.password, "database pass")
        console.log(password, "destructured pass")

        const passwordCOmpare = await bcrypt.compare(password,admin.password);

        if (!passwordCOmpare) {
            return res.status(400).json({error: "Password doesnot matched" });
        }

        const data = {
            admin: {
                id: admin.id
            }
        }

        const authToken = jwt.sign(data, privateKey);
        res.send({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enternal Server Error");

    }
});



module.exports = router;