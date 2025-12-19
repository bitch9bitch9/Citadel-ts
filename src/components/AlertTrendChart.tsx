import React, { useState } from 'react';
import Plot from 'react-plotly.js';

interface ChartData {
  x: string[];
  yCritical: number[];
  ySevere: number[];
}


export const AlertTrendChart: React.FC = () => {

  const [chartData] = useState<ChartData>(() => {
    const xValues: string[] = [];
    const yCritical: number[] = [];
    const ySevere: number[] = [];
    const now = new Date();

    // 生成過去 24 小時的資料
    for (let i = 23; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 60 * 60 * 1000);
      xValues.push(t.getHours() + ':00');
      yCritical.push(Math.floor(Math.random() * 10) + 2);
      ySevere.push(Math.floor(Math.random() * 15) + 5);
    }

    return { x: xValues, yCritical, ySevere };
  });


  return (
    <Plot
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      data={[
        {
          x: chartData.x,
          y: chartData.yCritical,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Critical',
          marker: { color: '#d32f2f' },
          line: { shape: 'spline', width: 3 },
          fill: 'tozeroy',
          fillcolor: 'rgba(211, 47, 47, 0.1)',
        },
        {
          x: chartData.x,
          y: chartData.ySevere,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Severe',
          marker: { color: '#f57c00' },
          line: { shape: 'spline', width: 3 },
        },
      ]}
      layout={{
        autosize: true,
        margin: { l: 40, r: 20, t: 20, b: 40 },
        showlegend: true,
        legend: { orientation: 'h', y: 1.1 },
        xaxis: {
          showgrid: false,
          tickfont: { color: '#666' },
        },
        yaxis: {
          showgrid: true,
          gridcolor: '#eee',
          tickfont: { color: '#666' },
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      }}
      config={{ displayModeBar: false }}
    />
  );
};