# 🛡️ Citadel - Cybersecurity Dashboard (React + TypeScript)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A high-performance, real-time cybersecurity monitoring dashboard built with modern web technologies.
> **[🔴 View Live Demo](https://citadel-ts.vercel.app/)**

![Project Preview](https://github.com/user-attachments/assets/85bd223b-88a0-4103-93ca-c0ed14b14cd5)
*(Note: Data shown in the dashboard is simulated for demonstration purposes.)*

## 📖 About The Project (關於本專案)

**Citadel** 是基於我過去參與開發的企業級資安監控系統概念，使用現代化前端技術棧 (Modern Tech Stack) **從零重新架構**的技術展示作品。

雖然本專案不涉及真實的資安敏感數據，但我在此專案中重現了核心的**數據視覺化**、**實時監控邏輯**以及**複雜狀態管理**，並全面升級為 **TypeScript** 以提升程式碼的穩健性與可維護性。

This project is a technical showcase re-engineered from scratch, based on my previous experience in developing enterprise security monitoring systems. It demonstrates proficiency in handling **real-time data flows**, **complex state management**, and **interactive visualizations** using a strictly typed architecture.

## ✨ Key Features (核心功能)

* **📈 模擬即時趨勢 (Simulated Trend Analysis)**
    * 實作**滑動視窗演算法 (Sliding Window)** 處理時間序列數據，實現每 3 秒無延遲更新圖表，演示如何高效處理動態資料渲染。
* **⚡ 高頻率資料流處理 (High-Frequency Data Feed)**
    * 透過獨立的資料產生器模擬**即時警報列表**，展示 React 與 Redux 處理快速列表更新與 DOM 渲染的效能。
* **🔍 前端資料篩選 (Client-side Filtering)**
    * 實作客製化表格元件，利用前端邏輯即時篩選不同風險等級 (Severity) 的警報資訊。
* **🛡️ 型別安全架構 (Type-Safe Architecture)**
    * 全專案採用 **TypeScript** 開發，定義嚴謹的 Interface，大幅降低 Runtime Error。
* **🔄 全域狀態管理 (State Management)**
    * 使用 **Redux Toolkit** 管理全域資料流，確保組件間的數據一致性與可追蹤性。
* **🎨 現代化 UI 設計**
    * 基於 **Material UI (MUI v6)** 建構深色介面，符合戰情室視覺風格。

> *Note: Chart and Table simulate data independently to demonstrate different visualization capabilities in a server-less environment.*
> (註：圖表與表格在本 Demo 中採獨立數據模擬，以分別展示不同的視覺化技術。)

## 🛠️ Tech Stack (技術棧)

* **Core**: React 18, TypeScript, Vite
* **State Management**: Redux Toolkit (RTK)
* **UI Framework**: Material UI (MUI) v6
* **Visualization**: React-Plotly.js
* **Tools**: ESLint, Git, GitHub Actions (Pages)

## 🚀 Getting Started (如何執行)

To run this project locally:

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/cpcpcpcpc/Citadel-ts.git](https://github.com/cpcpcpcpc/Citadel-ts.git)
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Start development server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure (專案結構)

```text
src/
├── components/      # Reusable UI components (AlertTrendChart, LiveAlertTable...)
├── store/           # Redux slices and store configuration
├── utils/           # Helper functions (Data generation logic)
├── types.tsx        # TypeScript interfaces and type definitions
├── App.tsx          # Main application component
└── main.tsx         # Entry point