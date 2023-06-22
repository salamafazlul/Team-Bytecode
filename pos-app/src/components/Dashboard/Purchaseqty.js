import React, {useEffect, useState} from 'react'
import {CChart} from '@coreui/react-chartjs'

function Purchaseqty({data}) {
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
        <CChart type="bar" className='barchart'
                data={{
                    labels: categories,
                    datasets: [
                        {
                            label: 'Purchase Quantity',
                            data: chartData,
                            backgroundColor: ['#6812c9'],
                            borderWidth: 1
                        },
                    ],
                }}
                labels="Categories"
        />
    )
}

export default Purchaseqty
