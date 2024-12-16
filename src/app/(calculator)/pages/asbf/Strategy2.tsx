import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import {
  calculateStrategy2,
  Strategy2Result,
} from "../../utils/asbf/calculateStrategy2"; // Import the utility function

const Strategy2: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(40);
  const [dividendRate, setDividendRate] = useState<number>(5);
  const [remainingLoan, setRemainingLoan] = useState<number | null>(null);
  const [totalLoanPaid, setTotalLoanPaid] = useState<number | null>(null);
  const [asbCapital, setAsbCapital] = useState<number | null>(null);
  const [netProfit, setNetProfit] = useState<number | null>(null);

  // Save data to localStorage whenever the state changes
  const saveToLocalStorage = (
    remainingLoan: number | null,
    totalLoanPaid: number | null,
    asbCapital: number | null,
    netProfit: number | null
  ) => {
    const data = {
      loanAmount,
      interestRate,
      loanTerm,
      dividendRate,
      remainingLoan,
      totalLoanPaid,
      asbCapital,
      netProfit,
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
      setRemainingLoan(parsedData.remainingLoan || null);
      setTotalLoanPaid(parsedData.totalLoanPaid || null);
      setAsbCapital(parsedData.asbCapital || null);
      setNetProfit(parsedData.netProfit || null);
    }
  }, []);

  // Calculate Strategy 2
  const handleCalculate = () => {
    const { remainingLoan, totalLoanPaid, asbCapital }: Strategy2Result =
      calculateStrategy2(loanAmount, loanTerm, interestRate, dividendRate);

    // Ensure precision for net profit calculation
    const calculatedNetProfit = parseFloat(
      (asbCapital - totalLoanPaid).toFixed(2)
    );

    setRemainingLoan(remainingLoan);
    setTotalLoanPaid(totalLoanPaid);
    setAsbCapital(asbCapital);
    setNetProfit(calculatedNetProfit);

    saveToLocalStorage(
      remainingLoan,
      totalLoanPaid,
      asbCapital,
      calculatedNetProfit
    );
  };

  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Text fontSize="xl" mb={4}>
        ASB Financing - Strategy 2: Compound Interest
      </Text>
      <Text fontSize="lg" mb={6}>
        This strategy focuses on leveraging the power of compound interest by
        reinvesting the annual dividends from your ASB investment without
        withdrawing them. The aim is to grow your ASB capital significantly over
        the loan term while meeting your loan obligations.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>1. Loan Repayment and Dividends:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - You take a loan and begin repaying it through monthly installments,
        calculated based on an amortization schedule.
      </Text>
      <Text fontSize="md" mb={4}>
        - Simultaneously, the ASB investment generates dividends (typically 5-6%
        annually), which are left to compound within the ASB account.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>2. Compound Growth:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - Each year, the dividends generated from the ASB investment are
        reinvested back into the account.
      </Text>
      <Text fontSize="md" mb={4}>
        - The compounded dividends lead to exponential growth in your ASB
        capital over the loan term.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>3. Loan Obligation:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - The monthly loan repayments are paid from your personal funds, as the
        dividends remain untouched for reinvestment.
      </Text>
      <Text fontSize="md" mb={4}>
        - The loan balance gradually decreases as you make regular repayments,
        eventually reaching zero by the end of the loan term.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>4. Net Profit Calculation:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - <strong>Final ASB Capital:</strong> This represents the total value of
        your ASB investment after the loan term, which includes the compounded
        dividends.
      </Text>
      <Text fontSize="md" mb={4}>
        - <strong>Total Loan Paid:</strong> This includes the total principal
        and interest paid over the loan term.
      </Text>
      <Text fontSize="md" mb={4}>
        - <strong>Net Profit:</strong> This is calculated as the final ASB
        capital minus the total loan paid, representing your overall financial
        gain from this strategy.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>5. Goal of the Strategy:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - The strategy aims to maximize the benefits of compounded returns while
        systematically paying off the loan. By the end of the term, the total
        ASB capital is expected to exceed the total loan paid, resulting in a
        significant net profit.
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
        {asbCapital !== null && (
          <Box mt={4}>
            <Text fontSize="lg">
              Final Capital After {loanTerm} Years: MYR{" "}
              {asbCapital.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Text fontSize="md" color="gray.500">
              Final Loan Balance: MYR{" "}
              {remainingLoan
                ? remainingLoan.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : 0}
            </Text>

            <Text fontSize="md" color="gray.500">
              Total Loan Paid: MYR{" "}
              {totalLoanPaid?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Text fontSize="md" color="green.500" fontWeight="bold">
              Net Profit: MYR{" "}
              {netProfit?.toLocaleString("en-US", {
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
