import { GameStatus } from "@/app/_types";

export   const statusOptions: { label: string; value: GameStatus }[] = [
    { label: 'Quero jogar', value: 'wishlist' },
    { label: 'Jogando', value: 'playing' },
    { label: 'Zerado', value: 'completed' },
    { label: 'Abandonado', value: 'dropped' }
  ];
