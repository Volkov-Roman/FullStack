import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (newName !== '' && newPhone !== '') {
      if (existingPerson) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...existingPerson, phone: newPhone }
          
          personService.update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
              setNewName('')
              setNewPhone('')
            })
            .catch(error => {
              alert(`The person '${existingPerson.name}' was not found on the server.`)
              setPersons(persons.filter(p => p.id !== existingPerson.id));
            })
        }
      } else {
        const newPerson = {
          name: newName,
          phone: newPhone,
          id: (Math.max(...persons.map(p => parseInt(p.id)), 0) + 1).toString()
        }
        
        personService
              .create(newPerson)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewPhone('')
              })
      }
    } else {
      alert('Both name and phone number are required')
    }
  }

  const handleDeletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.erase(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`The person '${person.name}' was already deleted from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App
