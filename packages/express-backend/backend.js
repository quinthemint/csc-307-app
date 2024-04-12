// backend.js
import express, { json } from "express";
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

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "James",
        job: "Bartender"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => (user["name"] === name) && (user["job"] === job)
    );
  };

  app.get("/users", (req, res) => {
    const { name, job } = req.query;
    
    let result;
    if (name && job) {
        result = findUserByNameAndJob(name, job);
        res.send({ users_list: result });
    } else if (name) {
        result = findUserByName(name);
        res.send({ users_list: result });
    } else {
        res.send(users)
    }

  });
  
  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

const genID = () => {
    const ID = Math.floor(Math.random() * 1000);
    if (findUserById(ID) != undefined){
        genID()
    }

    return ID
}
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd["id"] = genID()
    addUser(userToAdd);
    res.status(201).send(json);
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    users["users_list"] = users["users_list"].filter(user => user.id !== id);
    res.status(204).send()

})