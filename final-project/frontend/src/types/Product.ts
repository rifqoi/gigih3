export type Product = {
  id: number;
  title: string;
  url: string;
  price: string;
};

export type GetProductsAPI = {
  msg: string;
  data: Product[];
};
