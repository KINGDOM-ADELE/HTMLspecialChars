import HTMLspecialChars from "../HTMLspecialChars2.js"; // Adjust the path if necessary

// Manual test cases
const testCases = [
  {
    input: '<div>Hello & "world"</div>',
    encoded: '&lt;div&gt;Hello & "world"&lt;/div&gt;', // Corrected to leave & as is
    decoded: '<div>Hello & "world"</div>',
  },
  {
    input: "Tom & Jerry",
    encoded: "Tom & Jerry", // Corrected to leave & as is
    decoded: "Tom & Jerry",
  },
  {
    input: "5 > 3 and 2 < 4",
    encoded: "5 &gt; 3 and 2 &lt; 4",
    decoded: "5 > 3 and 2 < 4",
  },
  {
    input: "Use 'single quotes' or \"double quotes\"",
    encoded: "Use &#39;single quotes&#39; or &quot;double quotes&quot;",
    decoded: "Use 'single quotes' or \"double quotes\"",
  },
];

// Function to run tests
const runTests = () => {
  testCases.forEach(({ input, encoded, decoded }) => {
    const encodedResult = HTMLspecialChars.encode(input);
    const decodedResult = HTMLspecialChars.decode(encodedResult);

    console.log(`Testing input: "${input}"`);
    console.log(`Expected encoded: "${encoded}", Got: "${encodedResult}"`);
    console.log(`Expected decoded: "${decoded}", Got: "${decodedResult}"`);
    console.log("---");
  });
};

// Run the tests
runTests();
