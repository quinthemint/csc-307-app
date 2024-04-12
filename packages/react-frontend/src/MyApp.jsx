import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

      function removeOneCharacter(person) {
        removeUser(person)
        .then((res) => {if (res.status != 204) 
          throw new Error("Failed to remove from list");
          return res.json})
        .then(() => {
          const updated = characters.filter((character) => {
          return character !== person;
        })
         setCharacters(updated);
      }).catch((error) => {
        console.log(error);
      })
      }

      function removeUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

      function updateList(person) { 
        postUser(person)
          .then((res) => {if (res.status != 201) 
                          throw new Error("Failed to add to list");
                          return res.json})
          .then(() => setCharacters([...characters, person]))
          .catch((error) => {
            console.log(error);
          })
    }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

  return (
  <div className="container">
    <Table characterData={characters} 
     removeCharacter={removeOneCharacter}/>
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;