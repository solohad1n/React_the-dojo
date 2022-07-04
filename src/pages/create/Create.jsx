import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.production.min'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUser, setAssignedUser] = useState([])
  const [formError, setFormError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  if (!category) {
    setFormError("Please, select a project category!")
    return
  }
  if (!assignedUser.length) {
    setFormError('Please assign the project to at least 1 user')
    return
  }

  const assignedUsersList = assignedUser.map((u) => {
    return {
      displayName: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id,
    }
  })

  const createdBy = {

  }

  const project = {
    name,
    details,
    category: category.value,
    dueDate: new Date(dueDate),
    assignedUsersList,
    createdBy,
    comments: [],
  }

  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName }
        })
      )
    }
  }, [documents])

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <input
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="text"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Assign to:</span>
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}

export default Create