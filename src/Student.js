import React, { useState } from 'react';

const studentData = [
    { id: 1, name: 'Kiran Shelke', grades: [70, 88, 78], attendance: 75 },
    { id: 2, name: 'Lavesh Shelke', grades: [48, 52, 49], attendance: 65 },
    { id: 3, name: 'Anil Sharma', grades: [42, 51, 53], attendance: 48 },
    { id: 4, name: 'Shijohn Williams', grades: [95, 67, 78], attendance: 78 },
    { id: 5, name: 'Megha Agrawal', grades: [38, 53, 79], attendance: 68 },
    { id: 6, name: 'Jayanth V', grades: [67, 75, 93], attendance: 83 },
    { id: 7, name: 'Sachin Tendulkar', grades: [45, 57, 63], attendance: 58 },
    { id: 8, name: 'Rahul Dravid', grades: [49, 48, 34], attendance: 55 },
    { id: 9, name: 'Virat Kohli', grades: [89, 74, 69], attendance: 94 },
    { id: 10, name: 'Vikas Dubey', grades: [43, 76, 68], attendance: 87 },
  ];

  function calculateAverage(grades) {
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
  }

  function calculateOverallProgress(averageGrade, attendance) {
    return (averageGrade + attendance) / 2;
  }

  function getProgressColor(progress) {
    if (progress < 50) {
      return 'red';
    } else if (progress < 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  function ProgressCell({ value }) {
    const progressColor = getProgressColor(value);
  
    const style = {
      width: `${value}%`,
      backgroundColor: progressColor,
      padding: '5px',
      borderRadius: '5px',
    };
    return <div style={style}>{value}%</div>;
}

function Student() {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [progressFilter, setProgressFilter] = useState(null);
  
    const sortedAndFilteredStudents = studentData
      .sort((a, b) => {
        const aValue = sortBy === 'average' ? calculateAverage(a.grades) : a.attendance;
        const bValue = sortBy === 'average' ? calculateAverage(b.grades) : b.attendance;
  
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      })
      .filter((student) => {
        if (progressFilter === null) {
          return true;
        }
        return getProgressColor(calculateOverallProgress(calculateAverage(student.grades), student.attendance)) === progressFilter;
      });
  
    const handleSort = (field) => {
      setSortBy(field);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
  
    const handleFilter = (progress) => {
        if (progress.length===0) {
            setProgressFilter(null); 
        }else
        {
            setProgressFilter(progress);
        }
      
    };
  
    return (
      <div>
        <div>
          <label>Filter by Progress:</label>
          <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="">All</option>
            <option value="red">Low</option>
            <option value="yellow">Moderate</option>
            <option value="green">High</option>
          </select>
        </div>
        <table style={{ borderCollapse: 'collapse', width: '80%', margin:'0 auto' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px'}} >
                Name
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('average')}>
                Average Grade {sortBy === 'average' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('attendance')}>
                Attendance (%) {sortBy === 'attendance' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Overall Progress</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{calculateAverage(student.grades).toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.attendance}%</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <ProgressCell value={calculateOverallProgress(calculateAverage(student.grades), student.attendance).toFixed(2)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Student;