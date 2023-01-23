import { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

type OrdersContextProviderProps = {
  children: ReactNode;
};
export type ProductType = {
  id: number,
  name:  string,
  code: string,
  sales: number,
  price: number,
  stock: number,
  description: string,
}

type OrdersContextType = {
  orderType: string;
  setOrderType: (cb: string) => void;
  isModalOpen: boolean,
  setIsModalOpen: (cb: boolean) => void;
  productsData: ProductType[] | null,
  setProductsData: (cb: ProductType[] | null) => void;
};

export const OrdersContext = createContext({} as OrdersContextType);

export const OrdersContextProvider = ({
  children,
}: OrdersContextProviderProps) => {
  const [orderType, setOrderType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productsData, setProductsData] = useState<ProductType[] | null>(null)

 
  return (
    <OrdersContext.Provider
      value={{
        orderType,
        setOrderType,
        isModalOpen,
        setIsModalOpen,
        productsData,
        setProductsData,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
//para não precisa fazer duas importaçoes onde for usar o contexto
//funciona como um hook
export const useOrders = () => {
  const context = useContext(OrdersContext);
  return context;
};