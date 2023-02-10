<script lang="ts">
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import PlayerSelect from './PlayerSelect.svelte';
  import type { Player } from '$lib/types';
  import { getPlayers } from '$lib/mockApi/mockApi';
  import { onMount } from 'svelte';

  let allPlayers: Player[] | undefined;

  function doGetPlayers() {
    getPlayers().then((plrs) => (allPlayers = plrs));
  }

  onMount(() => doGetPlayers());

  interface Team {
    name: string | undefined;
    players: (Player | undefined)[];
  }

  let match: Team[] = [
    { name: 'Cool Team', players: [undefined] },
    { name: undefined, players: [undefined, undefined] }
  ];

  function addPlayer(team: Team) {
    team.players = [...team.players, undefined];
    match = match;
  }
  function removePlayer(team: Team, playerIdx: number) {
    team.players = team.players.filter((_, i) => i !== playerIdx);
    match = match;
  }
  function addTeam() {
    match = [...match, { name: undefined, players: [undefined] }];
  }
  function removeTeam(team: Team) {
    match = match.filter((t) => t != team);
  }
</script>

<h1>Match</h1>
{#each match as team}
  <div class={`team-container ${team.name === undefined ? 'no-name' : 'with-name'}`}>
    <div>
      {#if team.name === undefined}
        <Button on:click={() => (team.name = '')}>Add Teamname</Button>
      {:else}
        <Textfield type="text" bind:value={team.name} label="Teamname" style="min-width: 200px;" />
        <Button on:click={() => (team.name = undefined)}>Remove<br />teamname</Button>
      {/if}
    </div>
    <div>
      {#each team.players as player, i}
        <div class="player-container">
          <PlayerSelect bind:selectedPlayer={player} allPlayers={allPlayers || []} />
          <Button on:click={() => removePlayer(team, i)}>Remove</Button>
        </div>
      {/each}
    </div>
    <div>
      <Button on:click={() => addPlayer(team)}>Add Player</Button>
      <Button on:click={() => removeTeam(team)}>Remove Team</Button>
    </div>
  </div>
{/each}
<Button on:click={() => addTeam()}>Add Team</Button>

<style>
  .team-container,
  .player-container {
    border: 1px black solid;
    padding: 10px;
  }

  .player-container {
    min-width: 330px;
  }

  .team-container {
    min-width: 300px;
  }
</style>
