const express = require('express');
const router = express.Router();

const {Sign} = require('../controllers/signIn');
const {log} = require('../controllers/Login');
const {Authi} = require('../middlewear/authorization')
const {Contact} = require('../controllers/Contactdata')
const {reviewShow,reviewPost} = require('../controllers/getReview');
const { ItemC } = require('../controllers/item_cont');

router.get('/test',Authi,(req,res)=>{
    console.log(req.cookies.token)
    return res.status(200).json(
        {
            success : true,
            message : "Authenticated"
        }
    )
})

router.post('/Signin',Sign);
router.post('/login',log);
router.post('/contact',Contact)
router.get('/review',reviewShow)
router.post('/reviews',reviewPost)
router.get('/items',ItemC)


module.exports = router;