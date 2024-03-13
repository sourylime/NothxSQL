const express = require('express');
const { User, Thought, Reaction } = require('./models');
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) { console.log(error); } res.status(500).json(error);
});
// Create a user
router.post('/users', async (req, res) => {
    try {
        const { username, email, age } = req.body;
        if (!username || !email || !age) {
            return res.status(400).json({ message: 'Username, email, and age are required' });
        }

        const user = new User({ username, email, age });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single user

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (error) { console.log(error); } res.status(500).json(error);
}
);
// Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Create a thought
router.post('/thoughts', async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ message: 'userId and content are required' });
        }

        const thought = new Thought({ userId, thought: content });
        await thought.save();

        res.status(201).json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Add thought to user's thoughts array and return thought
router.post('/thoughts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content, userId } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ message: 'userId and content are required' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const thought = new Thought({ content, userId });
        await thought.save();

        user.thoughts.push(thought._id);
        await user.save();

        res.status(201).json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});







// Get a single thought
router.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Update a thought
router.put('/thoughts/:id', async (req, res) => {
    try {
        const thought
            = await Thought.findByIdAndUpdate
                (req.params.id, req.body
                    , { new: true });
        res.json(thought);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
// Delete a thought
router.delete('/thoughts/:id', async (req, res) => {

    try {

        // Delete thought
        const thought = await Thought.findByIdAndDelete(req.params.id);

        // Remove thought from user's thoughts array
        const user = await User.findById(thought.userId);
        user.thoughts.pull(thought._id);
        await user.save();

        res.json(thought);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
);

// get reactions
router.get('/reactions', async (req, res) => {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch (error) { console.log(error); }
}
);

// create a reaction
router.post('/reactions', async (req, res) => {
    try {
        const reaction = new Reaction(req.body);
        await reaction.save();
        res.status(201).json(reaction);
    } catch (error) { console.log(error); }
}
);

// get a single reaction
router.get('/reactions/:id', async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        res.json(reaction);
    } catch (error) { console.log(error); }
}
);

// update a reaction
router.put('/reactions/:id', async (req, res) => {
    try {
        const reaction = await Reaction.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.json(reaction);
    } catch (error) { console.log(error); }
}
);

// delete a reaction
router.delete('/reactions/:id', async (req, res) => {
    try {
        const reaction = await Reaction.findByIdAndDelete(req.params.id);
        res.json(reaction);
    } catch (error) { console.log(error); }
}
);

// get reactions to a thought
router.get('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const reactions = await Reaction.find({ thoughtId: req.params.thoughtId });
        res.json(reactions);
    } catch (error) { console.log(error); }
}
);
// Add a reaction to a thought
router.get('/friends', async (req, res) => {
    try {
        const friends = await User.find();
        res.json(friends);
    } catch (error) { console.log(error); }
}
);

// Add a friend
router.post('/users/:userId/friends/:friendId', async (req, res) => {

    // Add friend to user's friends array
    try {
        const user = await User.findById(req.params.userId);
        user.friends.addToSet(req.params.friendId);
        await user.save();
    } catch (error) { console.log(error); }

    // Add user to friend's friends array
    try {
        const friend = await User.findById(req.params.friendId);
        friend.friends.addToSet(req.params.userId);
        await friend.save();
    } catch (error) { console.log(error); }

    res.json(user);

}
);
// Get all friends
router.get('/friends/:id', async (req, res) => {
    try {
        const friend = await User.findById(req.params.id);
        res.json(friend);
    } catch (error) { console.log(error); }
}
);
// Update a friend
router.put('/friends/:id', async (req, res) => {
    try {
        const friend = await User.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.json(friend);
    } catch (error) { console.log(error); }
}
);

// Delete a friend
router.delete('/users/:userId/friends/:friendId', async (req, res) => {

    // Remove friend from user's friends array
    try {
        const user = await User.findById(req.params.userId);
        user.friends.pull(req.params.friendId);
        await user.save();
    } catch (error) { console.log(error); }

    // Remove user from friend's friends array
    try {
        const friend = await User.findById(req.params.friendId);
        friend.friends.pull(req.params.userId);
        await friend.save();
    } catch (error) { console.log(error); }

    res.json(user);

}
);

module.exports = router;





