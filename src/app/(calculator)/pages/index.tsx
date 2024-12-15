// pages/index.tsx
import { Box, Button, Heading, Text, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5); // default 5%
  const [years, setYears] = useState<number>(40); // default 40 years
  const router = useRouter();

  // Handle form submit
  const handleSubmit = () => {
    // Redirect to strategy page based on logic or just show results here
    router.push(
      `/strategy1?loan=${loanAmount}&rate=${interestRate}&years=${years}`
    );
  };

  return (
    <Box className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        ASB Financing Calculator
      </Heading>
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
        <Text fontSize="lg">Years (Duration)</Text>
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

export default Home;
