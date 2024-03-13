const mongoose = require('mongoose');
const { userSchema, thoughtSchema, reactionSchema } = require('./SCHEMA/schema.js');

const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = { User, Thought, Reaction };




