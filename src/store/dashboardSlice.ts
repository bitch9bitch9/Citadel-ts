
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SecurityAlert } from '../types';
import { MOCK_ALERTS } from '../mockData';

// 定義這個 Slice 的狀態介面
interface DashboardState {
  alerts: SecurityAlert[];
  lastUpdated: string;
}

// 初始狀態
const initialState: DashboardState = {
  alerts: MOCK_ALERTS,
  lastUpdated: new Date().toISOString(),
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // 定義一個 Action：新增警報 (未來模擬實時數據用)
    addAlert: (state, action: PayloadAction<SecurityAlert>) => {
      state.alerts.unshift(action.payload); // 加到陣列最前面
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { addAlert } = dashboardSlice.actions;
export default dashboardSlice.reducer;