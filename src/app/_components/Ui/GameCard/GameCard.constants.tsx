import { PcCase } from "lucide-react";

export const plataformsMap: Record<string, { name: string, icon: React.ReactNode }> = {
  "playstation5": { name: 'PS5', icon: <PcCase size={12} /> },
  "playstation4": { name: 'PS4', icon: <PcCase size={12} /> },
  "playstation3": { name: 'PS3', icon: <PcCase size={12} /> },
  "ps-vita": { name: 'PSVita', icon: <PcCase size={12} /> },
  "xbox-series-x": { name: 'Xbox S/X', icon: <PcCase size={12} /> },
  "xbox-one": { name: 'Xbox One', icon: <PcCase size={12} /> },
  "xbox360": { name: 'Xbox 360', icon: <PcCase size={12} /> },
  "nintendo-switch": { name: 'Switch', icon: <PcCase size={12} /> },
  "nintendo-3ds": { name: 'Nitendo 3DS', icon: <PcCase size={12} /> },
  "wii-u": { name: 'Nitendo Wii U', icon: <PcCase size={12} /> },
  "nes": { name: 'Nintendinho', icon: <PcCase size={12} /> },
  "pc": { name: 'PC', icon: <PcCase size={12} /> },
  "linux": { name: 'PC linux', icon: <PcCase size={12} /> },
  "macos": { name: 'Mac OS', icon: <PcCase size={12} /> },
  "web": { name: 'Sistema web', icon: <PcCase size={12} /> },
  "android": { name: 'Android', icon: <PcCase size={12} /> },
  "ios": { name: 'IOS', icon: <PcCase size={12} /> },
}
