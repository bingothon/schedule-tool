<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import TextField from '@smui/textfield';
  import Button from '@smui/button';
  import type { Player, PlayerWithSoloTeam } from './types';
  import { createEventDispatcher } from 'svelte';
  import { addPlayer } from './mockApi/mockApi';

  export let initPlayer: Partial<Player> = {};

  const eventEmitter = createEventDispatcher<{ playerCreated: PlayerWithSoloTeam }>();

  let player: Player = {
    id: -1,
    name: '',
    discord: '',
    country: '',
    pronouns: '',
    twitch: '',
    ...initPlayer
  };

  let doingApiCall = false;

  async function doCreate() {
    doingApiCall = true;
    try {
      const playerRet = await addPlayer(player);
      eventEmitter('playerCreated', playerRet);
    } finally {
      doingApiCall = false;
    }
  }
</script>

<LayoutGrid>
  <Cell span={12}>
    <TextField bind:value={player.name} label="Name" />
  </Cell>
  <Cell span={12}>
    <TextField bind:value={player.twitch} label="Twitch" />
  </Cell>
  <Cell span={12}>
    <TextField bind:value={player.discord} label="Discord" />
  </Cell>
  <Cell span={12}>
    <TextField bind:value={player.pronouns} label="Pronouns" />
  </Cell>
  <Cell span={12}>
    <TextField bind:value={player.country} label="Country" />
  </Cell>
  <Cell span={12}>
    <Button disabled={doingApiCall} on:click={() => doCreate()}>Create</Button>
  </Cell>
</LayoutGrid>
