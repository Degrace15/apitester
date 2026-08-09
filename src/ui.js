import { sendRequest } from "./api.js";

const style = document.createElement("style");

style.textContent = `
.api-tester {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    overflow-y: auto;
    background: var(--background-color);
    color: var(--text-color);
    font-family: sans-serif;
}

.api-tester-header {
    margin-bottom: 16px;
}

.api-tester-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

/* Tabs */

.api-tester-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
    overflow-x: auto;
    border-bottom: 1px solid var(--border-color);
}

.api-tab {
    flex: 0 0 auto;
    padding: 9px 14px;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--text-color);
    opacity: 0.65;
    font-size: 13px;
    white-space: nowrap;
    cursor: pointer;
}

.api-tab.active {
    opacity: 1;
    border-bottom-color: var(--active-color);
}

.api-tab:active {
    opacity: 0.8;
}

/* Tab content */

.api-tab-content {
    display: none;
}

.api-tab-content.active {
    display: block;
}

/* Request */

.api-tester-url {
    display: flex;
    gap: 8px;
    width: 100%;
}

#api-method {
    width: 90px;
    min-width: 90px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    outline: none;
}

#api-url {
    flex: 1;
    min-width: 0;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    outline: none;
}

#api-method:focus,
#api-url:focus,
#api-headers:focus,
#api-body:focus {
    border-color: var(--active-color);
}

/* Send button */

#api-send {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background: var(--active-color);
    color: var(--text-color);
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
}

#api-send:active {
    opacity: 0.8;
}

/* Labels */

.api-tester label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
}

/* Textareas */

#api-headers,
#api-body {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    font-family: monospace;
    font-size: 13px;
    line-height: 1.5;
    outline: none;
    resize: vertical;
}

#api-headers {
    min-height: 180px;
}

#api-body {
    min-height: 220px;
}

/* Response */

.api-response-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
}

#api-status {
    font-weight: 600;
}

#api-time {
    opacity: 0.7;
}

#api-response {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    margin: 0;
    padding: 12px;
    overflow: auto;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    font-family: monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
}

/* Mobile */

@media (max-width: 480px) {
    .api-tester {
        padding: 12px;
    }

    .api-tester-url {
        flex-wrap: wrap;
    }

    #api-method {
        width: 80px;
        min-width: 80px;
    }

    #api-url {
        flex: 1;
        min-width: calc(100% - 90px);
    }

    #api-send {
        width: 100%;
    }

    .api-tab {
        padding: 8px 12px;
        font-size: 12px;
    }
`;

document.head.appendChild(style);

export function openApiTester() {
    const existing = document.querySelector(".api-tester");

    if (existing) {
        existing.remove();
    }

    const container = document.createElement("div");

    container.className = "api-tester";

    container.innerHTML = `
        <div class="api-tester-header">
            <h2>API Tester</h2>
        </div>

        <div class="api-tester-tabs">
            <button class="api-tab active" data-tab="request">
                Request
            </button>

            <button class="api-tab" data-tab="headers">
                Headers
            </button>

            <button class="api-tab" data-tab="body">
                Body
            </button>

            <button class="api-tab" data-tab="response">
                Response
            </button>
        </div>

        <div
            class="api-tab-content active"
            data-content="request"
        >
            <div class="api-tester-url">

                <select id="api-method">
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                </select>

                <input
                    id="api-url"
                    type="text"
                    placeholder="https://api.example.com/users"
                />

                <button id="api-send">
                    Send
                </button>

            </div>
        </div>

        <div
            class="api-tab-content"
            data-content="headers"
        >
            <label>Headers</label>

            <textarea
                id="api-headers"
                placeholder='{
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
}'
            ></textarea>
        </div>

        <div
            class="api-tab-content"
            data-content="body"
        >
            <label>Request Body</label>

            <textarea
                id="api-body"
                placeholder='{
  "name": "Acode"
}'
            ></textarea>
        </div>

        <div
            class="api-tab-content"
            data-content="response"
        >
            <div class="api-response-info">
                <span id="api-status">
                    Ready
                </span>

                <span id="api-time"></span>
            </div>

            <pre id="api-response">Send a request to see the response.</pre>
        </div>
    `;

    document.body.appendChild(container);

    const tabs =
        container.querySelectorAll(".api-tab");

    const contents =
        container.querySelectorAll(".api-tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach((item) => {
                item.classList.remove("active");
            });

            contents.forEach((content) => {
                content.classList.remove("active");
            });

            tab.classList.add("active");

            const content =
                container.querySelector(
                    `[data-content="${target}"]`
                );

            if (content) {
                content.classList.add("active");
            }
        });
    });

    const method =
        container.querySelector("#api-method");

    const url =
        container.querySelector("#api-url");

    const headers =
        container.querySelector("#api-headers");

    const body =
        container.querySelector("#api-body");

    const send =
        container.querySelector("#api-send");

    const status =
        container.querySelector("#api-status");

    const time =
        container.querySelector("#api-time");

    const response =
        container.querySelector("#api-response");

    send.addEventListener("click", async () => {
        const requestUrl = url.value.trim();

        if (!requestUrl) {
            status.textContent =
                "Enter an API URL.";

            return;
        }

        let parsedHeaders = {};

        if (headers.value.trim()) {
            try {
                parsedHeaders =
                    JSON.parse(headers.value);
            } catch {
                status.textContent =
                    "Invalid headers JSON.";

                return;
            }
        }

        let parsedBody;

        if (
            ["POST", "PUT", "PATCH", "DELETE"]
                .includes(method.value)
        ) {
            if (body.value.trim()) {
                try {
                    JSON.parse(body.value);

                    parsedBody =
                        body.value;
                } catch {
                    status.textContent =
                        "Invalid body JSON.";

                    return;
                }
            }
        }

        status.textContent = "Sending...";
        time.textContent = "";
        response.textContent = "";

        try {
            const result =
                await sendRequest({
                    url: requestUrl,
                    method: method.value,
                    headers: parsedHeaders,
                    body: parsedBody
                });

            status.textContent =
                `${result.status} ${result.statusText}`;

            time.textContent =
                `${result.time} ms`;

            response.textContent =
                result.data;

            const responseTab =
                container.querySelector(
                    '[data-tab="response"]'
                );

            if (responseTab) {
                responseTab.click();
            }

        } catch (error) {
            status.textContent =
                "Request failed";

            response.textContent =
                error.message;

            const responseTab =
                container.querySelector(
                    '[data-tab="response"]'
                );

            if (responseTab) {
                responseTab.click();
            }
        }
    });
}