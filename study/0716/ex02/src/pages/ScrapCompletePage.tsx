import SummaryTable from "../components/SummaryTable";
import { completedData } from "../data/completedData";

export default function ScrapCompletePage() {
  return (
    <div>
      {completedData.map((item) => (
        <div className="ml-5" key={item.user}>
          <SummaryTable user={item.user} car={item.car} date={item.date} />
        </div>
      ))}
    </div>
  );
}
