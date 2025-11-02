'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RefreshButton from '@/components/ui/RefreshButton';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  connectedAt?: string;
  lastSynced?: string;
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

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});

  const fetchIntegrations = async () => {
    // TODO: Replace with actual API call
    const mockIntegrations: Integration[] = [
      {
        id: 'gmail',
        name: 'Gmail',
        description: 'Extract todos from your Gmail inbox',
        icon: 'https://logo.clearbit.com/gmail.com',
        status: 'connected',
        connectedAt: new Date(Date.now() - 604800000).toISOString(),
        lastSynced: new Date().toISOString(),
      },
      {
        id: 'slack',
        name: 'Slack',
        description: 'Get todos from Slack messages and channels',
        icon: 'https://logo.clearbit.com/slack.com',
        status: 'connected',
        connectedAt: new Date(Date.now() - 1209600000).toISOString(),
        lastSynced: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        description: 'Extract todos from WhatsApp messages',
        icon: 'https://logo.clearbit.com/whatsapp.com',
        status: 'disconnected',
      },
      {
        id: 'teams',
        name: 'Microsoft Teams',
        description: 'Sync todos from Teams conversations',
        icon: 'https://logo.clearbit.com/teams.microsoft.com',
        status: 'disconnected',
      },
    ];

    setIntegrations(mockIntegrations);
  };

  useEffect(() => {
    void (async () => {
      await fetchIntegrations();
    })();
  }, []);

  const handleRefresh = async () => {
    await fetchIntegrations();
  };

  const handleSyncNow = async (id: string) => {
    if (id !== 'gmail') {
      // For now, only Gmail is implemented
      alert('This integration is not yet implemented');
      return;
    }

    setSyncing((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/todos/fetch-from-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 10 }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to sync emails');
      }

      const data: TodoResponse = await response.json();

      // Update the integration's lastSynced time
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? {
                ...integration,
                lastSynced: new Date().toISOString(),
              }
            : integration
        )
      );

      // Show success message
      if (data.todos.length > 0) {
        alert(`Successfully extracted ${data.todos.length} todos from ${data.emails_processed} emails!`);
      } else {
        alert(`Processed ${data.emails_processed} emails but no todos were found.`);
      }
    } catch (error) {
      console.error('Error syncing emails:', error);
      alert(`Error syncing emails: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSyncing((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleConnect = (id: string) => {
    // TODO: Implement actual connection flow
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: 'connected' as const,
              connectedAt: new Date().toISOString(),
              lastSynced: new Date().toISOString(),
            }
          : integration
      )
    );
  };

  const handleDisconnect = (id: string) => {
    // TODO: Implement actual disconnection flow
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, status: 'disconnected' as const } : integration
      )
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const connectedCount = integrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-gray-400">
            Connect your channels to automatically extract and centralize todos
          </p>
        </div>
        <RefreshButton onRefresh={handleRefresh} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Integrations</h3>
          <p className="text-3xl font-bold text-white">{integrations.length}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Connected</h3>
          <p className="text-3xl font-bold text-green-500">{connectedCount}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Available</h3>
          <p className="text-3xl font-bold text-[#e50914]">
            {integrations.length - connectedCount}
          </p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const isImageUrl = integration.icon.startsWith('http');
          const hasError = imageErrors[integration.id];

          return (
            <div
              key={integration.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {isImageUrl && !hasError ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-2">
                        <Image
                          src={integration.icon}
                          alt={integration.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                          unoptimized
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [integration.id]: true }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#e50914] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {integration.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{integration.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{integration.description}</p>
                  </div>
                </div>
              </div>

            {/* Status */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    integration.status === 'connected'
                      ? 'bg-green-500'
                      : integration.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    integration.status === 'connected'
                      ? 'text-green-500'
                      : integration.status === 'pending'
                      ? 'text-yellow-500'
                      : 'text-gray-400'
                  }`}
                >
                  {integration.status === 'connected'
                    ? 'Connected'
                    : integration.status === 'pending'
                    ? 'Pending'
                    : 'Not Connected'}
                </span>
              </div>
              {integration.status === 'connected' && (
                <div className="space-y-1 text-xs text-gray-500 ml-4">
                  <div>Connected: {new Date(integration.connectedAt!).toLocaleDateString()}</div>
                  <div>Last synced: {formatDate(integration.lastSynced)}</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {integration.status === 'connected' ? (
                <>
                  <button
                    onClick={() => handleSyncNow(integration.id)}
                    disabled={syncing[integration.id]}
                    className="flex-1 px-4 py-2 bg-[#e50914] text-white rounded-lg font-medium hover:bg-[#b20710] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {syncing[integration.id] ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Syncing...
                      </>
                    ) : (
                      'Sync Now'
                    )}
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    disabled={syncing[integration.id]}
                    className="px-4 py-2 bg-black border border-gray-700 text-gray-300 rounded-lg font-medium hover:border-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(integration.id)}
                  className="w-full px-4 py-2 bg-[#e50914] text-white rounded-lg font-medium hover:bg-[#b20710] transition-colors"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        );
        })}
      </div>

      {/* Empty State */}
      {integrations.length === 0 && (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 mb-2">No integrations available</p>
          <p className="text-gray-500 text-sm">Check back later for more integration options</p>
        </div>
      )}
    </div>
  );
}

