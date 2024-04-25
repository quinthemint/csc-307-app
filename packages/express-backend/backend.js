// backend.js
import express, { json } from "express";
import userService from './models/user-services.js';
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

  app.get("/users", async (req, res) => {
    const { name, job } = req.query;
  
    try {
      let result = await userService.getUsers(name, job);
      if (!result || result.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).send("Server error occurred.");
    }
  });

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"]; 
  let result = await userService.findUserById(id);
  if (result === undefined) {
    res.status(404).send("user not found.");
  } else {
    res.status(200).json(result);
  }
});

app.post("/users", async (req, res) => {
  try {
      const savedUser = await userService.addUser(req.body);  
      res.status(201).json(savedUser); 
  } catch (error) {
      res.status(500).send({ message: "Failed to save user", error: error.message });
  }
});

  app.delete("/users/:id", async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
          return res.status(404).send({ message: "User not found" });
      }
      res.send({ message: "User deleted", user: deletedUser });
  } catch (error) {
      res.status(500).send({ message: "Failed to delete user", error: error.message });
  }
})