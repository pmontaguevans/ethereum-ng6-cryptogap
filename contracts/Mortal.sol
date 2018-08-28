pragma solidity ^0.4.24;

import "./Owned.sol";

contract Mortal is Owned {

/**
* @notice function kill() is used to destroy the contract whenever you want.
* We only want the owner to be able to kill it.
* The remaining ether that the contract has stored will be sent to the owner’s address.
* Only use it if the contract is compromised and if so this function gives
* the ability to destroy the contract and remove it from the blockchain.
*/
    function kill() {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}