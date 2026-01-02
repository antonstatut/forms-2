import React, { useState } from 'react';
import './App.css';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';

export default function App() {
  const [trainings, setTrainings] = useState([
    { id: 1, date: '20.07.2019', distance: 5.7 },
    { id: 2, date: '19.07.2019', distance: 14.2 },
    { id: 3, date: '18.07.2019', distance: 3.4 },
  ]);

  const [form, setForm] = useState({ date: '', distance: '' });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    return new Date(`${year}-${month}-${day}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(form.date);
    const distanceToAdd = parseFloat(form.distance);

    setTrainings(prevTrainings => {
      const existingIndex = prevTrainings.findIndex(t => t.date === formattedDate);
      let updatedTrainings;

      if (existingIndex !== -1) {
        updatedTrainings = [...prevTrainings];
        updatedTrainings[existingIndex] = {
          ...updatedTrainings[existingIndex],
          distance: updatedTrainings[existingIndex].distance + distanceToAdd
        };
      } else {
        const newTraining = { id: Date.now(), date: formattedDate, distance: distanceToAdd };
        updatedTrainings = [newTraining, ...prevTrainings];
      }

      return updatedTrainings.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    });

    setForm({ date: '', distance: '' });
  };

  const handleDelete = (id) => {
    setTrainings(prevTrainings => prevTrainings.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <TrainingForm 
        form={form} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
      />
      <TrainingTable 
        trainings={trainings} 
        onDelete={handleDelete} 
      />
    </div>
  );
}