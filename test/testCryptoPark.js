// var EntrancePayment = artifacts.require('./EntrancePayment.sol');

// contract('EntrancePayment', function(accounts) {
//     let contract;
//     let web3Contract;
//     let owner;

//     before(async() => {
//         contract = await EntrancePayment.deployed();
//         web3Contract = web3.eth.contract(contract.abi).at(contract.address);
//         owner = web3Contract._eth.coinbase;
//     });

//     // We want to know if the contract has been called and has set an owner to it
//     // contract.owner() is the owner that we passed to when creating the contract
//     it('has an owner', async function() {
//         assert.equal(await contract.owner(), owner);
//     });

//     // This test is pretty much unnecessary, but it checks to see that the contract address is equal to the web3Contract.
//     it('should return contract address', async function() {
//         const contractAddress = await contract.getContractAddress.call();
//         assert.equal(web3Contract.address, contractAddress);
//     });
//     // We want to check if our contract is able to accept ETH
//     it('is able to accept funds', async function() {
//         await contract.sendTransaction({
//             value: 1e18,
//             from: owner
//         });
//         const contractAddress = await contract.address;
//         assert.equal(web3.eth.getBalance(contractAddress).toNumber(), 1e18);
//     });
//     // testing that expected value is equal to the fixed entranceTicketPrice
//     it('should return entrance fee', async function() {
//         let entranceTicketPrice = await contract.entranceTicketPrice();
//         let expected = 5;
//         assert.equal(
//             entranceTicketPrice,
//             expected,
//             "Expected value doesn't match entranceTicketPrice"
//         );
//     });
//     // testing function dependent on SafeMath lib. It takes numTickets as param
//     // and multiplies it with entranceTicketPrice defined in contract.
//     it('should multiply numTickets with entranceTicketPrice', async function() {
//         let numTickets = 4;
//         let expected = 20;

//         let total = await contract.calculateTotalEntranceFee.call(numTickets);

//         assert.equal(
//             total.toNumber(),
//             expected,
//             'Calculate function did not match expected value'
//         );
//     });
// });

var CryptoPark = artifacts.require('./CryptoPark.sol');

contract('CryptoPark', function(accounts) {
    // const owner = accounts[0];

    let cryptoParkContract;
    let web3Contract;
    let owner;

    // const alice = accounts[1];
    // const bob = accounts[2];
    // const emptyAddress = '0x0000000000000000000000000000000000000000';

    before(async() => {
        cryptoParkContract = await CryptoPark.deployed();
        web3Contract = web3.eth
            .contract(cryptoParkContract.abi)
            .at(cryptoParkContract.address);
        owner = web3Contract._eth.coinbase;
    });

    // contract.owner() is the owner that we passed to when creating the contract
    it('has an owner', async function() {
        assert.equal(await cryptoParkContract.owner(), owner);
    });

    it('Owner gets created with employee status', async() => {
        let ownerIsEmployee = await cryptoParkContract.isEmployee(owner);
        assert.strictEqual(ownerIsEmployee, true);
    });

    // We want to check if our contract is able to accept ETH
    it('is able to accept funds', async function() {
        await cryptoParkContract.sendTransaction({
            value: 1e18,
            from: owner
        });
        const contractAddress = await cryptoParkContract.address;
        assert.equal(web3.eth.getBalance(contractAddress).toNumber(), 1e18);
    });

    // This test is pretty much unnecessary, but it checks to see that the contract address is equal to the web3Contract.
    it('should return contract address', async function() {
        const contractAddress = await cryptoParkContract.getContractAddress.call();
        assert.equal(web3Contract.address, contractAddress);
    });
    // testing that expected value is equal to the fixed entranceTicketPrice
    it('should return entrance fee', async function() {
        let entranceTicketPrice = await cryptoParkContract.entranceTicketPrice();
        let expected = 5;
        assert.equal(
            entranceTicketPrice,
            expected,
            "Expected value doesn't match entranceTicketPrice"
        );
    });
    // testing function dependent on SafeMath lib. It takes numTickets as param
    // and multiplies it with entranceTicketPrice defined in contract.
    it('should multiply numTickets with entranceTicketPrice', async function() {
        let numTickets = 4;
        let expected = 20;

        let total = await cryptoParkContract.calculateTotalEntranceFee.call(
            numTickets
        );

        assert.equal(
            total.toNumber(),
            expected,
            'Calculate function did not match expected value'
        );
    });
});