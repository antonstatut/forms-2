export default function TrainingRow({ record, onDelete }){

  return (
    <div className="table-row">
      <div className="col-date">{record.date}</div>
      <div className="col-distance">{record.distance}</div>
      <div className="col-actions">
        <button 
          className="action-btn delete-btn" 
          title="Удалить"
          onClick={() => onDelete(record.id)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}