import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function CChartBar(props) {
    return (
        <CChart
            type="bar"
            data={{
                labels: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July','Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
                datasets: [
                {
                    label: 'Monthly Sales',
                    backgroundColor: '#248ce0',
                    data: [props.jan, props.feb, props.march, props.apri, props.may, props.june, props.july, props.aug, props.sep, props.oct, props.nov, props.dec],
                },
                ],
            }}
            labels="months"
            />
    )
}

export default CChartBar
