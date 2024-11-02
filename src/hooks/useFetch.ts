import { useState } from "react";

type Err = {
  message: string | unknown;
  statusCode: number;
};

export const useFetch = <T>() => {
  const [error, setError] = useState<Err>({ message: "", statusCode: 0 });
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApi = async (url: string, options: RequestInit) => {
    setIsLoading(true);
    try {
      const response = await window.fetch(url, options);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const json: T = await response.json();
      setData(json);
    } catch (err) {
      setError({ statusCode: 400, message: err });
    } finally {
      setIsLoading(false);
    }
  };

  return { error, data, isLoading, fetchApi };
};
