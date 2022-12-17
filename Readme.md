steps to run this application:



1. deploy erc20 contract on remix-ide

2. copy deployed contract address and replace in file--> blockevents/erc20-events.js file  contractAddress and in file --> utils/constant.js  -- contractaddress


3. take websocket url from blast api and replace in file --> block-events/erc20-events.js  and in utils/constants.js 'maticurl'



4. to run the application  please come to the project root path and install dependency by using "npm install" and then run server by using "node server.js" command in terminal.

5. to listen to the contract-function-events please go to file --> block-events/erc20-events.js and run "node erc20-events.js" via terminal.

6. to stop the server press ctrl+c,



postman changes:


go to http://localhost:4000/api/v1/transfertoken API:


select body and replace from address and private key with your values



