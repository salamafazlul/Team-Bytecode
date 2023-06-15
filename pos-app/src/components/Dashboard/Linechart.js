import React, {useEffect, useState} from 'react'
import { CChart } from '@coreui/react-chartjs'

function Linechart({data}) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const res = [];
            for (let i = 0; i < 12; i++) {
                const md = data.find(dm => dm.month === new Date().getFullYear() + "/" + (i + 1))
                if (md) {
                    res[i] = md?.profit;
                } else {
                    res[i] = 0;
                }
            }
            setChartData(res);
        }
    }, [data])

    return (
        <CChart type="line"
            data={{
                labels: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
                datasets: [
                {
                    label: "Total Profit",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(224, 36, 224)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#6812c9",
                    data: chartData
                },
                ],
            }}
        />
    )
}

export default Linechart
