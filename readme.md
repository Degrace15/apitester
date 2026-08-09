Api Tester

Test and debug REST APIs directly inside Acode.

Api Tester allows developers to send HTTP requests, configure headers and request bodies, and inspect server responses without leaving the Acode editor.

Features

- Send "GET", "POST", "PUT", "PATCH", and "DELETE" requests
- Configure HTTP headers using JSON
- Send JSON request bodies
- View HTTP status codes
- Measure request response time
- Inspect JSON and text responses
- Simple tab-based interface
- Designed for mobile development with Acode

Usage

1. Open Acode.
2. Open the Command Palette.
3. Search for Api Tester.
4. Enter the API URL.
5. Select the HTTP method.
6. Configure your headers if necessary.
7. Add a request body for methods such as "POST", "PUT", or "PATCH".
8. Press Send.
9. Open the Response tab to inspect the result.

Example

GET request

URL:
https://api.example.com/users

Method:
GET

POST request

URL:
https://api.example.com/users

Method:
POST

Headers:

{
  "Content-Type": "application/json"
}

Body:

{
  "name": "Degrace"
}

Tabs

Api Tester provides four main tabs:

- Request — Configure the URL and HTTP method.
- Headers — Configure request headers.
- Body — Enter the request body.
- Response — View the server response, status and response time.

Requirements

- Acode
- Internet connection for remote APIs
- An API endpoint accessible from the device

License

MIT License

Author

Hacker2.0

GitHub: "https://github.com/Degrace15/"

