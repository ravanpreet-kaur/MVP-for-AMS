import React, { useState, useEffect } from 'react';
import PlotChart from 'charts/visualizeData/chart';
import * as dfd from "danfojs";
import { pallete } from '../ColorPallete/colorPallete';
import { Unit } from '../Labels/Units'

function VisualizePlots(props) {
    const [xAxis, setxAxis] = useState()
    const [yAxis, setyAxis] = useState()
    const [yParameters, setyParameters] = useState()
    const [LengthLabels, setLength] = useState()
    const [finalData, setData] = useState()
    const [file, setFile] = useState("./Automobile_data.csv")

    const fetchData = async () => {
        if(props.file){
            setFile(props.file)
        }
        let df = await dfd.readCSV(file)
        console.log(df)
        let columnX = props.columnX
        let columnY = props.columnY
        let CalculateOperation = props.Calculate
        let grp = df.groupby([columnX])
        let computed_df, x = [], y = [], aggregating_parameters = {}, yAxisParameter = [];

        if (CalculateOperation === "series") {
            let grpCol = grp.col(columnY)
            computed_df = grpCol.apply(x => x)
            yAxisParameter = columnY
        }
        else if (CalculateOperation === "count") {
            let grpCol = grp.col(columnY)
            computed_df = grpCol.count()
            for (var i = 0; i < columnY.length; i++) {
                yAxisParameter.push(columnY[i] + "_" + CalculateOperation)
            }
        }
        else {
            for (var i = 0; i < columnY.length; i++) {
                aggregating_parameters[columnY[i]] = CalculateOperation[i];
                yAxisParameter.push(columnY[i] + "_" + CalculateOperation[i])
            }
            computed_df = grp.agg(aggregating_parameters)
        }

        const df_JSON = dfd.toJSON(computed_df);
        df_JSON.map((i) => {
            x.push(i[columnX])
        })

        for (var j = 0; j < columnY.length; j++) {
            let arr = [];
            df_JSON.map((i) => {
                arr.push(i[yAxisParameter[j]])
            });
            y.push(arr)
        }
        let length = columnY.length
        let dataset = [];
        for (var i = 0; i < length; i++) {
            let color = pallete[Math.floor(Math.random() * pallete.length)];
            let label = yAxisParameter[i]
            if (Unit[columnY[0]] != "") {
                label += " in " + Unit[columnY[i]]
            }

            dataset.push({
                label: label,
                data: y[i],
                backgroundColor: color,
                borderColor: color,
            })
            console.log(dataset)
        }

        setyParameters(yAxisParameter)
        setLength(length)
        setxAxis(x)
        setData(dataset)
        setyAxis(y)
    }
    useEffect(() => {
        fetchData();
    }, [props, file])

    return (
        <div>
            <PlotChart ChartType={props.ChartType} indexAxis={props.indexAxis} aspectRatio={props.aspectRatio} xAxis={xAxis} dataset={finalData} title={props.title} radius={props.radius} />
        </div>
    )
}

export default VisualizePlots