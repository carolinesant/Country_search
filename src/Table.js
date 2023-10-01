function Table(props) {
  
    const handleSorting = (column) => {
      props.onSort(column);
    }
  
    if (!props.apiData.results) {
      return <p>Loading...</p>;
    } else {
      const tableRows = props.apiData.results.map((country, index) => (
        <tr key={index}>
          <td >{country.Country}</td>
          <td >{country.Continent}</td>
          <td >{country.Population}</td>
          <td >{country.PopulationGrowth}</td>
        </tr>
      ));

      return <table>
        <thead>
          <tr>
            <th onClick={() => handleSorting("Country")}>Country</th>
            <th onClick={() => handleSorting("Continent")}>Continent</th>
            <th onClick={() => handleSorting("Population")}>Population</th>
            <th onClick={() => handleSorting("PopulationGrowth")}>Population Growth</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
        
  
      </table>;
    }
  }
  
  export default Table;