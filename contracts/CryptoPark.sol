pragma solidity 0.4.24;

import "./Owned.sol";
import "./SafeMath.sol";

/**
* @title CryptoPark
* @author Philip Montagu-Evans
* @notice UNFORTUNATELY due to lack of time
* all the CryptoPark functionality is implemented inside of this contract.
* Separation of Concerns are not taken into account
*/
contract CryptoPark is Owned {

    // Enables SafeMath to be used for uint
    using SafeMath for uint;

    // Keeps track of current balance
    mapping(address => uint) private balanceOf;

    // Used for emergency stop
    bool private stopped = false;

    // storeVisitorsCount tracks the number of visitors in park
    uint storeVisitorsCount;

    // Counts number of employees
    uint employeeCount;

    // Counts number of tickets sold
    uint numTickets;

    // Checks address with employee status
    mapping (address => bool) public employees;

    // price per entrance ticket
    uint public entranceTicketPrice = 5;


    uint public attractionPrice = 2;

    // holds the total amount to pay to enter the park
    uint public totalEntranceFee;

    // contract events
    event LogEmployeeCreated(address _address);
    event LogEntranceFee(uint totalEntranceFee);
    event LogPayEntranceFee(address accountAddress, uint amount);

    /**
    * @dev Emergency stop modifier which restricts certain functions from executing
    */
    modifier stopInEmergency {
        if (!stopped)
            _;
    }

     /**
     * @dev Checks if the msg.sender is an employee
     */
    modifier verifyEmployee() {
        require(employees[owner] == true, "Employee status required");
        _;
    }

    /**
    * @dev Deployer address is made owner of the contract.
    * Is also given administrator status
    */

    constructor() public {
        employees[owner] = true;
        employeeCount = 1;
        entranceTicketPrice = 5;
    }

    /**
    * @dev Gets the number of employees
    * @return The number of employees.
      */
    function getEmployeeCount() public view returns (uint) {
        return employeeCount;
    }

    /**
    * @dev Creates a new CryptoPark employee.
    * @param newEmployeeAddress - The address set to employee.
    */
    function createEmployee(address newEmployeeAddress) public stopInEmergency() verifyEmployee() {
        employees[newEmployeeAddress] = true;
        employeeCount += employeeCount;
        emit LogEmployeeCreated(newEmployeeAddress);
    }

     /**
     * @dev Checks if given address is employee.
     * @param _address Address to check for employee status.
     * @return true if address is employee, otherwise false.
     */
    function isEmployee(address _address) public view returns (bool) {
        return employees[_address];
    }

     /**
    *@notice [ Security pattern ] for potential overflow using the SafeMath library.
    * The result of this operation will be checked
    * and an error will be thrown stopping the execution of this contract.
    * This is just a way to show how a library can be implemented
    */
    function calculateTotalEntranceFee(uint numTickets) public returns (uint) {
        totalEntranceFee = entranceTicketPrice.mul(numTickets);
        emit LogEntranceFee(totalEntranceFee);
        return totalEntranceFee;
    }

    /**
    * @notice payEntranceFee sends transaction from owner to the park through Metamask
    * @param numTickets to calculate
    * @return The balance of the user after the deposit is made
    */

    function payEntranceFee(uint numTickets) public payable stopInEmergency {
        // Here we are making sure that there isn't an overflow issue
        require(balanceOf[owner] >= totalEntranceFee);
        require(msg.value >= totalEntranceFee, "Not enough value sent");

        // Refund excess value
        if (msg.value > totalEntranceFee) {
            uint excessEther = msg.value - totalEntranceFee;
            owner.transfer(excessEther);
        }

        //Set balance to zero before transfering funds to prevent re-entrance attack
        balanceOf[address(this)] = 0;

        balanceOf[owner] -= totalEntranceFee;
        balanceOf[address(this)] += totalEntranceFee;
        storeVisitorsCount += numTickets;

        //msg.value is automatically set to the amount of ether sent with that payable function.
        emit LogPayEntranceFee(owner, totalEntranceFee);
    }

    /*
        keep track of how many people are in the park for security reasons
        we don't want to exceed capacity limit
        fortunately however, we don't need to check this since the park offer interstellar travel ;-)
     */
    function keepTrackOfVisitorsInPark() public view returns (uint) {
        return storeVisitorsCount;
    }

     /**
     * @dev Emergency stop function only callable by owner of contract
     */
    function toggleContractActive() public onlyOwner {
        stopped = !stopped;
    }

    function isStopped() public view returns (bool) {
        return stopped;
    }

     /**
     * @dev circuit breaker
     * fallback function that allows contract to accept ETH
     * else Error: VM Exception while processing transaction: invalid opcode
     */
    function () public stopInEmergency payable {}

    /**
    * @notice Returns the balance of the callers address.
    * Function onlyOwner makes sure only owner can call this.
    * @param _owner The address to query the balance of.
    * @return An uint representing the amount owned by the passed address.
    */
    function getBalance(address _owner) public view onlyOwner returns (uint) {
        return balanceOf[_owner];
    }


    // gets the initial entrance fee
    function getEntranceFee() public view returns (uint) {
        return entranceTicketPrice;
    }

    // Used for displaying the contract address to the visitors
    function getContractAddress() public view returns (address) {
        return address(this);
    }
}