export interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface HeaderHamburguerProps {
  isOpen: boolean;
  onClick?: () => void;
}