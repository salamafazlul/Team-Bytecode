import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function Linechart() {
    return (
        <CChart type="line" 
            data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                {
                    label: "Total Expenses",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(36, 140, 224)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#248ce0",
                    data: [40, 20, 12, 39, 10, 40, 39]
                },
                {
                    label: "Total Profit",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(224, 36, 224)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#6812c9",
                    data: [50, 12, 28, 49, 7, 50, 70]
                },
                ],
            }}
        />
    )
}

export default Linechart
