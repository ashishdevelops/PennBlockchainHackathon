// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SubscriptionManager is ERC721 {

    event subscriptionVerified();

    struct UserInfo {
        uint256 amount;
        uint256 startTime;
        uint64 rate;
        uint64 tokenId;
        bool valid;
    }
    
    address _publisherAddr;
    address[] private _currentSubscribers;
    mapping(address => UserInfo) private _userSubscriptionStatus;
    uint64 _totalSupply;
    uint64 _rate;

    constructor(string memory name_, string memory symbol_, uint64 rate_) ERC721(name_, symbol_) {
        _publisherAddr = msg.sender;
        _rate = rate_;
    }

    function pushElt(address addr, uint256 amount, uint256 startTime, uint64 tokenId) private {
        _currentSubscribers.push(addr);
        _userSubscriptionStatus[addr] = UserInfo(amount, startTime, _rate, tokenId, true);
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
            uint256 last_ind = _currentSubscribers.length - 1;
            _currentSubscribers[index] = _currentSubscribers[last_ind];
            delete _currentSubscribers[last_ind];
        }
    }

    function verifySubscription(address addr) private returns(bool status){
        require(balanceOf(addr) != 0);
        uint256 subscriptionExpireTime = _userSubscriptionStatus[addr].startTime + _userSubscriptionStatus[addr].amount / _userSubscriptionStatus[addr].rate;
        if(block.timestamp > subscriptionExpireTime){
            deleteElt(addr);
            return false;
        } else {
            return true;
        }
    }

    function updateRate(uint64 newRate) public {
        require(msg.sender == _publisherAddr);
        _rate = newRate;
    }

    function withdrawForSubscriber(address subAddr) private {
        uint256 timeElapsed = block.timestamp - _userSubscriptionStatus[subAddr].startTime;
        uint64 userRate = _userSubscriptionStatus[subAddr].rate;
        uint256 eligibleWithdrawlAmount = timeElapsed * userRate;
        
        (bool success, ) = (subAddr).call{value: eligibleWithdrawlAmount}("");
        require(success, "Failed to Send");
    }

    function withdrawForPublisher(uint64 amount) payable public {
        require(msg.sender == _publisherAddr);
        uint canExtract = 0;
        
        for(uint64 i = 0; i < _currentSubscribers.length; i+=1) {
            address subaddr = _currentSubscribers[i];
            uint256 timeUsed = _userSubscriptionStatus[subaddr].amount / _userSubscriptionStatus[subaddr].rate;
            uint256 eligibleWithdrawlAmount = (block.timestamp - timeUsed) * _userSubscriptionStatus[subaddr].rate;
            canExtract += eligibleWithdrawlAmount;
        }

        require(amount <= canExtract && amount <= address(this).balance);
        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "Failed to Send");
    }

    function cancelSubscription() public{
        require(verifySubscription(msg.sender));
        deleteElt(msg.sender);
        withdrawForSubscriber(msg.sender);
    }

    function renewSubscription() public payable{
        require(!verifySubscription(msg.sender));
        addSubscription();
    }

    function addSubscription() public payable{
        require(!verifySubscription(msg.sender));
        _totalSupply += 1;
        _safeMint(msg.sender, _totalSupply); //mint(...);
        pushElt(msg.sender, msg.value, block.timestamp, _totalSupply);
    }

    // function mint(string memory _tokenName, string memory _tokenURI) private {
    //     _totalSupply+=1;
    //     uint256 newTokenId = _totalSupply;
    //     _safeMint(msg.sender, newTokenId);
    //     _setTokenURI(newTokenId, _tokenURI);
    //     _setTokenName(newTokenId, _tokenName);
    // }

    function walletConnect() public returns(bool status) {
        return verifySubscription(msg.sender);
    }
}