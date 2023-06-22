import React, {useEffect, useState} from 'react'
import { CChart } from '@coreui/react-chartjs'

function Piecharts({data}) {
    const [categories, setCategories] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log(data);
        if (data) {
            const c = data.map(c => c.category.category_name);
            setCategories(c);
            const q = data.map(c => c.total);
            setChartData(q);
        }
    }, [data])

    return (
        <CChart
            type="pie"
            data={{
                labels: categories,
                datasets: [
                {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#172EF5', '#683A10' , '#FDC307', '#FD47EB', '#8F3AE4'],
                    data: chartData,
                },
                ],
            }}
        />
    )
}

export default Piecharts
