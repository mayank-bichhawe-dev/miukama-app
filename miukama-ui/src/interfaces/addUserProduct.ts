import { Dayjs } from 'dayjs';
export interface addUserProduct {
  categoryId: number;
  subCategoryId: number;
  itemName: string;
  description: string;
  itemManufacturer: string;
  condition: string;
  yearOfOrigin: Dayjs | null;
  priceOfPurchase: string;
  priceOfCurrent: string;
  priceOfOrigin: string;
  itemProductionNumber: string;
  owner: string;
  color: string;
  itemModel: string;
  givenBy: string;
  loanedBy: string;
  visibility: boolean;
  imagePath: string | null;
}
