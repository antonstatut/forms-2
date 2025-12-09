import React, { useState } from 'react';
import './App.css';
import TrainingRow from './components/TrainingRow';


export default function App() {
  const [trainings, setTrainings] = useState([
    { id: 1, date: '20.07.2019', distance: 5.7 },
    { id: 2, date: '19.07.2019', distance: 14.2 },
    { id: 3, date: '18.07.2019', distance: 3.4 },
  ]);

  const [form, setForm] = useState({ date: '', distance: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTraining = {
      id: Date.now(),
      date: form.date,
      distance: parseFloat(form.distance),
    };

    setTrainings(prevTrainings => {
      return [newTraining, ...prevTrainings].sort((a, b) => {
        return new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-'));
      });
    });

    setForm({ date: '', distance: '' });
  };

  const handleDelete = (id) => {
    setTrainings(prevTrainings => prevTrainings.filter(training => training.id !== id));
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit} id="trainingForm">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input 
                type="text" 
                id="date" 
                name="date" 
                placeholder="20.07.2019" 
                required
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="distance">Пройдено км</label>
              <input 
                type="number" 
                id="distance" 
                name="distance" 
                placeholder="5.7" 
                step="0.1" 
                min="0" 
                required
                value={form.distance}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">OK</button>
          </div>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body" id="tableBody">
          {trainings.length === 0 ? (
            <div className="empty-state">Нет данных о тренировках</div>
          ) : (
            trainings.map(record => (
              <TrainingRow key={record.id} record={record} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}