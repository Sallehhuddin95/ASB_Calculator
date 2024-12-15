// components/StrategyInfo.tsx
import { Box, Text, Heading } from "@chakra-ui/react";

interface StrategyInfoProps {
  strategyNumber: 1 | 2;
}

const StrategyInfo: React.FC<StrategyInfoProps> = ({ strategyNumber }) => {
  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Heading as="h3" size="lg" mb={4}>
        {strategyNumber === 1
          ? "Strategy 1: Rolling Dividend"
          : "Strategy 2: Compound Interest"}
      </Heading>
      <Text fontSize="md" mb={4}>
        {strategyNumber === 1
          ? "In Strategy 1, you use the ASB dividends to pay off your loan after the first year. The dividends from the ASB are used to reduce the loan principal each year."
          : "In Strategy 2, you compound your dividends by leaving them in the ASB account. This results in higher returns as the dividends themselves start earning dividends."}
      </Text>
      <Text fontSize="sm" color="gray.600">
        {strategyNumber === 1
          ? "Strategy 1 is ideal for those who want to use ASB dividends to pay off the loan while keeping the principal intact."
          : "Strategy 2 is suited for those who prefer a longer-term approach and want to maximize their returns by compounding the dividends."}
      </Text>
    </Box>
  );
};

export default StrategyInfo;
