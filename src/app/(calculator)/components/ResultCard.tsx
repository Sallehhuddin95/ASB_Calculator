// components/ResultCard.tsx
import { Box, Text, Heading } from "@chakra-ui/react";

interface ResultCardProps {
  remainingLoan: number;
  totalPaid: number;
}

const ResultCard: React.FC<ResultCardProps> = ({
  remainingLoan,
  totalPaid,
}) => {
  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Heading as="h2" size="lg" mb={4}>
        Calculation Result
      </Heading>
      <Text fontSize="lg">Remaining Loan: MYR {remainingLoan.toFixed(2)}</Text>
      <Text fontSize="lg">Total Paid: MYR {totalPaid.toFixed(2)}</Text>
    </Box>
  );
};

export default ResultCard;
