<script lang="ts">
	import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
	import { labels } from "../(data)/data.js";
	import { getSchema } from "../(data)/schemas.js"; // Import function to get schema dynamically
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import type { z } from 'zod';

	export let row: any; // Use a more generic type initially
	export let service_name: string; // Get the service name dynamically

	// Get schema dynamically based on service_name
	const schema = getSchema(service_name);

	// Validate the row using the dynamically obtained schema
	const task = schema.parse(row);

</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="data-[state=open]:bg-muted flex h-8 w-8 p-0"
		>
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Open Menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Labels</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup value={task.label}>
					{#each labels as label}
						<DropdownMenu.RadioItem value={label.value}>
							{label.label}
						</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Delete
			<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
