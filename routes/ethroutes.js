const router = require('express').Router()
const token =require('../controllers/controllers')







//for getting token symbol
router.get('/v1/newaccount', token.createwallet)



//for getting mative native currency balance
router.get('/v1/getMaticbalance/:account', token.getmaticbalance)


//for getting token symbol
router.get('/v1/gettokensymbol',token.gettokensymbol)


//get token account balance 
router.get('/v1/gettokenbalance/:accountbal',token.gettokenbalance)


//transfer token to another account //p2p transfer
router.post('/v1/transfertoken',token.transfertoken)



//burn token by sending token amount
router.post('/v1/burntokens',token.burntokens)


//only owner can access this function:, can transfer token ownership to others 
router.post('/v1/transferownership',token.transferownership)


//can display the current owner
router.get('/v1/getOwner',token.getOwner)


//give access to spender to spend your address tokens
router.post('/v1/approvespender',token.approvespender)


//delegate call, will transfer tokens from spender account
router.post('/v1/transferFrom',token.transferFrom)


//can burn tokens from different accounts if burn approve is true
router.post('/v1/burnFrom',token.burnFrom)




module.exports = router