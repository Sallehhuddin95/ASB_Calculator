import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  calculateStrategy1,
  Strategy1Result,
} from "../../utils/asbf/calculateStrategy1";

const Strategy1: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(40);
  const [dividendRate, setDividendRate] = useState<number>(5);
  const [includeOtherInvestment, setIncludeOtherInvestment] =
    useState<boolean>(true);
  const [otherInvestmentRate, setOtherInvestmentRate] = useState<number>(5);

  const [asbFinalCapital, setAsbFinalCapital] = useState<number | null>(null);
  const [otherInvestmentFinalCapital, setOtherInvestmentFinalCapital] =
    useState<number | null>(null);
  const [endAmount, setEndAmount] = useState<number | null>(null);
  const [totalLoanPaid, setTotalLoanPaid] = useState<number | null>(null);
  const [finalLoanBalance, setFinalLoanBalance] = useState<number | null>(null);
  const [netProfit, setNetProfit] = useState<number | null>(null);

  const saveToLocalStorage = (
    endAmount: number | null,
    asbFinalCapital: number | null,
    otherInvestmentFinalCapital: number | null,
    totalLoanPaid: number | null,
    finalLoanBalance: number | null,
    netProfit: number | null
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
      totalLoanPaid,
      finalLoanBalance,
      netProfit,
    };
    localStorage.setItem("strategy1Data", JSON.stringify(data));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("strategy1Data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setLoanAmount(parsedData.loanAmount || 200000);
      setInterestRate(parsedData.interestRate || 5);
      setLoanTerm(parsedData.loanTerm || 40);
      setDividendRate(parsedData.dividendRate || 5);
      setIncludeOtherInvestment(parsedData.includeOtherInvestment || true);
      setOtherInvestmentRate(parsedData.otherInvestmentRate || 5);
      setAsbFinalCapital(parsedData.asbFinalCapital || null);
      setOtherInvestmentFinalCapital(
        parsedData.otherInvestmentFinalCapital || null
      );
      setEndAmount(parsedData.endAmount || null);
      setTotalLoanPaid(parsedData.totalLoanPaid || null);
      setFinalLoanBalance(parsedData.finalLoanBalance || null);
      setNetProfit(parsedData.netProfit || null);
    }
  }, []);

  const handleCalculate = () => {
    const {
      finalAsbCapital,
      finalOtherInvestmentCapital,
      finalEndAmount,
      totalLoanPaid,
      finalLoanBalance,
      netProfit,
    }: Strategy1Result = calculateStrategy1(
      loanAmount,
      loanTerm,
      interestRate,
      dividendRate,
      includeOtherInvestment,
      otherInvestmentRate
    );

    setAsbFinalCapital(finalAsbCapital);
    setOtherInvestmentFinalCapital(finalOtherInvestmentCapital);
    setEndAmount(finalEndAmount);
    setTotalLoanPaid(totalLoanPaid);
    setFinalLoanBalance(finalLoanBalance);
    setNetProfit(netProfit);

    saveToLocalStorage(
      finalEndAmount,
      finalAsbCapital,
      finalOtherInvestmentCapital,
      totalLoanPaid,
      finalLoanBalance,
      netProfit
    );
  };

  const formatNumber = (value: number | null): string =>
    value !== null
      ? value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";

  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Text fontSize="xl" mb={4}>
        ASB Financing - Strategy 1: Rolling Dividends to Pay the Financing
      </Text>
      <Text fontSize="lg" mb={6}>
        In this strategy, you take a loan and use the dividends generated from
        your ASB investment (typically 5-6% annually) to help pay the loan
        starting from the second year. Here is how it works:
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Year 1:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - You pay the loan repayment fully using your own money.
      </Text>
      <Text fontSize="md" mb={4}>
        - This allows your ASB capital to remain intact to start generating
        dividends.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Year 2 and Beyond:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Dividends Used for Loan Repayment:</strong> Starting from the
        second year, dividends from your ASB investment are used as the primary
        source to pay the annual loan repayment.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>If Dividends {"<"} Loan Repayment:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - You top up the shortfall using your own funds. Any remaining amount
        from this top-up is invested in other instruments.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>If Dividends {">"} Loan Repayment:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - Excess dividends are invested in other instruments with a return rate
        of 5-6% annually.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Your Monthly Loan Repayment Becomes an Investment:</strong>
      </Text>
      <Text fontSize="md" mb={4}>
        - From the second year onward, the money you would have otherwise used
        to pay the loan is redirected to invest in other instruments. This
        results in two streams of investment:
      </Text>
      <Text fontSize="md" mb={4}>
        - <em>Excess Dividends</em> (if applicable) and{" "}
        <em>Your Monthly Repayment Funds</em>.
      </Text>
      <Text fontSize="md" mb={4}>
        <strong>Goal:</strong> By redirecting funds and excess dividends into
        other investments, the strategy allows you to grow your wealth over the
        loan term while maintaining the ASB capital. The potential returns from
        these investments, combined with the ASB capital, aim to maximize your
        net profit at the end of the loan term.
      </Text>

      {/* Loan Calculation Form */}
      <Stack mt={6}>
        {/* Loan Amount */}
        <Text fontSize="lg">Loan Amount (MYR)</Text>
        <input
          type="text"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Interest Rate */}
        <Text fontSize="lg">Interest Rate (%)</Text>
        <input
          type="text"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Dividend Rate */}
        <Text fontSize="lg">Dividend Rate (%)</Text>
        <input
          type="text"
          value={dividendRate}
          onChange={(e) => setDividendRate(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Loan Term */}
        <Text fontSize="lg">Loan Term (Years)</Text>
        <input
          type="text"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-blue-100"
        />

        {/* Include Other Investment */}
        <Checkbox
          checked={includeOtherInvestment}
          onCheckedChange={(e) => setIncludeOtherInvestment(e.checked === true)}
        >
          Include Additional Investment Options
        </Checkbox>

        {includeOtherInvestment && (
          <>
            <Text fontSize="lg">Other Investment Rate (%)</Text>
            <input
              type="text"
              value={otherInvestmentRate}
              onChange={(e) => setOtherInvestmentRate(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded bg-blue-100"
            />
          </>
        )}

        {/* Calculate Button */}
        <Button onClick={handleCalculate} mt={4} className="bg-blue-600">
          Calculate
        </Button>

        {/* Results */}
        {endAmount !== null && (
          <Box mt={4}>
            <Text fontSize="lg">
              Final Capital After {loanTerm} Years: MYR{" "}
              {formatNumber(endAmount)}
            </Text>
            <Text fontSize="md" color="gray.500">
              ASB Final Capital: MYR {formatNumber(asbFinalCapital)}
            </Text>
            <Text fontSize="md" color="gray.500">
              Other Investment Final Capital: MYR{" "}
              {formatNumber(otherInvestmentFinalCapital)}
            </Text>
            <Text fontSize="md" color="gray.500">
              Total Loan Paid: MYR {formatNumber(totalLoanPaid)}
            </Text>
            <Text fontSize="md" color="gray.500">
              Final Loan Balance: MYR {formatNumber(finalLoanBalance)}
            </Text>
            <Text fontSize="md" fontWeight="bold" color="green.500">
              Net Profit: MYR {formatNumber(netProfit)}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Strategy1;
