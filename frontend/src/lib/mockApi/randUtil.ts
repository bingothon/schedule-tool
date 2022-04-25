import type { Player } from '../types';

export const getRandomString = (chars: number): string =>
  String.fromCharCode(...new Array(chars).fill(0).map(() => getRandomNumber(97, 123)));

export const getRandomNumber = (from: number, to: number): number =>
  from + Math.floor(Math.random() * (to - from));

export const getRandomPlayer = (): Player => {
  return {
    id: Math.floor(Math.random() * 10000),
    name: getRandomString(8),
    twitch: getRandomString(10)
  };
};
