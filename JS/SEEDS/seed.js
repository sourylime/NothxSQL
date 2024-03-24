const mongoose = require('mongoose');
const { User } = require('./models.js'); // Importing User model from models.js

// Seed data
const usersData = [
    {
        username: 'user1',
        age: 21,
        email: 'user1@example.com',
        userId: '65ed27de87033faeb5d920e1',
        thoughts: ['user1_thought1', 'user1_thought2'],
        friends: ['65ed27de87033faeb5d920e0']
    },
    {
        username: 'user2',
        age: 22,
        email: 'user2@example.com',
        userId: '65ed27de87033faeb5d920e2',
        thoughts: ['user2_thought1'],
        friends: ['65ed27de87033faeb5d920e1']
    },
    {
        username: 'user3',
        age: 23,
        email: 'idk@idk.com',
        userId: '65ed27de87033faeb5d920e0',
        thoughts: ['thought1', 'thought2', 'thought3'],
        friends: ['65ed27de87033faeb5d920e2']
    }
];


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_network')
    .then(() => {
        console.log('Connected to MongoDB');

        // Insert seed data
        return User.insertMany(usersData);
    })
    .then(() => {
        console.log('Seed data inserted successfully');
    })
    .catch(err => {
        console.error('Error seeding database:', err);
    })
    .finally(() => {
        // Close the connection after seeding is done
        mongoose.disconnect();
    });
