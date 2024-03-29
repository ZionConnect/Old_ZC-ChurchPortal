/**
 * Created by admin on 12/5/13.
 *
 * 1. Services Need to be added. This will restrict the user to be able to check in only
 *    when its a valid church service for that church.
 */

var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var churchAccountSchema = new Schema({
    name:                     String,
    email:                    String,
    password:                 String,
    address:                  {
        street:               String,
        city:                 String,
        state:                String,
        zip:                  String
    },
    phone:                    String,
    bio:                      String,
    createdAt:                Date,
    UpdatedAt:                Date
});

churchAccountSchema.pre('save', function(next){
    this.updatedAt = new Date();
    if (!this.createdAt){
        this.createdAt = new Date();
    }

    next();
});

// methods ===========================
// generating a hash

churchAccountSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
churchAccountSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('ChurchAccount', churchAccountSchema);
