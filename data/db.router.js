const express = require ('express');

const Data = require('./db');

const router = express.Router();

//* get <<<<< posts data
router.get('/', (req, res) => {
    Data.find()
    .then(data => {
        res.status(200).json({ success: true, data });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ success: false, Message: 'posts information can not be retrieved', err });
    })
});

//
router.get("/:id", (req, res) => {
const { id } = req.params;

Data.findById(id).then(found => {
    if(found){
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }
}).catch(err => {
    console.log(err)
    res.status(500).json({error: "The post information could not be retrieved."})
})
});
// 
router.get("/:id/comments", (req, res) => {
const { id } = req.params;

Data.findCommentById(id).then(found => {
    if(found){
        res.status(200).json(found)
    } else {
        res.status(500).json({message: "The comment with the specified ID does not exist."})
    }
}).catch(err => {
    console.log(err)
    res.status(500).json({error: "The comments information could not be retrieved."})
});
});
//
router.post("/", (req, res) => {
const newPost = req.body

if(newPost.title && newPost.contents){
    Data.insert(newPost)
    .then(post=> {
        res.status(201).json(post)
    }).catch(err => {
    console.log(err)
    res.status(500).json({error: "There was an error while saving the post to the database"})
})
} else {
res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
}
});

// here.................
router.post("/:id/comments", (req, res) => {
const {id}  = req.params;
const payload = { ...req.body, post_id: id }


Data.findById(id).then(response => {
    if (response.length === 0) {
        res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
        });
    }
    });
    if (!req.body.text) {
    return res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
    Data.insertComment(payload).then(response => {
        res.status(201).json(response);
        })
        .catch(err => {
        console.log(err.response);
        res.status(500).json({errorMessage:
            "There was an error while saving the comment to the database"
        });
        });
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

Data.remove(id).then(found => {
    if(found){
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }
}).catch(err => {
    console.log(err)
    res.status(500).json({error: "The post could not be removed"})
})
});

// 
router.put("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
if(changes.title && changes.contents){
    Data.update(id, changes)
    .then(post => {
        if(post){
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
}).catch(err => {
    console.log(err)
    res.status(500).json({ error: "The post information could not be modified." })
})
} else {
res.status(400).json({errorMessage: "Please provide title and contents for the post."})
}
});

// mind the S in exportS
module.exports = router; // same as below