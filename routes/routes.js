const express = require("express");
const router = express.Router()


app.get("/view-test", (req, res) => {
    const options = {
      title: "Rendering Views with Express is so COOL!!!!!",
      content:
        "Here, we've created a basic template engine using <code>app.engine()</code> \
        and the <code>fs</code> module, then used <code>res.render</code> to \
        render this page using custom content within the template.<br><br> \
        Generally, you won't want to create your own view engines, \
        but it important to understand how they work behind the scenes. \
        For a look at some popular view engines, check out the documentation for \
        <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
        <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
        <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
        More complete front-end libraries like React, Angular, and Vue \
        also have Express integrations.",
    };
  
    res.render("index", options);
  });
  
  /////////////////////////////
  
  
  // this will only run for a GET request at localhost:3000/
  // express looks at two things, the method and the url
  app.get("/", (req, res) => {
    res.send(`home route`)
  })
  
  // only going to be on /express route below
  const anotherMiddlware = (req, res, next) => {
    if (Boolean(req.query.fail)) {
      res.status(401).send("try again")
    } else {
      next()
    }
  }
  
  app.get("/express", anotherMiddlware, (req, res) => {
    res.send("<h1>Creating routes with Express is simple!</h1>")
  })
  
  
  app.get("/user", (req, res) => {
    res.send("Recieved a GET request for user")
  })
  
  app.post("/user", (req, res) => {
    res
      .status(201)
      .send({
        message: "User has been created",
        body: {
          username: "johndoe123",
          email: "test@test.com"
        }
      })
  })
  
  
  
  // Route Path Flexibility
  
  // ? - optional
  //matches:
  //abcd or acd
  app.get("/ab?cd", (req,res) => {
    res.send("ab?cd")
  })
  //matches:
  //color or colour
  app.get("/colou?r", (req,res) => {
    res.send("colou?r")
  })
  
  // + 
  // matches:
  // efgh
  // effffffffffffgh
  app.get('/ef+gh', (req, res) => {
    res.send("ef+gh")
  })
  
  // *
  // matches
  // ijkl
  // ijANYTHING-CAN-GO-HEREkl
  app.get('/ij*kl', (req, res) => {
    res.send("ij*kl")
  })
  
  
  // ()
  // matches:
  // /lmnop
  // /lmp
  app.get("/lm(no)?p", (req, res) => {
    res.send("/lm(no)?p")
  })
  
  
  // regex
  // app.get(/a/, (req, res) => {
  //   res.send("theres a 'a' in the path")
  // })
  
  app.get(/.*fly$/, (req, res) => {
    res.send("fly at the end of word")
  });
  
  
  app.get("/greeting/:name", (req, res) => {
    res.send(`this is the param: ${req.params.name}`)
  })
  
  app.get("/flights/:from-:to", (req, res) => {
    res.send(`Flight coming from ${req.params.from} and going to ${req.params.to}`)
  })
  
  app.route('/learner')
    .get((req, res) => {
      res.send('Get a random learner')
    })
    .post((req, res) => {
      res.send('Add a learner')
    })
    .put((req, res) => {
      res.send("Update the learner's info")
    })
  
  
  // Redirecting requests
  app.get('/go-somewhere', (req, res) => {
    res.redirect('/somewhere')
  })
  
  app.get("/somewhere", (req, res) => {
    res.send("Your now here!")
  })
  
  app.get("/goto-medium", (req, res) => {
    res.redirect("https://medium.com")
  })
  
  //JSON
  app.get('/get-learner', (req, res) => {
    const learner = {
      learner: "John",
      grades: [90, 87, 76, 98, 100],
      enrolled: true,
      course: "NodeJS and Express"
    }
    res.json(learner)
  })


module.export = router

