async function getData() {
    // Creating the query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let data = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions
    console.log(data);
    // Check the size of the dataset
    console.log("The length of dataset is:" + data.names.length);
    // Check the first name in the dataset
    console.log("The first name in the dataset is:" + data.names[0])
}
/******************************************************************* */
// Function to create Bar Plot based on sample id
/******************************************************************* */
async function CreateBarPlots(id) 
{
    // Get the data using query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let BarData = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions;  
    console.log(BarData);
    // Filter the data by sample id
    let samples = BarData.samples.filter(item => item.id.toString() === id)[0];
    console.log(samples);
    // Using `sample_values` as values for the bar chart
    console.log("Number of data-points for Bar Plot:" + samples.sample_values.length);
    // Creating empty arrays for x-data, y-data and marker text
    let sample_values, id_values, otu_ids, otu_labels = [];
    // Slicing sample values (y data) and reversing the order for Plotly
    sample_values = samples.sample_values.slice(0,10).reverse();
    console.log("Top 10 sample values:" + sample_values); 
    // Slicing otu_ids (x data) and reversing the order for Plotly
    id_values = samples.otu_ids.slice(0,10).reverse();
    // Format otu_ids for clarity
    otu_ids = id_values.map(id => "OTU" + id.toString());
    console.log("Top 10 otu_ids:" + otu_ids);
    // Slicing otu_labels (hovertxt) and reversing the order for Plotly
    otu_labels = samples.otu_labels.slice(0,10).reverse();
    console.log("Top 10 otu_labels:" + otu_labels); 
     // Create trace object for Bar Plot
    var trace1 = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation:"h", 
        marker: {
            color: sample_values,
            colorscale: 'Jet',
            cmin: 0,
            cmax: 200,
            showscale: true,
            colorbar:{
                thickness:20,
                y:0.5,
                ypad:10,
                titlefont: {
                    family: 'Arial,Helvetica,sans-serif',
                    size: 12,
                    color: 'black',
                },
                titleside: 'bottom',
                outlinewidth: 1,
                outlinecolor: 'black',
                tickfont: {
                    family: 'Arial,Helvetica,sans-serif',
                    size: 14,
                    color: 'black',
                }
            },
            line: {
                color: 'black',
                width: 1,
            },    
        }
    };
    var bar_data = [trace1];
    var layout = {
        plot_bgcolor:'white',
        paper_bgcolor:"#FFF3",
        margin:{l:100,r:100,b:30,t:30},
        title: {
            text:"<b>Top 10</b> OTUs found in the Sample <br>",
            font:{
                family: 'Georgia,serif',
                size: 20,
                color:'black',
            },
            xanchor: 'center',
            yanchor:'top'
        },
        xaxis:{
            automargin: true,
            title: {
                text: "<b>Sample Values</b>",
                font: {
                family:'Arial,Helvetica,sans-serif',
                color: 'black',
                size: 16,
                },
                standoff:10,
            },
            showgrid: false,
            showline: true,
            tickmode: 'auto',
            ticks:'inside',
            tickcolor:'black',
            tickwidth: 1,
            tickfont:{
                family:'Arial,Helvetica,sans-serif',
                color: 'black',
            }
        },
        yaxis:{
            automargin: true,
            title: {
                text: "<b>OTU ids</b>",
                font: {
                family:'Arial,Helvetica,sans-serif',
                color: 'black',
                size: 16,
                },
                standoff:5,
            },
            showgrid: false,
            gridcolor: 'white',
            tickmode: 'auto',
            ticks:'',
            tickcolor:'white',
            tickwidth: 2,
            tickfont:{
                family:'Arial,Helvetica,sans-serif',
                color: 'black',
            } 
        }
    };
    var config ={responsive:true}
    Plotly.newPlot("bar",bar_data,layout,config);
}

/******************************************************************* */
// Function to create Bubble Plot based on sample id
/******************************************************************* */
async function CreateBubblePlots(id) 
{
    // Get the data using query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let BubbleData = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions; 
    // Filter the data by sample id
    let samples = BubbleData.samples.filter(item => item.id.toString() === id)[0];
    // Using `sample_values` as values for the bar chart
    console.log("No. of data-points for Bubble Plot :" + samples.sample_values.length);
    // Creating empty arrays for x values, y values and text values
    let sample_values, otu_labels, otu_ids  = [];
    // Using `sample_values` for the y values 
    sample_values = samples.sample_values;
    // Using `otu_ids` for x values
    otu_ids = samples.otu_ids;
    // Top 10 `otu_ids` are labels for bar chart
    otu_labels = samples.otu_labels;
     // Create trace object for Bubble Plot
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "scatter",
        mode: "markers",
        marker: {
            color: otu_ids,
            colorscale: 'Jet',
            cmin: 0,
            cmax: 4000,
            sizemode: "diameter",
            size: sample_values,
            showscale: true,
            colorbar:{
                thickness:20,
                y:0.5,
                ypad:5,
                title: "<b>OTU ID</b>",
                titlefont: {
                    family: 'Georgia,serif',
                    size: 14,
                    color: 'black',
                },
                titleside: 'top',
                outlinewidth: 1,
                outlinecolor: 'black',
                tickfont: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 14,
                    color: 'black',
                }
            }
        }      
    };
    var bubble_data = [trace1];
    var layout = {
        plot_bgcolor:"white",
        paper_bgcolor:"#FFF3",
        margin:{l:30,r:30,b:30,t:30},
        title: {
        text:"<b>Bubble Plot</b> of Sample Values vs. OTU ID <br>",
        font:{
            family: 'Georgia,serif',
            color:'black',
            size: 20,
        },
        xanchor: 'center',
        yanchor:'top'
        },
        xaxis:{
            title: {
                text: "<b>OTU ID</b>",
                font: {
                family:'Georgia,serif',
                size: 14,
                color: 'black',
                }
            },
            showgrid: true,
            zeroline: false,
            zerolinecolor: '#00b3b3',
            zerolinewidth: 2,
            gridcolor: '#ccffe6',
            tickmode: 'auto',
            tickfont:{
                family:'Arial, Helvetica, sans-serif',
                color: 'black',
                size: 14,
            }
        },
        yaxis:{
            showgrid: true,
            zeroline: false,
            zerolinecolor: '#00b3b3',
            zerolinewidth: 2,
            gridcolor: '#ccffe6',
            tickmode: 'auto',
            tickfont:{
                family:'Arial, Helvetica, sans-serif',
                color: 'black',
                size: 14,
            } 
        }
    };
    var config ={responsive:true}
    Plotly.newPlot("bubble",bubble_data,layout,config);
}

/******************************************************************** */
// Function to create the Demographic info panel based on id
/******************************************************************* */
async function CreateInfoPanel(id) 
{
    // Clear the panel text
    d3.select("#sample-metadata").html("");
    // Get the data using query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let InfoData = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions;  
    // Filter MetaData by sample id
    let MetaData = InfoData.metadata.filter(item => item.id.toString() === id)[0];
    console.log(MetaData); // Display the MetaData
    // Update the Demographic Info Panel
    Object.entries(MetaData).forEach(([key, value]) => 
       { 
        var node = document.createElement("LI") // Creates a LI node 
        var Info = `${key} : ${value} `+'\n'; // Creates the text to display
        var textnode = document.createTextNode(Info); // Creates a textnode
        node.appendChild(textnode); // Appends the textnode to the LI node
        node.setAttribute("class","my-text");
        document.getElementById("sample-metadata").appendChild(node);
       })
    return false;
}

/******************************************************************* */
// Function to create Gauge Chart Plot based on id
// Acknowledgement: Gauge charts with plotly (blog post) by Marco Hecktor 
/******************************************************************* */
async function CreateGaugeChart(id)
{
    // Get the data using query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let InfoData = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions; 
    // Filter MetaData by sample id
    let MetaData = InfoData.metadata.filter(item => item.id.toString() === id)[0];
    // Extract wash frequency from MetaData
    let wash_freq = MetaData.wfreq;
    console.log('Wash frequency of id(' + id +'): ' + wash_freq);
    var align = 0;
    // Creating an alignment parameter for the needle
    if (wash_freq !== 0){align = -10}
    else if (wash_freq === "null"|| wash_freq === 0){align = 0};
    // Trig to calc meter point
    var degrees = 180 - (20*wash_freq + align); // Added padding to the needle
    radius = .6; // to ensure the needle ends within the donut
    var radians = degrees * Math.PI / 180;
    var aX = 0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var aY = 0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var bX = -0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var bY = -0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var cX = radius * Math.cos(radians);
    var cY = radius * Math.sin(radians);
    // Creating the SVG path for the needle dial
    let needle = 'M ' + aX + ' ' + aY +
    ' L ' + bX + ' ' + bY +
    ' L ' + cX + ' ' + cY +
    ' Z';
    // Creates the filled donut with text inside
    var trace1 =
    {
        // We have 9 elements each divided in 20 degrees and last element a full half circle
        values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 180],
        rotation: 90,
        text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
        textinfo: "text",
        textfont: {
            family: 'Georgia,serif',
            color:'black',
            size:18,
          },
        direction:"clockwise",
        textposition: "inside",
        marker: {
            colors: ["#ffff99","#ffff33","#d2ff4d","#bfff00","#99cc00","#e6e600","#cc9900","#ff9900","#cc6600","white"],
        },
        hoverinfo: "text",
        hole: .4,
        type: "pie",
        insidetextorientation: "radial",
        showlegend: false
    };
    // Creates the center anchor for the needle
    var trace2 =
    {
        type:"scatter",
        x: [0], // Defining the x-coord of the center
        y: [0], // Defining the y-coorc of the center
        // A red colored marker in the center is the needle center
        marker:{ 
            size: 18,
            color:"#ff3300"
        },
        showlegend: false,
        hoverinfo: "skip" // Stop hover text
    }
    var gauge_data = [trace1,trace2];

    var layout = 
    {
        title: "Belly Button <b>Washing Frequency</b> <br> Scrubs per Week",
        titlefont: {
            family: 'sans serif',
            size: 22,
            color:'black',
          },
        shapes: [{
            type: 'path',
            path: needle,
            fillcolor: "#ff3300",
            line: {
            color: "#ff3300"
            }
        }],
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            fixedrange: true,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            fixedrange: true,
            range: [-1, 1]
        }
    };
    var config ={responsive:true}
    Plotly.newPlot("gauge",gauge_data,layout,config);
}

/******************************************************************** */
// Function to create a selection list and the initial plots
/******************************************************************* */
async function initialPlots() 
{
    // Get the data using query url for json data
    var queryUrl = "data/samples.json";
    // Using d3.json method for fetching .json files
    let SelectData = await d3.json(queryUrl).catch(function(error){
        console.log(error);
    }); // await works only in async functions;  
    // Display the first id in the selection list
    console.log("First ID in the selection list:" + SelectData.names[0]); 
    // Display the length of the selection list
    console.log("Length of the selection list:" + SelectData.names.length); 
    // Select the dropdown list
    let selectList = document.getElementById("selDataset");
    // Add options to the dropdown list
    for (var i = 0; i < SelectData.names.length; i++){
        var option = document.createElement("option");
        // Set the sample name in the text part
        option.innerHTML = SelectData.names[i];
        // Set the sample name in the value part
        option.value = SelectData.names[i];
        // Add the option element to the dropdown list
        selectList.options.add(option);
    }
    // Create the plots based on the first id in the selection list
    let id = SelectData.names[0];
    // Create the plots based on id
    CreateBarPlots(id);
    CreateBubblePlots(id);
    CreateInfoPanel(id);
    CreateGaugeChart(id);

    return false;
}

/******************************************************************** */
// Function that responds to event handler
/******************************************************************* */
function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    // Display the selected option
    console.log(selectedOption);
    // Create the plots based on id
    CreateBarPlots(selectedOption);
    CreateBubblePlots(selectedOption);
    CreateInfoPanel(selectedOption);
    CreateGaugeChart(selectedOption);
}

// Use D3 to create an event handler
d3.selectAll("body").on("change", updatePage);

initialPlots();
