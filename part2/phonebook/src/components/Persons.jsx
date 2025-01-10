const Persons = ({ persons }) => {
    return (
      <div>{persons.map(person => <Person key={person.id} person={person} />)}</div>
    )
  }
  
const Person = ({ person }) => <div>{person.name} {person.phone}</div>

export default Persons
