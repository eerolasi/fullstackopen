import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import PersonService from "./services/PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setErrorMessage] = useState(false);

  useEffect(() => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
        .split(" ")
        .map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        )
        .join(" "),
      number: newNumber,
    };

    if (persons.find((person) => person.name === personObject.name)) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        togglePerson(personObject);
        setMessage(`Updated ${personObject.name}'s number`);
        setTimeout(() => {
          setMessage(null);
        }, 7000);
      }
    } else {
      PersonService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 7000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const togglePerson = (personObject) => {
    const person = persons.find((p) => p.name === personObject.name);
    const changedNumber = { ...person, number: newNumber };
    PersonService.update(changedNumber.id, changedNumber)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) =>
            p.name !== changedNumber.name ? p : returnedPerson
          )
        );
      })
      .catch((error) => {
        setErrorMessage(true);
        setMessage(
          `Information of ${person.name} has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 7000);
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        setMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 7000);
      });
    }
  };

  const handleFilterPerson = (event) => {
    setFilter(event.target.value);
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} handleFilterPerson={handleFilterPerson} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
