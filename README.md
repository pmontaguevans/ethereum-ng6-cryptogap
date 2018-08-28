# CryptoGAP (Cryptogalactic Amusement Park)
With no prior knowledge about the Solidity language I've just partially finished my first ever (!) dApp. It is hosted by a local development Ethereum blockchain (Ganache) and developed with the excellent help of Truffle. The frontend is an Angular 6 project. The project as of now contains a visitor role and employee role.

# Running the project
## project requirements
If you are running this on a fresh install of Ubuntu 16.0.4 you will need to run these commands before continuing:

* `sudo apt install curl`
* `curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -`
* `sudo apt-get install -y nodejs` - this is to make sure you have installed and updated versions of node and npm

The following is required to run the project

* Truffle (`npm install -g truffle`)
* Ganache CLI (`npm install -g ganache-cli`) or the Ganache UI application
* MetaMask
* Installning Angular CLI may be needed depending on your environment
⋅⋅* `npm install -g @angular/cli`

## Setup
1) Clone repository and browse to the directory with the terminal.
2) Inside the `client` run `npm install`.
3) Start your local blockchain by running `ganache-cli`.
4) Copy the mnemonic phrase generated you got, open up MetaMask and click on restore from seed phrase. Paste the seed phrase and enter a password. Once you are logged in, in the network settings of MetaMask choose `localhost:8545`.
5) Open up a new terminal window and browse the project directory. Go to the contracts directory and run `truffle compile && truffle migrate`.
6) Finally run `npm start` to start off the local web server, it will run on port `4200`.

If everything is set up right you can now browse the site at `http://localhost:4200/`.

# Navigating the web application
The first thing you will see when entering the site is a navbar contain ing your address and your current balance. When a transaction is made and is completed, you will see your balance refresh automatically.

You will then see the entrance price per ticket followed by an input where you choose how many tickets you want to purchase. When entering the amount you will automatically see the calculated amount (the price you need to pay for the number of tickets). It is fairly expensive to enter the Cryptogalactic Amusement Park, but this might change in the future ;-).

Pressing the Pay entrance fee button will fire up MetaMask for you. If not, then check you MetaMask extension and you will be prompted with a confirmation message.

Pressing Confirim will redirect you to a different view where you can select the attractions of your need. For now it only contains 4 attractions due to lack of time.

## Running tests
To run the tests, browse the project directory and run the command truffle test, you should see all tests executing successfully. All tests are located in the tests folder. Descriptions about each test is found in the design_patterns.md.

## Further help
If errors are stumbled upon while visiting the site, try truffle migrate --reset which will redo the migrating part.

If you encounter errors in MetaMask, please navigate to Settings and choose RESET ACCOUNT. Reload the site and try again!
