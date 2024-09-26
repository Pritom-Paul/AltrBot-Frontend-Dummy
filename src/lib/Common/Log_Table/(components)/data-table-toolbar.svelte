<script lang="ts">
	import type { TableViewModel } from "svelte-headless-table";
	import Cross2 from "svelte-radix/Cross2.svelte";
	import type { Writable } from "svelte/store";
	import { priorities, statuses } from "../(data)/data.js";
	import type { Task } from "../(data)/schemas.js";
	import { urls } from "$lib/Common/Rendering_Data/urls.js";
	import { DataTableFacetedFilter, DataTableViewOptions } from "./index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	let VITE_LOCAL = import.meta.env.VITE_API_GOBLIN_LOCAL; 
	export let tableModel: TableViewModel<Task>;
	export let data: Task[];
	const counts = data.reduce<{
		status: { [index: string]: number };
		// priority: { [index: string]: number };
	}>(
		(acc, { status }) => {
			acc.status[status] = (acc.status[status] || 0) + 1;
			// acc.priority[priority] = (acc.priority[priority] || 0) + 1;
			return acc;
		},
		{
			status: {},
			// priority: {},
		}
	);

	const { pluginStates } = tableModel;
	const {
		filterValue,
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues,
	}: {
		filterValues: Writable<{
			status: string[];
			activity_type: string[];
			// Add any other known filter keys here if needed
			[filterKey: string]: string | string[]; // Generic index signature
		}>;
	} = pluginStates.colFilter;

	let isRunning = false;

	async function handleStartClick() {
		isRunning = true;
	}

	import LoaderCircle from "lucide-svelte/icons/loader-circle";

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);

	$: {
		// console.log('Show Reset:', showReset);
		console.log('filterValues:', $filterValues);
	}

	function resetFilters() {
    for (const key in $filterValues) {
        if (Array.isArray($filterValues[key])) {
            $filterValues[key] = [];
        } else if (typeof $filterValues[key] === 'string') {
            $filterValues[key] = "";
        }
    }
    // Optional: Clear any other specific filter value if needed
    $filterValue = "";
}

// Reactive variable to check if filterValue has a value
$: hasFilterValue = $filterValue.trim().length > 0;

</script>

<div class="flex items-center justify-between">
	<!-- Left-side content remains the same -->
	<div class="flex flex-1 items-center space-x-2">
		<!-- Conditionally render the button based on isRunning -->
		<!-- {#if isRunning}
		<Button disabled>
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			Running
		</Button>
		{:else}
		<Button variant="destructive"  on:click={handleStartClick}>
			<img src="/icons/Start.svg" alt="Start" class="mr-2 h-4 w-4 invert" />
			Start
		</Button>
		{/if}

		<Button variant="outline">
			<img src="/icons/Common_logs.svg" alt="Common Logs" class="mr-2 h-4 w-4 dark:invert" />
			Common Logs
		</Button> -->
	</div>

	<!-- Right-side content -->
	<div class="flex items-center space-x-2">
		<Input
			placeholder="Filter..."
			class={`h-8 w-[150px] lg:w-[250px] ${hasFilterValue ? 'border-2 border-blue-500' : ''}`}
			type="search"
			bind:value={$filterValue}
		/>

		<!-- <DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
			counts={counts.status}
		/> -->

		<!-- Reset button -->
		{#if showReset}
			<Button
				on:click={resetFilters}
				variant="red"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}

		<!-- View Options -->
		<DataTableViewOptions {tableModel} />
	</div>
</div>
