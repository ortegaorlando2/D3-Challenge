
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

// Load Data from csv
d3.csv("MyData.csv").then(function(Mydata) {

// Step 1: Assign variables
 
    Mydata.forEach(function(data) {
      data.dxArray = +data.x;
      data.dyArray = +data.y;
    });

    // console.log(`This is my x coordinate ${data.dxArray}`)
    // console.log(`This is my y coordinate ${data.dyArray}`)

    // Create scale function with scaleLinear
    // the graph that we are planning is a scatter plot
    let scaleX = d3.scaleLinear()
      .domain([0, d3.max(Mydata, d => d.dxArray)])
      .range([0, width]);
      //.padding(0.1);

    let scaleY = d3.scaleLinear()
      .domain([0, d3.max(Mydata, d => d.dyArray)])
      .range([height, 0]);

    //-Create axes 
    let bottomAxis = d3.axisBottom(scaleX);
    let leftAxis = d3.axisLeft(scaleY);

    // draw in correct places the axes of the chart
    
    chartGroup.append("g")
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
    .attr("cx", d => scaleX(d.dxArray))
    .attr("cy", d => scaleY(d.dyArray))
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".8");

    // Create a tooltip object inside the html. add a div tag 
    //the div will have a handle class called tooltip
    let toolTip = d3.select('body').append('div').classed('tooltip', true);

    // this is from an example to show values when data is hover
    // ==============================
    circlesGroup.on("click", function(event, d) {
      toolTip.style('display', 'block')
              .html(`${d.state}<br>X coordinate ${d.dxArray}<br>Y coordinate ${d.dyArray}`)
              .style('left', event.pageX+'px')
              .style('top', event.pageY+'px');
    })
      // onmouseout event
      .on("mouseout", function() {
        toolTip.style('display', 'none');
      });

    // Graph tick labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Coordinate y");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Coordinate x");
  }).catch(function(error) {
    console.log(error);
  });


//&&&&&&&&&&&&&&&&&&&&&&& BAR FROM CSV  &&&&&&&&&&&&&&&&&&&&&&&&&&

// let svg = d3.select("body").append("svg");

// svg.attr("width", "1000px").attr("height", "1000px");

// let svgW = 960;
// let svgH = 660;

// Define SVG area dimensions

// Define the chart's margins as an object
// let chartMargin = {
//   top: 30,
//   right: 30,
//   bottom: 30,
//   left: 30
// };

// let myArray = [17, 23, 20, 34];

// Define dimensions of the chart area
// let chartWidth = svgW - chartMargin.left - chartMargin.right;
// let chartHeight = svgH - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
// let svgChart = d3
//   .select("body")
//   .append("svg")
 // .attr("height", svgH)
//  .attr("width", svgW);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
// let chartGroup = svg.append("g")
// .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// //.attr("transform", 'translate(200, 100)');

          // let dxArray=[]
          // let dyArray=[]

// // Load data from .csv
// d3.csv("Mydata.csv").then(function(health) {

  // Print the Data
  //console.log(`data ${health}`);

  // Cast the x value to a number for each piece of Data
  // health.forEach(function(data) {
  //   // converting from string to number + is the same parseInt
  //   dx = +data.x;
  //   dy = +data.y;
          // dxArray.push(dx)
          // dyArray.push(dy)
    // console.log(`data.x ${dx}`)
    // console.log(`data.y ${dy}`)
    // });

    // console.log(`This is my x coordinate ${dxArray}`)
    // console.log(`This is my y coordinate ${dyArray}`)

        // let barSpacing = 10; // desired space between each bar
        // let scaleY = 5; // 10x scale on rect height


        // console.log(`barSpacing ${barSpacing}, scaleY ${scaleY}`)

 // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
            // let barWidth = (chartWidth - (barSpacing * (health.length - 1))) / health.length;

            // console.log(`chartWidth ${chartWidth}, Number of columns ${health.length}`) 

  // Create code to build the bar chart using the tvData.
        // chartGroup.selectAll('rect')         
        //           .data(health)
        //           .enter()
        //           .append('rect')
        //           .attr('x', (d,i) => i*(barWidth+barSpacing)) // xScale(d)            
        //           .attr('y', (d,i) => chartHeight - d.y*scaleY)
        //           .attr('width', barWidth)
        //           .attr('height', (d,i) => d.y*scaleY)
        //           .attr('fill', 'blue');
        // console.log(`finished with the managed plot`)


  //--------------------   CALCULATING generic spacings --------------------
  //determining the extent of my data
          // console.log("min value ", d3.min(dxArray));
          // console.log("max value ", d3.max(dxArray));
          // console.log("min and max values ", d3.extent(dxArray));
  //scaling the data
  // scaleY = d3.scaleLinear()
  //   .domain([0, 100]) // extent (min,max) of your dataset
  //   .range([0, 600]); // entent (min, max) of the chart area (in pixels)

    // console.log(`50 returns ${scaleY(50)}`);
    // console.log(`75 returns ${scaleY(75)}`);
    // console.log(`100 returns ${scaleY(100)}`);

  //mapping your data to pixels using scaling
  // let scaleX = d3.scaleBand()
  // .domain(dxArray)   
  // .range([0, chartWidth])
  // .padding(0.1);

  // scaleY = d3.scaleLinear()
  // .domain([0, d3.max(dyArray)])
  // .range([chartHeight, 0]);


// console.log(`Smoker1 x-coordinate: ${scaleX(dxArray[0])}`);
// console.log(`Smoker2 x-coordinate: ${scaleX(dxArray[1])}`);
// console.log(`Smoker3 x-coordinate: ${scaleX(dxArray[2])}`);
// console.log(`Smoker4 x-coordinate: ${scaleX(dxArray[3])}`);

// console.log(`Each band is ${scaleX.bandwidth()} pixels wide.`);
// console.log(`The height of Smoker1 bar: ${scaleY(dyArray[0])}`);

// create axes
// let yAxis = d3.axisLeft(scaleY);
// let xAxis = d3.axisBottom(scaleX);

// set x to the bottom of the chart
// chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(xAxis);

// chartGroup.append("g")
//   .call(yAxis);

// chartGroup.selectAll(".bar")
//   .data(health)
//   .enter()
//   .append("rect")
//   .classed("bar", true)
//   .attr("x", (d, i) => scaleX(dxArray[i]))
//   .attr("y", d => scaleY(d))
//   .attr("width", scaleX.bandwidth())
//   .attr("height", d => chartHeight - scaleY(d));

//%%%%%%%%%%%%%%%%%   LINE GENERATOR  %%%%%%%%%%%%%%%%%%%%%%%%%%%

// var keys = ['x', 'y'];
// var values = [dxArray, dyArray]

// var result = {};
// keys.forEach((key, i) => result[key] = values[i]);
// console.log(result);

// console.log(dxArray[0])

        // let dataArray=[]
        // for(let j=0; j < dxArray.length; j++){
        // var dict = {};
        // // for( let i=0; i<dxArray.length; i++){
        //   dict["id"]=`Smoker${j}`
        //   dict["x"]=dxArray[j]
        //   dict["y"]=dyArray[j]
        //   dict["value"]=dyArray[j]
        //   dataArray.push(dict)
        // }

  // console.log(dataArray)

  // scaleX = d3.scaleLinear()
  // .domain([0, d3.max(dataArray, d => d.x)])
  // .range([0, 400]);

  // scaleY = d3.scaleLinear()
  // .domain([0, d3.max(dataArray, d => d.y)])
  // .range([0, 250]);


          // let lineGenerator = d3.line()
          // .x(d => scaleX(d.x))
          // .y(d => scaleY(d.y));
          // console.log("Drawing commands:", lineGenerator(dataArray));

          // let foo=d3.select("#path-2");

          // foo.append("path")
          //   .attr("fill", "none")
          //   .attr("stroke", "blue")
          //   .attr("stroke-width", 5)
          //   .attr("d", lineGenerator(dataArray));

          //   new d3plus.Plot()
          //   .data(dataArray)
          //   .groupBy("id")
          //   .size("value")
          //   .sizeMin(20)
          //   .sizeMax(100)
          //   .render();

// svg = d3.select("#path-3");

// svg.append("path")
//   .attr("fill", "none")
//   .attr("stroke", "orange")
//   .attr("stroke-width", 5)
//   .attr("d", lineGenerator(dataArray));

        // }).catch(function(error) {
        //   console.log(error);
        // });






// console.log('************ scaling your data');

// let testScores = [50, 90, 95, 75, 85];

// // a. hard-coded
// // yScale a function
// let yScale = d3.scaleLinear()
//     .domain([0, 100]) // extent (min,mix) of your dataset
//     .range([0, 1000]); // entent (min, max) of the chart area (in pixels)

   

//     console.log('************ mapping your data to pixels using scaling');

// svgH = 600;
// svgW = 1000;

// testScores = [90, 85, 75, 90];
// let students = ["Han", "Sarah", "Matt", "Ruchi"]; // categorical data

// let xScale = d3.scaleBand()
//   .domain(students)  // array categorical data 
//   .range([0, svgW])
//   .padding(0.1);


//******************* BUILD A TABLE **************************

// d3.select("tbody")
//   .selectAll("tr")
//   .data(risks)
//   .enter()
//   .append("tr")
//   .html(function(d) {
//     return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
//   });

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  PLOT CIRCLES ^^^^^^^^^^^^^^^^^^^^^^^
// let circles = svg.selectAll("circle");

// let rValues = [40, 25, 10];

// circles.data(rValues)
//     .enter()
//     .append("circle")
//     .attr("cx", 50)
//     .attr("cy", 50)
//     .attr("r", function(d) {
//       return d;
//     })
//     .attr("stroke", "black")
//     .attr("stroke-width", "5")
//     .attr("fill", "red");

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 // Data which we will be using to build our chart
// let booksReadThisYear = [15];

// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
// d3.select("#svg-area")
//   .append("svg")
//   .attr("height", "600px")
//   .attr("width", "400px");

// Append a rectangle and set its height in relation to the booksReadThisYear value
// let selection = svg.selectAll('rect')
//   .data(booksReadThisYear);

//   selection.enter()
//   .append('rect')
//   .classed('bar', true) // for bonus
//   .merge(selection)
//   .attr("width", 100)
//   .attr("height", function(d) {
//     return d * 10;
//   })
//   .attr("x", 0)
//   .attr("y", 0); 

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%  BAR CHART  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// Vertical Bar Chart
// Selects all rectangles currently on the page - which is none - and binds our dataset to them. If there are no rectangles, it will append one for each piece of data.
// svg.selectAll("rect")
//   .data(myArray)
//   .enter()
//   .append("rect")
//   .classed("bar", true)
//   .attr("width", 50)

  // Setting the height of our rectangles now uses an anonymous function that selects a single piece of data from our dataset and multiplies it by 10
  // .attr("height", function(data) {
  //   return data * 10;
  // })

  // // Setting the height of our rectangles now uses an anonymous function that selects a single piece of data from our dataset and multiplies it by 10
  // .attr("x", function(data, index) {
  //   return index * 60;
  // })
  // .attr("y", function(data) {
  //   return 600 - data * 10;
  // })
  // .attr("class", "bar");


  // for bonus 2
  // .attr("y", function(d) {
  //   return svgHeight - d * 10;
  // });

// Horizontal Bar Chart
// svg.selectAll("rect")
//   .data(booksReadThisYear)
//   .enter().append("rect")
//   .classed("bar", true)
//   .attr("width", function(d) {
//     return d * 10;
//   })
//   .attr("height", 50)
//   .attr("x", 0)
//   .attr("y", function(d, i) {
//     return i * 60;
//   });



//**********************READ A CSV****************/
// // Dataset we will be using to set the height of our rectangles
// d3.csv("./Mydata.csv").then(function(healthData) {

//   //console.log(healthData);

//   // log a list of Smokers values
//   let x = healthData.map(data => data.x);
//   //console.log("Smokers", x);

//   // Cast each hours value in tvData as a number using the unary + operator
//   healthData.forEach(function(data) {
//     data.y = +data.y;
//     data.x = +data.x;
//     //console.log("Smokers:", data.x);
//     //console.log("Age:", data.y);
//   });
// }).catch(function(error) {
//   console.log(error);
// });

//****************************************************/

