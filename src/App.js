import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";

function App() {

  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [pageNumber, setPageNumber] = useState(1); 
  const [pageSize, setPageSize] = useState(10)
  const [continents, setContinents] = useState([]); 
  const [sortColumn, setSortColumn] = useState();

  useEffect(() => {
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

    apiQuery = apiQuery + "&page=" + pageNumber;
    apiQuery = apiQuery + "&pageSize=" + pageSize;
    if (searchQuery) apiQuery = apiQuery + "&search=" + searchQuery;
    if (continents.length > 0) apiQuery = apiQuery + "&Continent=" + continents.join(",");
    if (sortColumn) apiQuery = apiQuery + "&order=" + sortColumn;
  
    // Query data from API.
    console.log("Querying: " + apiQuery);
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {
        // Then add response to state.
        setApiData(data);
      });
  }, [searchQuery, pageNumber, pageSize, continents, sortColumn]); // Array containing which state changes that should re-reun useEffect()

  const handleSearch = (searchValue) => {
    setPageNumber(1);
    setSearchQuery(searchValue);
  };
  const handleSizeChange = (sizeValue) => {
    setPageNumber(1);
    setPageSize(sizeValue);
  }

  const onPageChange = (pageNum) => {
    if ((pageNumber + pageNum >= 1) && (pageNumber + pageNum <= (apiData?.pager?.pageCount || 1))) {
      setPageNumber(pageNumber + pageNum);
    } 
  }

  const handleContinentChange = (continent) => {
    setPageNumber(1);
    setContinents(
      continents.includes(continent)
        ? continents.filter(item => item !== continent)
        : [...continents, continent]
    );
  }

  const handleSorting = (column) => {
    setPageNumber(1);
    setSortColumn(
      !sortColumn? `${column}:ASC`
        : sortColumn.includes(`${column}:ASC`)? `${column}:DESC`
        : `${column}:ASC`
    );
  }

  return (
    <div className="App">
      <h1>Country search</h1>
      <SearchBar onSearch={handleSearch}/>
      <ContinentSelector onContinentChange={handleContinentChange} />
      <Table apiData={apiData} onSort={handleSorting} />
      <Pagination onPageChange={onPageChange} totalPage={apiData?.pager?.pageCount} currentPage={pageNumber}/>
      <PageSize handleSizeChange={handleSizeChange} />
    </div>
  );
}

function SearchBar({onSearch}) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {onSearch(searchValue)}

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

function PageSize({handleSizeChange}) {
  return (
    <div className = "page-size"> 
    <label htmlFor="pageSizeOptions">Results per page:</label>
    <select 
      name="pageSizeOptions" 
      id="pageSizeOptions"
      onChange={(e) => handleSizeChange(e.target.value)}
      >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
    </div>
  )
}

function Pagination({currentPage, totalPage, onPageChange}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(-1)}>⬅️</button>
      )}
      <label >Page {currentPage} of {totalPage}</label>
      {currentPage < totalPage && (
        <button onClick={() => onPageChange(1)}>➡️</button>
      )}
    </div>
  );
}

function ContinentSelector({onContinentChange}) {
  return (
    <div id="continent_checkboxes">
      <input type="checkbox" value="Africa" id="Africa" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="Africa">Africa </label>
      <input type="checkbox" value="South America" id="South America" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="South America">South America</label>
      <input type="checkbox" value="North America" id="North America" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="North America">North America</label>
      <input type="checkbox" value="Asia" id="Asia" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="Asia">Asia</label>
      <input type="checkbox" value="Europe" id="Europe" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="Europe">Europe</label>
      <input type="checkbox" value="Oceania" id="Oceania" onChange={(e) => onContinentChange(e.target.value)}/>
      <label htmlFor="Oceania">Oceania</label>
    </div>
  )
}

export default App;