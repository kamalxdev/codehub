import axios from "axios";
import { useEffect, useState } from "react";

type ioptions = {
  [key: string]: any;
};

export default function useGetData(url: string, options: ioptions = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(url, options)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(`Error getting ${url}: `, err);
      });
  },[]);

    return { data, error, loading };
}
