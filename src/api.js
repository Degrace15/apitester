export async function sendRequest({
    url,
    method = "GET",
    headers = {},
    body
}) {
    const startTime = performance.now();

    const options = {
        method,
        headers
    };

    if (
        body &&
        ["POST", "PUT", "PATCH", "DELETE"].includes(method)
    ) {
        options.body = body;
    }

    try {
        const response = await fetch(url, options);

        const time = Math.round(
            performance.now() - startTime
        );

        const contentType =
            response.headers.get("content-type") || "";

        let data;

        if (contentType.includes("application/json")) {
            const json = await response.json();

            data = JSON.stringify(
                json,
                null,
                2
            );
        } else {
            data = await response.text();
        }

        return {
            status: response.status,
            statusText: response.statusText,
            time,
            data,
            headers: Object.fromEntries(
                response.headers.entries()
            )
        };

    } catch (error) {
        throw new Error(
            `Request failed: ${error.message}`
        );
    }
}