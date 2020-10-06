// main function
function main(id) {
    
  // read data from JSON file
  d3.json("samples.json").then((data)=> {
      console.log(data)

      // filter by id
      var by_id = data.samples.filter(d => d.id.toString() === id)[0];

      // sort and slice to find top 10 
      var s_values = by_id.sample_values.slice(0, 10);

      // trace for bar graph
      var trace_bar = {
          x: s_values,
          y: s_values,
          type:"bar",
          orientation: "h",
      };

      // data & layout for horizontal bar
      var data = [trace_bar];
      var layout_bar = {
          title: "Top 10 OTUs found in the individual",
      };
      Plotly.newPlot("bar", data, layout_bar);
      
      // trace for bubble chart
      var trace_bubble = {
          x: by_id.otu_ids,
          y: by_id.sample_values,
          mode: "markers",
      };

      // data & layout for bubble chart
      var data1 = [trace_bubble]
      var layout_bubble = {
        title: "OTU ID",
      };
      Plotly.newPlot("bubble", data1, layout_bubble); 
  });


};

// Function to select different graphs
function optionChanged(id) {
  main(id);
}

// initial function
function init() {
  // dropdown menu in HTML 
  var drpdwn = d3.select("#selDataset");

  // read the data and apply function
  d3.json("samples.json").then((data)=> {
      console.log(data);
      main(data);
  });
}

init();