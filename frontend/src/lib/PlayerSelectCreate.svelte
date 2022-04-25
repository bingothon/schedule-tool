<script lang="ts">
  import PlayerCreate from './PlayerCreate.svelte';
  import PlayerSelect from './PlayerSelect.svelte';
  import type { Player, PlayerWithSoloTeam } from './types';

  export let initialPlayer: PlayerWithSoloTeam | undefined = undefined;

  let player = initialPlayer ? { ...initialPlayer } : undefined;
  let isCreating = true;

  function onPlayerCreated(created: CustomEvent<PlayerWithSoloTeam>) {
    player = created.detail;
    isCreating = false;
  }
</script>

{#if isCreating}
  <PlayerCreate on:playerCreated={onPlayerCreated} />
{:else}
  <PlayerSelect bind:selectedPlayer={player} />
{/if}
