# Avoiding common attacks
Following the recipe for developing smart contracts according to this spec https://consensys.github.io/smart-contract-best-practices/recommendations/

## External calls
Commonly known that with external calls comes unexpected risks and errors. Every external call should be treated as a potential security risk. This project implements stopInEmergency modifier function that pauses the contract if called, although only used in the fallback function.

## Avoid state changes after external calls
Project does not include any functionality that changes state for now.

## Be aware of the tradeoffs between send(), transfer(), and call.value()()
`transfer()` is the only function in this project being used when transferring ether.

## Favor pull over push for external calls
Only used in one place in the current `payEntranceFee` function. The balance is set to zero before the transfer function is invoked. The payable function refunds excessive ether sent to the contract.

## Don't assume contracts are created with zero balance
The `balanceOf` mapping handles everything of value.

## Remember that on-chain data is public
All functions in this project doesn't need to be kept secret. Functions that has limited access to the owner are protected with modifier functions.

## In 2-party or N-party contracts, beware of the possibility that some participants may "drop offline" and not return
Is not an issue in this project.

## Use assert() and require() properly
require() is used in payEntranceFee function to verify input.

## Beware rounding with integer division
Only one arithmetic function is used - multiplication. Guarding against this by using OpenZeppelin SafeMath lib.

## Remember that Ether can be forcibly sent to an account
There is no function that neither strictly or at all checks the balance of the contract.

## Lock pragmas to specific compiler version
CryptoPark contract are locked to 0.4.24.

## Avoid using tx.origin
tx.origin is never used. Instead CryptoPark contract uses msg.sender.

Using tx.origin would be very easy to spoof: an attacker can just figure out the right address to pass in (e.g. calling owner()) and pass that in as the parameter value.

## Timestamp Dependence
Timestamps not used.

The accuracy of timestamps are dubious.
It would be unadvicable to use timestamps as the random seed for a lottery for instance. The miner can try out thousands of acceptable timestamps, looking for one that gives him a win.

## Multiple Inheritance Caution
Contract CryptoPark only inherits Owned.sol.

Multiple inheritance could cause problems when code evolves.
If for instance one developer implements Contract A which inherits Contract B and Contract C and everything might work fine. Then as the code gets more complex and project becomes bigger, another developer is needed for the project. This developer adds a new method to Contract A with the same name as a method in Contract B. The developer is completely unaware of Contract B and C. Which method will be used could be confusing and sometimes have unexpected behavior, which will cause a hard-to-catch bug.
