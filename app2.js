//Define larger plot area
let svgW = 960; //svg size Width 
let svgH = 500; //svgH size Height

let margin = {   //Take some space from the sides
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

let width = svgW - margin.left - margin.right; //calculate the width of the plot area
let height = svgH - margin.top - margin.bottom; //calculate the height of the plot area

// Create an SVG in html.
let svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

// create a group tag in html to append elements. Translate the plot to the center
let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initialize chosenXAxis

chosenXAxis= "age"

//UPDATES ARE PRACTICALLY TAKEN FROM ACTIVITY TWELVE!


// function used for updating x-scale var upon click on axis label
function scaleX(Mydata, chosenXAxis) {
  // create scales
  let xLinearScale = d3.scaleLinear()
    .domain([d3.min(Mydata, d => d[chosenXAxis]) * 0.8,
      d3.max(Mydata, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  let bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, textGroup) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));

  return circlesGroup, textGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup, textGroup) {

  
// id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh
  
  
  let label;

  if (chosenXAxis === "age") {
    label = "age:";
  }
  else {
    label = "income";
  }

  let toolTip = d3.select('body').append('div').classed('tooltip', true);

  circlesGroup.on("mouseover", function(event, d) {
    //toolTip.show(data);
    toolTip.style('display', 'block')
          .html(`${d.state}<br>${label} ${d[chosenXAxis]}`)
          .style('left', event.pageX+'300px')
          .style('top', event.pageY+'300px');

  })

  .on("mouseout", function(data, index) {
    //toolTip.hide(data);
    toolTip.style('display', 'none');
  });

return circlesGroup;
}



// Load Data from csv
d3.csv("MyData.csv").then(function(Mydata, err) {

 if (err) throw err;

    //Assign variables 
    Mydata.forEach(function(data) {
      data.dxArray = +data.age;
      data.dyArray = +data.smokes;
      data.StArray = +data.abbr;
    });

    // Create scale function with scaleLinear
    // the graph that we are planning is a scatter plot
    scaleX2 = scaleX(Mydata, chosenXAxis)
    //   .domain([30, d3.max(Mydata, d => d.dxArray)])
    //   .range([0, width]);


    let scaleY = d3.scaleLinear()
      .domain([0, d3.max(Mydata, d => d.dyArray)])
      .range([height, 0]);


    //-Create axes 
    let bottomAxis = d3.axisBottom(scaleX2);
    let leftAxis = d3.axisLeft(scaleY);

    // draw in correct places the axes of the chart
    
    let xAxis = chartGroup.append("g")
      .classed("x-axis", true)    
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Chart Markers here. Markers will be circles
   //the circle tag will be added to html and the circle
   //location and size will be assigned to constant values
    let circlesGroup = chartGroup.selectAll("circle")
    .data(Mydata)
    .enter()
    .append("circle")
    .attr("cx", d => scaleX2(d.dxArray))
    .attr("cy", d => scaleY(d.dyArray))
    .attr("r", "15")
    .attr("fill", "#89bdd3")
    .attr("stroke", "#e3e3e3")
    .attr("opacity", ".8")
    
    let textGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top+5})`)
    .attr("id","textCircles")
    .selectAll("text")
    .data(Mydata)
    .enter()
    .append("text")

    .attr("x", d => scaleX2(d.dxArray))
    .attr("y", d => scaleY(d.dyArray))
    .text(d => d.abbr)
    .style("font-family", "sans-serif")
    .style("fill", "#fff")
    .style("text-anchor", "middle")

  // Create group for two x-axis labels
  let labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    let Etiqueta1 = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "age") // value to grab for event listener
    .classed("active", true)
    .text("age");

    let Etiqueta2 = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("income");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Smokers (relative scale)");


    circlesGroup = updateToolTip(chosenXAxis, circlesGroup,textGroup);
 
   // x axis labels event listener
   labelsGroup.selectAll("text")
   .on("click", function() {
     // get value of selection
     let value = d3.select(this).attr("value");
     if (value !== chosenXAxis) {  value
 
        chosenXAxis = "income"
        // replaces chosenXAxis with value
        chosenXAxis = value;
        d3.selectAll("#textCircles").remove();
        textGroup = svg.append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top+5})`)
        .selectAll("text")
        .data(Mydata)
        .enter()
        .append("text")
        .attr("x", d => scaleX2(d.dxArray))
        .attr("y", d => scaleY(d.dyArray))
        .text(d => d.abbr)
        .style("font-family", "sans-serif")
        .style("fill", "black")
        .style("text-anchor", "middle")

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = scaleX(Mydata, chosenXAxis);


    // .attr("style",".stateText")
    // .attr("name", d => d.abbr)
        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis,textGroup);
  


        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup,textGroup);

        // changes classes to change bold text
        if (chosenXAxis === "age") {
            Etiqueta1
              .classed("active", true)
              .classed("inactive", false);
            Etiqueta2
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            Etiqueta1
              .classed("active", false)
              .classed("inactive", true);
            Etiqueta2
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  }).catch(function(error) {
    console.log(error);
  });

 