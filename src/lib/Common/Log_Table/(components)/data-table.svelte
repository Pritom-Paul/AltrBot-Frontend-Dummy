<script lang="ts">
  import { get, readable } from 'svelte/store';
  import {
    Render,
    Subscribe,
    createRender,
    createTable,
  } from 'svelte-headless-table';
  import {
    addColumnFilters,
    addHiddenColumns,
    addPagination,
    addSelectedRows,
    addSortBy,
    addTableFilter,
  } from 'svelte-headless-table/plugins';
  import type { getSchema } from '../(data)/schemas.js';
  import {
    DataTableCheckbox,
    DataTableColumnHeader,
    DataTablePagination,
    // DataTablePriorityCell,
    DataTableRowActions,
    DataTableStatusCell,
    DataTableTitleCell,
    DataTableToolbar,
  } from './index.js';
  import { Input } from "$lib/registry/new-york/ui/input/index.js";
  import * as Table from '$lib/registry/new-york/ui/table/index.js';
  import { Button } from "$lib/components/ui/button/index.js";
  // export let data: ExpIssuance[] = [];
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { ScrollArea, Scrollbar } from "$lib/registry/new-york/ui/scroll-area";
  import { columnsConfig } from './columnConfig.js';
  let isRunning = false;

  let service_name: string = 'logs';
  export let data: any[] = []; // Use a generic type initially
  console.log('log_table exported data---->',data);
  import type { z } from 'zod';
  let inputValues: { [key: string]: boolean } = {};

  // Simulate a loading operation
  async function handleStartClick() {
    isRunning = true;
  }

  // Define the event handler with the correct typing
  function handleFilterInput(event: Event, cellId: string) {
    const input = event.target as HTMLInputElement;
    $filterValues = {
      ...$filterValues,
      [cellId]: input.value,
    };
  }

  // Wrapper function to handle input typing and avoid the implicit any issue
  function handleInputEvent(cellId: string) {
    return (event: InputEvent) => handleFilterInput(event, cellId);
  }

  const table = createTable(readable(data), {
    select: addSelectedRows(),
    sort: addSortBy({
      toggleOrder: ['asc', 'desc'],
    }),
    page: addPagination(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      },
    }),
    colFilter: addColumnFilters(),
    hide: addHiddenColumns(),
  });
  console.log('service name ---->',service_name);
  const columns = [
  table.display({
    id: 'select',
    header: (_, { pluginStates }) => {
      const { allPageRowsSelected } = pluginStates.select;
      return createRender(DataTableCheckbox, {
        checked: allPageRowsSelected,
        'aria-label': 'Select all',
      });
    },
    cell: ({ row }, { pluginStates }) => {
      const { getRowState } = pluginStates.select;
      const { isSelected } = getRowState(row);
      return createRender(DataTableCheckbox, {
        checked: isSelected,
        'aria-label': 'Select row',
        class: 'translate-y-[2px]',
      });
    },
    plugins: {
      sort: {
        disable: true,
      },
    },
  }),
  // table.column({
	// 		accessor: "bot",
	// 		header: () => {
	// 			return "Bot";
	// 		},
	// 		id: "bot",
	// 		plugins: {
	// 			sort: {
	// 				disable: true,
	// 			},
	// 		},
	// 	}),
  table.column({
  accessor: "activity_type",
  header: "Activity Type",
  id: "activity_type",
  plugins: {
    sort: {
      disable: false, // Sorting is enabled
    },
    colFilter: {
      fn: ({ filterValue, value }) => {
        return (value ? value.toLowerCase() : "").includes(filterValue.toLowerCase());
      },
      initialFilterValue: '',
    },
  },
}),

table.column({
  accessor: "activity",
  header:  "Activity",
  id: "activity",
  plugins: {
    sort: {
      disable: false, // Sorting is enabled
    },
    colFilter: {
      fn: ({ filterValue, value }) => {
        return (value ? value.toLowerCase() : "").includes(filterValue.toLowerCase());
      },
      initialFilterValue: '',
    },
  },
}),

table.column({
  accessor: "activity_time",
  header:"Activity Time",
  id: "activity_time",
  plugins: {
    sort: {
      disable: false, // Sorting is enabled
    },
    colFilter: {
      fn: ({ filterValue, value }) => {
        return (value ? value.toLowerCase() : "").includes(filterValue.toLowerCase());
      },
      initialFilterValue: '',
    },
  },
}),

  // ...(columnsConfig[service_name] || []).map((column) =>
  //   table.column({
  //     accessor: column.accessor as any,  // Type assertion to match schema
  //     header: column.header,
  //     id: column.id,
  //     plugins: {
  //       sort: column.plugins?.sort,
  //       colFilter: column.plugins?.colFilter,
  //     },
  //   } as any)  // Type assertion to match schema
  // )
];
  
  const tableModel = table.createViewModel(columns);
  console.log('tableModel',tableModel);
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
  const{pluginStates}=tableModel;
  const { pageIndex, pageSize } = pluginStates.page;
  console.log('pageSize',pageSize);
  const { filterValues } = pluginStates.colFilter;

    
</script>

<div class="space-y-2">
  <!-- Toolbar and pagination components -->
  <DataTableToolbar {tableModel} {data}/>
  <DataTablePagination {tableModel} />

  <!-- Scrollable area -->
  <ScrollArea class="w-full rounded-md border">
    <div class="rounded-md border pb-2">
      <Table.Root {...$tableAttrs}>
        <Table.Header>
          {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
              <Table.Row>
                <!-- Render checkbox and column headers -->
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe
                    attrs={cell.attrs()}
                    props={cell.props()}
                    let:attrs
                    let:props
                  >
                    {#if cell.id === 'select'}
                    <Table.Head style="vertical-align: top; padding-top: 8px;">
                        <Render of={cell.render()} />
                      </Table.Head>
                    {/if}
                  </Subscribe>
                {/each}

                <!-- Render SL column header -->
                <Table.Head style="vertical-align: top; padding-top: 5px;">
                  <span class="text-lg">SL</span>
                </Table.Head>

                <!-- Render other column headers with Search Input (except 'SL', 'View Logs', and 'select') -->
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe
                    attrs={cell.attrs()}
                    props={cell.props()}
                    let:attrs
                    let:props
                  >
                    {#if cell.id !== 'select' && cell.id !== 'actions'}
                      <Table.Head {...attrs}>
                        <DataTableColumnHeader
                          {props}
                          {tableModel}
                          cellId={cell.id}
                        >
                          <Render of={cell.render()} />
                        </DataTableColumnHeader>
                        <!-- Add search input field to each header except for SL, View Logs, and checkbox -->
                        {#if cell.id !== 'sl' && cell.id !== 'viewLogs'}
                        <!-- Search Input Field -->
                        <div class="flex flex-col space-y-1 pb-3">
                          <Input
                            placeholder="Search"
                            class={`h-6 placeholder:text-muted-foreground/50 ${inputValues[cell.id] ? 'border-2 border-blue-500' : 'border'}`}
                            type="search"
                            value={$filterValues[cell.id] || ''}
                            on:input={(event) => handleFilterInput(event, cell.id)}
                          />
                            </div>
                          {/if}

                      </Table.Head>
                    {/if}

                    {#if cell.id === 'actions'}
                      <Table.Head {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Head>
                    {/if}
                  </Subscribe>
                {/each}

                <!-- Render View Logs column header -->
                <!-- <Table.Head style="vertical-align: top; padding-top: 5px;">
                  <span class="text-lg">View Logs</span>
                </Table.Head> -->
              </Table.Row>
            </Subscribe>
          {/each}
        </Table.Header>

        <Table.Body {...$tableBodyAttrs}>
          {#if $pageRows.length}
            {#each $pageRows as row, i (row.id)}
              <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                <!-- Add alternating row colors with dark mode support -->
                <Table.Row {...rowAttrs} class={`hover:bg-gray-200 dark:hover:bg-gray-700 ${i % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                  <!-- Render the checkbox -->
                  {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                      {#if cell.id === 'select'}
                        <Table.Cell {...attrs}>
                          <Render of={cell.render()} />
                        </Table.Cell>
                      {/if}
                    </Subscribe>
                  {/each}

                  <!-- Render the SL number -->
                  <Table.Cell>
                    <!-- Correct calculation for SL number -->
                    <span>{($pageIndex * $pageSize) + (i + 1)}</span>
                  </Table.Cell>

                  <!-- Render the rest of the cells -->
                  {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                      {#if cell.id !== 'select' && cell.id !== 'actions'}
                        <Table.Cell {...attrs}>
                          <Render of={cell.render()} />
                        </Table.Cell>
                      {/if}

                      {#if cell.id === 'actions'}
                        <Table.Cell {...attrs}>
                          <Render of={cell.render()} />
                        </Table.Cell>
                      {/if}
                    </Subscribe>
                  {/each}

                  <!-- Render the View Logs button -->
                  <!-- <Table.Cell>
                    <Button>
                      Logs
                    </Button>
                  </Table.Cell> -->
                </Table.Row>
              </Subscribe>
            {/each}
          {:else}
            <Table.Row>
              <Table.Cell colspan={columns.length + 2} class="h-24 text-center">
                No results.
              </Table.Cell>
            </Table.Row>
          {/if}
        </Table.Body>
      </Table.Root>
    </div>
    <Scrollbar orientation="horizontal" />
  </ScrollArea>

  <!-- Bottom pagination -->
  <DataTablePagination {tableModel} />
</div>