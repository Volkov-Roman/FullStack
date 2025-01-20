const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          onDelete={() => onDelete(person.id)}
        />
      )}
    </div>
  )
  }
  
  const Person = ({ person, onDelete }) => (
    <div>
      {person.name} {person.phone}
      <button onClick={onDelete}>Delete</button>
    </div>
  )

export default Persons
