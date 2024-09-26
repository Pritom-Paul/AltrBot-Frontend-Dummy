<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

    const isAuthenticated = writable(false);

    onMount(() => {
        const token = window.localStorage.getItem('access_token');
        if (token) {
            isAuthenticated.set(true);
        } else {
            // Redirect to the login page with the original route
            const currentPath = window.location.pathname;
            goto(`/login?redirect=${encodeURIComponent(currentPath)}`);
        }
    });
</script>

{#if $isAuthenticated}
    <slot />
<!-- Optionally, show a loading state while checking -->
{/if}
