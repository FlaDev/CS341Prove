
const express = require('express');
const extIP = require('ext-ip')();


const router = express.Router();
const emailController = require('../controllers/email');

router.get('/wwwxyz', function(request, response){

    console.log( JSON.stringify(request.headers));

    // extIP.get().then(ip => {
    //     console.log(ip);
    // })
    // .catch(err => {
    //     console.error(err);
    // });
    
});
module.exports = router;