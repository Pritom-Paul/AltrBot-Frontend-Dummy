<script lang="ts">
    import DataTable from "./(components)/data-table.svelte";
	import Spinner from "./(components)/spinner.svelte";
    import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
    import { taskSchema, type Task } from "./(data)/schemas";
    import { z } from "zod";

    let data: Task[] = [];
    let isLoading = true; // Track loading state

    // Fetch data asynchronously, validate and structure it
    _fetch_data("api/get-activity-logs/exp_download").then(response => {
        console.log("Raw response data:", response); // Log the raw response

        try {
            // Validate the data against the schema
            const parsedData = z.array(taskSchema).parse(response);
            data = parsedData;
        } catch (error) {
            console.error("Data validation failed:", error);
            data = []; // Fallback to an empty array on validation error
        } finally {
            isLoading = false; // Data fetching is complete
        }
    });
</script>

<div class="md:hidden">
</div>
<div class="h-full flex-1 flex-col space-y-8 p-8 mx-4 md:flex">
	<div>
		<!-- <h1 class="text-3xl font-bold mb-2 text-center">Exp Download</h1> -->
		<h2 class="text-2xl font-bold text-center tracking-tight">Activity Logs</h2>
	</div>
    <div class="flex items-center justify-between space-y-2">
    </div>
    {#if isLoading}
		<Spinner />
    {:else if data.length === 0}
        <p>No data available</p>
    {:else}
        <DataTable {data} />
    {/if}
</div>


