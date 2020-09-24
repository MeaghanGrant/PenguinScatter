var homeworkMean=function(penguin)
{
    var getHomeworkGrades=function(homework)
        {
            return homework.grade
        }
var homeworkGrades=penguin.homework.map(getHomeworkGrades)
var homeworkMean=d3.mean(homeworkGrades)
    
        return homeworkMean
    }
    //function to get the mean of homework

    var getFinalGrade=function(penguin)
   {
       var final=penguin.final[0].grade
        return final
   }
    //function to get the grade on the final
var quizMean=function(penguin)
{
    var getQuizGrades=function(quiz)
        {
            return quiz.grade
        }
var quizGrades=penguin.quizes.map(getQuizGrades)
var quizMean=d3.mean(quizGrades)
    
        return quizMean
    }
//function to get the mean of the quizzes

//Home Work Mean vs Fianl
var setBanner = function(message)
    {
        d3.select("#banner")
            .text(message);
    }
var drawPlot=function(students,screen,xScale,yScale)
    {
        d3.select("#graph")
            .selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx",function(student)
                {
                    return xScale(homeworkMean(student));
                    //calling the function from above
                })
            .attr("cy",function(student)
                {
                    return yScale(getFinalGrade(student));
                    //calling the function from above
                })
            .attr("r",4)
        .on("mouseenter", function(student)
           {
            console.log("hovering",student.picture);
            var xPos =d3.event.pageX;
            var yPos =d3.event.pageY;
                
                d3.select("#tooltip")
                    .classed("hidden",false)
                    .style("top",yPos+"px")
                    .style("left",xPos+"px")
                d3.select("#image")
                    .append("img")
                    .attr("src","imgs/"+student.picture)
                    .style("top",yPos+"px")
                    .style("left",xPos+"px")
    
            })
        .on("mouseleave",function(student)
           {
                console.log("mouseleave")
             d3.select("#tooltip")
                    .classed("hidden",true)
                d3.select("#image")
                    .selectAll("img")
                    .remove()
            }) 
        setBanner("Homework Mean vs Final");
    }
//Homework Mean vs Quiz Mean
var drawPlot2=function(students,screen,xScale,yScale)
    {
        d3.select("#graph")
            .selectAll("circle")
            .data(students)
            .enter()
            .append("circle")
            .attr("cx",function(student)
                {
                    return xScale(quizMean(student));
                    //calling the function from above
                })
            .attr("cy",function(student)
                {
                    return yScale(homeworkMean(student));
                    //calling the function from above
                })
            .attr("r",4) 
        setBanner("Homework Mean vs Quiz Mean");
    }
var initGraph =function(students)
    {
        var screen={width:600,height:600}
        
        d3.select("#graph")
        .attr("width",screen.width)
        .attr("height",screen.height)
        
        var xScale=d3.scaleLinear()
            .domain([0,100])
            .range([0,screen.width])
        var yScale=d3.scaleLinear()
            .domain([0,100])
            .range([screen.height,0])
         drawPlot(students,screen,xScale,yScale);
        onClick(students,screen,xScale,yScale);
    }

//function for on click
var onClick=function(students,screen,xScale,yScale)
    {
        console.log("Final vs Homework Mean");
        d3.select("#button1")
        .on("click",function()
           {
                d3.selectAll("circle")
                    .remove()
                drawPlot2(students,screen,xScale,yScale);
            
        })
    }



var classPromise=d3.json("classData.json")
var successFCN=function(students)
    {
        console.log("Students",students);
        initGraph(students);
    };
var failFCN=function(error)
    {
        console.log("error",error);
    };
classPromise.then(successFCN,failFCN);