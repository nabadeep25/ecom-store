import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Item, DiscountCode } from "../types";
import {
  fetchDashboardStats,
  fetchDiscountCodes,
} from "../services/adminService";
type ItemCount = {
  count: number;
  item: Item;
};
type Stats = {
  totalPurchaseAmount: number;
  totalDiscountAmount: number;
  discountCodes: DiscountCode[];
  itemCountList: ItemCount[];
};
type AdminContextType = {
  discountCodes: DiscountCode[];
  stats: Stats;
  isLoading: boolean;
  refetch: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);
/**
 * custom hook for using AdminContext value
 *
 */
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a AdminProvider");
  }
  return context;
};

type AdminProviderProps = {
  children: ReactNode;
};

export const AdminProvider = ({ children }: AdminProviderProps) => {
  // state for storing discount codes and stats
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalPurchaseAmount: 0,
    totalDiscountAmount: 0,
    discountCodes: [],
    itemCountList: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(1);
  // for triggering refetch for stats
  const refetch = () => {
    setFetchCount((prev) => prev + 1);
  };
  useEffect(() => {
    fetchDiscountCodes()
      .then((data) => {
        setDiscountCodes(data.discountCodes);
        setIsLoading(false);
      })
      .catch((_error) => {
        setIsLoading(false);
      });

    fetchDashboardStats()
      .then((data) => {
        setStats(data.stats);
        setIsLoading(false);
      })
      .catch((_error) => {
        setIsLoading(false);
      });
  }, [fetchCount]);

  return (
    <AdminContext.Provider value={{ discountCodes, isLoading, stats, refetch }}>
      {children}
    </AdminContext.Provider>
  );
};
