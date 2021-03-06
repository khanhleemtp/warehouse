import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();

    console.log("did_mount");
    setTimeout(async () => {
      try {
        const res = await fetch(url, { signal: abortCont.signal });
        const newData = await res.json();
        console.log(newData);
        if (newData?.type === "error") {
          throw Error(newData.message);
        }
        setData(newData);
        console.log("newDataa", newData);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    }, 500);
    return () => {
      console.log("un_mount");
      abortCont.abort();
    };
  }, [url]);
  return { data, isPending, error, setData };
};

export default useFetch;
