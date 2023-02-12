import logo from './logo.svg';
import './App.css';
import React from 'react';
import Blog from './Blog';



//https://docs.cloud.coinbase.com/wallet-sdk/docs/web3-react
function App() {

    return (
      <div>
        <Blog />
      </div>
  );

}

export default App;

/*<button onClick={deactivate}>Disconnect</button>*/

/*


import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
);

*/


/*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => { activate(Injected) }}>Metamask</button>
      </header>
      <div>
     
      </div>
    </div>
  );
}
*/