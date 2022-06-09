import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          setData(JSON.parse(xhr.responseText));
          setLoading(false);
        } else {
          console.error('에러');
        }
      }
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetch;
