// types.ts
export interface RealEstate {
  id: number;
  constructionYear: number;
  countFloor: number;
  title: string;
  additionalInformation: string;
  isHasElevator: boolean;
  isHasParking: boolean;
  isHasPool: boolean;
  isHasStoreRoom: boolean;
  regionName: string;
  parentName: string | null;
  address: string | null;
  imageCount: number;
}

export interface ApiResponse {
  data: {
    items: RealEstate[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isEmpty: boolean;
  };
  status: number;
}

export interface Filters {
  constructionYears: number[];
  amenities: string[];
  floorCounts: number[];
  regions: string[];
}

export interface FilterOptions {
  constructionYears: number[];
  amenities: string[];
  floorCounts: number[];
  regions: string[];
}

export interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}