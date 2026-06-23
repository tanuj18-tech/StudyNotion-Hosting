import { useState } from "react"
//npm i chart.js
import { Chart, registerables } from "chart.js";
//npm i react-chartjs-2
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);


export default function InstructorChart({courses}){
         console.log("coursess = ",courses.length)
  const [currChart, setCurrChart] = useState("students");

  const  generateRandomColors = (numColors) => {
    const colors = [];
     for(let i = 0;i<numColors;i++){
      // yeh ek color hogya
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`
      colors.push(color);
    }
     return colors;
  }

  // create data to show student info
  // syntax for creating data
    const chartDataStudents = {
      
        labels: courses.slice(0,courses.length).map((course) => course.courseName),
        datasets: [
          {
            data: courses.slice(0,courses.length).map((course) => course.totalStudentsEnrolled),
            backgroundColor: generateRandomColors(courses.length)
          }
        ]
    }

  // create data to show income info
          const chartDataIncome = {
        labels: courses.slice(0,courses.length).map((course) => course.courseName),
        datasets: [
          {
            data: courses.slice(0,courses.length).map((course) => course.totalAmountGenerated),
            backgroundColor: generateRandomColors(courses.length)
          }
        ]
    }

    //create options
    const options = {
        // maintainAspectRatio: false,
    }
  return (
    <div className=" w-[80%]">

      

         <div className="flex flex-1 flex-col h-full gap-y-4 rounded-md bg-richblack-800 p-6">
       <p className="text-lg font-bold text-richblack-5">Visualize</p>
       <div className="space-x-4 font-semibold">
         {/* Button to switch to the "students" chart */}
         <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>

      </div>
      <div className="relative mx-auto aspect-square h-[300px] w-[300px]">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartDataIncome}
          options={options}
        />
      </div>
    </div>
    </div>
  )
}

 