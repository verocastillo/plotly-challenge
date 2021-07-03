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
        var samplevalues = sampledata.sample_values;
        var slicesamples = samplevalues.slice(0, 10).reverse();
        var otuids = sampledata.otu_ids;
        var sliceids = otuids.slice(0, 10).reverse();
        var otunames = []
            sliceids.map(name => {
                otunames.push(`OTU ${name}`)});
        var otulabels = sampledata.otu_labels;
        var slicelabels = otulabels.slice(0, 10).reverse();
        // Create trace for bar plot
        var trace0 = {
            x: slicesamples,
            y: otunames,
            text: slicelabels,
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
    // Bubble chart
        // Create trace for bubble plot
        var trace1 = {
            x: otuids,
            y: samplevalues,
            text: otulabels,
            mode: 'markers',
            marker: {
                color: otuids,
                size: samplevalues
            }
        };
        // Create data variable
        var bubbledata = [trace1];
        // Set plot layout in variable
        var layout1 = {
            title: {text: '<b>Bacteria Cultures per Sample</b>'},
            showlegend: false,
            xaxis: { title: "OTI IDs" },
        };
        Plotly.newPlot('bubble', bubbledata, layout1);
        
    });
}

// Run initialization
init()
