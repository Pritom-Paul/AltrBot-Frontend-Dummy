<script>
	import { cn } from "$lib/utils.js";
	let className = undefined;
	export { className as class };
</script>

<div class={cn("p-8 pt-0", className)} {...$$restProps}>
	<slot />
</div>
