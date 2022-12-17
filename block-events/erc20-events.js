'use strict';


const node='wss://polygon-testnet.blastapi.io/ab1f8b56-9476-402e-9eb2-3461bcef5f46'

const util = require('util');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(node));

//entered bsc mainnet contract address
const contractAddress = '0x260bafd7dca3dd7b3b25765f667add3016b2f9a0';

//abi file of the contract you want to listen events
const finalcontract= require('../contractabi/contractabi.json') 



// const contractabi=contract.abi
const abi = finalcontract
let contract = new web3.eth.Contract(abi, contractAddress);



async function scan() {
  
        try {
            contract.events.Transfer((err, events)=>{
               
                if(err){
                      console.log(err)
                      }

                 console.log("events",events);
                    
                     
            let fromaddress=events.returnValues.from
            let txhash= events.transactionHash
            let toaddress=events.returnValues.to
            let amount=events.returnValues.value/1000000
            
             console.log("from address:",fromaddress,"toaddress:",toaddress,"amount:",amount,'txhash',txhash);

             })
         } catch (e) {
            console.log(e.toString());
        }
    
    }

    
     




scan()

console.log("event watcher for erc20 has started");
 









