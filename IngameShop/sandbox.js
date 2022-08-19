'use strict';

const fs = require('fs');
const bcrypt = require('bcryptjs');

//Image URLs for profile pictures
let accounts = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'));

const imageURL = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/men/8.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/women/9.jpg",
  "https://randomuser.me/api/portraits/men/10.jpg",
  "https://randomuser.me/api/portraits/women/10.jpg",
]

for (let i = 0; i < imageURL.length; i++) {
  for (let j = 0; j < accounts.length; j++) {
    accounts[j].profilePicture = imageURL[i];
    i++;
  }
}

strAccounts = JSON.stringify(accounts, null, 2);
console.log(strAccounts);
fs.writeFileSync('./data/accounts.json', strAccounts);

//Parse data from JSON file
const users = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
  .map((el) => {
    let { email, password, role } = el;
    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);
    return {
      email, password, role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

const profiles = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf-8'))
  .map((el) => {
    let { name, profilePicture, id } = el;
    return {
      name, profilePicture,
      UserId: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

console.log(users);
console.log(profiles);