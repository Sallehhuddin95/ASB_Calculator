// components/InputForm.tsx
import { Box, Button, Input, Text, Stack } from "@chakra-ui/react";

interface InputFormProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
  handleSubmit: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  years,
  setYears,
  handleSubmit,
}) => {
  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Text fontSize="xl" mb={4}>
        Enter Financing Details
      </Text>
      <Stack>
        <Text fontSize="lg">Loan Amount (MYR)</Text>
        <Input
          type="number"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />
        <Text fontSize="lg">Interest Rate (%)</Text>
        <Input
          type="number"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <Text fontSize="lg">Duration (Years)</Text>
        <Input
          type="number"
          placeholder="Enter number of years"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
        <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
          Calculate
        </Button>
      </Stack>
    </Box>
  );
};

export default InputForm;
