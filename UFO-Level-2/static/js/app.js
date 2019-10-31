// from data.js
var tableData = data;


// YOUR CODE HERE!
// Get a reference to the table body
const tbody = d3.select("tbody");

// Getting a reference to the date filter button
const filterButton = d3.select("#filter-btn");
const clearFilterButton = d3.select("#clear-filter-btn");

// Load table with data when page loads
populateTable(data)


// Function that will data in data and create the html table
function populateTable(data) {
    // Clear any existing rows from table
    tbody.html("");

    // Loop through each data item and append as row to table
    data.forEach(d => {
        const trow = tbody.append("tr");
        // data is in same order as table so can just loop through keys
        for (key in d) {
            trow.append("td").text(d[key]);
        };
    });
}

// Event handler for filter button click
filterButton.on("click", function () {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element
    const dateValue = d3.select("#datetime").property("value");
    const cityValue = d3.select("#city").property("value");
    const stateValue = d3.select("#state").property("value");
    const countryValue = d3.select("#country").property("value");
    const shapeValue = d3.select("#shape").property("value");

    // console.log(dateValue);

    // Create filtered data object set to current data 
    let filteredData = data;

    // evalute and apply each filter
    if (dateValue !== "") {
        filteredData = filteredData.filter(d => d.datetime == dateValue);
    }
    if (cityValue !== "") {
        filteredData = filteredData.filter(d => d.city == cityValue);
    }
    if (stateValue !== "") {
        filteredData = filteredData.filter(d => d.state == stateValue);
    }
    if (countryValue !== "") {
        filteredData = filteredData.filter(d => d.country == countryValue);
    }
    if (shapeValue !== "") {
        filteredData = filteredData.filter(d => d.shape == shapeValue);
    }

    // Send filtered data to function to populate table
    populateTable(filteredData)

});

// Event handler for clear filters button click
clearFilterButton.on("click", function () {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // clear all filter values
    d3.select("#datetime").property("value", "");
    d3.select("#city").property("value", "");
    d3.select("#state").property("value", "");
    d3.select("#country").property("value", "");
    d3.select("#shape").property("value", "");

    // Repopulate Data with full data set
    populateTable(data);
});