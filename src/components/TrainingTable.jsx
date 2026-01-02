import TrainingRow from './TrainingRow';

export default function TrainingTable({ trainings, onDelete }) {
  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>

      <div className="table-body">
        {trainings.length === 0 ? (
          <div className="empty-state">Нет данных о тренировках</div>
        ) : (
          trainings.map(record => (
            <TrainingRow key={record.id} record={record} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}