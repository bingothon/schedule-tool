export interface Player {
  id: number;
  name: string;
  twitch: string | null;
  pronouns: string | null;
  country: string | null;
  discord: string | null;
}

export type CreatePlayer = Omit<Player, 'id'>;

export interface PlayerWithSoloTeam extends Player {
  soloTeamId: number;
}

export interface Team {
  id: number;
  name?: string; // is only null when this is a single player team
  players: Player[]; // order matters
}

export interface DbTeam extends Omit<Team, 'players'> {
  players: number[]; // order matters
}

export interface Event {
  id: number;
  state: 'upcoming' | 'active' | 'archived';
  name: string;
  game: string;
  gameTwitch?: string;
  aspectRatio?: string;
  defaultMatchDuration: number; // in minutes, not sure what the best datatype is
  channels: string[];
  teams: Team[]; // order matters
}

export interface DbEvent extends Omit<Event, 'teams'> {
  teams: number[];
}

export interface Match {
  id: number;
  game?: string; // if there is no override, use the game from the event
  gameTwitch?: string;
  aspectRatio?: string;
  start: string;
  end: string;
  restreamer?: string;
  channel: string;
  teams: Team[]; // order matters
}
