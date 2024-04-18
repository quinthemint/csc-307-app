import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
      const person = characters[index];
      removeUser(person)
          .then(response => {
              if (response.status !== 204) {
                  throw new Error('Failed to remove from list');
              }
              const updatedCharacters = characters.filter((character, idx) => idx !== index);
              setCharacters(updatedCharacters);
          })
          .catch(error => {
              console.error('Error:', error.message);
          });
  }

      function removeUser(person) {
        console.log(person)
        const promise = fetch(`http://localhost:8000/users/${person.id}`, {
          method: "DELETE",
        });
    
        return promise;
      }

      function updateList(person) { 
        postUser(person)
          .then((res) => {if (res.status != 201) 
                          throw new Error("Failed to add to list");
                          return res.json()})
          .then((newPerson) => setCharacters([...characters, newPerson]))
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
      const promise = fetch("http://localhost:8000/users", {
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