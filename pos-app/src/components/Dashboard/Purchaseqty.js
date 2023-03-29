import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function Purchaseqty() {
    return (
        <CChart type="bar" className='barchart'
            data={{
                labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
                datasets: [
                {
                    label: 'Purchase Quantity',
                    data: [40, 20, 12, 39, 10, 40, 20, 12, 39, 10],
                    backgroundColor: ['#6812c9'],
                      borderWidth: 1
                },
                ],
            }}
            labels="months"
        />
    )
}

export default Purchaseqty
