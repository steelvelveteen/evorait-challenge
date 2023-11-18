export interface Material {
  Material: string;
  Quantity: string;
  DescTxt: string;
  CustomerPrice: string;
  CustomerCurrency: string;
  RepairPrice: string;
  RepairCurrency: string;
  Available: string;
  MatStatus: string;
  StorageLoc: string;
  StorageLocDesc: string;
  NDFQuote: string;
  NDFCounter: string;
  TSPercentage: string;
  TSPercentageCounter: string;
}
export interface MaterialPricingSet {
  FrontId: string;
  NotificationNo: string;
  PartSet: {
    results: Material[];
  };
}

export interface DataSet {
  d: MaterialPricingSet;
}
