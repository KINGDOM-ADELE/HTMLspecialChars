Here's a comprehensive documentation for the encode and decode functions using Markdown format, tailored to fit your request. This version addresses the functionality and parameters, providing clarity on how to use the functions effectively.

markdown

# Encode and Decode Functions Documentation

The `encode` and `decode` functions are utility methods designed for safely encoding and decoding string values, particularly in contexts where special characters must be securely represented (e.g., for database storage or network transmission). These functions accommodate both primitive types and nested objects/arrays.

## encode

### Purpose

The `encode` function recursively sanitizes and converts specific special characters in strings to their corresponding HTML entities. This process prevents potential issues with HTML rendering, data storage, or transmission.

### Syntax

```javascript
encode(data, listArray = null, operator = null)

Parameters

    data: The data to encode, which can be a string, array, or object. Nested objects and arrays are supported.
    listArray (optional): An array of field names to skip during encoding. Fields in this list will not be modified.
    operator (optional): A string that determines whether to include or exclude fields listed in listArray. Use + to include and - to exclude.

Return Value

The function returns the encoded version of the input data, with specified special characters replaced by their HTML entity equivalents.
Special Characters Encoded

The encode function converts the following characters:
Character	Encoded Value
&	&
<	<
>	>
"	"
'	'
{	{
}	}
~	~
`	`
,	,
/	/
\	\
(	(
)	)
[	[
]	]
Usage Example

javascript

const data = {
  name: "John & Jane",
  description: "<script>alert('hello');</script>",
  meta: { ignore: "<b>This is bold</b>", count: 5 }
};

const encodedData = encode(data, ["ignore"]);
console.log(encodedData);
/*
{
  name: "John &amp; Jane",
  description: "&lt;script&gt;alert(&#039;hello&#039;);&lt;/script&gt;",
  meta: { ignore: "<b>This is bold</b>", count: "5" }
}
*/

Notes

    listArray allows you to specify properties that should not be encoded. This is helpful if certain fields contain data that must remain in its original form.
    Non-string data types (like numbers) are converted to strings but are not encoded.

decode
Purpose

The decode function reverses the encoding performed by the encode function, converting HTML entities back to their original special characters. This functionality is essential for retrieving or displaying data in its original form.
Syntax

javascript

decode(data, listArray = null, operator = null)

Parameters

    data: The data to decode, which can be a string, array, or object. Nested objects and arrays are supported.
    listArray (optional): An array of field names to decode selectively. Only fields in this list will be decoded. If no fields are specified, all eligible fields will be decoded.
    operator (optional): A string that determines whether to include or exclude fields listed in listArray. Use + to include and - to exclude.

Return Value

The function returns the decoded version of the input data, with HTML entities replaced by their original special characters.
Special Characters Decoded

The decode function converts the following characters back to their original form:
Encoded Value	Character
&	&
<	<
>	>
"	"
'	'
{	{
}	}
~	~
`	`
,	,
/	/
\	\
(	(
)	)
[	[
]	]
Usage Example

javascript

const encodedData = {
  name: "John &amp; Jane",
  description: "&lt;script&gt;alert(&#039;hello&#039;);&lt;/script&gt;",
  meta: { ignore: "<b>This is bold</b>", count: "5" }
};

const decodedData = decode(encodedData, ["description"]);
console.log(decodedData);
/*
{
  name: "John &amp; Jane",
  description: "<script>alert('hello');</script>",
  meta: { ignore: "<b>This is bold</b>", count: "5" }
}
*/

Notes

    listArray allows you to specify fields for selective decoding, leaving other fields in their encoded form.
    Only fields containing HTML entities will be affected. Non-string fields remain unchanged.

Export

The module exports an object with the following structure:

javascript

export default { encode, decode };

Summary

    encode(data, listArray, operator): Encodes special characters in strings within the data structure. Fields in listArray are skipped during encoding based on the operator.
    decode(data, listArray, operator): Decodes HTML entities back to their original characters. Fields in listArray are selectively decoded based on the operator.

These functions provide a flexible and recursive approach to handle both encoding and decoding for complex data structures, ensuring safe representation of special characters.


This documentation provides a clear understanding of the functionality, usage, and structure of the `encode` and `decode` functions, making it easier for developers to utilize them effectively.

