"use client";

import { useState } from "react";
import Strategy1 from "../app/(calculator)/pages/Strategy1"; // Import your Strategy1 component
import Strategy2 from "../app/(calculator)/pages/Strategy2"; // Import your Strategy2 component
import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("1");

  // Handle strategy selection
  const handleStrategyChange = (strategy: string) => {
    setSelectedStrategy(strategy);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Heading
          as="h1"
          className="text-3xl text-black font-bold"
          textAlign="center"
          mb={6}
        >
          ASB Financing Calculator
        </Heading>

        <Box textAlign="center" mb={8} className="w-full">
          <Text className="text-lg text-blue-400 font-bold">
            Choose a strategy to calculate your ASB financing:
          </Text>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={() => handleStrategyChange("1")}
              className={
                selectedStrategy === "1"
                  ? "p-2 bg-blue-500 rounded-md w-60"
                  : "p-2 bg-gray-500 rounded-md w-60"
              }
            >
              Strategy 1
            </Button>
            <Button
              onClick={() => handleStrategyChange("2")}
              className={
                selectedStrategy === "2"
                  ? "p-2 bg-blue-500 rounded-md w-60"
                  : "p-2 bg-gray-500 rounded-md w-60"
              }
            >
              Strategy 2
            </Button>
          </div>
        </Box>

        {/* Render the selected strategy component only */}
        <div className="w-full text-black">
          {selectedStrategy === "1" && <Strategy1 />}
          {selectedStrategy === "2" && <Strategy2 />}
        </div>
      </main>
    </div>
  );
}
