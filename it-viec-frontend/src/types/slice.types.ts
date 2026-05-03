export interface UserState {
  ok: boolean;
  id: number | null;
  userType: 'none' | 'jobSeeker' | 'employer';
}

export interface SeekerState {
  id: number;
  userId: number;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  skills: any[];
  dateOfBirth: string;
  gender: string;
  city: string;
  address: string;
  personalLink: string;
  gmail: string;
  coverLetter: string;
  desiredLocations: any[];
  isLoaded: boolean;
}

export interface CompanyState {
  id: number;
  userId: number;
  companyName: string;
  description: string;
  website: string;
  logoUrl: string;
  address: string;
  companyModel: string;
  industry: string;
  companySize: string;
  country: string;
  workingHours: string;
  overtimePolicy: string;
  openPositions: number;
  rating: number;
  reviewCount: number;
  recommendationRate: number;
  postCount: number;
  createdAt: string;
  skills:  any[];
  companyIntroduction: string;
  ourExpertise: string;
  whyWorkHere: string;
  jobs: any[];
  isLoaded: boolean;
}

export interface UserActions {
  setLogin: (data: Pick<UserState, 'id' | 'ok' | 'userType'>) => void;
  logout: () => void;
}

export interface SeekerActions {
  setSeekerFullInfo: (data: Partial<SeekerState>) => void;
  updateSeekerField: <K extends keyof SeekerState>(field: K, value: SeekerState[K]) => void;
  clearSeekerInfo: () => void;
}

export interface CompanyActions {
  setCompanyFullInfo: (data: Partial<CompanyState>) => void;
  updateCompanyField: <K extends keyof CompanyState>(field: K, value: CompanyState[K]) => void;
  clearCompanyInfo: () => void;
}