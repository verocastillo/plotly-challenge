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

// Run initialization
//init()