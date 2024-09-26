<script lang="ts">
	import type { TableViewModel } from "svelte-headless-table";
	import Cross2 from "svelte-radix/Cross2.svelte";
	import type { Writable } from "svelte/store";
	import { priorities, statuses } from "../(data)/data.js";
	import type { Task } from "../(data)/schemas.js";
	import { DataTableFacetedFilter, DataTableViewOptions } from "./index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";

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
			// priority: string[];
		}>;
	} = pluginStates.colFilter;

	let isRunning = false;

	async function handleStartClick() {
		
		// console.log("Rediraecting to start Exp download function");
		await fetch("http://localhost:8008/commercial/start-exp-download-bot", {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json',
				'X-CSRFToken': '{{ csrf_token }}',
			},
			'body': JSON.stringify({username: 'user1',password: 'pass1'}),
		})
		let response = await fetch('http://localhost:8008/commercial/api/exp-download-bot-status', {
			headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': '{{ csrf_token }}',
			},
		});
		let bot_status = await response.json();
		if (bot_status?.status === null) {
			console.log('bot_status===>', bot_status);
			// isRunning = true;
		}
		// .then((response) => response.json())
        // .then((data) => {
        //   console.log("data===>", data);
        //   if (data.status === "success") {
        //     alert(data.message);
        //   } else {
        //     alert(data.message);
        //   }
        // });
		// isRunning = false;
  }
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<!-- Left-side content remains the same -->
	<div class="flex flex-1 items-center space-x-2">
		<!-- Conditionally render the button based on isRunning -->
		{#if isRunning}
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
		</Button>
		
	</div>

	<!-- Right-side content -->
	<div class="flex items-center space-x-2">
		<Input
			placeholder="Filter..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
			counts={counts.status}
		/>

		<!-- Reset button -->
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = "";
					$filterValues.status = [];
				}}
				variant="ghost"
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
