import { GameListPlataform, GameListGenre, GameDeveloper } from "./GameList.types";

export const platformOptions: { label: string; value: GameListPlataform }[] = [
  { label: 'PS5', value: 'playstation5' },
  { label: 'PS4', value: 'playstation4' },
  { label: 'PS3', value: 'playstation3' },
  { label: 'Xbox S/X', value: 'xbox-series-x' },
  { label: 'Xbox One', value: 'xbox-one' },
  { label: 'Xbox 360', value: 'xbox360' },
  { label: 'Switch', value: 'nintendo-switch' },
  { label: 'Nintendo 3DS', value: 'nintendo-3ds' },
  { label: 'Nintendo Wii U', value: 'wii-u' },
  { label: 'Nintendinho', value: 'nes' },
  { label: 'PC', value: 'pc' },
  { label: 'PC Linux', value: 'linux' },
  { label: 'Mac OS', value: 'macos' },
  { label: 'Sistema Web', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'PSVita', value: 'ps-vita' }
];

export const genreOptions: { label: string, value: GameListGenre }[] = [
  { label: 'Ação', value: 'action' },
  { label: 'Indie', value: 'indie' },
  { label: 'Aventura', value: 'adventure' },
  { label: 'RPG', value: 'rpg' },
  { label: 'Estratégia', value: 'strategy' },
  { label: 'FPS', value: 'shooter' },
  { label: 'Casual', value: 'casual' },
  { label: 'Simulção', value: 'simulation' },
  { label: 'Puzzles', value: 'puzzle' },
  { label: 'Arcade', value: 'arcade' },
  { label: 'Plataforma', value: 'platformer' },
  { label: 'Corrida', value: 'racing' },
  { label: 'Esportes', value: 'sports' },
  { label: 'Luta', value: 'fighting' }
];

export const developerOptions: { label: string; value: GameDeveloper }[] = [
  { label: 'Naughty Dog', value: 'naughty-dog' },
  { label: 'CD Projekt Red', value: 'cd-projekt-red' },
  { label: 'Rockstar Games', value: 'rockstar-games' },
  { label: 'Ubisoft', value: 'ubisoft' },
  { label: 'Electronic Arts', value: 'electronic-arts' },
  { label: 'FromSoftware', value: 'fromsoftware' },
  { label: 'Capcom', value: 'capcom' },
  { label: 'Square Enix', value: 'square-enix' },
  { label: 'Bethesda', value: 'bethesda' },
  { label: 'Blizzard', value: 'blizzard-entertainment' }
];