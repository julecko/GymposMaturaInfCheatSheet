<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import '../lib/styles/global.scss';
    import { theme } from '$lib/stores/theme';
    import { onMount } from 'svelte';

    onMount(() => {
        // Apply theme on mount to avoid flash
        document.documentElement.setAttribute('data-theme', $theme);
    });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style lang="scss">
    @use '@styles/global' as *;
</style>