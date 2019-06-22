const db = require('mongoose');

const userSchema = db.Schema({

    _id:            db.Schema.Types.ObjectId,
    firstname:      { type: String, required: true },
    scoundname:     { type: String, required: true },
    lastname:       { type: String, required: true },
    birthday:       { type: String, required: true },
    invoicingAddress:  { type: String, required: true },
    invoicingCity:    { type: String, required: true },
    invoicingCountry:{ type: String, required: true },
    invoicingZipCode: { type: String, required: true },
    deliveryAddress:    { type: String, required: true },
    deliveryZipCode:        { type: String, required: true },
    deliveryCity:           { type: String, required: true },
    deliveryCounty:           { type: String, required: true },

    email:          { type: String, required: true, unique: true},
    password:       { type: String, required: true },

    created:        { type: Date, default: Date.now },
    modified:       { type: Date, default: Date.now }
   
});

module.exports = db.model("User", userSchema);

