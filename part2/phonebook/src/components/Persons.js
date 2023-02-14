const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person)}>delete</button>
          </p>
        ))}
    </>
  );
};

export default Persons;
