//Setting up the router

const router = require('express').Router();

const Posts = require('../data/db.js');



//POST request
router.post('/', (req, res) => {
 const { title, contents } = req.body
  if(!title || !contents) {
 res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  } 
  
  Posts.insert({title, contents})
  .then((postId) => {
      console.log(postId.id);
    Posts.findById(postId.id)
    .then((post) => {
        console.log(post);
    res.status(201).json(post)

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "There was an error while searching the id in the database"})
         })   
        
     
})
 .catch(err => {
console.log(err);
res.status(500).json({error: "There was an error while saving the post to the database"})
 })   

});

//POST request to /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
 const id = req.params.id 
//  const {text} = req.body
//  if (!text) {
//   return res.status(400).json({errorMessage: "Please provide text for the comment." })
//  }
console.log(req.body);
 Posts.insert(id, req.body)
 .then (postId => {
     console.log(postId);
 Posts.findById(postId)
 .then(posts => {
     console.log(posts);
//  const post = posts[0]
//  if (post){
//     res.status(200).json(post)
//      } else {
//     res.status(404).json({message: "The post with the specified ID does not exist."})
//      }
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({error: "There was an error finding by id in the database",err})
     }) 

 })
 .catch(err => {
    console.log(err);
    res.status(500).json({error: "There was an error while saving the post to the database",err})
     }) 

});



//GET request
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
     res.status(200).json(posts)
    })
    .catch(err => {
   console.log(err);
   res.status(500).json({error: "The posts information could not be retrieved."})
     })
   })

 //GET request to /api/posts/:id
 router.get('/:id', (req, res) => {
 const id = req.params.id
 
 Posts.findById(id)
 .then(posts => {
     const post = posts[0]
     if (post){
    res.status(200).json(post)
     } else {
    res.status(404).json({message: "The post with the specified ID does not exist."})
     }
   })

 })

 //GET request to /api/posts/:id/comments
 router.get('/:id/comments', (req, res) => {
 const id = req.params.id
 
 Posts.findCommentById(id)
 .then(comments => {
     const comment = comments[0]
     if(comment) {
    res.status(200).json(comment)
     } else {
    res.status(404).json({message: "The post with the specified ID does not exist."})
     }
     
    })
 })
   
 //DELETE request to /api/posts/:id
 router.delete('/:id', (req, res) => {
 const id = req.params.id
 Posts.remove(id)
 .then(post => {
  if(post) {
  res.status(200).json(post)
  } else {
 res.status(404).json({message: "The post with the specified ID does not exist."})
   }
 })
 .catch(err => {
  res.status(500).json({ error: "The post could not be removed"})
   })
 })

 //PUT request to /api/posts/:id
  router.put('/:id', (req,res) => {
 const {title, contents} = req.body
 if(!title && !contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post."})
     } 
  const id = req.params.id
  Posts.update(id, {title, contents})
  .then(updates => {
   if(updates) {
  res.status(200).json(updates)
   } else {
   res.status(404).json({message: "The post with the specified ID does not exist." })
   }
   Posts.findById(updates)
   .then(postId => {
    res.status(200).json(postId)
   })
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({error: "The post information could not be modified." })
   })
  })
module.exports = router;