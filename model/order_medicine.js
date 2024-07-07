const mongoose = require("mongoose")

const medicineScema = mongoose.Schema(
    {
        medicine_name : {
            type : String,
            required : true
        },

        qty : {
            type : Number,
            required : true
        },
    }
);

const order_medicines = mongoose.Schema(
    {
        pname : {
            type : String,
            required : true
        },

        home_address : {
            type : String,
            required :true
        },

        hname : {
            type : String,
            required : true
        },

        phone_no : {
            type : Number,
            required : true
        },

        email_id : {
            type : String,
            required : true 
        },

        medicine : [medicineScema],

        prescription : {
            type : String,
            required : true
        },

        qrcode : {
            type : String
        }

    },
    {timestamps : true}
)

const order = new mongoose.model("orders", order_medicines)

module.exports = order