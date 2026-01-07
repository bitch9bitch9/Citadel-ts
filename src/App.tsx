import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Dashboard } from './Page/Dashboard/Dashboard'

const theme = createTheme({
  palette: {
    text: {
      primary: '#FFF',
    },
    background: {
      default: '#1e1e1e', // 設定網頁背景色
      paper: '#1e1e1e',   // 設定卡片或容器背景色
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Dashboard/> 
    </ThemeProvider>
  )
}

export default App
