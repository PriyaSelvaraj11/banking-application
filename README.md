A simple banking application built using **NodeJS, Sequelize ORM and PostgresSQL**

**Requirements**
- Account balance cannot exceed $100,000
- Account balance cannot be less than $0
- The minimum deposit amount is $500 per transaction
- The maximum deposit amount is $50,000 per transaction
- The minimum withdrawal amount is $1,000 per transaction
- The maximum withdrawal amount is $25,000 per transaction
- No more than 3 deposits are allowed in a day
- No more than 3 withdrawals are allowed in a day
- Account number entered during deposit or withdrawal should be valid
- Account has sufficient balance during withdrawals
- Input commands: CREATE, BALANCE, DEPOSIT, WITHDRAW, TRANSFER

**Prerequisites to be installed in the computer to run this application**
1. Node JS 
2. Docker

**Command for the docker**
1. start the docker:
    docker-compose up
2. stop the docker:
    docker-compose down

**Commands to start the application**
1. run the app:
    npm run start
2. run the tests:
    npm run test
2. check the code coverage:
    npm run test:coverage

**Code coverage stats**
<img src="/appImages/CodeCoverage.png" alt="Code Coverage" width="400"/>
