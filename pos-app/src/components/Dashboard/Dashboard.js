import React from 'react'
import './dashboard.css'
import TextExample from './TextExample'
import CChartBar from './CChartBar'
import Piecharts from './Piecharts'
import Linechart from './Linechart'
import Topselling from './Topselling'
import Purchaseqty from './Purchaseqty'

export default function Dashboard() {
    return (
        <div>
            <div>
                <TextExample />

                <div>
                    <h1></h1>
                    <h4>Top Selling items</h4>
                    <Topselling />
                </div>

                <h1></h1>
                <div className='section'>
                    <div className='leftcol'>
                        <h5>Monthly Sales</h5>
                        <CChartBar jan="20" feb="60" march="30" apri="40" may="15" june="20" july="40" aug="50" sep="10" oct="35" nov="25" dec="50" />
                    </div>
                    <div className='rightcol'>
                        <h5>Total Revenue & Expenses</h5>
                        <Linechart />
                    </div>
                </div>

                <div className='section'>
                    <div className='leftcol'>
                        <h5>Purachse Quantity By Product Category</h5>
                        <Purchaseqty />
                    </div>
                    <div className='rightcol'>
                        <div className='piecol'>
                            <h5>Sales by product Category</h5>
                            <Piecharts cat1='50' cat2='10' cat3='5' cat4='15' cat5='5' cat6='15' />
                        </div>
                        <div className='donghutcol'>
                            <h5>Inventory by Category</h5>
                            <Piecharts cat1='10' cat2='20' cat3='10' cat4='30' cat5='5' cat6='25' />
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

