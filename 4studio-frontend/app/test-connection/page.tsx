'use client';

import { useState } from 'react';

interface TestResult {
  status: string;
  message: string;
  database?: {
    status: string;
    type?: string;
  };
  statistics?: {
    categories: number;
    voice_types: number;
    audio_samples: number;
    testimonials: number;
    contact_requests: number;
    users: number;
  };
  samples?: {
    categories: any[];
    testimonials: any[];
  };
  timestamp?: string;
}

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/test-connection/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      setError(`Erro de conexão: ${err instanceof Error ? err.message : 'Não foi possível conectar ao backend'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            🔗 Teste de Conexão
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#94a3b8'
          }}>
            Verificar comunicação entre Frontend (Next.js) e Backend (Django)
          </p>
        </div>

        {/* Test Button */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={testConnection}
            disabled={loading}
            style={{
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              background: loading 
                ? 'linear-gradient(135deg, #64748b, #475569)' 
                : 'linear-gradient(135deg, #a855f7, #7c3aed)',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Testando...
              </>
            ) : (
              <>
                <span style={{ marginRight: '8px' }}>🚀</span>
                Iniciar Teste
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid #ef4444',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '32px' }}>❌</span>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ef4444',
                margin: 0
              }}>
                Erro na Conexão
              </h2>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#fca5a5',
              margin: 0
            }}>
              {error}
            </p>
          </div>
        )}

        {/* Success Display */}
        {result && result.status === 'success' && (
          <div>
            {/* Success Header */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '2px solid #10b981',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#10b981',
                margin: '0 0 12px 0'
              }}>
                Conexão Estabelecida com Sucesso!
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6ee7b7',
                margin: 0
              }}>
                {result.message}
              </p>
            </div>

            {/* Database Status */}
            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '2px solid #a855f7',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#a855f7',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🗄️</span>
                Status do Banco de Dados
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
                    Status
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#e2e8f0' }}>
                    {result.database?.status === 'connected' ? '🟢 Conectado' : '🔴 Desconectado'}
                  </div>
                </div>
                {result.database?.type && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>
                      Tipo
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#e2e8f0' }}>
                      {result.database.type}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            {result.statistics && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#3b82f6',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📊</span>
                  Estatísticas do Banco de Dados
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px'
                }}>
                  <StatCard icon="📁" label="Categorias" value={result.statistics.categories} />
                  <StatCard icon="🎤" label="Tipos de Voz" value={result.statistics.voice_types} />
                  <StatCard icon="🔊" label="Amostras de Áudio" value={result.statistics.audio_samples} />
                  <StatCard icon="💬" label="Depoimentos" value={result.statistics.testimonials} />
                  <StatCard icon="✉️" label="Contatos" value={result.statistics.contact_requests} />
                  <StatCard icon="👥" label="Usuários" value={result.statistics.users} />
                </div>
              </div>
            )}

            {/* Sample Data */}
            {result.samples && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '2px solid #f59e0b',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📦</span>
                  Dados de Exemplo
                </h3>
                
                {result.samples.categories.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', color: '#fbbf24', marginBottom: '12px' }}>
                      Categorias:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {result.samples.categories.map((cat: any) => (
                        <div key={cat.id} style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '12px',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }}>
                          <strong>ID:</strong> {cat.id} | <strong>Nome:</strong> {cat.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.samples.testimonials.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '16px', color: '#fbbf24', marginBottom: '12px' }}>
                      Depoimentos:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {result.samples.testimonials.map((test: any) => (
                        <div key={test.id} style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '12px',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }}>
                          <strong>ID:</strong> {test.id} | <strong>Cliente:</strong> {test.client_name} | 
                          <strong> Status:</strong> {test.is_active ? ' ✅ Ativo' : ' ❌ Inativo'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Card */}
        <div style={{
          background: 'rgba(100, 116, 139, 0.1)',
          border: '2px solid #475569',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '40px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#94a3b8',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>ℹ️</span>
            Informações do Teste
          </h3>
          <ul style={{
            color: '#cbd5e1',
            fontSize: '14px',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li><strong>Frontend:</strong> Next.js rodando em http://localhost:3000</li>
            <li><strong>Backend:</strong> Django API em http://localhost:8000</li>
            <li><strong>Endpoint:</strong> GET /api/test-connection/</li>
            <li><strong>Verificações:</strong> Conexão com banco, contagem de registros, dados de exemplo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para cards de estatísticas
function StatCard({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '24px', fontWeight: '700', color: '#e2e8f0' }}>
        {value}
      </div>
    </div>
  );
}
