<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import PlayerCreate from '$lib/PlayerCreate.svelte';
  import PlayerSelect from '$lib/PlayerSelect.svelte';
  import PlayerSelectCreate from '$lib/PlayerSelectCreate.svelte';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>Hi</h1>

  <h2>Content</h2>

  <PlayerSelectCreate />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
