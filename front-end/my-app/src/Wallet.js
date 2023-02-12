import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';

import Button from '@mui/material/Button';

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
 });

export default function ConnectWallet() {
    const { active, chainId, account, activate, deactivate } = useWeb3React();
    return (
        <Button>onClick={() => activate(Injected)}</Button>
    )
}

function IsActive() {
    const { active, chainId, account, activate, deactivate } = useWeb3React();

    return active;
}

function GetAccount() {
    const { active, chainId, account, activate, deactivate } = useWeb3React();
    return account;
}

// Does not work as cannot deactivate MetaMask without manual
/* 
function DeactivateWallet() {
    const { active, chainId, account, activate, deactivate } = useWeb3React();
    deactivate(Injected);
}
*/

export { IsActive, GetAccount };