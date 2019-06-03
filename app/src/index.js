// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import contrato from '../../build/contracts/RegistroAutorContract.json'

var RegistroAutorContract = contract(contrato);


// funcion para Registrar un documento
window.Registrar = function () {
    let hashIpfs = document.getElementById("tbxHashIpfsDoc").value;
    let nombreDoc = document.getElementById("tbxNombreDocumento").value;

    try {
        $("#msg").html("Archivo almacenado. Los datos se actualizarán cuando la transacción sea minada. Espera.")
                
        RegistroAutorContract.deployed().then(function (contrato) { return contrato.RegistrarDocumento(hashIpfs, nombreDoc, { gas: 140000, from: web3.eth.accounts[0] }) });
    } catch (err) {
        console.log(err);
    }
}

// cuando se carga la página se inicializa la conexión con la blockchain y se actualizan los votos de cada candidato
$(document).ready(function () {
    if (typeof web3 !== 'undefined') {
        console.warn("Usando de fuente externa como Metamask")
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No detectado. Redirifiendo a http://localhost:7545.");
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
});


//import Web3 from "web3";
//import metaCoinArtifact from "../../build/contracts/MetaCoin.json";

//const App = {
//  web3: null,
//  account: null,
//  meta: null,

//  start: async function() {
//    const { web3 } = this;

//    try {
//      // get contract instance
//      const networkId = await web3.eth.net.getId();
//      const deployedNetwork = metaCoinArtifact.networks[networkId];
//      this.meta = new web3.eth.Contract(
//        metaCoinArtifact.abi,
//        deployedNetwork.address,
//      );

//      // get accounts
//      const accounts = await web3.eth.getAccounts();
//      this.account = accounts[0];

//      this.refreshBalance();
//    } catch (error) {
//      console.error("Could not connect to contract or chain.");
//    }
//  },

//  refreshBalance: async function() {
//    const { getBalance } = this.meta.methods;
//    const balance = await getBalance(this.account).call();

//    const balanceElement = document.getElementsByClassName("balance")[0];
//    balanceElement.innerHTML = balance;
//  },

//  sendCoin: async function() {
//    const amount = parseInt(document.getElementById("amount").value);
//    const receiver = document.getElementById("receiver").value;

//    this.setStatus("Initiating transaction... (please wait)");

//    const { sendCoin } = this.meta.methods;
//    await sendCoin(receiver, amount).send({ from: this.account });

//    this.setStatus("Transaction complete!");
//    this.refreshBalance();
//  },

//  setStatus: function(message) {
//    const status = document.getElementById("status");
//    status.innerHTML = message;
//  },
//};

//window.App = App;

//window.addEventListener("load", function() {
//  if (window.ethereum) {
//    // use MetaMask's provider
//    App.web3 = new Web3(window.ethereum);
//    window.ethereum.enable(); // get permission to access accounts
//  } else {
//    console.warn(
//      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
//    );
//    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//    App.web3 = new Web3(
//      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
//    );
//  }

//  App.start();
//});
