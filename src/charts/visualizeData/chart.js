import React from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'


const PlotChart = (props) => {

    let ChartType = props.ChartType

    const data = {
        labels: props.xAxis,
        datasets: props.dataset
    };

    const options = {
        indexAxis: props.indexAxis,
        maintainAspectRatio: props.aspectRatio,
        elements: {
            point: {
                radius: props.radius
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title,
            },
        }
    }


    return (
        <div>
            <ChartType data={data} options={options} />
        </div>
    )
}

export default PlotChart