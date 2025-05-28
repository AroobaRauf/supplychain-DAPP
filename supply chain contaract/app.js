let web3;
let contract;
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // replace
const abi = [/* PASTE ABI HERE */];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    document.getElementById("walletAddress").innerText = "Connected: " + accounts[0];
    contract = new web3.eth.Contract(abi, contractAddress);
  } else {
    alert("Install MetaMask first!");
  }
}

async function addProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const status = document.getElementById("productStatus").value;

  const accounts = await web3.eth.getAccounts();
  await contract.methods.addProduct(id, name, status).send({ from: accounts[0] });
  alert("Product added.");
}

async function updateStatus() {
  const id = document.getElementById("updateId").value;
  const status = document.getElementById("newStatus").value;

  const accounts = await web3.eth.getAccounts();
  await contract.methods.updateStatus(id, status).send({ from: accounts[0] });
  alert("Status updated.");
}

async function getAuditTrail() {
  const id = document.getElementById("auditId").value;

  const result = await contract.methods.getAuditTrail(id).call();
  const display = `
Product Name: ${result[0]}
Current Status: ${result[1]}
Updated By: ${result[2].join(", ")}
Status History: ${result[3].join(" ➝ ")}
Timestamps: ${result[4].join(", ")}
  `;
  document.getElementById("auditResult").innerText = display;
}
