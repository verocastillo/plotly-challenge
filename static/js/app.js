// Function to fill dropdown menu with options
function init() {
    d3.json("data/samples.json").then((data) => {
        var subnames = data.names;
        var dropsel = d3.select("#selDataset")
        subnames.forEach((name => {
            var option = dropsel.append("option");
            option.text(name);
            console.log(option);
        }));
    })
}

// Event handlers: change page on trigger
var button = d3.select("#selDataset");
button.on('change', runEnter);

// Function to obtain graphs and information


// Run initialization
init()