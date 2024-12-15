import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  calculateStrategy1,
  Strategy1Result,
} from "../utils/calculateStrategy1"; // Import the utility function

const Strategy1: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(40);
  const [dividendRate, setDividendRate] = useState<number>(5);
  const [includeOtherInvestment, setIncludeOtherInvestment] =
    useState<boolean>(true);
  const [otherInvestmentRate, setOtherInvestmentRate] = useState<number | null>(
    null
  );
  const [asbFinalCapital, setAsbFinalCapital] = useState<number | null>(null);
  const [otherInvestmentFinalCapital, setOtherInvestmentFinalCapital] =
    useState<number | null>(null);
  const [endAmount, setEndAmount] = useState<number | null>(null);

  // Save data to localStorage whenever the state changes, including endAmount
  const saveToLocalStorage = (
    endAmount: number | null,
    asbFinalCapital: number | null,
    otherInvestmentFinalCapital: number | null
  ) => {
    const data = {
      loanAmount,
      interestRate,
      loanTerm,
      dividendRate,
      includeOtherInvestment,
      otherInvestmentRate,
      asbFinalCapital,
      otherInvestmentFinalCapital,
      endAmount,
    };
    localStorage.setItem("strategy1Data", JSON.stringify(data));
  };

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("strategy1Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLoanAmount(parsedData.loanAmount || 200000);
      setInterestRate(parsedData.interestRate || 5);
      setLoanTerm(parsedData.loanTerm || 40);
      setDividendRate(parsedData.dividendRate || 5);
      setIncludeOtherInvestment(parsedData.includeOtherInvestment || true);
      setOtherInvestmentRate(parsedData.otherInvestmentRate || null);
      setAsbFinalCapital(parsedData.asbFinalCapital || null);
      setOtherInvestmentFinalCapital(
        parsedData.otherInvestmentFinalCapital || null
      );
      setEndAmount(parsedData.endAmount || null);
    }
  }, []);

  // Calculate Strategy 1
  const handleCalculate = () => {
    const {
      finalAsbCapital,
      finalOtherInvestmentCapital,
      finalEndAmount,
    }: Strategy1Result = calculateStrategy1(
      loanAmount,
      loanTerm,
      interestRate,
      dividendRate,
      includeOtherInvestment,
      otherInvestmentRate || 0
    );

    // Update states with the results of the calculation
    setAsbFinalCapital(finalAsbCapital);
    setOtherInvestmentFinalCapital(finalOtherInvestmentCapital);
    setEndAmount(finalEndAmount);
    saveToLocalStorage(
      finalEndAmount,
      finalAsbCapital,
      finalOtherInvestmentCapital
    );
  };

  const validateInput = (value: string): number => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
  };
  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Text fontSize="xl" mb={4}>
        ASB Financing - Strategy 1: Rolling Dividends to Pay the Financing
      </Text>
      <Text fontSize="lg" mb={6}>
        In this strategy, you take a loan and use the dividends from your ASB
        investment (typically 5-6% annually) to help cover the loan payments
        starting from the second year. Here’s how it works:
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Year 1:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - You pay the loan repayment fully using your own money.
      </Text>
      <Text fontSize="md" mb={4}>
        - This ensures your ASB capital remains intact to start generating
        dividends.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Year 2 and Beyond:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Dividends as Primary Payment:</strong> The dividends from your
        ASB investment are used to pay off the annual loan repayment.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>If Dividends {">"} Loan Repayment:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - Any excess dividends after covering the loan repayment are invested in
        other instruments with a 5-6% annual return.
      </Text>
      <Text fontSize="md" mb={4}>
        - Additionally, the money you would have used to pay the loan (starting
        Year 2) is also invested in these other instruments.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>If Dividends {"<"} Loan Repayment:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - You use the money you would have used for the loan to top up the
        shortfall.
      </Text>
      <Text fontSize="md" mb={4}>
        - After covering the loan, any remaining amount from this fund is then
        invested in other instruments.
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
          onChange={(e) => setInterestRate(validateInput(e.target.value) || 0)}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Dividend Rate */}
        <Text fontSize="lg">Dividend Rate (%)</Text>
        <input
          type="text"
          placeholder="Enter dividend rate"
          value={dividendRate}
          onChange={(e) => setDividendRate(validateInput(e.target.value) || 0)}
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

        {/* Include Additional Investment Options */}
        <Checkbox
          checked={includeOtherInvestment}
          onCheckedChange={(e) => setIncludeOtherInvestment(e.checked === true)}
        >
          Include Additional Investment Options
        </Checkbox>

        {/* Additional Fields for Other Investment */}
        {includeOtherInvestment && (
          <>
            <Text fontSize="lg">Other Investment Rate (%)</Text>
            <input
              type="text"
              placeholder="Enter additional investment rate"
              value={otherInvestmentRate || ""}
              onChange={(e) =>
                setOtherInvestmentRate(validateInput(e.target.value) || 0)
              }
              className="p-2 border border-gray-300 rounded bg-blue-100"
            />
          </>
        )}

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

            <Text fontSize="md" color="gray.500">
              ASB Final Capital: MYR{" "}
              {asbFinalCapital?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Text fontSize="md" color="gray.500">
              Other Investment Final Capital: MYR{" "}
              {otherInvestmentFinalCapital?.toLocaleString("en-US", {
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

export default Strategy1;
