import { useEffect, useState } from "react";
import { DataPresenter } from "./DataPresenter";

type DataItem = {
  id: number;
  name: string;
  description: number;
  image: string;
};


export const DataContainer = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/public/data/data.json");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const result = await response.json();
        setData(result);
      }
      catch (error) {
        setError(`Error Al cargar los datos: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <DataPresenter data={data} />}
    </div>
  );
};
