type Complete = {
  user: string;
  car: string;
  date: string;
};

export default function SummaryTable({ user, car, date }: Complete) {
  return (
    <div className="p-4 shadow-md card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{user}</h2>
        <p>{car}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
