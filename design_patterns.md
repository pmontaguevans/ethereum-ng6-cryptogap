# Design Pattern Decisions

## Fail early and fail loud
CryptoPark contract use require statements instead of if-conditionals in their functions where it's necessary to determine input.

## Restricting Access
The following modifiers restrict execution to only permitted addresses.

#### isOwner
#### stopInEmergency
#### verifyEmployee

## Auto Deprecation
Not in use or need for in this project.

## Mortal
The contract is implementing the mortal design pattern. It gives users the ability to destroy the contract and remove it from the blockchain.

## Circuit Breaker
Uses a boolean value called stopped to determine that certain functions are restricted. The variable is used in the stopInEmergency function modifier and stops any state change if true. Only the owner of the contract can call this.

# Test coverage
The tests files marketplace_stores.test.js and marketplace.test.js are found in the test folder in the project root. The tests are run by running truffle test.

The tests run checks to see that the basic funcationality works.

First of all we want to know if the contract has been called and has set an owner to it.

The second test is to set the deployer of the contract to employee in orer to do more than interactions of read operations.

In the third test we want to check if our contract is able to accept ETH
We need to test this otherwise no visitor could enter the Cryptogalactic Amusement Park.

The fourth test is rather unnecessary, but it's just testing that the contract has an address.

The following test makes a check that an entrance fee [entranceTicketPrice] has a value of 5 so that the caller knows how much it will cost to enter the park.

The last test is testing a multiply function dependent on SafeMath lib. It takes the number of tickets [numTickets] as param and multiplies it with the entranceTicketPrice defined in contract.