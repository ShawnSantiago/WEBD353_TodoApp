var express    = require('express'),
    Bourne     = require('bourne'),
    bodyParser = require('body-parser'),

    db         = new Bourne('data.json'),
    router     = express.Router();

router
    .use(bodyParser.json())
    .route('/contact')
        .get(function (req, res) {
            console.log("get");
            db.find({ userId: parseInt(req.user.id, 10) }, function (err, data) {
                res.json(data);
            });
        })
        .post(function (req, res) {
            console.log("post");
            var contact = req.body;
            contact.userId = req.user.id;

            db.insert(contact, function (err, data) {
                res.json(data);
            });
        })

router
    .param('id', function (req, res, next) {
        console.log("id");
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        next();
    })
    .route('/contact')

        .get(function (req, res) {
            console.log("id get");

            db.findOne(req.dbQuery, function (err, data) {
                console.log(err);
                console.log(data);
                res.json(data);   

            });
        })
        .put(function (req, res) {
            console.log("id put");
            var contact = req.body;
            delete contact.$promise;
            delete contact.$resolved;
            db.update(req.dbQuery, contact, function (err, data) {
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            console.log("delete");
            db.delete(req.dbQuery, function () {
                res.json(null);
            });
        });

module.exports = router;
