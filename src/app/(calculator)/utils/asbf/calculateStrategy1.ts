export interface Strategy1Result {
  finalAsbCapital: number; // ASB capital remains constant
  finalOtherInvestmentCapital: number; // Total growth of other investments
  finalEndAmount: number; // Total value after the loan term
  totalLoanPaid: number; // Total amount paid over the loan term
  finalLoanBalance: number; // Remaining loan balance after the term
  netProfit: number; // Net profits (finalEndAmount - totalLoanPaid)
}

export const calculateStrategy1 = (
  loanAmount: number, // Initial loan amount
  loanTerm: number, // Loan term in years
  interestRate: number, // Loan interest rate as a percentage
  dividendRate: number, // Dividend rate as a percentage
  includeOtherInvestment: boolean, // Whether to calculate other investments
  otherInvestmentRate: number // Growth rate of other investments
): Strategy1Result => {
  const monthlyLoanRepayment = calculateMonthlyLoanRepayment(
    loanAmount,
    interestRate,
    loanTerm
  );
  const annualLoanRepayment = monthlyLoanRepayment * 12;

  const asbCapital = loanAmount; // ASB capital remains fixed
  let otherInvestmentCapital = 0; // Other investments start at 0
  let outstandingLoan = loanAmount; // Outstanding loan balance
  let totalLoanPaid = 0; // Tracks the total loan payments made

  for (let year = 1; year <= loanTerm; year++) {
    const annualDividend = asbCapital * (dividendRate / 100);

    if (year === 1) {
      // Year 1: User pays loan repayment directly, no impact on other investments
      outstandingLoan -= annualLoanRepayment;
      totalLoanPaid += annualLoanRepayment;
      continue;
    }

    // Step 1: Calculate excess or shortfall
    const dividendDifference = annualDividend - annualLoanRepayment;

    // Step 2: Handle loan repayment
    if (dividendDifference < 0) {
      outstandingLoan -= annualDividend; // Apply all dividends to loan repayment
      totalLoanPaid += annualLoanRepayment; // Full annual repayment made
    } else {
      outstandingLoan -= annualLoanRepayment; // Loan fully covered by dividends
      totalLoanPaid += annualLoanRepayment;
    }

    // Step 3: Manage other investments
    if (includeOtherInvestment) {
      otherInvestmentCapital += annualLoanRepayment; // Redirected loan repayment

      if (dividendDifference > 0) {
        // Excess dividends are invested
        otherInvestmentCapital += dividendDifference;
      } else {
        // Shortfall reduces contributions to other investments
        otherInvestmentCapital += dividendDifference; // This will subtract the shortfall
      }

      // Apply growth rate to other investments
      otherInvestmentCapital +=
        otherInvestmentCapital * (otherInvestmentRate / 100);
    }

    // Prevent outstandingLoan from going negative
    if (outstandingLoan < 0) {
      outstandingLoan = 0;
    }
  }

  // Final calculations
  const finalAsbCapital = asbCapital; // Remains constant
  const finalOtherInvestmentCapital = includeOtherInvestment
    ? otherInvestmentCapital
    : 0;
  const finalEndAmount = finalAsbCapital + finalOtherInvestmentCapital;
  const netProfit = finalEndAmount - totalLoanPaid;

  return {
    finalAsbCapital,
    finalOtherInvestmentCapital,
    finalEndAmount,
    totalLoanPaid,
    finalLoanBalance: outstandingLoan,
    netProfit,
  };
};

// Function to calculate the monthly loan repayment based on the loan amount, interest rate, and loan term
const calculateMonthlyLoanRepayment = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number => {
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  return (
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
  );
};
