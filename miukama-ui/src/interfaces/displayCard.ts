export interface CardData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  imagePath?: string | null;
  userImagePath?: string;
  userId?: number;
}

export interface DisplayCardProps {
  data: CardData[];
  // eslint-disable-next-line no-unused-vars
  handelEditCard?: (id: number) => void;
}
