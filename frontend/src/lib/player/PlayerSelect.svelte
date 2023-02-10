<script lang="ts">
  import type { Player } from '../types';
  import Autocomplete from '@smui-extra/autocomplete';
  import { Text } from '@smui/list';
  import CircularProgress from '@smui/circular-progress';

  export let selectedPlayer: Player | undefined = undefined;
  export let allPlayers: Player[];

  function getOptionLabel(player?: Player): string {
    if (!player) return '';
    if (player.twitch) {
      return `${player.name} (${player.twitch})`;
    } else {
      return `${player.name}`;
    }
  }
</script>

<div>
  {#if allPlayers === undefined}
    <Text
      slot="loading"
      style="display: flex; width: 100%; justify-content: center; align-items: center;"
    >
      <CircularProgress style="height: 24px; width: 24px;" indeterminate />
    </Text>
  {:else}
    <Autocomplete
      label="Player search"
      options={allPlayers}
      {getOptionLabel}
      bind:value={selectedPlayer}
      showMenuWithNoInput={false}
    />
  {/if}
</div>
