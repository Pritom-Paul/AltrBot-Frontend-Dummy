<script lang="ts">
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import DoubleArrowRight from "svelte-radix/DoubleArrowRight.svelte";
	import DoubleArrowLeft from "svelte-radix/DoubleArrowLeft.svelte";
	import type { TableViewModel } from "svelte-headless-table";
	import type { Task } from "../(data)/schemas.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";

	import { stored_pageSize, stored_pageIndex } from "./stores"; // Import shared stores

	export let tableModel: TableViewModel<Task>;

	// Destructure the table model to get needed properties
	const { pageRows, pluginStates, rows } = tableModel;

	// Destructure pagination properties
	const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;
	const { selectedDataIds } = pluginStates.select;

	// Subscriptions to the shared stores
	$: $stored_pageSize = $pageSize; 
	$: $stored_pageIndex = $pageIndex;

	// Handler for input field page change
	function goToPage(event: Event) {
		let target = event.currentTarget as HTMLInputElement; // Cast the target as HTMLInputElement
		let pageNumber = Number(target.value);
		if (pageNumber >= 1 && pageNumber <= $pageCount) {
			$pageIndex = pageNumber - 1; // Page index is 0-based
		} else {
			target.value = ($pageIndex + 1).toString(); // Reset input to current page if out of bounds
		}
	}


</script>

<div class="flex items-center justify-between px-2">
	<div class="text-muted-foreground flex-1 mr-2 text-sm">
		{Object.keys($selectedDataIds).length} of {$rows.length} row(s) selected.
	</div>
	<div class="flex items-center space-x-6 lg:space-x-8">
		<div class="flex items-center space-x-2">
			<p class="text-sm font-medium">Rows per page</p>
			<Select.Root
				onSelectedChange={(selected) => pageSize.set(Number(selected?.value))}
				selected={{ value: $pageSize, label: $pageSize.toString() }}
			>
				<Select.Trigger class="h-8 w-[70px]">
					<Select.Value placeholder="Select page size" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="10">10</Select.Item>
					<Select.Item value="20">20</Select.Item>
					<Select.Item value="30">30</Select.Item>
					<Select.Item value="40">40</Select.Item>
					<Select.Item value="50">50</Select.Item>
					<Select.Item value="100">100</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex w-[100px] items-center justify-center text-sm font-medium">
			<input
				type="number"
				min="1"
				max="{$pageCount}"
				value="{$pageIndex + 1}"
				on:change={goToPage}
				class="w-[50px] text-center border rounded-md"
			/>
			<span class="ml-4"> of {$pageCount}</span>
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				on:click={() => ($pageIndex = 0)}
				disabled={!$hasPreviousPage}
			>
				<span class="sr-only">Go to first page</span>
				<DoubleArrowLeft size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeft size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRight size={15} />
			</Button>
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = Math.ceil($rows.length / $pageRows.length) - 1)}
			>
				<span class="sr-only">Go to last page</span>
				<DoubleArrowRight size={15} />
			</Button>
		</div>
	</div>
</div>
