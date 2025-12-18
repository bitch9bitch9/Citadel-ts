// src/Dashboard.tsx
import React, { useEffect, useMemo } from 'react';
import { Box, Paper, Typography, Container, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Redux 相關引入
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { addAlert } from '../store/dashboardSlice';

// 引入元件與工具
import { AlertTrendChart } from '../components/AlertTrendChart';
import { generateRandomAlert } from '../utils'; // 剛剛寫好的產生器

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  
  // 1. 從 Redux 取得資料
  const alerts = useSelector((state: RootState) => state.dashboard.alerts);

  // 2. 統計數據 (useMemo)
  const criticalCount = useMemo(() => alerts.filter(a => a.severity === 'Critical').length, [alerts]);
  const severeCount = useMemo(() => alerts.filter(a => a.severity === 'Severe').length, [alerts]);
  const totalEvents = alerts.length;

  // 3. 【核心修改】模擬實時數據流引擎
  useEffect(() => {
    // 設定定時器：每 3000 毫秒 (3秒) 執行一次
    const timer = setInterval(() => {
      const newAlert = generateRandomAlert(); // 產生新警報
      dispatch(addAlert(newAlert));           // 派送給 Redux
    }, 3000);

    // 清除函數：當使用者離開頁面時，記得停止定時器，避免記憶體洩漏
    return () => clearInterval(timer);
  }, [dispatch]);

  // 輔助函數：根據風險等級回傳對應顏色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'error';
      case 'Severe': return 'warning';
      case 'High': return 'warning';
      default: return 'info';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f4f6f8', py: 4 }}>
      <Container maxWidth="xl">
        
        {/* 標題區 */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <SecurityIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
            資安監控儀表板 (Cybersecurity Dashboard)
          </Typography>
        </Box>

        <Grid container spacing={3}>
          
          {/* A. 數據卡片區 (會自動跳動！) */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140, borderLeft: '6px solid #d32f2f' }}>
              <Typography color="textSecondary" variant="subtitle1">Critical Threats</Typography>
              <Typography variant="h3" color="#d32f2f" fontWeight="bold">
                {criticalCount} {/* 自動更新 */}
              </Typography>
              <Chip label="Live Updating" color="error" size="small" sx={{ mt: 'auto', alignSelf: 'flex-start' }} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140, borderLeft: '6px solid #f57c00' }}>
              <Typography color="textSecondary" variant="subtitle1">Severe Alerts</Typography>
              <Typography variant="h3" color="#f57c00" fontWeight="bold">{severeCount}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140, borderLeft: '6px solid #1976d2' }}>
              <Typography color="textSecondary" variant="subtitle1">Total Events</Typography>
              <Typography variant="h3" color="#1976d2" fontWeight="bold">{totalEvents}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140, borderLeft: '6px solid #2e7d32' }}>
              <Typography color="textSecondary" variant="subtitle1">System Status</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="h5" color="#2e7d32" fontWeight="bold">Active Monitoring</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* B. 圖表區 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={3} sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>警報趨勢圖 (Alert Trends)</Typography>
              <Box sx={{ width: '100%', height: '90%' }}>
                <AlertTrendChart />
              </Box>
            </Paper>
          </Grid>

          {/* C. 最新警報列表 (Live Feed) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={3} sx={{ p: 3, height: 400, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">最新警報 (Live Feed)</Typography>
                <WarningAmberIcon color="warning" className="blink" /> {/* 這裡可以用 CSS 讓它閃爍 */}
              </Box>
              
              {/* 【核心修改】連接 Redux 資料 */}
              {/* 只顯示最新的 10 筆 */}
              {alerts.slice(0, 10).map((alert) => (
                <Box key={alert.id} sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee', animation: 'fadeIn 0.5s' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="bold">{alert.ruleName}</Typography>
                    {/* 簡單格式化時間 */}
                    <Typography variant="caption" color="textSecondary">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="textSecondary">{alert.sourceIp}</Typography>
                    <Chip 
                      label={alert.severity} 
                      size="small" 
                      color={getSeverityColor(alert.severity)} 
                      variant="outlined" 
                      sx={{ height: 20, fontSize: '0.7rem' }} 
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};