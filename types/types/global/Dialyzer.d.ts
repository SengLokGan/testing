import { SterilantVe, DialyzerUseType } from '@enums';
export interface Dialyzer {
  useType: DialyzerUseType;
  dialyzer: string;
  brand: string;
  surfaceArea: string;
  primedBy: string;
  reuseNumber: string;
  beforeSterilant: {
    test: SterilantVe;
    testedBy: string;
    comment: string;
  };
  afterSterilant: {
    test: SterilantVe;
    testedBy: string;
    comment: string;
  };
}
