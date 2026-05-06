<script lang="ts">
	import { browser } from '$app/environment';
	import { entries, categories, type Entry, type Category } from '$lib/data/cheatsheet';
	import { theme } from '$lib/stores/theme';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-python';
	import 'prismjs/themes/prism-tomorrow.css';
	import { onMount, afterUpdate } from 'svelte';
    import { tick } from 'svelte';

    async function highlight() {
        if (!browser) return;
        await tick();

        document.querySelectorAll('pre code:not(.prism-done)').forEach((el) => {
            Prism.highlightElement(el);
            el.classList.add('prism-done');
        });
    }

    $: filtered, highlight();
    $: expandedId, highlight();

	onMount(highlight);
	afterUpdate(highlight);

	// ── State ────────────────────────────────────────────────
	let activeTab: 'quick' | 'detail' = 'quick';
	let selectedCategory: string = 'all';
	let searchQuery: string = '';
	let expandedId: string | null = null;

	// ── Filtering ────────────────────────────────────────────
	$: filtered = entries.filter((e) => {
		const matchCat = selectedCategory === 'all' || e.category === selectedCategory;
		const q = searchQuery.toLowerCase();
		const matchSearch =
			!q ||
			e.name.toLowerCase().includes(q) ||
			e.brief.toLowerCase().includes(q) ||
			e.syntax.toLowerCase().includes(q) ||
			(e.tags ?? []).some((t) => t.toLowerCase().includes(q));
		return matchCat && matchSearch;
	});

	function getCat(key: string): Category | undefined {
		return categories.find((c) => c.key === key);
	}

	let raf: number;
	let velocity = 0;
	let accelerating = false;

	function startScroll(dir: 'left' | 'right') {
		stopScroll();

		accelerating = true;
		let startTime = performance.now();

		const direction = dir === 'left' ? -1 : 1;

		const step = (time: number) => {
			const elapsed = time - startTime;

			// accelerate then cap speed
			const accel = Math.min(elapsed / 300, 1); // 0 → 1 over 300ms
			velocity = (2 + accel * 12) * 4.5; // min speed → max speed

			catScroll.scrollLeft += velocity * direction;

			if (accelerating) {
				raf = requestAnimationFrame(step);
			}
		};

		raf = requestAnimationFrame(step);
	}

	function stopScroll() {
		accelerating = false;

		if (raf) cancelAnimationFrame(raf);
		raf = 0;
	}

	let catScroll: HTMLDivElement;

	function scrollCats(dir: 'left' | 'right') {
		const amount = 200;

		catScroll.scrollBy({
			left: dir === 'left' ? -amount : amount,
			behavior: 'smooth'
		});
	}

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	// Group entries by category for detail view
	$: groupedDetail = categories
		.map((cat) => ({
			cat,
			items: filtered.filter((e) => e.category === cat.key)
		}))
		.filter((g) => g.items.length > 0);

	// Category counts
	$: catCounts = Object.fromEntries(
		categories.map((c) => [c.key, entries.filter((e) => e.category === c.key).length])
	);
</script>

<svelte:head>
	<title>Python Cheatsheet — Maturita</title>
	<meta
		name="description"
		content="Prehľad Pythonu pre maturitné skúšky — rýchla referencia a detailné príklady."
	/>
</svelte:head>

<div class="app">
	<!-- ═══════════════════════════════════════════════════
       HEADER
  ═══════════════════════════════════════════════════ -->
	<header class="header">
		<div class="header-inner container">
			<div class="logo">
				<span class="logo-icon">🐍</span>
				<div class="logo-text">
					<span class="logo-title">Python</span>
					<span class="logo-sub">Maturita Cheatsheet</span>
				</div>
			</div>

			<nav class="tab-nav" role="tablist" aria-label="Zobrazenie">
				<button
					class="tab-btn"
					class:active={activeTab === 'quick'}
					role="tab"
					aria-selected={activeTab === 'quick'}
					on:click={() => {
						activeTab = 'quick';
						expandedId = null;
					}}
				>
					<span class="tab-icon">⚡</span>
					Rýchly prehľad
				</button>
				<button
					class="tab-btn"
					class:active={activeTab === 'detail'}
					role="tab"
					aria-selected={activeTab === 'detail'}
					on:click={() => {
						activeTab = 'detail';
						expandedId = null;
					}}
				>
					<span class="tab-icon">📚</span>
					Detailný prehľad
				</button>
			</nav>

			<button
				class="theme-toggle"
				on:click={theme.toggle}
				aria-label="Prepnúť tému"
				title="Prepnúť svetlú/tmavú tému"
			>
				{#if $theme === 'dark'}🌙{:else}☀️{/if}
			</button>
		</div>
	</header>

	<!-- ═══════════════════════════════════════════════════
       FILTERS BAR
  ═══════════════════════════════════════════════════ -->
	<div class="filters-bar">
		<div class="filters-inner container">
			<div class="search-wrap">
				<span class="search-icon">🔍</span>
				<input
					class="search-input"
					type="search"
					placeholder="Hľadaj príkaz, napr. for, sqrt, append…"
					bind:value={searchQuery}
					aria-label="Hľadaj"
				/>
				{#if searchQuery}
					<button
						class="search-clear"
						on:click={() => (searchQuery = '')}
						aria-label="Vymazať hľadanie">✕</button
					>
				{/if}
			</div>

			<div class="cat-wrapper">
				<button
					class="scroll-arrow left"
					on:mousedown={() => startScroll('left')}
                    on:mouseup={stopScroll}
                    on:mouseleave={stopScroll}
                    on:touchstart|preventDefault={() => startScroll('left')}
                    on:touchend={stopScroll}
				>
					‹
				</button>

				<div class="cat-scroll" bind:this={catScroll} role="group" aria-label="Kategórie">
					<button
						class="cat-btn"
						class:active={selectedCategory === 'all'}
						on:click={() => (selectedCategory = 'all')}
					>
						Všetky <span class="cat-count">{entries.length}</span>
					</button>
					{#each categories as cat}
						<button
							class="cat-btn"
							class:active={selectedCategory === cat.key}
							style="--cat-accent: var(--{cat.color})"
							on:click={() => (selectedCategory = cat.key)}
						>
							<span class="cat-icon">{cat.icon}</span>
							{cat.label}
							<span class="cat-count">{catCounts[cat.key]}</span>
						</button>
					{/each}
				</div>

				<button
					class="scroll-arrow right"
					on:mousedown={() => startScroll('right')}
                    on:mouseup={stopScroll}
                    on:mouseleave={stopScroll}
                    on:touchstart|preventDefault={() => startScroll('right')}
                    on:touchend={stopScroll}
				>
					›
				</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
       MAIN CONTENT
  ═══════════════════════════════════════════════════ -->
	<main class="main container">
		{#if filtered.length === 0}
			<div class="empty-state">
				<span class="empty-icon">🔎</span>
				<p>Žiadne výsledky pre <strong>"{searchQuery}"</strong></p>
				<button
					on:click={() => {
						searchQuery = '';
						selectedCategory = 'all';
					}}
				>
					Zrušiť filtre
				</button>
			</div>

			<!-- ─────────────────────────────────────────────────
         QUICK VIEW
    ───────────────────────────────────────────────── -->
		{:else if activeTab === 'quick'}
			<div class="result-count">
				{filtered.length} príkazov
				{#if searchQuery || selectedCategory !== 'all'}<span class="result-filter"
						>— filtrované</span
					>{/if}
			</div>

			<div class="quick-grid">
				{#each filtered as entry (entry.id)}
					{@const cat = getCat(entry.category)}
					<article
						class="quick-card"
						class:expanded={expandedId === entry.id}
						style="--cat-accent: var(--{cat?.color ?? 'accent-blue'})"
					>
						<button
							class="quick-card-header"
							on:click={() => toggleExpand(entry.id)}
							aria-expanded={expandedId === entry.id}
						>
							<div class="quick-card-top">
								<span class="quick-cat-icon">{cat?.icon ?? '·'}</span>
								<span class="quick-name">{entry.name}</span>
								<span class="quick-chevron" class:flipped={expandedId === entry.id}>›</span>
							</div>
							<code class="quick-syntax">{entry.syntax}</code>
							<p class="quick-brief">{entry.brief}</p>
						</button>

						{#if expandedId === entry.id}
							<div class="quick-expand">
								<p class="expand-desc">{entry.description}</p>
								<pre class="code-block"><code class="language-python">{entry.example}</code></pre>
							</div>
						{/if}
					</article>
				{/each}
			</div>

			<!-- ─────────────────────────────────────────────────
         DETAIL VIEW
    ───────────────────────────────────────────────── -->
		{:else}
			<div class="detail-view">
				{#each groupedDetail as group (group.cat.key)}
					<section class="detail-section" id="section-{group.cat.key}">
						<div class="section-header" style="--cat-accent: var(--{group.cat.color})">
							<span class="section-icon">{group.cat.icon}</span>
							<h2 class="section-title">{group.cat.label}</h2>
							<span class="section-count">{group.items.length}</span>
						</div>

						<div class="detail-grid">
							{#each group.items as entry (entry.id)}
								<article class="detail-card" style="--cat-accent: var(--{group.cat.color})">
									<div class="detail-card-head">
										<h3 class="detail-name">{entry.name}</h3>
										{#if entry.tags}
											<div class="tags">
												{#each entry.tags as tag}
													<span class="tag">{tag}</span>
												{/each}
											</div>
										{/if}
									</div>

									<code class="detail-syntax">{entry.syntax}</code>

									<p class="detail-brief">{entry.brief}</p>

									<div class="detail-divider"></div>

									<p class="detail-desc">{entry.description}</p>

									<div class="code-wrap">
										<span class="code-label">Príklad</span>
										<pre class="code-block"><code class="language-python">{entry.example}</code></pre>
									</div>
								</article>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		{/if}
	</main>

	<!-- ═══════════════════════════════════════════════════
       FOOTER
  ═══════════════════════════════════════════════════ -->
	<footer class="footer">
		<div class="container">
			<p>🐍 Python Maturita Cheatsheet · {new Date().getFullYear()}</p>
			<p class="footer-sub">Vytvorené pre maturitantov gymnázia · Syntax: Python 3</p>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '../lib/styles/variables' as *;

	// ──────────────────────────────────────────────────────
	// APP SHELL
	// ──────────────────────────────────────────────────────
	.app {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	// ──────────────────────────────────────────────────────
	// HEADER
	// ──────────────────────────────────────────────────────
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 1px 0 var(--border);
	}

	.header-inner {
		display: flex;
		align-items: center;
		gap: $space-4;
		height: 64px;

		@media (max-width: #{$bp-md}) {
			height: auto;
			flex-wrap: wrap;
			padding-top: $space-3;
			padding-bottom: $space-3;
			gap: $space-3;
		}
	}

	.logo {
		display: flex;
		align-items: center;
		gap: $space-3;
		flex-shrink: 0;
	}

	.logo-icon {
		font-size: 1.8rem;
		line-height: 1;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.logo-title {
		font-family: $font-display;
		font-size: 1.1rem;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.02em;
	}

	.logo-sub {
		font-size: 0.7rem;
		color: var(--text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	// Tab nav
	.tab-nav {
		display: flex;
		gap: $space-1;
		background: var(--surface-2);
		border-radius: $radius-pill;
		padding: 3px;
		margin: 0 auto;

		@media (max-width: #{$bp-md}) {
			order: 3;
			width: 100%;
			justify-content: center;
		}
	}

	.tab-btn {
		display: flex;
		align-items: center;
		gap: $space-2;
		padding: $space-2 $space-5;
		border: none;
		background: transparent;
		color: var(--text-muted);
		border-radius: $radius-pill;
		cursor: pointer;
		font-family: $font-body;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all $transition-fast;
		white-space: nowrap;

		.tab-icon {
			font-size: 0.95rem;
		}

		&:hover:not(.active) {
			color: var(--text);
			background: var(--border);
		}

		&.active {
			background: var(--surface);
			color: var(--text);
			box-shadow: $shadow-sm;
		}
	}

	.theme-toggle {
		margin-left: auto;
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: $radius-pill;
		padding: $space-2 $space-3;
		cursor: pointer;
		font-size: 1.1rem;
		line-height: 1;
		transition: all $transition-fast;
		flex-shrink: 0;

		&:hover {
			background: var(--border);
		}

		@media (max-width: #{$bp-md}) {
			margin-left: 0;
		}
	}

	// ──────────────────────────────────────────────────────
	// FILTERS BAR
	// ──────────────────────────────────────────────────────
	.filters-bar {
		background: var(--bg);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 64px;
		z-index: 90;

		@media (max-width: #{$bp-md}) {
			top: auto;
			position: relative;
		}
	}

	.filters-inner {
		padding-top: $space-3;
		padding-bottom: $space-3;
		display: flex;
		flex-direction: column;
		gap: $space-3;
	}

	// Search
	.search-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: $space-4;
		font-size: 1rem;
		pointer-events: none;
		color: var(--text-muted);
	}

	.search-input {
		width: 100%;
		max-width: 480px;
		padding: $space-3 $space-4 $space-3 2.5rem;
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: $radius-pill;
		color: var(--text);
		font-family: $font-body;
		font-size: 0.95rem;
		outline: none;
		transition:
			border-color $transition-fast,
			box-shadow $transition-fast;

		&::placeholder {
			color: var(--text-muted);
		}

		&:focus {
			border-color: var(--accent-blue);
			box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
		}

		@media (max-width: #{$bp-sm}) {
			max-width: 100%;
		}
	}

	.search-clear {
		position: absolute;
		right: $space-3;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-muted);
		font-size: 0.85rem;
		padding: $space-1;
		border-radius: 50%;
		line-height: 1;

		&:hover {
			color: var(--text);
			background: var(--surface-2);
		}
	}

	// Category pills
	.cat-wrapper {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 8px;
	}

	/* scroll area stays unchanged visually */
	.cat-scroll {
		overflow-x: auto;
		scroll-behavior: smooth;
		display: flex;
		gap: $space-2;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	/* arrows */
	.scroll-arrow {
		position: static;
		z-index: 5;

		width: 28px;
		height: 28px;
		border-radius: 999px;

		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;

		box-shadow: $shadow-sm;
		transition: all $transition-fast;

		&:hover {
			background: var(--surface-2);
		}

		&.left {
			left: 0;
		}

		&.right {
			right: 0;
		}
	}

	.cat-btn {
		display: flex;
		align-items: center;
		gap: $space-1;
		padding: $space-1 $space-4;
		border: 1.5px solid var(--border);
		background: var(--surface);
		color: var(--text-muted);
		border-radius: $radius-pill;
		cursor: pointer;
		font-family: $font-body;
		font-size: 0.8rem;
		font-weight: 500;
		white-space: nowrap;
		transition: all $transition-fast;

		.cat-icon {
			font-size: 0.85rem;
		}

		.cat-count {
			background: var(--surface-2);
			border-radius: $radius-pill;
			padding: 0 $space-2;
			font-size: 0.72rem;
			min-width: 20px;
			text-align: center;
		}

		&:hover:not(.active) {
			border-color: var(--cat-accent, var(--accent-blue));
			color: var(--text);
		}

		&.active {
			background: var(--cat-accent, var(--accent-blue));
			border-color: var(--cat-accent, var(--accent-blue));
			color: white;

			.cat-count {
				background: rgba(255, 255, 255, 0.25);
				color: white;
			}
		}
	}

	// ──────────────────────────────────────────────────────
	// MAIN
	// ──────────────────────────────────────────────────────
	.main {
		flex: 1;
		padding-top: $space-6;
		padding-bottom: $space-16;
	}

	.result-count {
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-bottom: $space-5;
		font-weight: 500;

		.result-filter {
			color: var(--accent-blue);
		}
	}

	// ──────────────────────────────────────────────────────
	// QUICK GRID
	// ──────────────────────────────────────────────────────
	.quick-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: $space-4;

		@media (max-width: #{$bp-sm}) {
			grid-template-columns: 1fr;
			gap: $space-3;
		}
	}

	.quick-card {
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: $radius-lg;
		overflow: hidden;
		transition:
			border-color $transition-fast,
			box-shadow $transition-fast,
			transform $transition-fast;

		&:hover {
			border-color: var(--cat-accent);
			box-shadow:
				0 0 0 3px rgba(var(--cat-accent-rgb, 59, 130, 246), 0.08),
				$shadow-sm;
			transform: translateY(-1px);
		}

		&.expanded {
			border-color: var(--cat-accent);
			box-shadow:
				0 0 0 3px rgba(59, 130, 246, 0.1),
				$shadow-md;
		}
	}

	.quick-card-header {
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
		padding: $space-5;
		display: flex;
		flex-direction: column;
		gap: $space-2;
	}

	.quick-card-top {
		display: flex;
		align-items: center;
		gap: $space-2;
	}

	.quick-cat-icon {
		font-size: 1rem;
		flex-shrink: 0;
	}

	.quick-name {
		font-family: $font-display;
		font-size: 1rem;
		font-weight: 700;
		color: var(--text);
		flex: 1;
	}

	.quick-chevron {
		color: var(--text-muted);
		font-size: 1.4rem;
		transition: transform $transition-fast;
		line-height: 1;

		&.flipped {
			transform: rotate(90deg);
		}
	}

	.quick-syntax {
		display: block;
		font-family: $font-mono;
		font-size: 0.8rem;
		color: var(--cat-accent);
		background: var(--surface-2);
		padding: $space-2 $space-3;
		border-radius: $radius-sm;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.quick-brief {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.quick-expand {
		padding: 0 $space-5 $space-5;
		display: flex;
		flex-direction: column;
		gap: $space-4;
		border-top: 1px solid var(--border);
		padding-top: $space-4;
		animation: slideDown 0.2s ease;
	}

	.expand-desc {
		font-size: 0.88rem;
		color: var(--text);
		line-height: 1.65;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// ──────────────────────────────────────────────────────
	// DETAIL VIEW
	// ──────────────────────────────────────────────────────
	.detail-view {
		display: flex;
		flex-direction: column;
		gap: $space-12;
	}

	.detail-section {
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: $space-3;
		margin-bottom: $space-6;
		padding-bottom: $space-4;
		border-bottom: 2px solid var(--cat-accent);
	}

	.section-icon {
		font-size: 1.5rem;
	}

	.section-title {
		font-family: $font-display;
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.02em;
	}

	.section-count {
		margin-left: auto;
		background: var(--cat-accent);
		color: white;
		border-radius: $radius-pill;
		padding: $space-1 $space-3;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(440px, 100%), 1fr));
		gap: $space-5;

		@media (max-width: #{$bp-md}) {
			grid-template-columns: 1fr;
		}
	}

	.detail-card {
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: $radius-xl;
		padding: $space-6;
		display: flex;
		flex-direction: column;
		gap: $space-4;
		transition:
			border-color $transition-fast,
			box-shadow $transition-fast;
		border-left: 4px solid var(--cat-accent);
        min-width: 0;       // ← add this

		&:hover {
			box-shadow: $shadow-md;
			border-top-color: var(--cat-accent);
		}
	}

	.detail-card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: $space-3;
		flex-wrap: wrap;
	}

	.detail-name {
		font-family: $font-display;
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: $space-1;
	}

	.tag {
		font-family: $font-mono;
		font-size: 0.72rem;
		background: var(--tag-bg);
		color: var(--tag-text);
		padding: 2px $space-2;
		border-radius: $radius-sm;
		font-weight: 500;
	}

	.detail-syntax {
		display: block;
		font-family: $font-mono;
		font-size: 0.82rem;
		color: var(--cat-accent);
		background: var(--surface-2);
		padding: $space-3 $space-4;
		border-radius: $radius-md;
		white-space: pre-wrap;
		word-break: break-all;
		line-height: 1.6;
	}

	.detail-brief {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text);
	}

	.detail-divider {
		height: 1px;
		background: var(--border);
	}

	.detail-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.7;
	}

	// ──────────────────────────────────────────────────────
	// CODE BLOCKS
	// ──────────────────────────────────────────────────────
	.code-wrap {
        position: relative;
        min-width: 0;
        border-radius: $radius-md;
    }

	.code-label {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: $space-2;
	}

	.code-block {
		background: var(--code-bg);
		color: var(--code-text);
		border-radius: $radius-md;
		padding: $space-4 $space-5;
		overflow-x: auto;
		font-family: $font-mono;
		font-size: 0.82rem;
		line-height: 1.7;
		margin: 0;
		white-space: pre;
        width: 100%;        // ← add this
        

		// Simple syntax highlighting via CSS
		code {
			font-family: inherit;
			font-size: inherit;
			color: inherit;

			// Python keywords highlighted via JS below isn't feasible purely,
			// but we style the whole block nicely
		}

		&::-webkit-scrollbar {
			height: 4px;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.15);
			border-radius: 2px;
		}
	}

	// ──────────────────────────────────────────────────────
	// EMPTY STATE
	// ──────────────────────────────────────────────────────
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: $space-4;
		padding: $space-16;
		color: var(--text-muted);
		text-align: center;

		.empty-icon {
			font-size: 3rem;
		}

		p {
			font-size: 1rem;
		}

		button {
			padding: $space-3 $space-6;
			background: var(--accent-blue);
			color: white;
			border: none;
			border-radius: $radius-pill;
			cursor: pointer;
			font-family: $font-body;
			font-size: 0.9rem;
			font-weight: 500;
			transition: opacity $transition-fast;
			&:hover {
				opacity: 0.85;
			}
		}
	}

	// ──────────────────────────────────────────────────────
	// FOOTER
	// ──────────────────────────────────────────────────────
	.footer {
		border-top: 1px solid var(--border);
		padding: $space-6 0;
		text-align: center;
		color: var(--text-muted);
		font-size: 0.82rem;

		.footer-sub {
			margin-top: $space-1;
			font-size: 0.75rem;
		}
	}
</style>
