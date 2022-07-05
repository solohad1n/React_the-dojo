import React from 'react'
import Projects from '../../components/projects/Projects'
import { useGetCollection } from '../../Hooks/useCollection'
import './styles.css'

function Dashboard() {
  const { documents, error } = useGetCollection('projects')
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <Projects projects={documents} />}
    </div >
  )
}

export default Dashboard