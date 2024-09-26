<script lang="ts">
    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import { toggleMode } from 'mode-watcher';
    import { onMount, onDestroy } from 'svelte';
    import Sidebar from './Sidebar.svelte'; // Import Sidebar component
  
    let isDropdownOpen = false;
    let isSidebarOpen = false; // State to manage sidebar visibility
  
    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }
  
    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
  
    function handleClickOutside(event: MouseEvent) {
        if (typeof document !== 'undefined') {
            const dropdown = document.getElementById('mega-menu-full');
            const sidebar = document.getElementById('sidebar');
            const button = (event.target as HTMLElement).closest('button');
            if (dropdown && !dropdown.contains(event.target as Node) && !button) {
                isDropdownOpen = false;
            }
            if (sidebar && !sidebar.contains(event.target as Node) && !button) {
                isSidebarOpen = false;
            }
        }
    }
  
    // Add event listener when the component is mounted, only in the browser
    onMount(() => {
        if (typeof document !== 'undefined') {
            document.addEventListener('click', handleClickOutside);
        }
    });
  
    // Clean up the event listener when the component is destroyed, only in the browser
    onDestroy(() => {
        if (typeof document !== 'undefined') {
            document.removeEventListener('click', handleClickOutside);
        }
    });
</script>
  
<nav class="bg-white border-gray-200 dark:border-[var(--border)] dark:bg-[var(--background)]">
    <div class="flex flex-wrap justify-between items-center mx-4 max-w-screen-full p-2">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <!-- Sidebar Toggle Button -->
            <button 
                on:click={toggleSidebar} 
                class="inline-flex items-center pt-0 pb-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <a href="/" class="h-12 text-2xl font-bold whitespace-nowrap dark:text-white">ALTRBOT</a>
        </div>
        <button 
            on:click={toggleDropdown} 
            type="button" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="mega-menu-full" 
            aria-expanded={isDropdownOpen ? "true" : "false"}>
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div id="mega-menu-full" class="items-center justify-between font-medium {isDropdownOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1">
            <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[var(--muted)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[var(--card)] dark:bg-[var(--muted)] md:dark:bg-[var(--card)] dark:border-[var(--border)]">
                <li>
                    <a href="/services-homepage" class="block py-2 px-3 text-lg text-[var(--foreground)] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-[var(--foreground)] md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-[var(--border)]">Services</a>
                </li>
                <li>
                    <a href="/login" class="block py-2 px-3 text-lg text-[var(--foreground)] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-[var(--foreground)] md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-[var(--border)]">Log In</a>
                </li>
                <li>
                    <button on:click={toggleMode} type="button" class="inline-flex items-center pt-0 pb-2 w-10 h-10 justify-center text-sm text-[var(--muted-foreground)] rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] dark:text-[var(--muted-foreground)] dark:hover:bg-gray-700 dark:focus:ring-[var(--ring)]">
                        <Sun class="h-[1.7rem] w-[1.7rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon class="absolute h-[1.7rem] w-[1.7rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span class="sr-only">Toggle theme</span>
                    </button>
                </li>
            </ul>
        </div>        

    </div>
</nav>

<!-- Include the Sidebar Component with visibility control -->
<Sidebar {isSidebarOpen} />

<style>
nav {
    z-index: 50; /* Ensure navbar is on top */
}
</style>
