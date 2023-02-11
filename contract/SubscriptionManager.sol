// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SubscriptionManager is ERC721 {

    event subscriptionVerified();

    struct UserInfo {
        uint64 amount;
        uint64 startTime;
        uint64 endTime;
        address authorityNFT;
        bool valid;
    }
    
    address[] private _currentSubscribers;
    mapping(address => UserInfo) private _userSubscriptionStatus;
    uint64 _totalSupply;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function pushElt(address addr, uint64 amount, uint64 startTime, uint64 endTime) private {
        _currentSubscribers.push(addr_);
        _userSubscriptionStatus = UserInfo(amount_, startTime_, endTime_, true);
    }

    function deleteElt(address addr) private {
        uint64 index = 0;
        bool found = false;
        for(uint64 i = 0; i < _currentSubscribers.length; i+=1) {
            if(_currentSubscribers[i] == addr) {
                index = i;
                found = true;
                break;
            }
        }

        if(found){
            _userSubscriptionStatus[_currentSubscribers[index]].valid = false;
            uint64 last_ind = _currentSubscribers.length - 1;
            _currentSubscribers[index] = _currentSubscribers[last_ind];
            delete _currentSubscribers[last_ind];
        }
    }

    function verifySubscription(address addr) private {
        uint64 curr_time = now;
        if(curr_time > _userSubscriptionStatus[addr].endTime){
            deleteElt(addr);
            return false;
        }else{
            return true;
        }
    }

    function cancelSubscription() {
        require(verifySubscription(msg.sender));
        deleteElt(addr);
    }

    function renewSubscription(uint64 amount, uint64 startTime, uint64 endTime) {
        require(!verifySubscription(msg.sender));
        addSubcription(amount, startTime, endTime);
    }

    function addSubscription(uint64 amount, uint64 startTime, uint64 endTime){
        _userSubscriptionStatus[msg.sender].amount = amount;
        _userSubscriptionStatus[msg.sender].startTime = now;
        _userSubscriptionStatus[msg.sender].endTime = endTime;
        _userSubscriptionStatus[msg.sender].authorityNFT = endTime;
        mint();
    }

    function mint(string memory _tokenName, string memory _tokenURI) public {
        _totalSupply+=1;
        uint256 newTokenId = _totalSupply;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        _setTokenName(newTokenId, _tokenName);
    }

    function walletConnect() returns(bool status) {
        return verifySubscription(msg.sender);
    }
}