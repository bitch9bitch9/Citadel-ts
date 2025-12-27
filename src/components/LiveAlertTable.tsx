// src/components/LiveAlertTable.tsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Tabs, Tab, Box
} from '@mui/material';
import { type SecurityAlert } from '../types';

interface Props {
  alerts: SecurityAlert[];
}

export const LiveAlertTable: React.FC<Props> = ({ alerts }) => {
  const [filter, setFilter] = useState('All');

  // 處理 Tab 切換
  const handleFilterChange = (_e: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };

  // 根據 Filter 篩選資料
  const filteredAlerts = filter === 'All'
    ? alerts
    : alerts.filter(alert => alert.severity === filter);

  // 定義風險等級的顏色 (配合截圖的橘/紅色系)
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return '#d32f2f'; // 紅
      case 'Severe': return '#f57c00';   // 橘
      case 'High': return '#ff9800';     // 淺橘
      default: return '#aaa';            // 灰
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#1e1e1e', color: '#fff' }}>
      {/* 頂部 Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#333' }}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          textColor="inherit"
          indicatorColor="secondary" // 指示條顏色
          aria-label="alert filters"
          sx={{
            '& .MuiTab-root': { color: '#888', textTransform: 'none', minWidth: 60 },
            '& .Mui-selected': { color: '#f57c00 !important', fontWeight: 'bold' } // 選中變橘色
          }}
        >
          <Tab label="All" value="All" />
          <Tab label="Critical" value="Critical" />
          <Tab label="Severe" value="Severe" />
          <Tab label="High" value="High" />
          <Tab label="Medium" value="Medium" />
          <Tab label="Low" value="Low" />
        </Tabs>
      </Box>

      {/* 表格內容 */}
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {['Timestamp', 'Edge Group', 'Alert Type', 'Source IP', 'Destination IP', 'Severity'].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    backgroundColor: '#121212', // 表頭背景更深
                    color: '#888',
                    borderBottom: '1px solid #333',
                    fontWeight: 'bold'
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlerts.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: '#2c2c2c !important' } }}>
                {/* 1. Timestamp (橘色) */}
                <TableCell sx={{ color: '#f57c00', borderBottom: '1px solid #333', fontFamily: 'monospace' }}>
                  {new Date(row.timestamp).toLocaleTimeString()}
                </TableCell>

                {/* 2. Edge Group (灰白) */}
                <TableCell sx={{ color: '#ddd', borderBottom: '1px solid #333' }}>
                  {row.edgeGroup}
                </TableCell>

                {/* 3. Alert Type (灰白) */}
                <TableCell sx={{ color: '#ddd', borderBottom: '1px solid #333' }}>
                  {row.ruleName}
                </TableCell>

                {/* 4. Source IP (帶國旗圖示概念，這裡先用文字顏色模擬) */}
                <TableCell sx={{ color: '#f57c00', borderBottom: '1px solid #333', fontFamily: 'monospace' }}>
                  🇯🇵 {row.sourceIp}
                </TableCell>

                {/* 5. Destination IP */}
                <TableCell sx={{ color: '#f57c00', borderBottom: '1px solid #333', fontFamily: 'monospace' }}>
                  🇯🇵 {row.destinationIp}
                </TableCell>

                {/* 6. Severity */}
                <TableCell sx={{ borderBottom: '1px solid #333' }}>
                  <span style={{ color: getSeverityColor(row.severity) }}>
                    {row.severity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};