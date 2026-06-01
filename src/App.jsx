import React, { useState, useEffect, useCallback } from 'react';

export default function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [mode, setMode] = useState('generate'); // 'generate' or 'upgrade'
  const [customInput, setCustomInput] = useState('');
  
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });
  
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  // --- Smart Upgrade Algorithm ---
  const upgradePassword = (inputPhrase) => {
    if (!inputPhrase) return '';
    
    // Step 1: Base Leet Speak dictionary substitutions for structural reinforcement
    const leetMap = {
      'a': '@', 'A': '4', 's': '$', 'S': '5', 'e': '3', 'E': '3',
      'i': '!', 'I': '1', 'o': '0', 'O': '0', 't': '7', 'T': '7'
    };
    
    let transformed = inputPhrase.split('').map(char => {
      // If exclude similar is active, avoid substituting to dangerous characters
      if (options.excludeSimilar && ['i', 'I', 'l', 'o', 'O', '0', '1'].includes(leetMap[char])) {
        return char;
      }
      return leetMap[char] || char;
    }).join('');

    // Step 2: Assemble valid character pool based on selected checkboxes for padding
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijkmnopqrstuvwxyz';
    if (options.numbers) charset += '23456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!options.excludeSimilar) {
      if (options.uppercase) charset += 'IO';
      if (options.lowercase) charset += 'l';
      if (options.numbers) charset += '01';
    }

    if (!charset) return transformed;

    // Step 3: Pad out the phrase with secure random characters until it hits target length
    let finalResult = transformed;
    if (finalResult.length < length) {
      const neededLength = length - finalResult.length;
      const array = new Uint32Array(neededLength);
      window.crypto.getRandomValues(array);
      
      for (let i = 0; i < neededLength; i++) {
        finalResult += charset[array[i] % charset.length];
      }
    }
    
    return finalResult;
  };

  // --- Standard Core Generator ---
  const generatePassword = useCallback(() => {
    if (mode === 'upgrade') {
      if (!customInput) {
        setPassword('');
        return;
      }
      const upgraded = upgradePassword(customInput);
      setPassword(upgraded);
      return;
    }

    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijkmnopqrstuvwxyz';
    if (options.numbers) charset += '23456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!options.excludeSimilar) {
      if (options.uppercase) charset += 'IO';
      if (options.lowercase) charset += 'l';
      if (options.numbers) charset += '01';
    }

    if (!charset) {
      setPassword('');
      return;
    }

    let generatedPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += charset[array[i] % charset.length];
    }

    setPassword(generatedPassword);
  }, [length, options, mode, customInput]);

  // Handle active session log updates cleanly
  const triggerGenerationAndLog = () => {
    generatePassword();
    if (password) {
      setHistory(prev => [password, ...prev.slice(0, 3)]);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, options, mode, customInput, generatePassword]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Safe Inline Style Theme Matrix
  const styles = {
    screen: {
      backgroundColor: '#0b0f19',
      color: '#f1f5f9',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '440px',
      backgroundColor: '#111827',
      borderRadius: '16px',
      border: '1px solid #1f2937',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #1f2937'
    },
    title: {
      fontSize: '16px',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    tabs: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      backgroundColor: '#030712',
      padding: '4px',
      borderRadius: '12px',
      margin: '20px 24px 0 24px'
    },
    tabBtn: (isActive) => ({
      backgroundColor: isActive ? '#1f2937' : 'transparent',
      color: isActive ? '#f8fafc' : '#94a3b8',
      border: 'none',
      padding: '8px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    }),
    section: {
      padding: '20px 24px',
      borderBottom: '1px solid #1f2937'
    },
    label: {
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#94a3b8',
      marginBottom: '8px',
      display: 'block'
    },
    inputContainer: {
      backgroundColor: '#030712',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '14px 16px',
      marginBottom: '16px'
    },
    input: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#f8fafc',
      fontFamily: 'monospace',
      fontSize: '18px',
      width: '100%',
      letterSpacing: '0.05em',
      fontWeight: '600'
    },
    textInputField: {
      backgroundColor: '#030712',
      border: '1px solid #4f46e5',
      borderRadius: '12px',
      padding: '12px 14px',
      color: '#f8fafc',
      fontSize: '14px',
      width: '100%',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '14px'
    },
    btnRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    btnCopy: (isCopied) => ({
      backgroundColor: isCopied ? '#10b981' : '#1f2937',
      color: '#ffffff',
      border: isCopied ? '1px solid #10b981' : '1px solid #374151',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      textAlign: 'center'
    }),
    btnGenerate: {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      border: 'none',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      textAlign: 'center'
    },
    track: {
      width: '100%',
      height: '6px',
      backgroundColor: '#1f2937',
      borderRadius: '999px',
      position: 'relative',
      marginTop: '12px',
      marginBottom: '8px'
    },
    bar: {
      height: '100%',
      backgroundColor: password.length > 14 ? '#10b981' : password.length > 8 ? '#f59e0b' : '#ef4444',
      borderRadius: '999px',
      transition: 'width 0.3s ease',
      width: password ? `${Math.min((password.length / 32) * 100, 100)}%` : '0%'
    },
    rangeInput: {
      width: '100%',
      cursor: 'pointer',
      accentColor: '#4f46e5',
      margin: '8px 0'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginTop: '8px'
    },
    checkboxCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      padding: '12px',
      borderRadius: '12px',
      cursor: 'pointer'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      accentColor: '#4f46e5',
      cursor: 'pointer'
    },
    checkboxLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#e2e8f0'
    },
    historyItem: {
      backgroundColor: '#030712',
      border: '1px solid #1f2937',
      padding: '12px',
      borderRadius: '12px',
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#94a3b8',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.card}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.title}>🛡️ SecurePass Studio</div>
          <span style={{ fontSize: '14px' }}>🌙</span>
        </div>

        {/* MODE CONTROLLER TABS */}
        <div style={styles.tabs}>
          <button onClick={() => setMode('generate')} style={styles.tabBtn(mode === 'generate')}>
            🎲 Auto Generate
          </button>
          <button onClick={() => setMode('upgrade')} style={styles.tabBtn(mode === 'upgrade')}>
            🚀 Smart Upgrade
          </button>
        </div>

        {/* INPUT MODE ONLY CONTEXT */}
        {mode === 'upgrade' && (
          <div style={{ padding: '20px 24px 0 24px' }}>
            <span style={styles.label}>Type custom phrase to harden</span>
            <input 
              type="text"
              placeholder="e.g., Aqsa"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              style={styles.textInputField}
            />
          </div>
        )}

        {/* PRIMARY DISPLAY COMPONENT */}
        <div style={styles.section}>
          <span style={styles.label}>Optimized Output Key</span>
          <div style={styles.inputContainer}>
            <input 
              type="text" 
              readOnly 
              value={password || (mode === 'upgrade' ? 'Awaiting your phrase...' : 'Select options...')} 
              style={styles.input}
              onClick={(e) => e.target.select()}
            />
          </div>
          
          <div style={styles.btnRow}>
            <button onClick={copyToClipboard} style={styles.btnCopy(copied)}>
              {copied ? '✓ Copied' : '📋 Copy Results'}
            </button>
            <button onClick={triggerGenerationAndLog} style={styles.btnGenerate}>
              🔄 Regenerate
            </button>
          </div>
        </div>

        {/* STRENGTH PROGRESS BAR */}
        <div style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.label}>Real-time Security Rating</span>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '800', 
              color: password.length > 14 ? '#10b981' : password.length > 8 ? '#f59e0b' : '#ef4444' 
            }}>
              {password.length > 14 ? 'VAULT GRADE' : password.length > 8 ? 'MODERATE GUARD' : 'WEAK ASSET'}
            </span>
          </div>
          <div style={styles.track}>
            <div style={styles.bar} />
          </div>
        </div>

        {/* LENGTH CONTROLLER BOUNDS */}
        <div style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={styles.label}>Target Length Constraints</span>
            <span style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'monospace', color: '#818cf8' }}>{length}</span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={styles.rangeInput}
          />
        </div>

        {/* CHECKBOX GRID MATRIX */}
        <div style={styles.section}>
          <span style={styles.label}>Inclusion Rule Assertions</span>
          <div style={styles.grid}>
            {[
              { id: 'uppercase', label: 'Uppercase' },
              { id: 'lowercase', label: 'Lowercase' },
              { id: 'numbers', label: 'Numbers' },
              { id: 'symbols', label: 'Symbols' },
            ].map((opt) => (
              <label key={opt.id} style={styles.checkboxCard}>
                <input 
                  type="checkbox" 
                  checked={options[opt.id]} 
                  onChange={() => setOptions({ ...options, [opt.id]: !options[opt.id] })}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ADVANCED OPTION MODULE */}
        <div style={styles.section}>
          <span style={styles.label}>Advanced Modifier</span>
          <label style={{ ...styles.checkboxCard, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={styles.checkboxLabel}>Exclude Similar Characters</span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>(Omit characters like i, l, 1, O, 0)</span>
            </div>
            <input 
              type="checkbox" 
              checked={options.excludeSimilar} 
              onChange={() => setOptions({ ...options, excludeSimilar: !options.excludeSimilar })}
              style={styles.checkbox}
            />
          </label>
        </div>

        {/* SESSION LOG ENTRIES */}
        {history.length > 0 && (
          <div style={{ ...styles.section, backgroundColor: '#0f172a', borderBottom: 'none' }}>
            <span style={styles.label}>Session Key History Vault</span>
            {history.map((histPass, index) => (
              <div key={index} style={styles.historyItem}>
                🔑 {histPass}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}