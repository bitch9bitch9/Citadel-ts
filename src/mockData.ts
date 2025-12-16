// 建立模板假資料

import { type SecurityAlert } from './types';


export const MOCK_ALERTS: SecurityAlert[] = [
  {
    id: 'evt-001',
    timestamp: '2025-12-16T10:30:00',
    ruleName: 'Suspicious Login Attempt',
    sourceIp: '192.168.1.5',
    destinationIp: '10.0.0.1',
    severity: 'Critical',
    status: 'New',
    description: 'Multiple failed login attempts detected from single IP.'
  },
  {
    id: 'evt-002',
    timestamp: '2025-12-16T10:35:00',
    ruleName: 'Port Scanning',
    sourceIp: '45.33.22.11',
    destinationIp: '10.0.0.2',
    severity: 'Severe',
    status: 'Investigating'
  },
  {
    id: 'evt-003',
    timestamp: '2025-12-16T10:42:15',
    ruleName: 'SQL Injection Attempt',
    sourceIp: '203.0.113.45',
    destinationIp: '10.0.0.5',
    severity: 'High',
    status: 'Blocked',
    description: 'Malicious SQL payload detected in URL parameters targeting web server.'
  },
  {
    id: 'evt-004',
    timestamp: '2025-12-16T10:55:00',
    ruleName: 'Malware Signature Match',
    sourceIp: '192.168.1.105',
    destinationIp: '10.0.0.1',
    severity: 'Critical',
    status: 'Quarantined',
    description: 'Endpoint antivirus detected "Trojan.Win32.Emotet" in email attachment.'
  },
  {
    id: 'evt-005',
    timestamp: '2025-12-16T11:10:30',
    ruleName: 'Data Exfiltration',
    sourceIp: '192.168.1.50',
    destinationIp: '142.250.1.1',
    severity: 'Critical',
    status: 'New',
    description: 'Unusually large outbound data transfer (>5GB) to unknown cloud storage.'
  },
  {
    id: 'evt-006',
    timestamp: '2025-12-16T11:25:00',
    ruleName: 'Impossible Travel',
    sourceIp: '89.207.132.12',
    destinationIp: '10.0.0.3',
    severity: 'Medium',
    status: 'Investigating',
    description: 'User login detected from London immediately after login from Taipei.'
  },
  {
    id: 'evt-007',
    timestamp: '2025-12-16T11:40:00',
    ruleName: 'Privilege Escalation',
    sourceIp: '192.168.1.20',
    destinationIp: '10.0.0.2',
    severity: 'Severe',
    status: 'New',
    description: 'Standard user account attempted to modify system registry keys.'
  },
  {
    id: 'evt-008',
    timestamp: '2025-12-16T12:05:00',
    ruleName: 'Unauthorized Device',
    sourceIp: '192.168.1.88',
    destinationIp: 'N/A',
    severity: 'Low',
    status: 'Closed',
    description: 'Blocked USB mass storage device connection on restricted workstation.'
  },
  {
    id: 'evt-009',
    timestamp: '2025-12-16T13:15:00',
    ruleName: 'Phishing Domain Access',
    sourceIp: '192.168.1.12',
    destinationIp: '104.21.55.2',
    severity: 'High',
    status: 'Resolved',
    description: 'Internal host attempted to contact known malicious C2 domain.'
  },
  {
    id: 'evt-010',
    timestamp: '2025-12-16T13:45:00',
    ruleName: 'SSH Brute Force',
    sourceIp: '185.100.22.4',
    destinationIp: '10.0.0.8',
    severity: 'Severe',
    status: 'Investigating',
    description: 'High volume of failed SSH login attempts on port 22.'
  }
];