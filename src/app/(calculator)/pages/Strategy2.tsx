import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import {
  calculateStrategy2,
  Strategy2Result,
} from "../utils/calculateStrategy2"; // Import the utility function

const Strategy2: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(40);
  const [dividendRate, setDividendRate] = useState<number>(5);
  const [endAmount, setEndAmount] = useState<number | null>(null);

  // Save data to localStorage whenever the state changes
  const saveToLocalStorage = (endAmount: number | null) => {
    const data = {
      loanAmount,
      interestRate,
      loanTerm,
      dividendRate,
      endAmount,
    };
    localStorage.setItem("strategy2Data", JSON.stringify(data));
  };

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("strategy2Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLoanAmount(parsedData.loanAmount || 200000);
      setInterestRate(parsedData.interestRate || 5);
      setLoanTerm(parsedData.loanTerm || 40);
      setDividendRate(parsedData.dividendRate || 5);
      setEndAmount(parsedData.endAmount || null);
    }
  }, []);

  // Calculate Strategy 2
  const handleCalculate = () => {
    const { finalEndAmount }: Strategy2Result = calculateStrategy2(
      loanAmount,
      loanTerm,
      dividendRate
    );

    setEndAmount(finalEndAmount);
    saveToLocalStorage(finalEndAmount);
  };

  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Text fontSize="xl" mb={4}>
        ASB Financing - Strategy 2: Compound Interest
      </Text>
      <Text fontSize="lg" mb={6}>
        In this strategy, you reinvest the dividends each year without
        withdrawing them. Over time, the compounded dividends grow the capital,
        potentially resulting in higher returns.
      </Text>

      {/* Loan Calculation Form */}
      <Stack mt={6}>
        {/* Loan Amount */}
        <Text fontSize="lg">Loan Amount (MYR)</Text>
        <input
          type="text"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Interest Rate */}
        <Text fontSize="lg">Interest Rate (%)</Text>
        <input
          type="text"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Dividend Rate */}
        <Text fontSize="lg">Dividend Rate (%)</Text>
        <input
          type="text"
          placeholder="Enter dividend rate"
          value={dividendRate}
          onChange={(e) => setDividendRate(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Loan Term */}
        <Text fontSize="lg">Loan Term (Years)</Text>
        <input
          type="text"
          placeholder="Enter loan term"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Calculate Button */}
        <Button
          colorScheme="blue"
          onClick={handleCalculate}
          mt={4}
          className="bg-blue-600"
        >
          Calculate
        </Button>

        {/* Results */}
        {endAmount !== null && (
          <Box mt={4}>
            <Text fontSize="lg">
              Final Capital After {loanTerm} Years: MYR{" "}
              {endAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Strategy2;
