import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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
              handleSetNotification(`Updated ${newName}`)
              setTimeout(() => {
                setNotificationMessage(null);
              }, 5000)
            })
            .catch(error => {
              handleSetNotification(`Error: The person '${existingPerson.name}' was not found on the server.`, 'error')
              setTimeout(() => {setNotificationMessage(null)}, 5000)
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
                handleSetNotification(`Added ${newName}`)
                setTimeout(() => {setNotificationMessage(null)}, 5000)
              })
              .catch(error => {
                handleSetNotification(error.response.data.error, 'error')
              })
      }
    } else {
      handleSetNotification('Both name and phone number are required', 'error')
      setTimeout(() => {setNotificationMessage(null)}, 5000)
    }
  }

  const handleDeletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.erase(id)
        .then(() => {
          setNotificationMessage(`The person '${person.name}' has been deleted successfully`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setNotificationMessage(`The person '${person.name}' was already deleted from server`, 'error')
          setTimeout(() => {setNotificationMessage(null)}, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleSetNotification = (msg, type = 'success') => {
    setNotificationMessage(msg)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
