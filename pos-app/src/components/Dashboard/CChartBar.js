import React, {useEffect, useState} from 'react'
import {CChart} from '@coreui/react-chartjs'

function CChartBar({data}) {
    console.log(data);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        if (data) {
            const result = [];
            for (let i = 1; i < 13; i++) {
                const month = new Date().getFullYear() + "/" + (i + 1)
                if (data[month]) {
                    result[i] = data[month];
                } else {
                    result[i] = 0;
                }
            }
            setMonthlyData(result);
        }
    }, [data])

    return (
        <CChart
            type="bar"
            data={{
                labels: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
                datasets: [
                    {
                        label: 'Monthly Sales',
                        backgroundColor: '#248ce0',
                        data: monthlyData,
                    },
                ],
            }}
            labels="months"
        />
    )
}

export default CChartBar
