d3.dsv("\t", "city_temp.tsv", function(d){
    return {
        city: d.City,
        lat:+d.Lat,
        long:+d.Long,
        temp:+d.JanTemp
    }
}).then(function(data){
    console.log(data);

    data.sort(function(a, b){
        if (a.long <= b.long){
            return -1;
        } else {
            return 1;
        }
    });
    console.log(data);

    var height  = 500,
        width   = 1300,
        margin = {top: 20, right: 15, bottom: 80, left: 75};

    width -= margin.left+margin.right;
    height -= margin.top+margin.bottom;

    var svg = d3.select('body').append("svg")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    x.domain(d3.extent(data, function(d) { return d.long; }));
    var y = d3.scaleLinear().range([height, 0]);
    y.domain(d3.extent(data, function(d) { return d.temp; }));

    console.log(x);
    console.log(y);

    var valueline = d3.line()
        .x(function(d) { return x(d.long); })
        .y(function(d) { return y(d.temp);  })
       .curve(d3.curveLinear);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .style("fill","none")
        .style("stroke","red")
        .style("stroke-width","1.5px");

    //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
        var xAxis = d3.axisBottom().scale(x).ticks(10);
        //var yAxis = d3.axisLeft().scale(y).ticks(30);






    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .style("fill","none")
        .style("stroke","black")
        .style("shape-rendering","cripsEdges")
        .style("font-size","10px")
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    svg.append("text")      //
        .attr("x", 650 )
        .attr("y",  475 )
        .attr("font-weight", 900)
        .style("text-anchor", "middle")
        .text("Longitude");


    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")      //
        .attr("x", -170 )
        .attr("y",  -40 )
        .attr("transform", "rotate(-90)")
        .attr("font-weight", 900)
        .style("text-anchor", "middle")
        .text("Temperature");

    svg.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr("font-weight", 900)
        .text('January Temp');

});
