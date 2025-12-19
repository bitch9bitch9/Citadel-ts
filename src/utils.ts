import type { SecurityAlert, SeverityLevel, AlertStatus } from './types';

// 隨機從陣列中挑選一個元素
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 產生一個隨機的警報物件
export const generateRandomAlert = (): SecurityAlert => {
  const severities: SeverityLevel[] = ['Critical', 'Severe', 'High', 'Medium', 'Low'];
  const rules = ['SQL Injection', 'DDoS Attack', 'Brute Force', 'Malware Detected', 'Port Scan'];
  const edgeGroups = ['Cathay Bank HQ', 'Taipei 101', 'Taimall', 'Carrefour', 'Arcade']; // [新增] 地點
  const statuses: AlertStatus[] = ['New', 'Investigating'];

  return {
    id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // 產生唯一 ID
    timestamp: new Date().toISOString(),
    ruleName: getRandom(rules),
    sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    destinationIp: '10.0.0.5',
    severity: getRandom(severities),
    status: getRandom(statuses),
    description: 'Automatic anomaly detection triggered.',
    edgeGroup: getRandom(edgeGroups),
  };
};