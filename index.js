const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")



////////////
// Section 2 - Middleware
app.use((req, res, next) => {
  console.log("Middleware is running")
  console.log(`${req.method} request was made to ${req.url}`)
  next()
})




///////////




/////////////////////////////
// Section 3 - Sending Content
// Static Middleware
// serve static files from the assets directory
app.use(express.static("./styles"));

// define the template engine
// take a file, read it, and render an output
// this engine's callback fn is fired/called/invoked when we use res.render(filePath, options(raw data))
app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "perscholas"); // register the template engine


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}. You better go catch it!`)
})