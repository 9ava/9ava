//itcr
//임타클반

type Quotation = {
  carName: string;
  year: number;
  price: number;
};

export default function QuotationCard({ carName, year, price }: Quotation) {
  return (
    <div className="w-1/4 p-4 m-8 bg-gray-200 rounded-md shadow-lg h-1/4">
      <h2>{carName}</h2>
      <p>{year}</p>
      <p>{price}</p>
    </div>
  );
}
