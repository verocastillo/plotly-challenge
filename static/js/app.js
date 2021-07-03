// Function to fill dropdown menu with options
function init() {
    // Select the data from samples.json and get id names
    d3.json("data/samples.json").then((data) => {
        var subnames = data.names;
        // Append each name to the dropdown options
        var dropsel = d3.select("#selDataset")
        subnames.forEach((name => {
            var option = dropsel.append("option");
            option.text(name);
        }));
    })
}

// Event handlers: change page on trigger
    // Select dropdown as button trigger
    var button = d3.select("#selDataset");
    // Configure so function runs when value is changed
    button.on('change', runEnter);

// Function to obtain graphs and information
function runEnter() {
    // Reads the ID value from the dropdown
    var selectid = parseInt(button.property("value"));
    //
}

// Run initialization
init()