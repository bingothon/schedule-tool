<script lang="ts">
  import TextField from '@smui/textfield';
  import Button from '@smui/button';
  import Dialog, { Title, Content } from '@smui/dialog';
  import type { Player, PlayerWithSoloTeam } from '../types';
  import { createEventDispatcher } from 'svelte';
  import { addPlayer } from '../mockApi/mockApi';
  import CircularProgress from '@smui/circular-progress';

  export let initPlayer: Partial<Player> = {};
  export let open = false;

  const playerCreatedEmitter = createEventDispatcher<{ playerCreated: PlayerWithSoloTeam }>();

  let player: Player = {
    id: -1,
    name: '',
    discord: null,
    country: null,
    pronouns: null,
    twitch: null,
    ...initPlayer
  };

  let doingApiCall = false;

  async function doCreate() {
    doingApiCall = true;
    try {
      const playerRet = await addPlayer(player);
      playerCreatedEmitter('playerCreated', playerRet);
      open = false;
    } finally {
      doingApiCall = false;
    }
  }
</script>

<Dialog bind:open>
  <Title>Create a new Player</Title>
  <Content>
    <TextField required={true} bind:value={player.name} label="Name" />
    <TextField bind:value={player.twitch} label="Twitch" />
    <TextField bind:value={player.discord} label="Discord" />
    <TextField bind:value={player.pronouns} label="Pronouns" />
    <TextField bind:value={player.country} label="Country" />
  </Content>
  <Button disabled={doingApiCall || !player.name || !open} on:click={() => doCreate()}>
    {#if doingApiCall || !open}
      <CircularProgress style="height: 24px; width: 24px;" indeterminate />
    {:else}
      Create
    {/if}
  </Button>
</Dialog>
