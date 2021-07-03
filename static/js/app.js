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
    // Get the metadata from samples.json
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        // Select the metadata box from index.html
        var metadatabox = d3.select("#sample-metadata");
        // Delete info on the panel before filling (again)
        metadatabox.html("");
        // Filter info by selected id
        var selectdata = metadata.find(selected =>
            selected.id === selectid);
        // Append to demographic box
        Object.entries(selectdata).map(([key, value]) => {
            metadatabox.append("p").text(`${key}: ${value}`);
        })
    }); 
}

// Run initialization
init()