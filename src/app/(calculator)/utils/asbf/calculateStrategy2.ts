export interface Strategy2Result {
  remainingLoan: number; // Remaining loan balance after the term
  totalLoanPaid: number; // Total loan paid over the term (principal + interest)
  asbCapital: number; // Total ASB capital after the term
}

export const calculateStrategy2 = (
  loanAmount: number, // Initial loan amount
  loanTerm: number, // Loan term in years
  interestRate: number, // Loan interest rate (as a percentage)
  dividendRate: number // Dividend rate (as a percentage)
): Strategy2Result => {
  let remainingLoan = loanAmount; // Start with the full loan amount
  let totalLoanPaid = 0;
  let asbCapital = loanAmount; // ASB capital starts with the loan amount

  // Calculate monthly repayment using amortization formula
  const monthlyRate = interestRate / 100 / 12; // Convert annual rate to monthly
  const numberOfPayments = loanTerm * 12;
  const monthlyRepayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  const annualRepayment = monthlyRepayment * 12;

  for (let year = 1; year <= loanTerm; year++) {
    for (let month = 1; month <= 12; month++) {
      // Step 1: Calculate monthly interest
      const monthlyInterest = remainingLoan * monthlyRate;

      // Step 2: Calculate principal portion of the repayment
      const principalRepayment = monthlyRepayment - monthlyInterest;

      // Step 3: Deduct principal portion from remaining loan
      remainingLoan -= principalRepayment;

      // Step 4: Prevent negative loan balance
      if (remainingLoan < 0) {
        remainingLoan = 0;
        break;
      }
    }

    // Step 5: Calculate yearly dividend from ASB capital
    const yearlyDividend = asbCapital * (dividendRate / 100);

    // Step 6: Reinvest dividends into ASB
    asbCapital += yearlyDividend;

    // Step 7: Track total loan paid
    totalLoanPaid += annualRepayment;
  }

  return {
    remainingLoan, // Should be close to 0 at the end of the term
    totalLoanPaid, // Total loan repayment over the term
    asbCapital, // Total ASB capital after reinvesting dividends
  };
};
