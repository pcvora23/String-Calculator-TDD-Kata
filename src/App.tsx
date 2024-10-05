import React, { useState, useCallback } from "react";
import "./index.css";

const add = (numbers: string): number => {
  // Case 1: Handle empty string
  if (numbers === "") return 0;

  const filterNumbers = (arr: string[]): number[] =>
    arr.map(Number).filter((n) => n <= 1000); // Case 6: Ignore numbers > 1000

  const extractNumbers = (input: string, delimiter: RegExp): number[] => {
    const numbersArr = input.split(delimiter);
    const negatives = numbersArr.filter((n) => Number(n) < 0);

    // Case 5: Throw exception for negative numbers
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }
    return filterNumbers(numbersArr);
  };

  // Case 7, 8, 9: Support different delimiters
  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.indexOf("\n");
    // Case 4
    if (delimiterEndIndex === 3) {
      const delimiter = numbers[2];
      const regex = new RegExp(`[${delimiter}\\n]+`);
      return extractNumbers(numbers.slice(delimiterEndIndex + 1), regex).reduce(
        (acc, curr) => acc + curr,
        0
      );
    } else {
      const delimiterSection = numbers.slice(2, delimiterEndIndex);
      const delimiters =
        delimiterSection.match(/\[([^\]]+)\]/g)?.map((d) => d.slice(1, -1)) ||
        [];
      const delimiter = new RegExp(`[${delimiters.join("")}\\n]+`);
      return extractNumbers(
        numbers.slice(delimiterEndIndex + 1),
        delimiter
      ).reduce((acc, curr) => acc + curr, 0);
    }
  }

  // Case 2, 3: Handle unknown amount of numbers and new lines
  return extractNumbers(numbers, /[,\n]+/).reduce((acc, curr) => acc + curr, 0);
};

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
      setResult(null);
    }
  }, [input]);

  return (
    <div className="max-w-md p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">String Calculator</h1>
      <div className="mb-4">
        <label htmlFor="numbers" className="block mb-2">
          Enter string without ""
        </label>
        <textarea
          id="numbers"
          className="w-full p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 1,2,3 or //;\n1;2;3 or //[*][%]\n1*2%3"
          rows={4}
        />
      </div>
      <button
        onClick={handleCalculate}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Calculate
      </button>
      {result !== null && (
        <div className="mt-4">
          <strong>Result:</strong> {result}
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default StringCalculator;
