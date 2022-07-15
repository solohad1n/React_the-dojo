import React, { useState } from 'react';

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
]

export const ProjectFilter = ({ handleClick, currentFilter }) => {


  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {filterList.map((filter) => (
          <button
            key={filter}
            className={currentFilter === filter ? 'active' : ''}
            onClick={() => handleClick(filter)}
          >{filter}</button>
        ))}
      </nav>
    </div >
  );
}

