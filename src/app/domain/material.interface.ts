export interface MaterialModel {
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
    results: MaterialModel[];
  };
}

export interface DataSet {
  d: MaterialPricingSet;
}
