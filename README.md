String Calculator Requirements

1. Basic Functionality
   The method can take up to any amount of numbers separated by commas.
   Examples of valid inputs:
   "" (returns 0)
   "1" (returns 1)
   "1,2" (returns 3)
2. Handling Unknown Amount of Numbers
   Extend the method to handle an unknown number of numbers.
   Example: "1,2,3,4" (returns 10)
3. Support for New Lines
   The method should handle new lines as separators between numbers.
   Valid input: "1\n2,3" (returns 6)
   Invalid input: "1,\n" (throws an exception)
4. Custom Delimiters
   The method can accept a custom delimiter defined at the beginning of the string.
   Format: "//[delimiter]\n[numbers…]"
   Example: "//;\n1;2" (returns 3)
5. Exception Handling for Negative Numbers
   If a negative number is passed, throw an exception with the message: "negatives not allowed" followed by the negative numbers.
   Example: "1,-2" (throws an exception with message: "negatives not allowed: -2")
6. Ignoring Large Numbers
   Numbers larger than 1000 should be ignored in the sum.
   Example: "2,1001" (returns 2)
7. Multi-character Delimiters
   The method should support multi-character delimiters.
   Format: "//[delimiter]\n[numbers…]"
   Example: "//[***]\n1**_2_**3" (returns 6)
8. Multiple Delimiters
   The method can handle multiple delimiters.
   Example: "//[\*][%]\n1\*2%3" (returns 6)
8. make sure you can also handle multiple delimiters with length longer than one char.


Add("") => 0

Add("1") => 1

Add("1,2") => 3

Add("1,2,3,4") => 10

Add("1\n2,3") => 6

Add("//;\n1;2") => 3

Add("-1,2,-3") => Exception: "negatives not allowed: -1, -3"

Add("2,1001") => 2

Add("//[***]\n1**_2_**3") => 6

Add("//[\*][%]\n1\*2%3") => 6

Add("//[\*\*\*][%%]\n1\*\*\*2%%3") => 6