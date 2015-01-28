var apiRouter = require('express').Router();
var Blurb = require('../models/blurb');

apiRouter.route('/blurbs')
    .get(function(req,res){
        Blurb.find(function(err, blurbs){
            if(err){
                res.send(err);
            }
            res.json(blurbs);
        });
    })
    .post(function(req, res){
        var blurb = new Blurb;
        blurb.uri = req.body.uri;
        blurb.save(function(err){
            if(err){
                res.send(err);
            }
            res.send('all good here');
        });
    });

apiRouter.route('/blurbs/:blurbId')
    .get(function(req, res){
        Blurb.findById(req.params.blurbId, function(err, blurb){
            if(err){
                req.send(err);
            }
            res.json(blurb);
        });
    })
    .delete(function(req, res){
        Blurb.remove({
            _id:req.params.blurbId
        }, function(err){
            if(err){
                res.send(err);
            }
            res.json({
                message: 'removed '
            });
        }) 
    });
    
module.exports = apiRouter;