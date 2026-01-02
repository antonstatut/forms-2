
export default function TrainingForm({ form, onChange, onSubmit }) {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} id="trainingForm">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              required
              value={form.date}
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>

          <button type="submit" className="submit-btn">OK</button>
        </div>
      </form>
    </div>
  );
}