// Define the type for a single sale result
type SaleResult = {
  year: number;
  month: number;
  total: number;
};

const saleResults: SaleResult[] = [
  { year: 2022, month: 1, total: 9765 },
  { year: 2022, month: 2, total: 6710 },
  { year: 2022, month: 3, total: 2207 },
  { year: 2022, month: 4, total: 10373 },
  { year: 2022, month: 5, total: 6651 },
  { year: 2022, month: 6, total: 9037 },
  { year: 2022, month: 7, total: 2641 },
  { year: 2022, month: 8, total: 6396 },
  { year: 2022, month: 9, total: 1350 },
  { year: 2022, month: 10, total: 1576 },
  { year: 2022, month: 11, total: 5700 },
  { year: 2022, month: 12, total: 1576 },
  { year: 2023, month: 1, total: 4839 },
  { year: 2023, month: 2, total: 10042 },
  { year: 2023, month: 3, total: 10762 },
  { year: 2023, month: 4, total: 4672 },
  { year: 2023, month: 5, total: 4137 },
  { year: 2023, month: 6, total: 10326 },
  { year: 2023, month: 7, total: 3220 },
  { year: 2023, month: 8, total: 9514 },
  { year: 2023, month: 9, total: 5681 },
  { year: 2023, month: 10, total: 7855 },
  { year: 2023, month: 11, total: 1656 },
  { year: 2023, month: 12, total: 6178 },
  { year: 2024, month: 1, total: 5656 },
  { year: 2024, month: 2, total: 5259 },
  { year: 2024, month: 3, total: 1571 },
  { year: 2024, month: 4, total: 8680 },
  { year: 2024, month: 5, total: 7010 },
  { year: 2024, month: 6, total: 1498 },
  { year: 2024, month: 7, total: 9363 },
  { year: 2024, month: 8, total: 9104 },
  { year: 2024, month: 9, total: 10020 },
  { year: 2024, month: 10, total: 2695 },
  { year: 2024, month: 11, total: 1054 },
  { year: 2024, month: 12, total: 4732 }
]

const calculateAverageSales = (
  results: SaleResult[],
  options?: { startDate?: { year: number; month: number }; endDate?: { year: number; month: number } }
): number => {
  let filteredResults = results;

  if (options) {
    const { startDate, endDate } = options;

    if (startDate) {
      filteredResults = filteredResults.filter(result =>
        result.year > startDate.year ||
        (result.year === startDate.year && result.month >= startDate.month)
      );
    }

    if (endDate) {
      filteredResults = filteredResults.filter(result =>
        result.year < endDate.year ||
        (result.year === endDate.year && result.month <= endDate.month)
      );
    }
  }

  if (filteredResults.length === 0) {
    return 0; // Return 0 if no results match the criteria
  }

  const totalSales = filteredResults.reduce((sum, result) => sum + result.total, 0);
  return totalSales / filteredResults.length;
};

// Example usage
console.log("Average sales (entire period):", calculateAverageSales(saleResults));
console.log("Average sales (March 2023 to June 2024):",
  calculateAverageSales(saleResults, {
    startDate: { year: 2023, month: 3 },
    endDate: { year: 2024, month: 6 }
  })
);
