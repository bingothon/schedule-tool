import { getRandomNumber, getRandomPlayer } from './randUtil';
import type { Player, CreatePlayer, Team, PlayerWithSoloTeam, DbTeam } from '../types';

let currentPlayerId = 0;
let players: Player[] = new Array(50).fill(0).map(() => {
  return { ...getRandomPlayer(), id: ++currentPlayerId };
});
let currentTeamId = 0;
let teams: DbTeam[] = players.map((p) => {
  return {
    id: ++currentTeamId,
    players: [p.id]
  };
});

function clonePlayer(p: Player): Player {
  return { ...p };
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
const randomSleep = () => sleep(getRandomNumber(100, 600));

function getSoloTeamIdForPlayerId(playerId: number): number {
  return teams.find((t) => t.players == [playerId])?.id ?? -123;
}

export async function getPlayer(id: number): Promise<PlayerWithSoloTeam | undefined> {
  await randomSleep();
  const player = players.find((p) => p.id === id);
  if (player) {
    return { ...player, soloTeamId: getSoloTeamIdForPlayerId(player.id) };
  } else {
    return undefined;
  }
}

export async function getPlayers(): Promise<PlayerWithSoloTeam[]> {
  await randomSleep();
  return players.map((p) => {
    return { ...p, soloTeamId: getSoloTeamIdForPlayerId(p.id) };
  });
}

export async function addPlayer(player: CreatePlayer): Promise<PlayerWithSoloTeam> {
  await randomSleep();
  const savedPlayer = { ...player, id: currentPlayerId };
  players.push(savedPlayer);
  const newSoloTeam = { id: ++currentTeamId, players: [savedPlayer.id] };
  teams.push(newSoloTeam);
  return { ...savedPlayer, soloTeamId: newSoloTeam.id };
}
