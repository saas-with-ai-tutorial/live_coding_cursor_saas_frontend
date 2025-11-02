'use client';

import React, { useState, useEffect } from 'react';
import RefreshButton from '@/components/ui/RefreshButton';

interface Todo {
  id: string;
  title: string;
  source: string;
  status: 'pending' | 'completed';
  createdAt: string;
  priority?: 'low' | 'medium' | 'high';
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    today: 0,
  });

  const fetchData = async () => {
    // TODO: Replace with actual API call
    // For now, using mock data
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Review quarterly report',
        source: 'Gmail',
        status: 'pending',
        createdAt: new Date().toISOString(),
        priority: 'high',
      },
      {
        id: '2',
        title: 'Schedule team meeting',
        source: 'Slack',
        status: 'pending',
        createdAt: new Date().toISOString(),
        priority: 'medium',
      },
      {
        id: '3',
        title: 'Update project documentation',
        source: 'Teams',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        priority: 'low',
      },
    ];

    setTodos(mockTodos);
    
    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const statsData = {
      total: mockTodos.length,
      pending: mockTodos.filter(t => t.status === 'pending').length,
      completed: mockTodos.filter(t => t.status === 'completed').length,
      today: mockTodos.filter(t => {
        const created = new Date(t.createdAt);
        created.setHours(0, 0, 0, 0);
        return created.getTime() === today.getTime();
      }).length,
    };

    setStats(statsData);
  };

  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
  }, []);

  const handleRefresh = async () => {
    await fetchData();
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-[#e50914]';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      Gmail: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Slack: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      WhatsApp: 'bg-green-500/20 text-green-400 border-green-500/30',
      Teams: 'bg-blue-600/20 text-blue-300 border-blue-600/30',
    };
    return colors[source] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <RefreshButton onRefresh={handleRefresh} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Total Todos</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Pending</h3>
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Completed</h3>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Today</h3>
            <svg className="w-5 h-5 text-[#e50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#e50914]">{stats.today}</p>
        </div>
      </div>

      {/* Recent Todos */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Todos</h2>
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No todos yet</p>
            <p className="text-gray-500 text-sm">
              Connect your integrations to start collecting todos automatically
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.slice(0, 5).map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      todo.status === 'completed'
                        ? 'bg-[#e50914] border-[#e50914]'
                        : 'border-gray-600'
                    }`}
                  >
                    {todo.status === 'completed' && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${todo.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {todo.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`px-2 py-0.5 text-xs rounded border ${getSourceColor(todo.source)}`}
                      >
                        {todo.source}
                      </span>
                      {todo.priority && (
                        <span className={`text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                          {todo.priority.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
