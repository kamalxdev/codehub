import axios from "axios";
import { useState } from "react";

type ioptions = {
  [key: string]: any;
};

export default async function useAxiosPOSTdata(url: string,POSTdata:string|ioptions, options: ioptions = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  await axios
    .post(url,POSTdata, options)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
      console.log(`Error getting ${url}: `, err);
    });

  return { data, error, loading };
}
