import { useQuery } from "@tanstack/react-query";

const fetchBets = async () => {
  const response = await fetch("https://nesine-case-study.onrender.com/bets");
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const useFetchBets = () => {
  const {
    data: bets = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["bets"],
    queryFn: fetchBets,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  return { bets, loading, error };
};

export default useFetchBets;
