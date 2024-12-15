export interface Strategy1Result {
  finalAsbCapital: number;
  finalOtherInvestmentCapital: number;
  finalEndAmount: number;
}

export const calculateStrategy1 = (
  loanAmount: number,
  loanTerm: number,
  interestRate: number, // Loan repayment rate as a decimal
  dividendRate: number, // ASB return rate as a decimal
  includeOtherInvestment: boolean,
  otherInvestmentRate: number // Other investment rate as a decimal
): Strategy1Result => {
  let asbCapital = loanAmount; // Initial ASB investment is the loan amount
  let finalAsbCapital = 0;
  let finalOtherInvestmentCapital = 0;
  let outstandingLoan = loanAmount;

  const monthlyLoanRepayment = calculateMonthlyLoanRepayment(
    loanAmount,
    interestRate,
    loanTerm
  );

  // Loop through each year to calculate loan repayment and ASB growth
  for (let year = 1; year <= loanTerm; year++) {
    const annualLoanRepayment = monthlyLoanRepayment * 12; // Yearly loan repayment

    // Calculate ASB dividends
    const annualDividend = asbCapital * (dividendRate / 100);

    // Year 1 - Pay the loan using your own funds
    if (year === 1) {
      outstandingLoan = outstandingLoan - annualLoanRepayment;
    } else {
      // Year 2 and beyond
      const excessDividend = annualDividend - annualLoanRepayment;

      // If dividends are greater than loan repayment
      if (excessDividend > 0) {
        finalOtherInvestmentCapital += excessDividend; // Excess dividend goes into other investment
      } else {
        // If dividends are less than loan repayment
        finalOtherInvestmentCapital += Math.max(
          0,
          monthlyLoanRepayment * 12 - annualDividend
        ); // Use own funds for shortfall
      }

      // Update ASB capital for the next year
      asbCapital += excessDividend > 0 ? excessDividend : 0;
    }
  }

  // Final ASB capital after loan term
  finalAsbCapital = asbCapital;

  // Total end amount (ASB + other investments)
  const finalEndAmount = finalAsbCapital + finalOtherInvestmentCapital;

  return {
    finalAsbCapital,
    finalOtherInvestmentCapital,
    finalEndAmount,
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

  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return monthlyPayment;
};
