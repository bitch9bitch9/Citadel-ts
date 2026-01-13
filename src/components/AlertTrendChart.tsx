import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Moment from 'moment';
import type { SecurityAlert } from '../types';

// 模擬後端傳輸JSON資料結構
interface AlertDataPoint {
  second: Date;
  count: number;
}
interface DataStructure {
  [severity: string]: AlertDataPoint[];
}

// 組件傳遞資料定義
interface AlertTrendChartProps {
  data: SecurityAlert | undefined;
}

const header = ['Critical', 'Severe'];

const SEVERITY_COLOR: { [severity: string]: Plotly.Color } = {
  Severe: '#FF5600',
  Critical: '#FD0',
};

// Data作圖邏輯
const convertDataForPlotly = (data: DataStructure): Plotly.Data[] => {
  const traces: Plotly.Data[] = [];

  // 先判斷headerIndex是否為0，來決定應該顯示甚麼樣的資料(Critical、Severe)
  // const filterArray = [];
  const filterArray = header;
  // if (headerIndex !== 0) {
  //   if (headerIndex === 1) {
  //     filterArray.push('Critical');
  //   } else {
  //     filterArray.push('Severe');
  //   }
  // } else {
  //   filterArray.push(...header);
  // }

  for (const severity of filterArray) {
    if (data[severity]) {
      const xValues = data[severity].map((entry) =>
        Moment(entry.second).format('YYYY-MM-DD HH:mm:ss'),
      );
      const yValues = data[severity].map((entry) => entry.count);

      traces.push({
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: severity,
        fill: 'tozeroy',
        opacity: 1,
        line: {
          width: 0,
          shape: 'spline',
          color: SEVERITY_COLOR[severity],
        },
      });

      // 鎖定數據
      // if (hoverX) {
      //   traces.push(highlightLine(hoverX, xValues, yValues, severity));
      // }

      // if (lockedX) {
      //   traces.push(highlightLine(lockedX, xValues, yValues, severity));
      // }
    }
  }

  return traces;
};

// 生成數據點之間的垂直分隔線
const generateVerticalLines = (data: DataStructure) => {
  const lines: Partial<Plotly.Shape>[] = [];

  header.forEach((severity) => {
    if (!data[severity] || data[severity].length <= 1) return;

    for (let i = 0; i < data[severity].length - 1; i++) {
      const currentTime = Moment(data[severity][i].second);
      const nextTime = Moment(data[severity][i + 1].second);

      // 檢查當前點和下一個點是否有數據
      const hasCurrentData = data[severity][i].count > 0;
      const hasNextData = data[severity][i + 1].count > 0;

      // 當前後兩個點數據其中一個有數據時才生成分隔線
      if (hasCurrentData || hasNextData) {
        // 計算兩個時間點的中間時間
        const middleTime = currentTime.clone().add(
          nextTime.diff(currentTime) / 2,
          'milliseconds',
        );

        // 動態修正間隔線粗度
        const getDynamicWidth = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth < 600) return 1; // 手機版用 1px
          if (windowWidth < 1200) return 2; // 平板版用 2px
          return 3; // 桌機版用 3px
        };

        lines.push({
          type: 'line',
          x0: middleTime.format('YYYY-MM-DD HH:mm:ss'),
          x1: middleTime.format('YYYY-MM-DD HH:mm:ss'),
          y0: 0,
          y1: 1,
          yref: 'paper',
          line: {
            color: '#1e1e1e',
            width: getDynamicWidth(),
            dash: 'solid',
          },
        });
      }
    }
  });

  return lines;
};

// layout細節
const updatedLayout = (data: DataStructure): Partial<Plotly.Layout> => ({
  autosize: true,
  hovermode: 'x unified',
  hoverlabel: {
    bgcolor: '#4E5A63',
    font: {
      color: '#FFF',
    },
  },
  height: 400,
  xaxis: {
    type: 'date',
    tickformat: '%M:%S',
    tickfont: {
      color: '#FFF',
      size: 12, // 初始字體大小
    },
    showgrid: false,
    showspikes: false, // 顯示懸停提示線
    fixedrange: true,
    autorange: true,
    rangemode: 'tozero', // 確保從 0 開始
    hoverformat: '%H:%M:%S',
  },
  yaxis: {
    gridcolor: '#333',
    tickfont: {
      color: '#FFF',
      size: 12, // 初始字體大小
    },
    showgrid: false,
    fixedrange: true,
    autorange: true,
    rangemode: 'tozero', // 確保從 0 開始
  },
  barmode: 'overlay', // 重疊柱狀圖與其他圖層
  margin: {
    l: 40, r: 20, t: 20, b: 40, // 設置圖表邊距
  },
  showlegend: false,
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  shapes: [...generateVerticalLines(data)], // 垂直分割線
});

// 初始數據生成函數
const SpawnData = () => {
  const TOTAL_POINTS = 150; // 預計生成資料點
  const yCritical: AlertDataPoint[] = [];
  const ySevere: AlertDataPoint[] = [];
  const now = new Date();

  // 生成資料
  for (let i = TOTAL_POINTS; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 3 * 1000);
    yCritical.push({ second: t, count: Math.floor(Math.random() * 10) + 2 });
    ySevere.push({ second: t, count: Math.floor(Math.random() * 15) + 5 });
  }

  return {
    Critical: yCritical,
    Severe: ySevere
  };
}

export const AlertTrendChart: React.FC<AlertTrendChartProps> = ({ data }) => {


  // 以隨機生成模擬數據
  const [chartData, setChartData] = useState<DataStructure>(SpawnData());


  React.useEffect(() => {
    if (data) {
      setChartData((prevData) => {
        const now = new Date();
        const newCritical = { second: now, count: Math.floor(Math.random() * 10) + 2 };
        const newSevere = { second: now, count: Math.floor(Math.random() * 15) + 5 };

        return {
          // 滑動視窗：移除最舊的一筆，加入最新的一筆
          Critical: [...prevData.Critical.slice(1), newCritical],
          Severe: [...prevData.Severe.slice(1), newSevere],
        };
      });
    }
  }, [data]);

  // 結束休眠模式
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setChartData(SpawnData());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const plotlyTraces = convertDataForPlotly(chartData);


  return (
    <Plot
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      data={plotlyTraces}
      layout={updatedLayout(chartData)}
      config={{ displayModeBar: false }}
    />
  );
};