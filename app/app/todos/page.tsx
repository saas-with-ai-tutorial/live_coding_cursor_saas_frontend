'use client';

import React, { useState, useEffect } from 'react';
import RefreshButton from '@/components/ui/RefreshButton';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Todo {
  id: string;
  title: string;
  source: string;
  status: 'pending' | 'completed';
  createdAt: string;
  priority?: 'low' | 'medium' | 'high';
}

interface TodoItem {
  title: string;
  description: string;
  due_date?: string;
  priority: string;
  status: string;
  category: string;
  tags: string[];
  source: string;
  source_id?: string;
  created_at?: string;
}

interface TodoResponse {
  success: boolean;
  todos: TodoItem[];
  emails_processed: number;
  message: string;
}

export default function AllTodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos?limit=20&fetch_new=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch todos');
      }

      const data: TodoResponse = await response.json();
      
      // Convert API response to frontend Todo format
      const convertedTodos: Todo[] = data.todos.map((todo, index) => ({
        id: todo.source_id || `todo-${index}-${Date.now()}`,
        title: todo.title,
        source: todo.source,
        status: (todo.status.toLowerCase() as 'pending' | 'completed'),
        createdAt: todo.created_at || new Date().toISOString(),
        priority: (todo.priority.toLowerCase() as 'low' | 'medium' | 'high'),
      }));

      setTodos(convertedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // On error, keep existing todos or show empty state
      // Optionally show an error message to user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await fetchTodos();
    })();
  }, []);

  const handleRefresh = async () => {
    await fetchTodos();
  };

  const handleToggleStatus = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' }
          : todo
      )
    );
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

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    const matchesStatus = filter === 'all' || todo.status === filter;
    const matchesSource = sourceFilter === 'all' || todo.source === sourceFilter;
    const matchesSearch =
      searchQuery === '' || todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSource && matchesSearch;
  });

  const sources = Array.from(new Set(todos.map((t) => t.source)));

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">All Todos</h1>
        <RefreshButton onRefresh={handleRefresh} />
      </div>

      {/* Filters */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'pending', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    filter === status
                      ? 'bg-[#e50914] text-white'
                      : 'bg-black text-gray-300 border border-gray-700 hover:border-gray-600'
                  }
                `}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Source Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSourceFilter('all')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  sourceFilter === 'all'
                    ? 'bg-[#e50914] text-white'
                    : 'bg-black text-gray-300 border border-gray-700 hover:border-gray-600'
                }
              `}
            >
              All Sources
            </button>
            {sources.map((source) => (
              <button
                key={source}
                onClick={() => setSourceFilter(source)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    sourceFilter === source
                      ? 'bg-[#e50914] text-white'
                      : 'bg-black text-gray-300 border border-gray-700 hover:border-gray-600'
                  }
                `}
              >
                {source}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Todos List */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-2">
              {searchQuery || filter !== 'all' || sourceFilter !== 'all'
                ? 'No todos match your filters'
                : 'No todos yet'}
            </p>
            <p className="text-gray-500 text-sm">
              {searchQuery || filter !== 'all' || sourceFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Connect your integrations to start collecting todos automatically'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggleStatus(todo.id)}
                    className={`
                      w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0
                      transition-colors
                      ${
                        todo.status === 'completed'
                          ? 'bg-[#e50914] border-[#e50914]'
                          : 'border-gray-600 hover:border-[#e50914]'
                      }
                    `}
                  >
                    {todo.status === 'completed' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`
                        font-medium truncate
                        ${todo.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}
                      `}
                    >
                      {todo.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-xs rounded border flex-shrink-0 ${getSourceColor(todo.source)}`}
                      >
                        {todo.source}
                      </span>
                      {todo.priority && (
                        <span className={`text-xs font-medium flex-shrink-0 ${getPriorityColor(todo.priority)}`}>
                          {todo.priority.toUpperCase()}
                        </span>
                      )}
                      <span className="text-gray-500 text-xs flex-shrink-0">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredTodos.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-400">
            Showing {filteredTodos.length} of {todos.length} todos
          </div>
        )}
      </div>
    </div>
  );
}

