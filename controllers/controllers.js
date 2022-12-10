const Web3 = require('web3');

var constants = require('../utils/constants');

const contractabi= require('../contractabi/contractabi.json')

const finalcontractabi=contractabi;


//before moving into production move owner and private key to .env or kms

const owner = constants.owner; //keep owner address

const ownerprivatekey = '8b1372bfac7bfcdb7cbad51bddd24ac3dd10450f02e8d54afc89331025c89d96' //private key of owner address



//paste your contract address here
const contractaddress=constants.contractaddress






//testnet url for sample deployment and testing our functions
const maticurl=constants.maticurl


const web3= new Web3(maticurl);






//console.log("web3", web3);  to check all web3 functions

const token={  




    createwallet: async (req, res) => {
        try {
          
            
           const add= web3.eth.accounts.create();
           const ethaddress=add.address;
           const ethprivateKey=add.privateKey
           
          return res.status(200).json({ 
            ethaddress : ethaddress, ethprivateKey : ethprivateKey});

           } catch (err) {
             
               return  res.status(500).json({  error:err.message});
           }
        },
       


   
        getmaticbalance: async (req, res) => {
            try {
              
                  let {account}=req.params;
                  const address = web3.utils.checkAddressChecksum(account)
                  if (address == false) return res.status(400).json({ message : "invalid address" });
                  const netbalance= await web3.eth.getBalance(account)
                  const balance=(web3.utils.fromWei(netbalance))
                  return   res.json({balance: balance})
             } catch (err) {
                 return res.status(500).json({error: err.message})
             }
         },



  //will fetch the token symbol
    gettokensymbol: async (req, res) => {
        try {
               
                const networkId = await web3.eth.net.getId();
                const tetherToken = await new web3.eth.Contract(
                contractabi,
                contractaddress
                 );
                const tx = await tetherToken.methods.symbol().call();
                return res.status(200).json({msg:tx})
       } catch (err) {
                return res.status(500).json({msg: err.message})
        }
    },
    

        //will fetch the balance of tokens in particular address
        gettokenbalance: async (req, res) => {
            const {accountbal} =req.params
            try {
                const networkId = await web3.eth.net.getId();
                const tetherToken = await new web3.eth.Contract(
                contractabi,
                contractaddress
                );
            const tokenbalance = await tetherToken.methods.balanceOf(accountbal).call();

            const etherValue = tokenbalance/1000000
            return res.status(200).json({msg:etherValue})
            } catch (err) {
                return res.status(500).json({msg: err.message})
        }
        },






    //will transfer tokens to another account
    transfertoken: async (req, res) => {
        const { fromaddress, privatekey, receiveraddress, recieveramount } = req.body;
                 
                 
             try {
                 
                  const networkId = await web3.eth.net.getId();
                  const tetherToken = await new web3.eth.Contract(
                    finalcontractabi,
                    contractaddress
               );
                   const account = web3.utils.checkAddressChecksum(receiveraddress)
                   console.log("135");
                   if (account==false) return res.status(500).json({msg:"invalid reciever address"})
                   
                   const sendamount =  recieveramount*1000000
                   console.log("send amount",sendamount);
                   const finalamount=sendamount.toString();
                    

                     console.log("141",finalamount);
                   const mint =await tetherToken.methods.transfer(receiveraddress,1)
                   const gas= await mint.estimateGas({from:fromaddress})
                   const data=mint.encodeABI();
                  console.log("141");
                   const nonce= await web3.eth.getTransactionCount(fromaddress)
                   console.log("nonce",nonce);
                   const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },privatekey
                      )
                  
                   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                   if(receipt.status==true){
                         return res.json({msg: `transaction sucess! Hash :${receipt.transactionHash}`})
                     }
                res.status(400).json({msg: `error:${receipt.transactionHash}`})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
    





 

//will transfer tokens to another account
    burntokens: async (req, res) => {
                      const {burnableamount}=req.body;
               try {
                      const web3= new Web3(maticurl);
                      const networkId = await web3.eth.net.getId();
                      const tetherToken = await new web3.eth.Contract(
                          finalcontractabi,
                          contractaddress
                           );
                      const mint =await tetherToken.methods.burn(burnableamount)
                      const gas= await mint.estimateGas({from:address})
                      const data=mint.encodeABI();
                   
                      const nonce= await web3.eth.getTransactionCount(address)
                      const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },account1privatekey
                         )
                   
                       const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                       if(receipt.status==true){
                            return res.status(200).json({msg: `sucessfully burned Tokens! Hash :${receipt.transactionHash}`})
                         }
                res.status(400).json({msg: `error:${receipt.transactionHash}`})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },

//will transfer tokens to another account
    transferownership: async (req, res) => {
                      
                      const {newowner}=req.body;
                      
                  try {
                      const web3= new Web3(maticurl);
                      const networkId = await web3.eth.net.getId();
                      const tetherToken = await new web3.eth.Contract(
                             finalcontractabi,
                              contractaddress
                            );
                      const mint =await tetherToken.methods.transferOwnership(newowner)
                      const gas= await mint.estimateGas({from:address})
                      const data=mint.encodeABI();
                   
                      const nonce= await web3.eth.getTransactionCount(address)
                      const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },account1privatekey)
                     
                      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                      if(receipt.status==true){
                          return res.status(200).json({msg: `sucessfully burned Tokens! Hash :${receipt.transactionHash}`})
                               }
                            res.status(400).json({msg: `error:${receipt.transactionHash}`})
                   } catch (err) {
                          return res.status(500).json({msg: err.message})
            }
        },

    //will fetch the token owner
    getOwner: async (req, res) => {
                    try {
                        const web3= new Web3(maticurl);
                        const networkId = await web3.eth.net.getId();
                        const tetherToken = await new web3.eth.Contract(
                        contractabi,
                        contractaddress);
                        const tx = await tetherToken.methods.getOwner().call();
                        return res.stats(200).json({msg:tx})
                    } catch (err) {
                        return res.status(500).json({msg: err.message})
                    }
            },


    //will transfer tokens to another account
    approvespender: async (req, res) => {
                
               const {spenderaddress,amount}=req.body;
               try {
                     const web3= new Web3(maticurl);
                     const networkId = await web3.eth.net.getId();
                     const tetherToken = await new web3.eth.Contract(
                     finalcontractabi,
                     contractaddress);
                     const account = web3.utils.checkAddressChecksum(spenderaddress)
                          
                    if (account==false) return res.json({msg:"invalid spender address"}) 
                     const mint =await tetherToken.methods.approve(spenderaddress,amount)
                     const gas= await mint.estimateGas({from:address})
                     const data=mint.encodeABI();
                  
                     const nonce= await web3.eth.getTransactionCount(address)
                     const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },account1privatekey)
                    
                     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                     if(receipt.status==true){
                     return res.status(200).json({msg: `approved tokens sucessfully! Hash :${receipt.transactionHash}`})
                        }
                       res.status(400).json({msg: `error:${receipt.transactionHash}`})
                } catch (err) {
                       return res.status(500).json({msg: err.message})
            } 
        },


   //will transfer tokens to another account
    transferFrom: async (req, res) => {
                
                    const {fromaddress,spenderaddress,amount}=req.body;
            try {
                    const web3= new Web3(maticurl);
                    const networkId = await web3.eth.net.getId();
                    const tetherToken = await new web3.eth.Contract(
                        finalcontractabi,
                        contractaddress);
                   const account = web3.utils.checkAddressChecksum(fromaddress)
                    if (account==false) return res.json({msg:"invalid from address"}) 
                    const account1 = web3.utils.checkAddressChecksum(spenderaddress)
                    if (account1==false) return res.json({msg:"invalid sender address"}) 
                      const mint =await tetherToken.methods.transferFrom(fromaddress,spenderaddress,amount)
                      const gas= await mint.estimateGas({from:address2})
                      const data=mint.encodeABI();
                    
                      const nonce= await web3.eth.getTransactionCount(address2)
                      const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },privatekey2)
                    
                     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                     if(receipt.status==true){
                     return res.status(200).json({msg: `sucessfully send tokens! Hash :${receipt.transactionHash}`})
                     }
                       res.status(400).json({msg: `error:${receipt.transactionHash}`})
            } catch (err) {
                    return res.status(500).json({msg: err.message})
                }
        },



        //will transfer tokens to another account
    burnFrom: async (req, res) => {
                 
                    const {burnaccount,amount}=req.body;
            try { 
                    const web3= new Web3(maticurl);
                    const networkId = await web3.eth.net.getId();
                    const tetherToken = await new web3.eth.Contract(
                    finalcontractabi,
                    contractaddress);
                    const account = web3.utils.checkAddressChecksum(burnaccount)
                    if (account==false) return res.json({msg:"invalid from address"}) 
                    const mint =await tetherToken.methods.burnFrom(burnaccount,amount)
                    const gas= await mint.estimateGas({from:address2})
                    const data=mint.encodeABI();
                  
                    const nonce= await web3.eth.getTransactionCount(address2)
                    const signedTx = await web3.eth.accounts.signTransaction({
                            to:tetherToken.options.address,
                            data,
                            gas,
                            nonce:nonce,
                            chainId:networkId
                      },privatekey2)
                  
                    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    if(receipt.status==true){
                    return res.status(200).json({msg: `sucessfully burn tokens from ${burnaccount}! Hash :${receipt.transactionHash}`})
                    }
                    res.status(400).json({msg: `error:${receipt.transactionHash}`})
         } catch (err) {
                    return res.status(500).json({msg: err.message})
            }
        }
        

        
        
}



module.exports = token