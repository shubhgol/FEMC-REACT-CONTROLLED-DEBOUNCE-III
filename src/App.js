import { useEffect, useState } from "react";
import "./styles.css";
import useDebounce from "./useDebounce";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const onChangeHandler = (e) => setSearchQuery(e.target.value);

  const fetchData = async () => {
    console.log(">>>>>fetching query ", searchQuery);
    const listOfFruits = ["Apple", "Banana", "Orange", "Gauvava", "PineApple"];
    const data = await new Promise((res, rej) => {
      setTimeout(() => {
        if (!searchQuery) {
          setData(listOfFruits);
          // res(listOfFruits);
        } else {
          const searchText = searchQuery.trim();
          const filterData = listOfFruits.filter(
            (item) => item.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );

          console.log(">>>>>EE", filterData);
          setData(filterData);
          // res(filterData);
        }
      }, 1000);
    });
    // setData(data);
  };

  useDebounce(fetchData, 500, [searchQuery]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="text" value={searchQuery} onChange={onChangeHandler} />
      <ul>
        {data.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
