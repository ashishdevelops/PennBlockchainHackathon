// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/YOUR-PROJECT-ID"));

// // ABI of the smart contract
// const abi = [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_greeting",
//         "type": "string"
//       }
//     ],
//     "name": "setGreeting",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getGreeting",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// // Address where the smart contract is deployed
// const contractAddress = "0x1234567890123456789012345678901234567890";

// // Create a contract object from the ABI and address
// const contract = new web3.eth.Contract(abi, contractAddress);

// // Call the setGreeting function with a parameter
// contract.methods.setGreeting("Hello World").send({ from: "0x1234567890123456789012345678901234567890" }, (error, transactionHash) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log(transactionHash);
// });

// Address where the smart contract is deployed
import Web3 from 'web3';
import abi from "./SubscriptionManagerABI.json";
const contractAddress = "0xC26B1E05D1acF6d2Ae49212135E9DA8857E8C256";

// Create a contract object from the ABI and address
//const web3 = new Web3(Web3.givenProvider);
//const web3 = new Web3(window.ethereum);
//await window.ethereum.enable();

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.contract(abi.abi).at(contractAddress);;

async function walletConnect(contract) {
    const rtn = await contract.methods.walletConnect().send();
    console.log(rtn);
    return rtn;
}

async function hasNFT(contract, account) {
    const rtn = await contract.methods.balanceOf(account).call();
    return rtn;
}

async function getRoyaltys(contract,id) {
    const rtn = await contract.methods.getRoyaltys(id).call();
    return rtn;
}

async function addSubscription(sender, contract) {
    const rtn = await contract.methods.addSubscription().send({from: sender});
    return rtn;
}

async function cancelSubscription(sender, contract) {
    const rtn = await contract.methods.cancelSubscription().send({from: sender});
    return rtn;
}

async function updateRate(sender, contract, newRate) {
    try {
        const rtn = await contract.methods.updateRate(newRate).send({from: sender});
        return rtn;
    } catch(err) {
        console.error(err);
    }
}

async function maxWithdrawForSubscriber(contract, sender) {
    try {
        const rtn = await contract.methods.maxWithdrawForSubscriber().send({from: sender});
        return rtn;
    } catch(err) {
        console.error(err);
    }
}

async function maxWithdrawForPublisher(sender, contract) {
    try {
        const rtn = await contract.methods.maxWithdrawForSubscriber().send({from: sender});
        return rtn;
    } catch(err) {
        console.error(err);
    }
}



export {walletConnect, getRoyaltys, addSubscription, cancelSubscription, contract, updateRate, maxWithdrawForSubscriber, maxWithdrawForPublisher, hasNFT}