import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

//Web3
import { ethers } from "ethers";
import { getAllThreads, getAuthToken, getComments } from "./api/api";

function App() {
  const [provider, setProvider] = useState(null);

  //Convo
  const [signerAddress, setSignerAddress] = useState("");

  const loadWeb3 = async () => {
    // if (myAddr) return alert("Already connected");

    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await window.ethereum.enable();
        const signer = _provider.getSigner();

        const _signerAddress = await signer.getAddress();

        // Request account access if needed
        // Acccounts now exposed
        setProvider(_provider);
        // setMyAddr(signerAddress);
        setSignerAddress(_signerAddress);
      } catch (error) {
        // User denied account access...
        alert(error.message);
      }
    } else {
      // Non-dapp browsers...
      alert("Wallet not found");
    }
  };

  useEffect(() => {
    loadWeb3();

    (async () => {
      const comments = await getComments();

      console.log({ comments });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConvoAuthToken = async () => {
    const timestamp = Date.now();
    const signer = provider.getSigner();

    // console.log({ signerAddress, signature, timestamp });

    try {
      const signerAddress = await signer.getAddress();
      const data = `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
      const signature = await provider.send("personal_sign", [
        ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
        signerAddress.toLowerCase(),
      ]);
      const res = await getAuthToken({
        signerAddress,
        signature,
        timestamp,
      });

      console.log({ res });
    } catch (error) {
      console.log({ error: error?.response?.data });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p title={signerAddress}>
          Eth Addr: {signerAddress.slice(0, 5)}....{signerAddress.slice(-5)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="metamask-btn" onClick={loadWeb3}>
          <img src="https://docs.metamask.io/metamask-fox.svg" alt="metamask" />
          {signerAddress ? "Connected to metamask" : "Connect to metamask"}
        </button>
        <button className="metamask-btn" onClick={getConvoAuthToken}>
          Get Auth
        </button>
      </header>
    </div>
  );
}

export default App;
