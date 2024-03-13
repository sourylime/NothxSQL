const mongoose = require('mongoose');
const { User } = require('./models.js'); // Importing User model from models.js

// Seed data
const usersData = [
    { username: 'user1', age: 21, email: 'user1@example.com' },
    { username: 'user2', age: 22, email: 'user2@example.com' },
    // Add more users as needed
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
