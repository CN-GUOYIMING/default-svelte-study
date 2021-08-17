export interface Food {
  code: string
  name: string
  flag: string
}

export type FoodCode = string

export interface IdRange {
  begin?: FoodCode
  end?: FoodCode
}

export interface FilterOptions {
  formalCodeRange?: IdRange
  formalTargetFlag?: string
}
