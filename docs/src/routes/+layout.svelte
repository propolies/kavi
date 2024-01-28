<script>
  import '../app.css'
  import Navbar from '$lib/components/navbar.svelte';
  import Sidebar from '$lib/components/sidebar.svelte';
  import { showSidebar } from '$lib/stores';

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  
  inject({ mode: dev ? 'development' : 'production' });
</script>

<main class="flex flex-col h-screen bg-primary {$showSidebar ? "overflow-hidden" : "overflow-y-auto"}">
  <span class="flex flex-col">
    <Navbar />
    <slot />
  </span>
</main>
<Sidebar />