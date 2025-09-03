export type Company = {
  id: string;
  name?: string;
  subName?: string;
  phone?: string;
  email?: string;
  subdomain: string;
  logo?: Logo;
};

export type Logo = {
  id: string;
  companyId: string;
  name: string;
  size: number;
  type: string;
  key: string;
  url: string;
  createdAt?: Date;
};
