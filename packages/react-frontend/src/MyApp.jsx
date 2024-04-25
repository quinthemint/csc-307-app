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
        return fetch(`http://localhost:8000/users/${person._id}`, {
          method: "DELETE"
        });
      }

      function updateList(person) { 
        postUser(person)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to add to list: ${res.status}`);
                }
                return res.json();
            })
            .then((newPerson) => {
                setCharacters(prevCharacters => [...prevCharacters, newPerson]); 
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    }

    function fetchUsers() {
      return fetch("http://localhost:8000/users")
             .then((response) => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok: ' + response.statusText);
                 }
                 return response.json();
             });
  }

    useEffect(() => {
      fetchUsers()
        .then((userlist) => setCharacters(userlist))
        .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
      return fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(person)
      });
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