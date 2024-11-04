import { expect } from "chai";
import HTMLspecialChars from "../index.js";

const { encode, decode } = HTMLspecialChars;

describe("Encoding and Decoding Functions", () => {
  it("should encode and then decode a string with special characters", () => {
    const original = `<div class="test">{Hello} ~World~ \`Code\`, (Testing) /Encoding/ \\ and [Decoding]`;
    const encoded = encode(original);
    const decoded = decode(encoded);

    console.log("Original:", original);
    console.log("Encoded:", encoded);
    console.log("Decoded:", decoded);

    expect(decoded).to.equal(original);
  });

  it("should handle encoding and decoding of special characters in a string", () => {
    const original = "Hello, <b>World</b>! 'Quote' & more ~fun~.";
    const encoded = encode(original);
    const decoded = decode(encoded);

    console.log("Original:", original);
    console.log("Encoded:", encoded);
    console.log("Decoded:", decoded);

    expect(decoded).to.equal(original);
  });

  it("should encode and decode an object with special characters", () => {
    const original = { content: "Hello <World> & {everyone}!", status: "[ok]" };
    console.log("Original:", original);
    const encoded = encode(original);
    console.log("Encoded:", encoded);
    const decoded = decode(encoded);
    console.log("Decoded:", decoded);


    expect(decoded).to.deep.equal(original);
  });

  it("should only decode specified fields and leave others unchanged", () => {
    const input = {
      content: "&lt;b&gt;Bold&lt;/b&gt;",
      content2: "&lt;b&gt;Bold&lt;/b&gt;",
      note: "{Important Note}",
      ignoreMe: "<i>Ignore this</i>",
    };

    console.log("Original x:", input);
    const decoded = decode(input, ["content"]);
    console.log("Decoded:", decoded);
    
    const expected = {
      content: "<b>Bold</b>",
      content2: "&lt;b&gt;Bold&lt;/b&gt;",
      note: "{Important Note}",
      ignoreMe: "<i>Ignore this</i>",
    };
    console.log("expected:", expected);
    expect(decoded).to.deep.equal(expected);
  });

  it("should skip specified fields during encoding and keep them unchanged", () => {
    console.log("HERR1");
    const input = {
      content: "Hello <b>Bold</b>",
      content2: "Hello <b>Bold</b>",
      note: "{Important Note}",
      ignoreMe: "<i>Ignore this</i>",
    };

    console.log("Original:", input);
    const encoded = encode(input, ["content"]);
    // const encoded = encode(input);
    console.log("Encoded:", encoded);

    const expected = {
      content: "Hello <b>Bold</b>",
      content2: "Hello &lt;b&gt;Bold&lt;&#47;b&gt;",
      note: "&#123;Important Note&#125;",
      ignoreMe: "&lt;i&gt;Ignore this&lt;&#47;i&gt;",
    };
    console.log("expected:", expected);

    expect(encoded).to.deep.equal(expected);
    console.log("HERR2");
  });

  // Optional: Add error handling test
  it("should handle invalid inputs gracefully", () => {
    const invalidInput = null;
    const encoded = encode(invalidInput);
    const decoded = decode(encoded);

    console.log("Invalid Input Encoded:", encoded);
    console.log("Invalid Input Decoded:", decoded);

    expect(decoded).to.be.null; // or however you expect your function to handle null
  });


  it("should encode and decode an array of objects with special characters", () => {
    const original = [
      { content: "Hello <World> & {everyone}!", status: "[ok]" },
      { content: "Special ~characters~ in `array` items!", status: "(status)" },
    ];

    console.log("Original Array:", original);
    const encoded = encode(original);
    console.log("Encoded Array:", encoded);
    const decoded = decode(encoded);
    console.log("Decoded Array:", decoded);

    expect(decoded).to.deep.equal(original);
  });

  it("should only decode specified fields in an array of objects and leave others unchanged", () => {
    const input = [
      {
        content: "&lt;b&gt;Bold&lt;/b&gt;",
        content2: "&lt;b&gt;Bold&lt;/b&gt;",
        note: "{Important Note}",
        ignoreMe: "<i>Ignore this</i>",
      },
      {
        content: "&lt;i&gt;Italic&lt;/i&gt;",
        content2: "&lt;u&gt;Underline&lt;/u&gt;",
        note: "[Note Here]",
        ignoreMe: "<b>Don't decode</b>",
      },
    ];

    console.log("Original Array:", input);
    const decoded = decode(input, ["content", "note"]);
    console.log("Decoded Array:", decoded);

    const expected = [
      {
        content: "<b>Bold</b>",
        content2: "&lt;b&gt;Bold&lt;/b&gt;",
        note: "{Important Note}",
        ignoreMe: "<i>Ignore this</i>",
      },
      {
        content: "<i>Italic</i>",
        content2: "&lt;u&gt;Underline&lt;/u&gt;",
        note: "[Note Here]",
        ignoreMe: "<b>Don't decode</b>",
      },
    ];

    expect(decoded).to.deep.equal(expected);
  });

  it("should skip specified fields during encoding in an array of objects and keep them unchanged", () => {
    const input = [
      {
        content: "Hello <b>Bold</b>",
        content2: "Hello <b>Bold</b>",
        note: "{Important Note}",
        ignoreMe: "<i>Ignore this</i>",
      },
      {
        content: "<u>Underline</u>",
        content2: "<strike>Strikethrough</strike>",
        note: "(A Note)",
        ignoreMe: "<p>Paragraph</p>",
      },
    ];

    console.log("Original Array:", input);
    const encoded = encode(input, ["content"]);
    console.log("Encoded Array:", encoded);

    const expected = [
      {
        content: "Hello <b>Bold</b>", // should remain unchanged
        content2: "Hello &lt;b&gt;Bold&lt;&#47;b&gt;",
        note: "&#123;Important Note&#125;",
        ignoreMe: "&lt;i&gt;Ignore this&lt;&#47;i&gt;",
      },
      {
        content: "<u>Underline</u>", // should remain unchanged
        content2: "&lt;strike&gt;Strikethrough&lt;&#47;strike&gt;",
        note: "&#40;A Note&#41;",
        ignoreMe: "&lt;p&gt;Paragraph&lt;&#47;p&gt;",
      },
    ];

    expect(encoded).to.deep.equal(expected);
  });

  it("should encode and then decode a string with special characters and operators", () => {
    const original = `<div class="test">10 + 5 = 15 && 20 / 4 = 5 || !0</div>`;
    const encoded = encode(original);
    const decoded = decode(encoded);

    console.log("Original:", original);
    console.log("Encoded:", encoded);
    console.log("Decoded:", decoded);

    expect(decoded).to.equal(original);
  });

  it("should handle encoding and decoding of arithmetic operators in a string", () => {
    const original = "Calculate 100 * 5 - 20 + 10 / 2 % 3 = result.";
    console.log("Original:", original);
    const encoded = encode(original);
    console.log("Encoded:", encoded);
    const decoded = decode(encoded);

    console.log("Decoded:", decoded);

    expect(decoded).to.equal(original);
  });

  it("should encode and decode an object containing logical operators", () => {
    const original = { expression: "x && y || z != false", result: "true" };
    const encoded = encode(original);
    const decoded = decode(encoded);

    expect(decoded).to.deep.equal(original);
  });

  it("should handle invalid inputs gracefully", () => {
    const invalidInput = null;
    const encoded = encode(invalidInput);
    const decoded = decode(encoded);

    expect(decoded).to.be.null;
  });

  it("should encode and decode an array of objects with operators", () => {
    const original = [
      { expression: "x * y == z", result: "true" },
      { expression: "a + b > c || d <= e", status: "active" },
    ];

    const encoded = encode(original);
    const decoded = decode(encoded);

    expect(decoded).to.deep.equal(original);
  });

 it("should encode all fields by default if no listArray and operator are provided", () => {
   const input = { field1: "<div>Test</div>", field2: "<span>Sample</span>" };
   console.log("Original:", input);
   const encoded = encode(input);
   
    console.log("Encoded:", encoded);
    const expected = {
      field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
      field2: "&lt;span&gt;Sample&lt;&#47;span&gt;",
    };
    console.log("expected:", expected);
   expect(encoded).to.deep.equal(expected);
 });

 it("should decode all fields by default if no listArray and operator are provided", () => {
   const input = {
     field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
     field2: "&lt;span&gt;Sample&lt;&#47;span&gt;", 
   };
       console.log("Original:", input);
       const decoded = decode(input);
       console.log("Decoded:", decoded);
       const expected = {
         field1: "<div>Test</div>",
         field2: "<span>Sample</span>",
        };
        console.log("expected:", expected);
   expect(decoded).to.deep.equal(expected);
 });

 it("should encode all fields except those in listArray when operator is '-'", () => {
   const input = { field1: "<div>Test</div>", field2: "<span>Sample</span>" };
   const encoded = encode(input, ["field1"], "-");
   const expected = {
     field1: "<div>Test</div>",
     field2: "&lt;span&gt;Sample&lt;&#47;span&gt;",
   };
   expect(encoded).to.deep.equal(expected);
 });

 it("should decode all fields except those in listArray when operator is '-'", () => {
   const input = {
     field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
     field2: "&lt;span&gt;Sample&lt;&#47;span&gt;",
   };
   const decoded = decode(input, ["field1"], "-");
   const expected = {
     field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
     field2: "<span>Sample</span>",
   };
   expect(decoded).to.deep.equal(expected);
 });

 it("should encode only the fields in listArray when operator is '+'", () => {
   const input = { field1: "<div>Test</div>", field2: "<span>Sample</span>" };
   const encoded = encode(input, ["field1"], "+");
   const expected = {
     field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
     field2: "<span>Sample</span>",
   };
   expect(encoded).to.deep.equal(expected);
 });

 it("should decode only the fields in listArray when operator is '+'", () => {
   const input = {
     field1: "&lt;div&gt;Test&lt;&#47;div&gt;",
     field2: "&lt;span&gt;Sample&lt;&#47;span&gt;",
   };
   const decoded = decode(input, ["field1"], "+");
   const expected = {
     field1: "<div>Test</div>",
     field2: "&lt;span&gt;Sample&lt;&#47;span&gt;",
   };
   expect(decoded).to.deep.equal(expected);
 });

 it("should handle null or empty data gracefully", () => {
   expect(encode(null)).to.be.null;
   expect(decode(null)).to.be.null;
 });

it("should handle nested objects with selective encoding and decoding", () => {
  const input = {
    outerField: {
      innerField: "<div>Content</div>",
      innerField1: "<div>Content</div>",
      otherField: "<p>Other Content</p>",
    },
  };

  console.log("Original:", input);

  // Encode only `innerField` within the nested structure
  const encoded = encode(input, ["innerField", "innerField1"], "+");
  console.log("Encoded:", encoded);

  const expectedEncoded = {
    outerField: {
      innerField: "&lt;div&gt;Content&lt;&#47;div&gt;",
      innerField1: "&lt;div&gt;Content&lt;&#47;div&gt;",
      otherField: "<p>Other Content</p>",
    },
  };

  // Make a deep clone of `encoded` to ensure `oldEncoded` is an independent copy
  let oldEncoded = JSON.parse(JSON.stringify(encoded));

  console.log("expectedEncoded:", expectedEncoded);

  // Decode only `innerField` within the nested structure
  const decoded = decode(encoded, ["innerField"], "+");
  console.log("Decoded:", decoded);

  const expectedDecoded = {
    outerField: {
      innerField: "<div>Content</div>",
      innerField1: "&lt;div&gt;Content&lt;&#47;div&gt;",
      otherField: "<p>Other Content</p>",
    },
  };
  console.log("expectedDecoded:", expectedDecoded);

  console.log("oldEncoded:", oldEncoded);
  expect(oldEncoded).to.deep.equal(expectedEncoded);
  expect(decoded).to.deep.equal(expectedDecoded);
});


 it("should encode an array of objects with selective encoding", () => {
   const input = [
     { field1: "<div>Test1</div>", field2: "<span>Sample1</span>" },
     { field1: "<div>Test2</div>", field2: "<span>Sample2</span>" },
   ];

   const encoded = encode(input, ["field1"], "+");
   const expected = [
     { field1: "&lt;div&gt;Test1&lt;&#47;div&gt;", field2: "<span>Sample1</span>" },
     { field1: "&lt;div&gt;Test2&lt;&#47;div&gt;", field2: "<span>Sample2</span>" },
   ];
   expect(encoded).to.deep.equal(expected);
 });

 it("should decode an array of objects with selective decoding", () => {
   const input = [
     {
       field1: "&lt;div&gt;Test1&lt;&#47;div&gt;",
       field2: "&lt;span&gt;Sample1&lt;&#47;span&gt;",
     },
     {
       field1: "&lt;div&gt;Test2&lt;&#47;div&gt;",
       field2: "&lt;span&gt;Sample2&lt;&#47;span&gt;",
     },
   ];

   const decoded = decode(input, ["field2"], "+");
   const expected = [
     {
       field1: "&lt;div&gt;Test1&lt;&#47;div&gt;",
       field2: "<span>Sample1</span>",
     },
     {
       field1: "&lt;div&gt;Test2&lt;&#47;div&gt;",
       field2: "<span>Sample2</span>",
     },
   ];
   expect(decoded).to.deep.equal(expected);
 });
  
});
