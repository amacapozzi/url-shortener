import { useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import { useFetch } from "./hooks/useFetch";
import { config } from "./config/config";

type ApiResponseData = {
  link: string;
};

function App() {
  const { isLoading, data, fetchApi } = useFetch<ApiResponseData>();
  const [longURL, setLongUrl] = useState("");

  const handleChange = (value: string) => {
    setLongUrl(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchApi(config.API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longURL,
        domain: "bit.ly",
        group_guid: `${config.GROUP_ID}`,
      }),
    });
  };

  console.log(data);

  return (
    <>
      <div className="flex mx-auto items-center flex-col justify-center min-h-screen">
        <h1 className="text-4xl text-neutral-200 mb-5 font-semibold">
          URL Shortener
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row items-center my-3 gap-x-3"
          action=""
        >
          <Input
            isEnabled={isLoading}
            value={longURL}
            onChange={handleChange}
          />
        </form>
        {data?.link && <h1 className="text-neutral-200">{data.link}</h1>}
      </div>
    </>
  );
}

export default App;
