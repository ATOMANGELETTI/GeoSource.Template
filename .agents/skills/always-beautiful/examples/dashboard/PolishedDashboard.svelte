<!-- Full Polished Dashboard UI Example -->
<script lang="ts">
  const stats = [
    { title: "Active Geo Feeds", value: "1,284", change: "+14.2%", trend: "up" },
    { title: "Query Throughput", value: "84.2k req/s", change: "+8.7%", trend: "up" },
    { title: "Average Latency", value: "1.4 ms", change: "-4.1%", trend: "down" },
    { title: "System Health", value: "99.98%", change: "+0.02%", trend: "up" }
  ];
</script>

<div class="dashboard-root">
  <!-- Header -->
  <header class="glass-header">
    <div>
      <h1 class="heading-glow">GeoSource Spatial Analytics</h1>
      <p class="subtitle">Real-time telemetry and spatial data streams</p>
    </div>
    <div class="header-actions">
      <button class="btn-secondary">Export Logs</button>
      <button class="btn-primary">Launch Query Engine</button>
    </div>
  </header>

  <!-- Metric Cards Grid -->
  <div class="metrics-grid">
    {#each stats as stat}
      <div class="metric-card">
        <span class="card-label">{stat.title}</span>
        <div class="card-value-row">
          <span class="card-value">{stat.value}</span>
          <span class="trend-badge {stat.trend}">{stat.change}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .dashboard-root {
    background: #0b0f19;
    color: #f8fafc;
    min-height: 100vh;
    padding: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .glass-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
  }

  .heading-glow {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    margin: 0.25rem 0 0 0;
    color: #94a3b8;
    font-size: 0.875rem;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-weight: 500;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .metric-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.25rem;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .metric-card:hover {
    transform: translateY(-4px);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 102, 241, 0.2);
  }

  .card-label {
    font-size: 0.85rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-value-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: 0.75rem;
  }

  .card-value {
    font-size: 1.75rem;
    font-weight: 800;
  }

  .trend-badge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .trend-badge.up {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
  }
</style>
