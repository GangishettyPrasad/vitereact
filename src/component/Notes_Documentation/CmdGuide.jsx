import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  InputAdornment, 
  Tooltip,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { 
  FaTerminal, 
  FaCopy, 
  FaCheck, 
  FaMagnifyingGlass, 
  FaFolder, 
  FaFolderOpen, 
  FaFileCode, 
  FaNetworkWired, 
  FaServer, 
  FaPlay, 
  FaLaptopCode, 
  FaAngleRight, 
  FaFileLines
} from 'react-icons/fa6';
import { FaUndo } from 'react-icons/fa';
import { MdSettings, MdCleaningServices } from 'react-icons/md';

// Full Command Database (32 Commands: 22 requested + 10 extra)
const COMMANDS_DATABASE = [
  {
    id: 'cd',
    cmd: 'cd',
    category: 'Navigation',
    purpose: 'Show or change current directory',
    syntax: 'cd [path]',
    example: 'cd D:\\bitbucket',
    english: 'Displays the name of or changes the current directory (folder).',
    telugu: 'Current folder ni chupisthundi leka marchuthundi.',
    realtime: 'Developers commonly use this command while navigating projects or managing files.'
  },
  {
    id: 'cd-dotdot',
    cmd: 'cd ..',
    category: 'Navigation',
    purpose: 'Go back one folder',
    syntax: 'cd ..',
    example: 'cd ..',
    english: 'Moves up one level to the parent folder.',
    telugu: 'Oka folder venakki (parent folder) velthundi.',
    realtime: 'Extremely frequent when you accidentally enter the wrong subfolder and need to return.'
  },
  {
    id: 'cd-root',
    cmd: 'cd \\',
    category: 'Navigation',
    purpose: 'Go to drive root',
    syntax: 'cd \\',
    example: 'cd \\',
    english: 'Moves directly to the root of the current drive (e.g., C:\\ or D:\\).',
    telugu: 'Current drive main root folder ki direct ga velthundi.',
    realtime: 'Used when you want to jump back from a deep folder path to the drive root instantly.'
  },
  {
    id: 'dir',
    cmd: 'dir',
    category: 'Navigation',
    purpose: 'List files and folders',
    syntax: 'dir',
    example: 'dir',
    english: 'Displays a list of files and subdirectories in the current directory.',
    telugu: 'Current folder lo unna files mariyu sub-folders list chupisthundi.',
    realtime: 'Used to check if a specific file (like package.json) exists before running commands.'
  },
  {
    id: 'dir-ad',
    cmd: 'dir /ad',
    category: 'Navigation',
    purpose: 'List only folders',
    syntax: 'dir /ad',
    example: 'dir /ad',
    english: 'Shows only directories (folders) in the current path, excluding files.',
    telugu: 'Folders matrame screen meeda filter chesi chupisthundi.',
    realtime: 'Helpful in huge project directories when you only want to locate subfolders.'
  },
  {
    id: 'tree',
    cmd: 'tree',
    category: 'Navigation',
    purpose: 'Show folder tree structure',
    syntax: 'tree [path] [/f]',
    example: 'tree /f',
    english: 'Graphically displays the folder structure of a drive or path.',
    telugu: 'Folder hierarchy structure ni clean graphical format lo display chesthundi.',
    realtime: 'Used to document project structures or analyze nested folders visual setup.'
  },
  {
    id: 'cls',
    cmd: 'cls',
    category: 'System',
    purpose: 'Clear terminal screen',
    syntax: 'cls',
    example: 'cls',
    english: 'Clears the Command Prompt terminal screen.',
    telugu: 'Command prompt screen clean chesthundi.',
    realtime: 'Clears long, messy build logs or stack traces to start work on a clean slate.'
  },
  {
    id: 'mkdir',
    cmd: 'mkdir',
    category: 'File Operations',
    purpose: 'Create a new folder',
    syntax: 'mkdir [folder_name]',
    example: 'mkdir HRMS',
    english: 'Creates a new folder or directory path.',
    telugu: 'Kotta folder create chesthundi.',
    realtime: 'Created project repository directories or assets folder before starting code.'
  },
  {
    id: 'rmdir',
    cmd: 'rmdir',
    category: 'File Operations',
    purpose: 'Remove an empty folder',
    syntax: 'rmdir [folder_name]',
    example: 'rmdir Test',
    english: 'Deletes a directory (folder) if it is completely empty.',
    telugu: 'Empty folder ni matrame delete chesthundi.',
    realtime: 'To clean up unused directories that do not contain project scripts.'
  },
  {
    id: 'copy',
    cmd: 'copy',
    category: 'File Operations',
    purpose: 'Copy files',
    syntax: 'copy [source] [destination]',
    example: 'copy test.txt backup.txt',
    english: 'Copies one or more files to another location.',
    telugu: 'File ni matching target path ki copy chesthundi.',
    realtime: 'Backing up configuration files (e.g. .env copy as .env.backup) before making changes.'
  },
  {
    id: 'move',
    cmd: 'move',
    category: 'File Operations',
    purpose: 'Move files or rename folders',
    syntax: 'move [source] [destination]',
    example: 'move app.py src\\',
    english: 'Moves files and renames files and directories.',
    telugu: 'File ni cut chesi vere folder loki move chesthundi.',
    realtime: 'Organizing downloaded source code or routing images to assets folders.'
  },
  {
    id: 'del',
    cmd: 'del',
    category: 'File Operations',
    purpose: 'Delete one or more files',
    syntax: 'del [filename]',
    example: 'del temp.txt',
    english: 'Deletes (erases) one or more files from disk.',
    telugu: 'File ni permanent ga delete chesthundi.',
    realtime: 'Used to delete unwanted builds, cache files or temp logs.'
  },
  {
    id: 'ren',
    cmd: 'ren',
    category: 'File Operations',
    purpose: 'Rename a file or folder',
    syntax: 'ren [old_name] [new_name]',
    example: 'ren old.txt new.txt',
    english: 'Renames a file or directory.',
    telugu: 'File leda folder peru ni marchuthundi.',
    realtime: 'Updating older build names or config file extensions.'
  },
  {
    id: 'type',
    cmd: 'type',
    category: 'File Operations',
    purpose: 'View file content',
    syntax: 'type [filename]',
    example: 'type readme.txt',
    english: 'Displays the content of a text file inside the terminal.',
    telugu: 'File text content ni direct terminal screen meeda chupisthundi.',
    realtime: 'Developers use this to verify keys inside .env or logs without opening an editor.'
  },
  {
    id: 'echo',
    cmd: 'echo',
    category: 'System',
    purpose: 'Print text or create files',
    syntax: 'echo [text]',
    example: 'echo Hello World',
    english: 'Displays messages on screen or writes text to a file.',
    telugu: 'Console meeda text/msg display chesthundi leka path text save chesthundi.',
    realtime: 'Commonly used in scripts or to write quick variables: echo PORT=3000 > .env'
  },
  {
    id: 'ipconfig',
    cmd: 'ipconfig',
    category: 'Network',
    purpose: 'View network IP configuration',
    syntax: 'ipconfig [/all]',
    example: 'ipconfig',
    english: 'Displays all current TCP/IP network configuration values.',
    telugu: 'System active network properties and local IP details chupisthundi.',
    realtime: 'Crucial for testing React or Django apps on local network devices (e.g. 192.168.x.x).'
  },
  {
    id: 'ping',
    cmd: 'ping',
    category: 'Network',
    purpose: 'Test server network connectivity',
    syntax: 'ping [domain_or_ip]',
    example: 'ping google.com',
    english: 'Sends packets of data to network addresses to test connection response.',
    telugu: 'Target system target IP leda server internet run avthunda check chesthundi.',
    realtime: 'Used to check if APIs, backend servers, or github.com is reachable.'
  },
  {
    id: 'tasklist',
    cmd: 'tasklist',
    category: 'Process Management',
    purpose: 'List all running system processes',
    syntax: 'tasklist',
    example: 'tasklist',
    english: 'Displays a list of currently running applications and services.',
    telugu: 'Currently run avthunna active systems and background programs chupisthundi.',
    realtime: 'To find processes locked on background ports (like node.exe or python.exe).'
  },
  {
    id: 'taskkill',
    cmd: 'taskkill',
    category: 'Process Management',
    purpose: 'Force terminate a process',
    syntax: 'taskkill /PID [pid] /F or taskkill /IM [name] /F',
    example: 'taskkill /IM node.exe /F',
    english: 'Terminates one or more active tasks or processes.',
    telugu: 'Running programs or server instances ni direct ga force-stop close chesthundi.',
    realtime: 'Terminating locked ports when "Port 3000 is already in use" error blocks React.'
  },
  {
    id: 'systeminfo',
    cmd: 'systeminfo',
    category: 'System',
    purpose: 'Show system configurations',
    syntax: 'systeminfo',
    example: 'systeminfo',
    english: 'Displays detailed configuration information about the OS and computer properties.',
    telugu: 'Computer specs, system architecture, and OS status settings chupisthundi.',
    realtime: 'Checking RAM, OS Version, or virtual machines settings setup.'
  },
  {
    id: 'where',
    cmd: 'where',
    category: 'System',
    purpose: 'Locate executable pathway',
    syntax: 'where [program_name]',
    example: 'where python',
    english: 'Locates and displays the path of files matching the search pattern.',
    telugu: 'Selected system applications (git, node, python) ekkada install ayyayo path chupisthundi.',
    realtime: 'Used when VS Code says python or git is not recognized, to verify their PATH locations.'
  },
  {
    id: 'help',
    cmd: 'help',
    category: 'System',
    purpose: 'Get command description help',
    syntax: 'help [command]',
    example: 'help copy',
    english: 'Provides Help information for Windows commands.',
    telugu: 'Command prompt inputs system details instructions reference helper guide.',
    realtime: 'Used to quickly check syntax options and flags for any native command.'
  },
  // --- EXTRA IMPORTANT DEVELOPER COMMANDS ---
  {
    id: 'netstat',
    cmd: 'netstat -ano',
    category: 'Network',
    purpose: 'Active network ports & process IDs',
    syntax: 'netstat -ano',
    example: 'netstat -ano | findstr :3000',
    english: 'Displays active TCP connections, listening ports, and associated Process IDs (PID).',
    telugu: 'System listening ports mariyu network client detail connections check chesthundi.',
    realtime: 'Backend port conflicts analysis. Helps you identify exactly which PID is locking port 8000.'
  },
  {
    id: 'curl',
    cmd: 'curl',
    category: 'Network',
    purpose: 'Fetch endpoint data (API test)',
    syntax: 'curl [url]',
    example: 'curl https://api.github.com/users/octocat',
    english: 'Transfers data from or to a server using supported protocol endpoints.',
    telugu: 'Server network URL response raw console format lo check/get chesthundi.',
    realtime: 'Test API routes instantly or download setup scripts without leaving CLI.'
  },
  {
    id: 'attrib',
    cmd: 'attrib',
    category: 'File Operations',
    purpose: 'Change file security attributes',
    syntax: 'attrib [+h|-h] [+r|-r] [filename]',
    example: 'attrib +h .env',
    english: 'Displays or changes file attributes such as Hidden (h) or Read-Only (r).',
    telugu: 'File settings (Hidden leda Read-only properties) configuration change chesthundi.',
    realtime: 'Hiding critical configurations like .env or preventing accidental deletions.'
  },
  {
    id: 'path',
    cmd: 'path',
    category: 'System',
    purpose: 'Display global environment executable PATH',
    syntax: 'path',
    example: 'path',
    english: 'Displays or sets the search path for executable files.',
    telugu: 'Windows system global path variables reference structures load chesthundi.',
    realtime: 'To debug if custom tools or npm global dependencies are accessible anywhere.'
  },
  {
    id: 'nslookup',
    cmd: 'nslookup',
    category: 'Network',
    purpose: 'DNS lookup check IP',
    syntax: 'nslookup [domain]',
    example: 'nslookup api.production.com',
    english: 'Queries domain name servers to find IP host mapping.',
    telugu: 'Server domain host address corresponding active IP checks and logs path.',
    realtime: 'Verifying domain resolution or checking if CDN routing is working correctly.'
  },
  {
    id: 'assoc',
    cmd: 'assoc',
    category: 'System',
    purpose: 'Show file associations',
    syntax: 'assoc [.extension]',
    example: 'assoc .js',
    english: 'Displays or modifies file extension associations.',
    telugu: 'Specific file format system lo ae software tho run avvali registry load chesthundi.',
    realtime: 'Troubleshooting file opening association problems (like .py files running in text editor).'
  },
  {
    id: 'fc',
    cmd: 'fc',
    category: 'File Operations',
    purpose: 'Compare two files side-by-side',
    syntax: 'fc [file1] [file2]',
    example: 'fc index.js index_backup.js',
    english: 'Compares two files and displays differences between them.',
    telugu: 'Rendu files structures updates discrepancies analysis code checker.',
    realtime: 'Quick file check checks for changes when git is not initialized.'
  },
  {
    id: 'chkdsk',
    cmd: 'chkdsk',
    category: 'System',
    purpose: 'Scan disk and fix file systems',
    syntax: 'chkdsk [drive:] [/f]',
    example: 'chkdsk C: /f',
    english: 'Checks a disk and displays a status report; fixes drive errors.',
    telugu: 'Hard drive sectors scan check and system volume errors fix logic.',
    realtime: 'Used when storage drive runs very slow or files get corrupt/unreadable.'
  },
  {
    id: 'sfc',
    cmd: 'sfc /scannow',
    category: 'System',
    purpose: 'System File Checker (OS Repair)',
    syntax: 'sfc /scannow',
    example: 'sfc /scannow',
    english: 'Scans integrity of all protected system files and replaces corrupted ones.',
    telugu: 'Corrupt Windows files scan files auto-repair replacement chesthundi.',
    realtime: 'System crashes or weird command prompt crash solutions diagnostic run.'
  },
  {
    id: 'shutdown',
    cmd: 'shutdown',
    category: 'System',
    purpose: 'System power controls',
    syntax: 'shutdown [/s | /r] [/t seconds]',
    example: 'shutdown /r /t 0',
    english: 'Allows local or remote shutdown/restart of the operating system.',
    telugu: 'Computer power shutdown or restart timing custom configurations execute.',
    realtime: 'Scheduling restart tasks or automatic shutdowns after long script processes.'
  }
];

const CmdGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  
  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Microsoft Windows [Version 10.0.22631]', type: 'system' },
    { text: '(c) Microsoft Corporation. All rights reserved.', type: 'system' },
    { text: '', type: 'system' },
    { text: 'Type "help" to see available terminal simulator commands.', type: 'welcome' },
    { text: 'C:\\Users\\developer>', type: 'prompt_inline' }
  ]);
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const categories = ['All', 'Navigation', 'File Operations', 'Network', 'Process Management', 'System'];

  const handleCopy = (cmdText, id) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredCommands = COMMANDS_DATABASE.filter(cmd => {
    const matchesSearch = 
      cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.telugu.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Terminal Simulator execution
  const executeTerminalCommand = (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    // Add command to history
    const commandLog = { text: `C:\\Users\\developer> ${input}`, type: 'command' };
    let outputs = [];

    const parts = input.split(' ');
    const baseCommand = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch(baseCommand) {
      case 'help':
        outputs = [
          { text: 'Simulator commands list:', type: 'output' },
          { text: '  dir         - Lists contents of current virtual directory', type: 'output' },
          { text: '  cd [path]   - Simulates navigating into folders', type: 'output' },
          { text: '  cls         - Clears the terminal screen', type: 'output' },
          { text: '  ipconfig    - Shows virtual network addresses', type: 'output' },
          { text: '  ping [site] - Simulates checking server network connection', type: 'output' },
          { text: '  git status  - Shows mock React app git status', type: 'output' },
          { text: '  npm start   - Simulates launching React dev server', type: 'output' },
          { text: '  systeminfo  - Displays computer configurations specifications', type: 'output' }
        ];
        break;
      case 'dir':
        outputs = [
          { text: ' Volume in drive C has no label.', type: 'output' },
          { text: ' Volume Serial Number is D3F4-897C', type: 'output' },
          { text: '', type: 'output' },
          { text: ' Directory of C:\\Users\\developer', type: 'output' },
          { text: '', type: 'output' },
          { text: '07/03/2026  12:30 PM    <DIR>          .', type: 'output' },
          { text: '07/03/2026  12:30 PM    <DIR>          ..', type: 'output' },
          { text: '07/03/2026  10:15 AM    <DIR>          bitbucket', type: 'output' },
          { text: '07/03/2026  04:02 PM    <DIR>          hrms', type: 'output' },
          { text: '07/03/2026  11:45 AM    <DIR>          react_vite', type: 'output' },
          { text: '07/03/2026  09:00 AM             1,085 package.json', type: 'output' },
          { text: '07/03/2026  09:00 AM               361 index.html', type: 'output' },
          { text: '               2 File(s)          1,446 bytes', type: 'output' },
          { text: '               5 Dir(s)    182,349,293,568 bytes free', type: 'output' }
        ];
        break;
      case 'cd': {
        const targetPath = args.join(' ');
        if (!targetPath) {
          outputs = [{ text: 'C:\\Users\\developer', type: 'output' }];
        } else {
          outputs = [{ text: `Changed virtual folder directory to: ${targetPath}`, type: 'output' }];
        }
        break;
      }
      case 'cls':
        setTerminalHistory([{ text: 'C:\\Users\\developer>', type: 'prompt_inline' }]);
        setTerminalInput('');
        return;
      case 'ipconfig':
        outputs = [
          { text: 'Windows IP Configuration', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Wireless LAN adapter Wi-Fi:', type: 'output' },
          { text: '   Connection-specific DNS Suffix  . : localdomain', type: 'output' },
          { text: '   IPv4 Address. . . . . . . . . . . : 192.168.1.104', type: 'output' },
          { text: '   Subnet Mask . . . . . . . . . . . : 255.255.255.0', type: 'output' },
          { text: '   Default Gateway . . . . . . . . . : 192.168.1.1', type: 'output' }
        ];
        break;
      case 'ping': {
        const target = args[0] || 'google.com';
        outputs = [
          { text: `Pinging ${target} [142.250.190.46] with 32 bytes of data:`, type: 'output' },
          { text: `Reply from 142.250.190.46: bytes=32 time=12ms TTL=116`, type: 'output' },
          { text: `Reply from 142.250.190.46: bytes=32 time=10ms TTL=116`, type: 'output' },
          { text: `Reply from 142.250.190.46: bytes=32 time=11ms TTL=116`, type: 'output' },
          { text: '', type: 'output' },
          { text: `Ping statistics for ${target}:`, type: 'output' },
          { text: '    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss),', type: 'output' },
          { text: 'Approximate round trip times in milli-seconds:', type: 'output' },
          { text: '    Minimum = 10ms, Maximum = 12ms, Average = 11ms', type: 'output' }
        ];
        break;
      }
      case 'git':
        if (args[0] === 'status') {
          outputs = [
            { text: 'On branch main', type: 'output' },
            { text: 'Your branch is up to date with \'origin/main\'.', type: 'output' },
            { text: '', type: 'output' },
            { text: 'Changes not staged for commit:', type: 'output' },
            { text: '  (use "git add <file>..." to update what will be committed)', type: 'output' },
            { text: '  (use "git restore <file>..." to discard changes in working directory)', type: 'output' },
            { text: '        modified:   src/component/UI/SideNav.jsx', type: 'output' },
            { text: '        modified:   src/component/dashboardRoutes.jsx', type: 'output' },
            { text: '', type: 'output' },
            { text: 'Untracked files:', type: 'output' },
            { text: '  (use "git add <file>..." to include in what will be committed)', type: 'output' },
            { text: '        src/component/Notes_Documentation/CmdGuide.jsx', type: 'output' },
            { text: '', type: 'output' },
            { text: 'no changes added to commit (use "git add" and/or "git commit -a")', type: 'output' }
          ];
        } else {
          outputs = [{ text: `git ${args.join(' ')} executed on virtual repository.`, type: 'output' }];
        }
        break;
      case 'npm':
        if (args[0] === 'start') {
          outputs = [
            { text: '> react_vite@0.0.0 start', type: 'output' },
            { text: '> vite', type: 'output' },
            { text: '', type: 'output' },
            { text: '  VITE v6.2.0  ready in 286 ms', type: 'output' },
            { text: '', type: 'output' },
            { text: '  ➜  Local:   http://localhost:5173/', type: 'output' },
            { text: '  ➜  Network: use --host to expose', type: 'output' },
            { text: '  ➜  press h + enter to show help', type: 'output' }
          ];
        } else {
          outputs = [{ text: `npm runs command package scripts details.`, type: 'output' }];
        }
        break;
      case 'systeminfo':
        outputs = [
          { text: 'Host Name:                 DEVELOPER-PC', type: 'output' },
          { text: 'OS Name:                   Microsoft Windows 11 Home', type: 'output' },
          { text: 'OS Version:                10.0.22631 N/A Build 22631', type: 'output' },
          { text: 'OS Configuration:          Standalone Workstation', type: 'output' },
          { text: 'OS Build Type:             Multiprocessor Free', type: 'output' },
          { text: 'System Type:               x64-based PC', type: 'output' },
          { text: 'Processor(s):              1 Processor(s) Installed.', type: 'output' },
          { text: '                           [01]: Intel64 Family 6 Model 158 Stepping 10 GenuineIntel ~2.81 Ghz', type: 'output' },
          { text: 'Total Physical Memory:     16,234 MB', type: 'output' }
        ];
        break;
      default:
        outputs = [
          { text: `'${baseCommand}' is not recognized as an internal or external command,`, type: 'error' },
          { text: 'operable program or batch file.', type: 'error' },
          { text: 'Tip: Try using: help, dir, cls, ipconfig, git status, npm start.', type: 'output' }
        ];
    }

    setTerminalHistory(prev => [
      ...prev.slice(0, -1), // remove input prompt line temporarily
      commandLog,
      ...outputs,
      { text: '', type: 'system' },
      { text: 'C:\\Users\\developer>', type: 'prompt_inline' } // append a fresh prompt
    ]);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter') {
      executeTerminalCommand(terminalInput);
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: '"Outfit", "Segoe UI", sans-serif'
    }}>
      
      {/* 🚀 Sleek Glassmorphic Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 4, 
        background: 'rgba(30, 41, 59, 0.45)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <FaTerminal style={{ fontSize: '2.5rem', color: '#38bdf8' }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, letterSpacing: '0.5px', color: '#f8fafc' }}>
                Windows CMD Cheat Sheet
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#94a3b8', mb: 2 }}>
              Daily Developer Commands Guide • <strong>English Explanation + Telugu inside English characters (Tanglish)</strong>.
            </Typography>
            <Box display="flex" gap={1.5} flexWrap="wrap">
              <Chip label="22 Core CMDs" size="small" sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }} />
              <Chip label="10 Advanced Developer CMDs" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }} />
              <Chip label="Bilingual Explanations" size="small" sx={{ bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.3)' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
            <Button 
              variant="outlined" 
              startIcon={<FaUndo />}
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              sx={{ color: '#94a3b8', borderColor: 'rgba(255, 255, 255, 0.12)', '&:hover': { borderColor: '#38bdf8', color: '#f8fafc' } }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 💻 Virtual CMD Terminal Simulator (WOW Interactive Feature) */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaTerminal style={{ color: '#10b981' }} /> Interactive CMD Terminal Simulator
        </Typography>
        <Paper sx={{ 
          background: '#090d16', 
          borderRadius: 3, 
          border: '1px solid #1e293b', 
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}>
          {/* Terminal Window Header */}
          <Box sx={{ 
            bgcolor: '#111827', 
            px: 2, 
            py: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #1f2937'
          }}>
            <Box display="flex" gap={1}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontWeight: 'bold' }}>
              Command Prompt (Simulated Node Server)
            </Typography>
            <Box width={36} />
          </Box>

          {/* Terminal Logs Area */}
          <Box sx={{ 
            p: 3, 
            height: 280, 
            overflowY: 'auto', 
            fontFamily: '"Fira Code", "Courier New", Courier, monospace', 
            fontSize: '0.875rem', 
            lineHeight: 1.6,
            color: '#34d399',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}>
            {terminalHistory.map((line, idx) => {
              if (line.type === 'command') {
                return <span key={idx} style={{ color: '#ffffff', fontWeight: 'bold' }}>{line.text}</span>;
              }
              if (line.type === 'error') {
                return <span key={idx} style={{ color: '#f87171' }}>{line.text}</span>;
              }
              if (line.type === 'welcome') {
                return <span key={idx} style={{ color: '#38bdf8', fontStyle: 'italic' }}>{line.text}</span>;
              }
              if (line.type === 'prompt_inline') {
                return null; // rendered at the input line
              }
              return <span key={idx}>{line.text}</span>;
            })}
            
            {/* Input prompt line */}
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Typography sx={{ 
                fontFamily: 'inherit', 
                fontSize: 'inherit', 
                color: '#ffffff', 
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}>
                C:\Users\developer&gt;
              </Typography>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleTerminalSubmit}
                placeholder="type help, dir, npm start..."
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  width: '100%',
                  caretColor: '#10b981'
                }}
              />
            </Box>
            <div ref={terminalEndRef} />
          </Box>
        </Paper>
      </Box>

      {/* 🔎 Search and Category Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField 
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search command name, purpose, English/Telugu notes..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMagnifyingGlass style={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Button onClick={() => setSearchTerm('')} size="small" sx={{ minWidth: 'auto', p: 0.5, color: '#94a3b8' }}>
                      <MdCleaningServices size={18} />
                    </Button>
                  </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  color: '#f8fafc',
                  bgcolor: 'rgba(30, 41, 59, 0.3)',
                  borderRadius: 3,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(56, 189, 248, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Tabs 
              value={categories.indexOf(selectedCategory)} 
              onChange={(e, val) => setSelectedCategory(categories[val])}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                '& .MuiTabs-indicator': { bgcolor: '#38bdf8' },
                '& .MuiTab-root': { 
                  color: '#94a3b8', 
                  '&.Mui-selected': { color: '#38bdf8', fontWeight: 'bold' } 
                }
              }}
            >
              {categories.map((cat) => (
                <Tab key={cat} label={cat} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      {/* 📚 Grid of Commands */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ color: '#94a3b8', mb: 2 }}>
          Showing {filteredCommands.length} command{filteredCommands.length !== 1 && 's'}
        </Typography>

        <Grid container spacing={3}>
          {filteredCommands.map((command) => (
            <Grid item xs={12} md={6} key={command.id}>
              <Card sx={{ 
                height: '100%', 
                bgcolor: 'rgba(30, 41, 59, 0.4)', 
                borderRadius: 3, 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -10px rgba(56, 189, 248, 0.3)',
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  bgcolor: 'rgba(30, 41, 59, 0.6)'
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  
                  {/* Command Row */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Typography sx={{ 
                        fontFamily: 'monospace', 
                        fontSize: '1.25rem', 
                        fontWeight: 'bold', 
                        color: '#f8fafc', 
                        bgcolor: '#0f172a',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(56, 189, 248, 0.2)'
                      }}>
                        {command.cmd}
                      </Typography>
                      <Chip 
                        label={command.category} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(148, 163, 184, 0.1)', 
                          color: '#94a3b8', 
                          border: '1px solid rgba(148, 163, 184, 0.2)',
                          fontSize: '0.7rem' 
                        }} 
                      />
                    </Box>
                    <Tooltip title="Copy command" arrow placement="top">
                      <Button 
                        size="small"
                        onClick={() => handleCopy(command.cmd, command.id)}
                        sx={{ 
                          minWidth: 'auto', 
                          p: 1, 
                          color: copiedId === command.id ? '#10b981' : '#94a3b8',
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }
                        }}
                      >
                        {copiedId === command.id ? <FaCheck size={16} /> : <FaCopy size={16} />}
                      </Button>
                    </Tooltip>
                  </Box>

                  {/* Purpose & Syntax */}
                  <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600, mb: 1 }}>
                    💡 Purpose: {command.purpose}
                  </Typography>

                  <Box sx={{ mb: 2, p: 1.5, bgcolor: '#0b0f19', borderRadius: 2, fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 0.5, fontWeight: 'bold' }}>
                      SYNTAX & EXAMPLE:
                    </Typography>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                      <span style={{ color: '#a78bfa' }}>Syntax:</span> {command.syntax}
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem', marginTop: '2px' }}>
                      <span style={{ color: '#fb923c' }}>Example:</span> {command.example}
                    </div>
                  </Box>

                  {/* English & Telugu Explanations */}
                  <Box display="flex" flexDirection="column" gap={1.5} sx={{ borderLeft: '3px solid rgba(56, 189, 248, 0.3)', pl: 2, mb: 2 }}>
                    <div>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>
                        ENGLISH EXPLANATION:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                        {command.english}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" sx={{ color: '#eab308', fontWeight: 'bold', display: 'block' }}>
                        TELUGU (ENGLISH LETTERS):
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1', fontStyle: 'italic' }}>
                        {command.telugu}
                      </Typography>
                    </div>
                  </Box>

                  {/* Real-time Use */}
                  <Box sx={{ pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 'bold', display: 'block' }}>
                      💼 REAL-TIME DEVELOPER USE:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {command.realtime}
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🚀 Daily Workflow for React/Django Developer */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaLaptopCode style={{ color: '#f43f5e' }} /> Daily Developer Workflows
        </Typography>

        <Grid container spacing={4}>
          {/* React Developer Workflow */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              bgcolor: 'rgba(30, 41, 59, 0.45)', 
              borderRadius: 4, 
              border: '1px solid rgba(56, 189, 248, 0.2)',
              height: '100%'
            }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                <Box sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)', p: 1, borderRadius: 2 }}>
                  <FaServer style={{ color: '#38bdf8', fontSize: '1.5rem' }} />
                </Box>
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    React / Frontend Daily Workflow
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Quick guide to open projects and run servers in React.
                  </Typography>
                </div>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                {[
                  { step: '1', cmd: 'D:', desc: 'Switch storage drive', telugu: 'D drive loki change chesthundi.' },
                  { step: '2', cmd: 'cd bitbucket', desc: 'Navigate to target repository workspace', telugu: 'Bitbucket projects backup folder ki switch chesthundi.' },
                  { step: '3', cmd: 'cd hrms', desc: 'Enter HRMS project root directory', telugu: 'HRMS project directory folder key register and shift.' },
                  { step: '4', cmd: 'dir', desc: 'Verify package files listing', telugu: 'Package details check settings directory verify.' },
                  { step: '5', cmd: 'code .', desc: 'Launch VS Code IDE in current directory', telugu: 'Direct ga current workspace folder ni VS Code editor lo open chesthundi.' },
                  { step: '6', cmd: 'git pull', desc: 'Pull latest repository code commits', telugu: 'GitHub nundi updates local code updates update logic.' },
                  { step: '7', cmd: 'npm install', desc: 'Download dependencies from package.json', telugu: 'Project modules dependencies local configurations register.' },
                  { step: '8', cmd: 'npm start', desc: 'Start React development server', telugu: 'Local host client host site and dynamic view launcher.' }
                ].map((item, idx) => (
                  <Box key={idx} display="flex" gap={2} alignItems="flex-start">
                    <Box sx={{ 
                      minWidth: 28, 
                      height: 28, 
                      borderRadius: '50%', 
                      bgcolor: '#38bdf8', 
                      color: '#0f172a', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}>
                      {item.step}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                        <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#38bdf8', fontSize: '0.95rem' }}>
                          {item.cmd}
                        </Typography>
                        <Tooltip title="Copy command" arrow>
                          <Button 
                            size="small" 
                            onClick={() => handleCopy(item.cmd, `wflow-r-${idx}`)}
                            sx={{ minWidth: 'auto', p: 0.2, color: copiedId === `wflow-r-${idx}` ? '#10b981' : '#6b7280' }}
                          >
                            {copiedId === `wflow-r-${idx}` ? <FaCheck size={12} /> : <FaCopy size={12} />}
                          </Button>
                        </Tooltip>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 0.2 }}>
                        {item.desc}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#eab308', fontStyle: 'italic', display: 'block' }}>
                        {item.telugu}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Django Developer Workflow */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              bgcolor: 'rgba(30, 41, 59, 0.45)', 
              borderRadius: 4, 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              height: '100%'
            }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', p: 1, borderRadius: 2 }}>
                  <FaServer style={{ color: '#10b981', fontSize: '1.5rem' }} />
                </Box>
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    Django / Backend Daily Workflow
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Quick guide to activate virtual environments and run server.
                  </Typography>
                </div>
              </Box>

              <Box display="flex" flexDirection="column" gap={3}>
                {[
                  { step: '1', cmd: 'cd project', desc: 'Enter backend folder directory', telugu: 'Project folder workspace path directories change.' },
                  { step: '2', cmd: 'venv\\Scripts\\activate', desc: 'Activate Python virtual environment', telugu: 'Python virtual environment runtime isolation initialize.' },
                  { step: '3', cmd: 'python manage.py runserver', desc: 'Run Django backend API local server', telugu: 'Django backend service web server running setup.' }
                ].map((item, idx) => (
                  <Box key={idx} display="flex" gap={2} alignItems="flex-start">
                    <Box sx={{ 
                      minWidth: 28, 
                      height: 28, 
                      borderRadius: '50%', 
                      bgcolor: '#10b981', 
                      color: '#0f172a', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}>
                      {item.step}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                        <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981', fontSize: '0.95rem' }}>
                          {item.cmd}
                        </Typography>
                        <Tooltip title="Copy command" arrow>
                          <Button 
                            size="small" 
                            onClick={() => handleCopy(item.cmd, `wflow-d-${idx}`)}
                            sx={{ minWidth: 'auto', p: 0.2, color: copiedId === `wflow-d-${idx}` ? '#10b981' : '#6b7280' }}
                          >
                            {copiedId === `wflow-d-${idx}` ? <FaCheck size={12} /> : <FaCopy size={12} />}
                          </Button>
                        </Tooltip>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 0.2 }}>
                        {item.desc}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#eab308', fontStyle: 'italic', display: 'block' }}>
                        {item.telugu}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Tips block */}
              <Paper sx={{ bgcolor: 'rgba(234, 179, 8, 0.08)', border: '1px dashed rgba(234,179,8,0.2)', p: 2, mt: 4, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#eab308', fontWeight: 'bold', mb: 0.5 }}>
                  💡 Pro Tip for Port Clashing:
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  Backend and React projects frequently lock ports. Combine <strong>netstat -ano</strong> to find the conflicting PID, and use <strong>taskkill /PID &lt;PID&gt; /F</strong> to free it up!
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default CmdGuide;
