export interface Strategy2Result {
  finalLoanBalance: number; // Remaining loan balance after the term
  totalInterestPaid: number; // Total dividends used to pay the loan
  finalEndAmount: number; // Total value the investor gets at the end of the term
}

export const calculateStrategy2 = (
  loanAmount: number,
  loanTerm: number,
  dividendRate: number
): Strategy2Result => {
  let remainingLoan = loanAmount;
  let totalDividendsUsed = 0;
  let asbCapital = 0;

  for (let year = 1; year <= loanTerm; year++) {
    const yearlyDividend = remainingLoan * (dividendRate / 100);

    if (remainingLoan > 0) {
      remainingLoan -= yearlyDividend;
      totalDividendsUsed += yearlyDividend;
      if (remainingLoan < 0) {
        asbCapital += Math.abs(remainingLoan); // Extra dividend goes to ASB capital
        remainingLoan = 0;
      }
    } else {
      // Fully paid, additional dividends are reinvested in ASB
      asbCapital += yearlyDividend;
    }
  }

  const finalEndAmount = asbCapital;

  return {
    finalLoanBalance: remainingLoan,
    totalInterestPaid: totalDividendsUsed,
    finalEndAmount,
  };
};
