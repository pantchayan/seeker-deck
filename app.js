var PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

const replaceTemplate = (template, data) => {
  let finalOutput = "";
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let output = template.replace(/{%ROLE%}/, el.title);
    output = output.replace(/{%COMPANY%}/, el.company + " " + el.location);
    output = output.replace(/{%JOB_URL%}/, el.url);
    output = output.replace(
      /{%DESCRIPTION%}/,
      el.summary.substring(0, 55) + "..."
    );

    finalOutput += output;
  }
  return finalOutput;
};

const key = `<p>{%JOB_LISTINGS%}</p>`;

const tempCard = fs.readFileSync(
  `${__dirname}/templates/job-card-template.html`,
  "utf-8"
);

const portalHTML = fs.readFileSync(`${__dirname}/public/portal.html`, "utf-8");

const searchData = fs.readFileSync(`${__dirname}/data/search.json`, "utf-8");

console.log("Hello from server");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "board.html"));
});

app.get("/board", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "board.html"));
});

app.get("/portal", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "portal.html"));
});

app.get("/stats", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "stats.html"));
});

app.get("/about", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/search", async (req, res) => {
  try {
    console.log("/SEARCH GET");

    queries = req.query;
    console.log(queries.domain.split(" ").join("%"));
    console.log(queries.location.split(" ").join("%"));
    let url = `https://indreed.herokuapp.com/api/jobs/?q=${queries.domain}&l=${queries.location}&country=in`;

    let response = await fetch(url);
    let postingData = await response.json();
    let finalData;
    if (postingData.length == 0) {
      console.log("Empty arr from API ", postingData);
      finalData = JSON.parse(searchData);
    } else {
      console.log(postingData);
      finalData = JSON.parse(postingData);
    }
    let jobListing = replaceTemplate(tempCard, finalData);
    let newPortal = portalHTML.replace(key, jobListing);
    res.status(200).end(newPortal);
  } catch (err) {
    console.log("Error from server", err);
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Hey server is now running on " + PORT);
});
