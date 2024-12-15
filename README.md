# ASB Financing Calculator App

ASB Financing Calculator is a web application built with **Next.js** and **Chakra UI** to help users calculate and compare different strategies for managing ASB (Amanah Saham Bumiputera) financing. The app provides insights into the financial outcomes of reinvesting ASB dividends versus other investment strategies.

---

## Features

- **Strategy 1: Rolling Dividends to Pay the Financing**

  - Use ASB dividends to pay the loan starting from the second year.
  - Excess dividends (if any) are invested in other instruments.
  - Calculate final ASB capital, other investment returns, and net profit.

- **Strategy 2: Compound Interest**

  - Reinvest ASB dividends annually for compounding returns.
  - Calculate total loan paid, remaining loan balance, and final ASB capital.

- **Interactive Input Fields**

  - Adjustable loan amount, interest rates, dividend rates, and loan terms.
  - Real-time calculations with detailed outputs.

- **Local Storage Support**
  - Saves user inputs and calculation results for easy access upon revisiting.

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **State Management**: React `useState` and `useEffect`
- **Storage**: Browser `localStorage`
- **Utilities**: Custom calculation functions for Strategy 1 and Strategy 2

---

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open the app in your browser at http://localhost:3000.
