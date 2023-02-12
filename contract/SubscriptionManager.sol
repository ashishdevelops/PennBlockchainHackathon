// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SubscriptionManager is ERC721 {

    struct UserInfo {
        uint256 amount;
        uint256 startTime;
        uint256 rate;
        uint64 tokenId;
        bool valid;
    }

    
    address _publisherAddr;
    address[] private _currentSubscribers;
    uint64 _currentSubscribersLength;
    mapping(address => UserInfo) private _userSubscriptionStatus;
    uint64 _totalSupply;
    uint256 _rate;
    uint256 _gasCostTotal;

    // event initalStateEvent(string name, string symbol, uint256 rate);
    // event updatingRateEvent(uint256 rate);
    // event verifyingSubEvent(address addr, uint256 subscriptionExpireTime);
    // event addingToCurrentSubsEvent(address to_push, address pushed_addr, uint64 currentSubscribersLength, uint64 tokenId);
    // event deletingFromCurrentSubsEvent(address to_deleted, address popped_addr, uint256 currentSubscribersLength);
    // event withdrawlAmountEvent(address recipient, uint256 eligibleWithdrawlAmount, uint256 canExtract);

    constructor(string memory name_, string memory symbol_, uint256 rate_) ERC721(name_, symbol_) {
        _publisherAddr = msg.sender;
        _rate = rate_;
        _currentSubscribersLength = 0;
        _gasCostTotal = block.gaslimit * block.basefee;
        // emit initalStateEvent(name_, symbol_, rate_);
    }

    function pushElt(address addr, uint256 amount, uint256 startTime, uint64 tokenId) private {
        _currentSubscribers.push(addr);
        _currentSubscribersLength += 1;
        _userSubscriptionStatus[addr] = UserInfo(amount, startTime, _rate, tokenId, true);
    }

    function deleteElt(address addr) private {
        uint64 index = 0;
        bool found = false;
        for(uint64 i = 0; i < _currentSubscribersLength; i+=1) {
            if(_currentSubscribers[i] == addr) {
                index = i;
                found = true;
                break;
            }
        }

        require(found);

        _userSubscriptionStatus[_currentSubscribers[index]].valid = false;
        uint256 last_ind = _currentSubscribers.length - 1;
        _currentSubscribers[index] = _currentSubscribers[last_ind];
        _currentSubscribersLength -=1;
        delete _currentSubscribers[last_ind];
    }

    function verifySubscriptionHelper(address addr) private view returns(int8 status){
        if(balanceOf(addr) == 0){
            return -1;
        }
        if(_userSubscriptionStatus[addr].valid == false) {
            return -1;
        }
        uint256 subscriptionExpireTime = _userSubscriptionStatus[addr].startTime + _userSubscriptionStatus[addr].amount / _userSubscriptionStatus[addr].rate;
        if(block.timestamp <= subscriptionExpireTime){
            // emit verifyingSubEvent(addr, subscriptionExpireTime);
            return 1;
        }

        return 0;
    }

    function verifySubscription(address addr) private returns(bool status){
        int8 verification = verifySubscriptionHelper(addr);
        if(verification == 0){
            deleteElt(addr);
        }
        if(verification <= 0){
            return false;
        }else{
            return true;
        }
    }

    function updateRate(uint64 newRate) public {
        require(msg.sender == _publisherAddr);
        _rate = newRate;

        // emit updatingRateEvent(_rate);
    }

    function maxWithdrawForSubscriber() public view returns (uint256) {
        require(verifySubscriptionHelper(msg.sender) > 0, "fails verification");
        uint256 timeElapsed = block.timestamp - _userSubscriptionStatus[msg.sender].startTime;
        uint256 userRate = _userSubscriptionStatus[msg.sender].rate;
        uint256 eligibleWithdrawlAmount = _userSubscriptionStatus[msg.sender].amount - (timeElapsed * userRate);

        return eligibleWithdrawlAmount;
    }

    function maxWithdrawForPublisher() public view returns (uint256) {
        require(msg.sender == _publisherAddr, "fails verification");

        uint256 canExtract = 0;
        
        for(uint64 i = 0; i < _currentSubscribersLength; i+=1) {
            address subaddr = _currentSubscribers[i];
            //uint256 timeUsed = _userSubscriptionStatus[subaddr].amount / _userSubscriptionStatus[subaddr].rate;
            uint256 eligibleWithdrawlAmount = (block.timestamp - _userSubscriptionStatus[subaddr].startTime) * _userSubscriptionStatus[subaddr].rate;
            canExtract += eligibleWithdrawlAmount;
        }

        return canExtract;
    }

    function withdrawForSubscriber(address subAddr) private returns (uint256) {
        uint256 timeElapsed = block.timestamp - _userSubscriptionStatus[subAddr].startTime;
        uint256 userRate = _userSubscriptionStatus[subAddr].rate;

        uint256 eligibleWithdrawlAmount = _userSubscriptionStatus[subAddr].amount - (timeElapsed * userRate);
        
        (bool success, ) = (subAddr).call{value: eligibleWithdrawlAmount}("");
        require(success, "Failed to Send");
        return eligibleWithdrawlAmount;
    }

    function withdrawForPublisher(uint256 amount, bool wantMax) payable public {
        require(msg.sender == _publisherAddr, "you are not publisher");

        uint256 canExtract = maxWithdrawForPublisher();
        if(wantMax){
            amount = canExtract - _gasCostTotal - 1000;
        }
        require(amount <= canExtract && amount <= address(this).balance);
        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "Failed to Send");

        // emit withdrawlAmountEvent(_publisherAddr, amount, canExtract);
    }

    function cancelSubscription() public{
        require(verifySubscription(msg.sender), "fails verification");
        deleteElt(msg.sender);
        // uint256 eligibleWithdrawlAmount = 
        withdrawForSubscriber(msg.sender);
        // emit withdrawlAmountEvent(msg.sender, eligibleWithdrawlAmount, eligibleWithdrawlAmount);
        // emit deletingFromCurrentSubsEvent(msg.sender, _currentSubscribers[_currentSubscribersLength], _currentSubscribersLength);
    }

    function renewSubscription() public payable{
        require(!verifySubscription(msg.sender), "fails verification");
        addSubscription();
    }

    function addSubscription() public payable{
        require(!verifySubscription(msg.sender) && msg.value > 0, "fails verification or 0 funds");
        _safeMint(msg.sender, _totalSupply); //mint(...);
        pushElt(msg.sender, msg.value, block.timestamp, _totalSupply);
        _totalSupply += 1;
        // emit addingToCurrentSubsEvent(msg.sender, _currentSubscribers[_currentSubscribersLength], _currentSubscribersLength, _totalSupply);
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