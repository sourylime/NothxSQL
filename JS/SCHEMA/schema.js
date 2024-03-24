const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/social_network', { useNewUrlParser: true, useUnifiedTopology: true });

connection.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

// Thought Schema
const thoughtSchema = new mongoose.Schema({
    thoughts: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Other thought fields can be added here
});


// Reaction Schema
const reactionSchema = new mongoose.Schema({
    thoughtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactionBody: {
        type: String,
        max: 280,
        required: true
    },
});

{
    timestamps: true
};




// Export models
const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);




module.exports = {
    User,
    Thought,
    Reaction
};
