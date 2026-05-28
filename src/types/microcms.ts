export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
