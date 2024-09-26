<script lang="ts">
	import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
</script>

<ProtectedRoute>
<main class="container mx-auto p-4 space-y-8">
	<div>
		<h1 class="text-4xl font-bold">Welcome to AltrBot</h1>
		<p class="text-xl text-muted-foreground mt-2">Lets Make a Better World</p>
	</div>
</main>
</ProtectedRoute>
