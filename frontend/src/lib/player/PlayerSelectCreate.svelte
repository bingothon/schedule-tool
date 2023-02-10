<script lang="ts">
  import PlayerSelect from './PlayerSelect.svelte';
  import type { Player, PlayerWithSoloTeam } from '../types';
  import Button from '@smui/button/src/Button.svelte';
  import PlayerCreateDialog from './PlayerCreateDialog.svelte';
  import { getPlayers } from '$lib/mockApi/mockApi';
  import { onMount } from 'svelte';
  import { Text } from '@smui/list';
  import CircularProgress from '@smui/circular-progress';

  export let initialPlayer: PlayerWithSoloTeam | undefined = undefined;
  let allPlayers: Player[] | undefined;

  function doGetPlayers() {
    getPlayers().then((plrs) => (allPlayers = plrs));
  }

  onMount(() => doGetPlayers());

  let player = initialPlayer ? { ...initialPlayer } : undefined;
  let createDialogOpen = false;

  function onPlayerCreated(created: CustomEvent<PlayerWithSoloTeam>) {
    player = created.detail;
    doGetPlayers();
  }
</script>

{#if allPlayers}
  <PlayerSelect bind:selectedPlayer={player} {allPlayers} />
{:else}
  <Text
    slot="loading"
    style="display: flex; width: 100%; justify-content: center; align-items: center;"
  >
    <CircularProgress style="height: 24px; width: 24px;" indeterminate />
  </Text>
{/if}
<PlayerCreateDialog bind:open={createDialogOpen} on:playerCreated={onPlayerCreated} />
<Button on:click={() => (createDialogOpen = true)}>Create new Player</Button>
