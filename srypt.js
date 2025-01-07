const contractAddress = "0x5883cF67dCb2f467eba73f214CE38424fAdd0B4F"; // Dirección del contrato
const contractABI = [
    // Reemplaza esto con el ABI del contrato (JSON)
];

let web3;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        alert("Wallet connected!");
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("MetaMask is not installed!");
    }
}

async function sacrifice() {
    const token = document.getElementById("token").value;
    const amount = document.getElementById("amount").value;
    const accounts = await web3.eth.getAccounts();

    if (token && amount > 0) {
        try {
            await contract.methods.sacrifice(token, web3.utils.toWei(amount, "ether"))
                .send({ from: accounts[0] });
            alert("Sacrifice successful!");
        } catch (error) {
            console.error(error);
            alert("Transaction failed.");
        }
    } else {
        alert("Please enter valid details.");
    }
}

document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
document.getElementById("sacrificeButton").addEventListener("click", sacrifice);
