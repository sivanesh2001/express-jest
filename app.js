const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const dataService = require("./dataService");

app.get("/data", async (req, res) => {
  try {
    const data = await dataService.getData();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/performAPICalls", async (req, res) => {
  try {
    // GET Request
    const getResponse = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    const postData = getResponse.data;

    // POST Request
    const postResponse = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: "New Post",
      body: "This is a new post.",
      userId: 1,
    });
    const createdPostData = postResponse.data;

    // PUT Request
    const putResponse = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
      title: "Updated Title",
      body: "Updated Body",
      userId: 1,
    });
    const updatedPostData = putResponse.data;

    // PATCH Request
    const patchResponse = await axios.patch("https://jsonplaceholder.typicode.com/posts/1", {
      title: "Patched Title",
    });
    const patchedPostData = patchResponse.data;

    // DELETE Request
    const deleteResponse = await axios.delete("https://jsonplaceholder.typicode.com/posts/1");
    const deletedPostData = deleteResponse.data;

    res.json({
      getData: postData,
      postData: createdPostData,
      putData: updatedPostData,
      patchData: patchedPostData,
      deleteData: deletedPostData,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
