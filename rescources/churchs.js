
var validator = require('validator');
var async = require('async');
var _ = require('underscore');

//Models
var Church = require('../models/church.js');

exports.create = function(req, res, next){
    var msgObj = req.body;

    if(msgObj == null){
        res.json(400, {'error': 'POST body is required with valid parameters'});
        return;
    }

    if(msgObj.name == null){
        res.json(400, {'error': 'Name is required'});
        return;
    }

    if(msgObj.email == null){
        res.json(400, {'error': 'Email is required'});
        return;
    } else {
        try{
            validator.isEmail(msgObj.email);
        } catch (exception){
            res.json(400, {'error': 'Not a valid email address'})
        }
    }

    if(msgObj.address == null){
        res.json(400, {'error': 'Address is required'});
        return;
    }

    if(msgObj.city == null){
        res.json(400, {'error': 'City is required'});
        return;
    }

    if(msgObj.state == null){
        res.json(400, {'error': 'State is required'});
        return;
    }

    if(msgObj.zip == null){
        res.json(400, {'error': 'Zip is required'});
        return;
    }

    if(msgObj.phone == null){
        res.json(400, {'error': 'Phone Number is required'});
        return;
    }

    Church.findOne({'email': msgObj.email}, function(error, church){
        if(error){
            res.json(500, {'error': 'Server Error', 'mongoError': error});
            return;
        } else if (church){
            response.json(400, {'message': 'Account already exists with email ' + msgObj.email});
            return;
        } else {
            var newChurch =  new Church();

            if(msgObj.name){
                newChurch.name = msgObj.name;
            }

            if(msgObj.email){
                newChurch.email = msgObj.email;
            }

            if(msgObj.address){
                newChurch.address.street = msgObj.address;
            }

            if(msgObj.city){
                newChurch.address.city = msgObj.city;
            }

            if(msgObj.state){
                newChurch.address.state = msgObj.state;
            }

            if(msgObj.zip){
                newChurch.address.zip = msgObj.zip;
            }

            if(msgObj.phone){
                newChurch.phone = msgObj.phone;
            }

            if(msgObj.bio){
                newChurch.bio = msgObj.bio;
            } else {
                newChurch.bio = "";
            }

            newChurch.save(function(error, church){
                if(error){
                    res.json(500, {'error': 'Server Error', 'mongoError': error});
                    return next(error);
                }
                if(church){
                    res.json(200, {'success': 'Church account created', 'account': church});
                    console.log('Church account created: ' + church);
                    /*
                      Eventually add confirmation email code here.
                     */
                    return next();
                }
            });
        }

    })
};

exports.retrieve = function(req, res, next){};

exports.update = function(req, res, next){};

exports.delete = function(req, res, next){};
