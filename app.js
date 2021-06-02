const express = require('express');
const app = express();
const path = require('path');


console.log("Hello from server");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
       res.status(200).sendFile(path.join(__dirname,"public","main.html"));
})

app.get("/board", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "board.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Hey server is now running on http://127.0.0.1:3000");
});
