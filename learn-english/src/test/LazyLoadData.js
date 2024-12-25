import React, { useState, useEffect, useRef } from "react";

const LazyLoadData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Hàm tải dữ liệu
    const fetchData = async () => {
      const response = await fetch(`https://api.example.com/data?page=${page}`);
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    // Sử dụng Intersection Observer để theo dõi loader
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <div ref={loaderRef} style={{ height: "50px", background: "#f0f0f0" }}>
        Đang tải thêm...
      </div>
    </div>
  );
};

export default LazyLoadData;
