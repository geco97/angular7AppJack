const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// unrestricted
exports.register = function(req, res) {
    
    console.log(req.body.email);
    
    User
        .find({ email: req.body.email })
        .exec()
        .then(function(user) {
            if(user.length > 0) {
                return res.status(400).json({
                    message: `A user with email address ${req.body.email} already exists.`,
                    statuscode: 400
                })
            }
            else {
                encrypt.hash(req.body.password, 10, function(error, hash) {
                    if(error) {
                        return res.status(500).json({ 
                            error: error,
                            message: ` ${req.body.email}`
                        });
                    }
                    else {
                        
                        let user = new User(
                            {

                                _id:            new db.Types.ObjectId,
                                firstname:      req.body.firstname,
                                scoundname:     req.body.scoundname,  
                                lastname:       req.body.lastname,
                                invoicingAddress: req.body.invoicingAddress,
                                invoicingCity: req.body.invoicingCity,
                                invoicingZipCode: req.body.invoicingZipCode,
                                invoicingCountry:req.body.invoicingCountry,
                                birthday:       req.body.birthday,
                                deliveryAddress:    req.body.deliveryAddress,
                                deliveryZipCode:        req.body.deliveryZipCode,
                                deliveryCity:           req.body.deliveryCity,
                                deliveryCounty:           req.body.deliveryCounty,
                                email:          req.body.email,
                                password:       hash

                            }
                        );

                        user
                            .save()
                            .then(function() {
                                res.status(201).json({
                                   message: `The user ${req.body.firstname} ${req.body.lastname} was created successfully.`,
                                   statuscode: 201,
                                   success: true 
                                })
                            })
                            .catch(function(error) {
                                res.status(500).json({
                                    message: `Failed to create user ${req.body.firstname} ${req.body.lastname}.`,
                                    statuscode: 500,
                                    success: false
                                })
                            })
                    }
                })
            }
        }) 
}

exports.login = function(req, res) {
    User
        .find({ email: req.body.email })
        .then(function(user) {
            if(user.length === 0) {
                return res.status(401).json({
                    message: "Email address or password is incorrect",
                    statuscode: 401,
                    success: false
                })
            } 
            else {
                encrypt.compare(req.body.password, user[0].password, function(error, result) {
                    if(error) {
                        return res.status(401).json({
                            message: "Email address or password is incorrect",
                            statuscode: 401,
                            success: false
                        })
                    }

                    if(result) {
                        const token = jwt.sign(
                            { id: user[0]._id, email: user[0].email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "1h" }
                        )

                        return res.status(200).json({
                            message: "Authentication was successful",
                            success: true,
                            token: token,
                            id: user[0]._id,
                            email: user[0].email
                        })
                    }

                    return res.status(401).json({
                        message: "Email address or password is incorrect",
                        statuscode: 401,
                        success: false
                    })
                })
            }       
        })
}


// restricted
exports.getUsers = function(req, res) {
    User.find()    
    .then(data => {
        res.status(200).json(data)
    })
}
exports.getUser = function(req, res) {
  //  console.log(req.params.id);
    User.find({ _id: req.params.id })
    .then(data => {
        res.status(200).json(data);
    }) ;
    
}
exports.updateUser = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            return  res.status(500).json({
                message: 'No account found!'
            })
        }
        else{
            let password1 = req.body.password;
            encrypt.hash(password1, 10, function(error, hash) {
                
                if(error) {
                    return res.status(500).json({ 
                        error: error,
                        message: ` ${req.body.email}`
                    });
                }
                else {
        
        var firstname = req.body.firstname.trim();
        var scoundname = req.body.scoundname.trim();
        var lastname = req.body.lastname.trim();
        var birthday = req.body.birthday.trim();
        var invoicingAddress = req.body.invoicingAddress.trim();
        var invoicingZipCode = req.body.invoicingZipCode.trim();
        var invoicingCity = req.body.invoicingCity.trim();
        var invoicingCountry = req.body.invoicingCountry.trim();
        var deliveryAddress = req.body.deliveryAddress.trim();
        var deliveryZipCode = req.body.deliveryZipCode.trim();
        var deliveryCity = req.body.deliveryCity.trim();
        var deliveryCounty = req.body.deliveryCounty.trim();
        var email = req.body.email.trim();
        var password = req.body.password.trim();
        if(!firstname && !scoundname && !lastname && !birthday && !invoicingAddress && !invoicingZipCode && !invoicingCity && !invoicingCountry 
             && !deliveryAddress && !deliveryZipCode && !deliveryCity  && !deliveryCounty && !email && !password){
               return  res.status(500).json({
                    message: 'No fields to update!'
                })
             }
        
        
        var myquery = { _id: req.params.id };
        var newvalues = { $set: { 
            "firstname": (req.body.firstname != "")?req.body.firstname:user.firstname,
            "scoundname": (req.body.scoundname != "")?req.body.scoundname:user.scoundname,
            "lastname": (req.body.lastname != "")?req.body.lastname:user.lastname,
            "birthday": (req.body.birthday != "")?req.body.birthday:user.birthday,
            "invoicingAddress": (req.body.invoicingAddress != "")?req.body.invoicingAddress:user.invoicingAddress,
            "invoicingZipCode": (req.body.invoicingZipCode != "")?req.body.invoicingZipCode:user.invoicingZipCode,
            "invoicingCity": (req.body.invoicingCity != "")?req.body.invoicingCity:user.invoicingCity,
            "invoicingCountry": (req.body.invoicingCountry != "")?req.body.invoicingCountry:user.invoicingCountry,
            "deliveryAddress": (req.body.deliveryAddress != "")?req.body.deliveryAddress:user.deliveryAddress,
            "deliveryZipCode": (req.body.deliveryZipCode != "")?req.body.deliveryZipCode:user.deliveryZipCode,
            "deliveryCity": (req.body.deliveryCity != "")?req.body.deliveryCity:user.deliveryCity,
            "deliveryCounty": (req.body.deliveryCounty != "")?req.body.deliveryCounty:user.deliveryCounty,
            "email": (req.body.email != "")?req.body.email:user.email,
            "password": (hash != user.password && req.body.password != "")?hash:user.password
        } 
    };
         User.updateOne(myquery,newvalues)
        .then(() => {
            res.status(200).json({
                message: 'Användaren updaterats från databasen'
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Användaren updaterats inte bort från databasen!',
                error: error
            })
        })
    }
    });
    }
    });
}
exports.deleteUser = function(req, res) {
    User.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'Användaren togs bort från databasen'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Användaren togs inte bort från databasen!',
            error: error
        })
    })    
}