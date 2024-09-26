<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import LoaderCircle from "lucide-svelte/icons/loader-circle"; // Import the LoaderCircle icon
    import { onMount } from "svelte";

    let isRunning = false; // State to track if the operation is running
    let selectedFile: File | null = null; // Variable to store the selected file
    let documentInput: HTMLInputElement; // Reference to the second file input field

    const allowedFileTypes = ['application/pdf']; // Only allow PDFs

    // Function to handle the Start button click
    async function handleStartClick() {
      isRunning = true; // Set isRunning to true when the operation starts

      // Simulate a task, like an API call or file upload
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second task

      isRunning = false; // Set isRunning to false when the task completes
    }

    // Function to handle the file drop
    function handleDrop(event: DragEvent) {
      event.preventDefault();
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (allowedFileTypes.includes(file.type)) {
          selectedFile = file;
          documentInput.files = event.dataTransfer.files;
          syncFileSelection(file); // Sync the selection with the file input field
        } else {
          alert('Only PDF files are allowed.');
        }
      }
    }

    // Function to handle the file selection through the dropbox input
    function handleFileSelect(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        if (allowedFileTypes.includes(file.type)) {
          selectedFile = file;
          syncFileSelection(file); // Sync the selection with the drop area
        } else {
          alert('Only PDF files are allowed.');
          input.value = ''; // Reset the input if the file is not valid
        }
      }
    }

    // Function to sync the file selection between components
    function syncFileSelection(file: File) {
      // Update the drop area input
      const dropInput = document.getElementById("dropzone-file") as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      dropInput.files = dataTransfer.files;

      // Update the document input
      documentInput.files = dataTransfer.files;
    }

    // Prevent default behavior for dragover to allow drop
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
    }

    // On mount, ensure the input is ready
    onMount(() => {
      documentInput = document.getElementById("document") as HTMLInputElement;
    });
</script>

<div class="pt-2">
  <h2 class="text-2xl font-bold text-center tracking-tight">Invoice Extractor</h2>
</div>
<div class="flex justify-center items-center h-[73vh] px-4">
    <div class="w-full max-w-4xl space-y-8">
        <div
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500"
            role="button"
            aria-label="Drop files here to upload"
            tabindex="0"
            on:drop={handleDrop}
            on:dragover={handleDragOver}
        >
            <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-full"
            >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        class="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Only PDF files are allowed
                    </p>
                </div>
                <input id="dropzone-file" type="file" accept=".pdf" class="hidden" on:change={handleFileSelect} />
            </label>
        </div>
        <div class="w-full flex flex-col space-y-2 items-start">
            <Label for="document">Upload Document</Label>
            <Input id="document" type="file" accept=".pdf" class="w-full" on:change={handleFileSelect} />

            <!-- Conditionally render the button based on isRunning -->
            {#if isRunning}
                <Button disabled>
                    <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
                    Running
                </Button>
            {:else}
                <Button variant="destructive" on:click={handleStartClick}>
                    Start
                </Button>
            {/if}
        </div>
    </div>
</div>
