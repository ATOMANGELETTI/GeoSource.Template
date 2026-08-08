<!-- Before/After Comparison Component -->
<script lang="ts">
  export let title = "GeoSource Status Monitor";
  export let activeCount = 42;
</script>

<div class="comparison-grid">
  <!-- UNPOLISHED (BEFORE) -->
  <div class="card-before">
    <h3>UNPOLISHED (Default/Plain)</h3>
    <div class="box-before">
      <h4>{title}</h4>
      <p>Active nodes: {activeCount}</p>
      <button class="btn-before">Refresh Status</button>
    </div>
  </div>

  <!-- ALWAYS-BEAUTIFUL (AFTER) -->
  <div class="card-after">
    <div class="glass-header">
      <span class="badge-live">LIVE</span>
      <h3 class="gradient-title">{title}</h3>
    </div>
    <div class="glass-content">
      <div class="stat-row">
        <span class="stat-label">Active System Nodes</span>
        <span class="stat-value">{activeCount}</span>
      </div>
      <button class="btn-glow">
        <svg class="icon-spin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Refresh Status</span>
      </button>
    </div>
  </div>
</div>

<style>
  /* UNPOLISHED STYLES */
  .card-before {
    padding: 1rem;
    border: 1px solid #ccc;
    background: #fff;
    color: #000;
  }
  .btn-before {
    background: blue;
    color: white;
    padding: 6px 12px;
  }

  /* ALWAYS-BEAUTIFUL STYLES */
  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .card-after {
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-after:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(99, 102, 241, 0.3);
  }

  .gradient-title {
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    margin: 0;
  }

  .badge-live {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #818cf8;
  }

  .btn-glow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-glow:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }

  .btn-glow:active {
    transform: translateY(0) scale(0.98);
  }
</style>
