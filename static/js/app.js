// Import belly button dataset
d3.json("data.json").then((bbData) => {

    // Function to fill dropdown menu with options
    function dropdownOp() {
        var subnames = bbData.names;
        var dropsel = d3.select("#selDataset")
        subnames.forEach((name => {
            var option = dropsel.append("option");
            option.text(name);
        }));
    }

});