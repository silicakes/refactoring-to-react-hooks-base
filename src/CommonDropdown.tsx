import React, { useEffect, useMemo, useState } from "react";

enum DROPDOWN_OPTIONS {
  SALES = "sales",
  SUBSCRIPTIONS = "subscriptions",
}

interface DataChunk {
  timestamp: string;
  amount: number;
}
const CommonDropdown = () => {
  const [sales, setSales] = useState<DataChunk[]>([]);
  const [subscriptions, setSubscriptions] = useState<DataChunk[]>([]);
  const [currentOption, setCurrentOption] = useState<DROPDOWN_OPTIONS>(DROPDOWN_OPTIONS.SALES);
  useEffect(() => {
    fetch("/api/sales")
      .then((r) => r.json())
      .then(setSales);
    fetch("/api/subscriptions")
      .then((r) => r.json())
      .then(setSubscriptions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOption(e.target.value as DROPDOWN_OPTIONS);
  };

  const selectedData = useMemo(() => {
    const { SALES, SUBSCRIPTIONS } = DROPDOWN_OPTIONS;
    const optionMap: Record<DROPDOWN_OPTIONS, DataChunk[]> = {
      [SALES]: sales,
      [SUBSCRIPTIONS]: subscriptions,
    };

    return optionMap[currentOption].slice(0, 5);
  }, [currentOption, sales, subscriptions]);

  const { SALES, SUBSCRIPTIONS } = DROPDOWN_OPTIONS;
  return (
    <>
      <select onChange={handleChange}>
        <option value={SALES}>sales</option>
        <option value={SUBSCRIPTIONS}>subscriptions</option>
      </select>
      <ul>
        {selectedData.map((opt) => (
          <li>
            {opt.timestamp} {opt.amount}
          </li>
        ))}
      </ul>
    </>
  );
};
export default CommonDropdown;
