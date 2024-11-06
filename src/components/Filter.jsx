import React from 'react';

const Filter = ({ setFilterType, filterType }) => {
  const handleFilterChange = (event) => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    localStorage.setItem('filterType', newFilterType);
  };

  return (
    <div className='d-flex justify-content-end mx-3'>
      <select className='px-2 py-1 my-2 rounded' value={filterType} onChange={handleFilterChange}>
        <option value="">All Types</option>
        <option value="Development & IT">Development & IT</option>
        <option value="Marketing & Sales">Marketing & Sales</option>
        <option value="Design & Creative">Design & Creative</option>
        <option value="Support & Admin">Support & Admin</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default Filter;