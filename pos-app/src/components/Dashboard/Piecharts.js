import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function Piecharts(props) {
    return (
        <CChart
            type="pie"
            data={{
                labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
                datasets: [
                {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#41B883', '#DD1B16' ],
                    data: [props.cat1, props.cat2, props.cat3, props.cat4, props.cat5, props.cat6],
                },
                ],
            }}
        />
    )
}

export default Piecharts
