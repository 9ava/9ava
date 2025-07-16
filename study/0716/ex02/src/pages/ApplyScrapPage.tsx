import ScrapForm from "../components/ScrapForm";
import { cars } from "../data/inintialFormData";

export default function ApplyScrapPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      {cars.map((car, index) => (
        <ScrapForm key={index} name={car.name} carNum={car.carNum} />
      ))}
    </main>
  );
}
