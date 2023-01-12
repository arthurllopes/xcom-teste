import { createContext, ReactNode, useContext, useState } from "react";

type OrdersContextProviderProps = {
  children: ReactNode;
};

type OrdersContextType = {
  orderType: string;
  setOrderType: (cb: any) => void;
};


export const OrdersContext = createContext({} as OrdersContextType);

export const OrdersContextProvider = ({
  children,
}: OrdersContextProviderProps) => {
  const [orderType, setOrderType] = useState('all');

  return (
    <OrdersContext.Provider
      value={{
        orderType,
        setOrderType,
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