<script lang="ts">
    import { onMount } from 'svelte';
    import { isAuthenticated } from '$lib/stores/auth'; // Import authentication store
    import { get } from 'svelte/store'; // To get the current value of the store
    
    export let isSidebarOpen: boolean = false; // Declare the prop with a boolean type
    let isDropdownOpen = false;
  
    function toggleSidebar() {
      isSidebarOpen = !isSidebarOpen;
    }
  
    function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
  
    // Close sidebar when clicking outside
    onMount(() => {
      if (typeof document !== 'undefined') {
        document.addEventListener('click', (event: MouseEvent) => {
          const sidebar = document.getElementById('sidebar');
          const button = (event.target as HTMLElement).closest('button');
          if (sidebar && !sidebar.contains(event.target as Node) && !button) {
            isSidebarOpen = false;
          }
        });
      }
    });
    function handleLogout() {
        window.localStorage.removeItem('access_token');
        // Optionally clear the authenticated store
        isAuthenticated.set(false);
        window.location.href = 'login'; // Redirect to homepage
    }
</script>
  
<style>
    /* Hide sidebar on smaller screens by default */
    #sidebar {
    z-index: 40; /* Ensure sidebar is under the navbar */
    transition: transform 0.3s ease;
    }
    #sidebar.closed {
      transform: translateX(-100%);
    }
    #sidebar.open {
      transform: translateX(0);
    }

    ul {
      font-size: 1rem; /* 16px */
    }
  
    a, button {
      font-size: 1rem; /* 16px */
    }
</style>
  
<aside id="sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-gray-200 dark:border-gray-600 dark:bg-slate-950 {isSidebarOpen ? 'open' : 'closed'}" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto" style="padding-top: 5rem;">
      <ul class="space-y-2 font-semibold leading-none tracking-tight">
        <li>
          <a href="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src="/icons/Home.svg" alt="Home" class="mr-2 h-5 w-5 dark:invert transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span class="ms-3">Home</span>
          </a>
        </li>
        <li>
          {#if $isAuthenticated}
          <button on:click={toggleDropdown} type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <img src="/icons/Services.svg" alt="Services" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:invert" />
            <span class="flex-1 ms-3 text-left whitespace-nowrap">Services</span>
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4 4-4"/>
            </svg>
        </button>
        {/if}
               
          <ul class="{isDropdownOpen ? '' : 'hidden'} py-2 space-y-2 font-semibold leading-none tracking-tight">
            <li>
              <a href="/po-extractor" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">PO Extractor</a>
            </li>
            <li>
              <a href="/invoice-extractor" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice Extractor</a>
            </li>
            <li>
              <a href="/fcr" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">FCR</a>
            </li>
            <li>
              <a href="/exp-issuance" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">EXP Issuance</a>
            </li>
            <li>
              <a href="/booking" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Booking</a>
            </li>
            <li>
              <a href="/exp-download" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">EXP Download</a>
            </li>
          </ul>
        </li>
        {#if $isAuthenticated}
        <li>
          <button on:click={handleLogout} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src="/icons/Login.svg" alt="Login Icon" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:invert" />
            <span class="flex-1 ms-3 whitespace-nowrap">Log Out</span>
          </button>
        </li>
        {:else}
        <li>
          <a href="/login" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src="/icons/Login.svg" alt="Login Icon" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:invert" />
            <span class="flex-1 ms-3 whitespace-nowrap">Log In</span>
          </a>
        </li>
        {/if}
      </ul>
    </div>
</aside>
