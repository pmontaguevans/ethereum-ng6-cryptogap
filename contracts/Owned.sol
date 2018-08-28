pragma solidity ^0.4.23;

contract Owned {
    address public owner;

    /// @dev The Constructor assigns the message sender to be `owner`
    constructor() public {
        owner = msg.sender;
    }

  /**
  * @dev Modifier function to check if sender is owner of contract
  */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

}