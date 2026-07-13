'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, saveProjects, DynamicTrackerData } from './actions';
import { Plus, Save, CheckCircle2, AlertCircle, RefreshCw, X, TableProperties } from 'lucide-react';

export default function ProjectsPage() {
  const [data, setData] = useState<DynamicTrackerData>({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data.columnWidths && Object.keys(data.columnWidths).length > 0) {
      localStorage.setItem('infinity-column-widths', JSON.stringify(data.columnWidths));
    }
  }, [data.columnWidths, loading]);

  const fetchData = async () => {
    setLoading(true);
    const result = await getProjects();
    
    // Merge saved column widths from localStorage
    try {
      const storedWidths = localStorage.getItem('infinity-column-widths');
      if (storedWidths) {
        result.columnWidths = { ...(result.columnWidths || {}), ...JSON.parse(storedWidths) };
      }
    } catch (e) {}
    
    setData(result);
    setLoading(false);
  };

  const handleAddRow = () => {
    const newId = data.rows.length > 0 
      ? Math.max(...data.rows.map(r => parseInt(r.id || '0'))) + 1 
      : 1;
      
    const newRow: Record<string, string> = { id: newId.toString() };
    data.columns.forEach(col => {
      newRow[col] = '';
    });
    
    setData(prev => ({
      ...prev,
      rows: [...prev.rows, newRow]
    }));
  };

  const handleAddColumn = () => {
    const colName = prompt("Enter new column name:");
    if (!colName || data.columns.includes(colName)) return;

    setData(prev => ({
      columns: [...prev.columns, colName],
      rows: prev.rows.map(row => ({ ...row, [colName]: '' }))
    }));
  };

  const handleRemoveColumn = (colToRemove: string) => {
    if (!confirm(`Are you sure you want to delete the column "${colToRemove}" and all its data?`)) return;

    setData(prev => ({
      columns: prev.columns.filter(c => c !== colToRemove),
      rows: prev.rows.map(row => {
        const newRow = { ...row };
        delete newRow[colToRemove];
        return newRow;
      })
    }));
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (!confirm("Are you sure you want to delete this row?")) return;
    setData(prev => {
      const newRows = [...prev.rows];
      newRows.splice(rowIndex, 1);
      return { ...prev, rows: newRows };
    });
  };

  const handleChange = (rowIndex: number, col: string, value: string) => {
    setData(prev => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = { ...newRows[rowIndex], [col]: value };
      return { ...prev, rows: newRows };
    });
  };

  const handleResizeStart = (e: React.MouseEvent, colName: string) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = data.columnWidths?.[colName] || 150;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX));
      setData(prev => ({
        ...prev,
        columnWidths: {
          ...(prev.columnWidths || {}),
          [colName]: newWidth
        }
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    const result = await saveProjects(data);
    if (result.success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] font-sans overflow-x-hidden relative selection:bg-[var(--accent-primary)] selection:text-white">
      
      {/* Sleek Minimalist Header */}
      <header className="absolute top-0 w-full z-50 p-8 flex justify-between items-center bg-transparent">
        <Link href="/home" className="text-xl font-medium tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full"></div>
          </div>
          Infinity Solution
        </Link>
        <nav className="hidden md:flex gap-12 text-sm tracking-widest uppercase text-[var(--text-secondary)] font-medium">
          <Link href="/home" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Home</Link>
          <Link href="/portfolio" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Portfolio</Link>
          <Link href="/projects" className="text-[var(--accent-primary)] transition-colors duration-300">Projects</Link>
          <Link href="/home#services" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Services</Link>
          <Link href="/proposal.html" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Proposal</Link>
          <Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Contact</Link>
        </nav>
        <Link href="/contact" className="px-6 py-2 bg-[var(--text-primary)] text-white rounded-none text-sm tracking-widest uppercase hover:bg-[var(--accent-primary)] transition-all duration-500">
          Book a Scan
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full min-h-screen pt-32 px-6 lg:px-12 relative z-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[var(--accent-primary)] blur-[150px] opacity-10 rounded-full pointer-events-none -z-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <div className="inline-block px-4 py-1 border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Internal Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Project <span className="font-serif italic text-[var(--text-secondary)]">Tracker</span>
            </h1>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={fetchData}
              className="px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-white transition-colors duration-300 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" /> Reload
            </button>
            <button 
              onClick={handleAddColumn}
              className="px-4 py-2 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/30 transition-colors duration-300 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <TableProperties className="w-4 h-4" /> Add Col
            </button>
            <button 
              onClick={handleAddRow}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Row
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-[var(--accent-primary)] text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg flex items-center gap-2 text-sm font-bold tracking-wider uppercase disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Data
            </button>
          </div>
        </div>

        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" /> Successfully saved project data.
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" /> Error saving project data. Please try again.
          </div>
        )}

        <div className="w-full overflow-x-auto glass-panel rounded-2xl border border-[var(--border-subtle)] shadow-2xl mb-20">
          {loading ? (
            <div className="w-full h-64 flex items-center justify-center text-[var(--text-secondary)] flex-col gap-4">
              <RefreshCw className="w-8 h-8 animate-spin text-[var(--accent-primary)]" />
              Loading projects...
            </div>
          ) : (
            <table className="w-full text-left border-collapse whitespace-nowrap table-fixed border border-[var(--border-subtle)] bg-black/10">
              <thead>
                <tr className="bg-black/40">
                  <th className="border border-[var(--border-subtle)] px-2 py-1 text-xs font-bold text-white bg-black/30 w-12 text-center">No.</th>
                  {data.columns.map((col, index) => (
                    <th 
                      key={index} 
                      className="border border-[var(--border-subtle)] p-0 text-xs font-bold text-white group/th relative bg-black/10"
                      style={{ width: data.columnWidths?.[col] || 150, minWidth: data.columnWidths?.[col] || 150 }}
                    >
                      <div className="flex items-center justify-center gap-2 px-2 py-1 h-full min-w-0 relative">
                        <span className="truncate text-center">{col}</span>
                        <button 
                          onClick={() => handleRemoveColumn(col)}
                          className="opacity-0 group-hover/th:opacity-100 hover:text-red-400 transition-all bg-black/50 p-1 rounded shrink-0 z-10 absolute right-1"
                          title="Remove Column"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <div 
                        onMouseDown={(e) => handleResizeStart(e, col)}
                        className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-[var(--accent-primary)] transition-colors z-20"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-white/5 transition-colors group">
                    <td className="border border-[var(--border-subtle)] p-0 w-12 bg-black/20 text-center relative group/rowno">
                      <div className="text-sm text-[var(--text-secondary)] font-mono group-hover/rowno:opacity-0 transition-opacity flex items-center justify-center h-full min-h-[32px]">{rowIndex + 1}</div>
                      <button 
                        onClick={() => handleRemoveRow(rowIndex)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/rowno:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all text-[var(--text-secondary)] w-full h-full"
                        title="Delete Row"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                    {data.columns.map((col, colIndex) => (
                      <td key={colIndex} className="border border-[var(--border-subtle)] p-0">
                        <input 
                          type="text" 
                          value={row[col] || ''} 
                          onChange={(e) => handleChange(rowIndex, col, e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-1 focus:ring-[var(--accent-primary)] focus:bg-black/40 px-2 py-1 text-sm outline-none transition-all"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                
                {data.rows.length === 0 && (
                  <tr>
                    <td colSpan={data.columns.length + 1} className="p-8 text-center text-[var(--text-secondary)] italic">
                      No projects tracked yet. Click "Add Row" to start.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={data.columns.length + 1} className="p-0 border border-[var(--border-subtle)] bg-black/5">
                    <button 
                      onClick={handleAddRow}
                      className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all outline-none"
                    >
                      <Plus className="w-4 h-4" /> Add New Row
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
