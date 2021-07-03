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
    // Get the metadata and samples from samples.json
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
	    var otusamples = data.samples;
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
    // Bar plot
        // Filter ‘samples’ to selected ID
        var sampledata = otusamples.find(sample => 
            sample.id == selectid
            );
        // Get the top 10 OTU ids, values and labels
        var samplevalues = sampledata.sample_values.slice(0, 10).reverse();
        var otuids = sampledata.otu_ids.slice(0, 10).reverse();
        var otunames = []
            otuids.map(name => {
                otunames.push(`OTU ${name}`)});
        var otulabels = sampledata.otu_labels.slice(0, 10).reverse();
        // Create trace for bar plot
        var trace0 = {
            x: samplevalues,
            y: otunames,
            text: otulabels,
            type:"bar",
            orientation: "h",
        };         
        // Create data variable
        var bardata = [trace0];
        // Set plot layout in variable
        var layout0 = {
            title: {text: "<b>Top 10 Bacteria Cultures (OTU)</b>",
            y : .80
              },
            xaxis: { title: "Sample Values", 
                automargin: true, },
            yaxis: { title: "OTU ID"},
            margin: { l: 110, r: 10, t: 110, b: 50 }
          };
        // Plot bar chart
        Plotly.newPlot('bar', bardata, layout0);
    }); 
}

// Run initialization
init()
