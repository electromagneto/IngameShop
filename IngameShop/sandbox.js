const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
  .map((el) => {
    const { email, password, role } = el;
    return {
      email, password, role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

const profiles = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
  .map((el) => {
    const { name, profilePicture, id } = el;
    return {
      name, profilePicture,
      UserId: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });


  // console.log(users);
  console.log(profiles);