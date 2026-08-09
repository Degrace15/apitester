import plugin from "../plugin.json";

let $page = null;

const CSS = `
.api-tester {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    overflow-y: auto;
    background: var(--background-color);
    color: var(--text-color);
}

.api-tester * {
    box-sizing: border-box;
}

.api-tester-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 16px;
}

.api-tab {
    flex: 0 0 auto;
    padding: 10px 16px;
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--text-color);
    opacity: .65;
    font-size: 14px;
}

.api-tab.active {
    opacity: 1;
    border-bottom-color: var(--active-color);
}

.api-tab-content {
    display: none;
}

.api-tab-content.active {
    display: block;
}

.api-request {
    display: flex;
    gap: 8px;
    width: 100%;
}

.api-method {
    width: 90px;
    flex-shrink: 0;
    padding: 11px;
    border: 1px solid var(--border-color);
    border-radius: 7px;
    background: var(--secondary-background-color);
    color: var(--text-color);
}

.api-url {
    flex: 1;
    min-width: 0;
    padding: 11px;
    border: 1px solid var(--border-color);
    border-radius: 7px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    outline: none;
}

.api-send {
    padding: 11px 18px;
    border: 0;
    border-radius: 7px;
    background: var(--active-color);
    color: var(--text-color);
    font-weight: 600;
    white-space: nowrap;
}

.api-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
}

.api-editor {
    width: 100%;
    min-height: 220px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 7px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    font-family: monospace;
    font-size: 13px;
    line-height: 1.5;
    resize: vertical;
    outline: none;
}

.api-editor:focus,
.api-url:focus,
.api-method:focus {
    border-color: var(--active-color);
}

.api-response-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.api-status {
    font-weight: 600;
}

.api-time {
    opacity: .7;
}

.api-response {
    width: 100%;
    min-height: 350px;
    margin: 0;
    padding: 14px;
    overflow: auto;
    border: 1px solid var(--border-color);
    border-radius: 7px;
    background: var(--secondary-background-color);
    color: var(--text-color);
    font-family: monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
}

.api-section {
    margin-bottom: 18px;
}

@media (max-width: 480px) {
    .api-tester {
        padding: 12px;
    }

    .api-request {
        flex-wrap: wrap;
    }

    .api-method {
        width: 82px;
    }

    .api-url {
        min-width: calc(100% - 90px);
    }

    .api-send {
        width: 100%;
    }
}
`;

function createStyles() {
    if (document.getElementById("api-tester-style")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "api-tester-style";
    style.textContent = CSS;

    document.head.appendChild(style);
}

function removeStyles() {
    const style = document.getElementById(
        "api-tester-style"
    );

    if (style) {
        style.remove();
    }
}

async function sendRequest({
    url,
    method,
    headers,
    body
}) {
    const start = performance.now();

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

    const response = await fetch(url, options);

    const time = Math.round(
        performance.now() - start
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
        data
    };
}

function renderPage() {
    createStyles();

    $page.innerHTML = `
        <div class="api-tester">

            <div class="api-tester-tabs">

                <button
                    class="api-tab active"
                    data-tab="request"
                >
                    Request
                </button>

                <button
                    class="api-tab"
                    data-tab="headers"
                >
                    Headers
                </button>

                <button
                    class="api-tab"
                    data-tab="body"
                >
                    Body
                </button>

                <button
                    class="api-tab"
                    data-tab="response"
                >
                    Response
                </button>

            </div>

            <!-- REQUEST -->

            <div
                class="api-tab-content active"
                data-content="request"
            >

                <div class="api-section">

                    <div class="api-request">

                        <select class="api-method">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>

                        <input
                            class="api-url"
                            type="text"
                            placeholder="https://api.example.com/users"
                        />

                        <button class="api-send">
                            ▶ Run
                        </button>

                    </div>

                </div>

            </div>

            <!-- HEADERS -->

            <div
                class="api-tab-content"
                data-content="headers"
            >

                <div class="api-section">

                    <label class="api-label">
                        Headers
                    </label>

                    <textarea
                        class="api-editor api-headers"
                        placeholder='{
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
}'
                    ></textarea>

                </div>

            </div>

            <!-- BODY -->

            <div
                class="api-tab-content"
                data-content="body"
            >

                <div class="api-section">

                    <label class="api-label">
                        Request Body
                    </label>

                    <textarea
                        class="api-editor api-body"
                        placeholder='{
  "name": "Acode"
}'
                    ></textarea>

                </div>

            </div>

            <!-- RESPONSE -->

            <div
                class="api-tab-content"
                data-content="response"
            >

                <div class="api-response-info">

                    <span class="api-status">
                        Ready
                    </span>

                    <span class="api-time"></span>

                </div>

                <pre class="api-response">Send a request to see the response.</pre>

            </div>

        </div>
    `;

    setupEvents();
}

function setupEvents() {
    const tabs =
        $page.querySelectorAll(".api-tab");

    const contents =
        $page.querySelectorAll(".api-tab-content");

    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.tab;

            tabs.forEach((item) => {
                item.classList.remove("active");
            });

            contents.forEach((content) => {
                content.classList.remove("active");
            });

            tab.classList.add("active");

            const content =
                $page.querySelector(
                    `[data-content="${target}"]`
                );

            if (content) {
                content.classList.add("active");
            }
        });
    });

    const send =
        $page.querySelector(".api-send");

    send.addEventListener(
        "click",
        runRequest
    );
}

async function runRequest() {
    const method =
        $page.querySelector(".api-method");

    const url =
        $page.querySelector(".api-url");

    const headers =
        $page.querySelector(".api-headers");

    const body =
        $page.querySelector(".api-body");

    const status =
        $page.querySelector(".api-status");

    const time =
        $page.querySelector(".api-time");

    const response =
        $page.querySelector(".api-response");

    const requestUrl =
        url.value.trim();

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
            $page.querySelector(
                '[data-tab="response"]'
            );

        if (responseTab) {
            responseTab.click();
        }

    } catch (error) {

        status.textContent =
            "Request failed";

        time.textContent = "";

        response.textContent =
            error.message;

        const responseTab =
            $page.querySelector(
                '[data-tab="response"]'
            );

        if (responseTab) {
            responseTab.click();
        }
    }
}

function init(baseUrl, page, cache) {
    $page = page;

    const commands =
        acode.require("commands");

    commands.addCommand({
        name: "api-tester",
        description: "Open API Tester",

        exec() {
            renderPage();
            $page.show();
        }
    });
}

function unmount() {
    const commands =
        acode.require("commands");

    commands.removeCommand(
        "api-tester"
    );

    removeStyles();

    if ($page) {
        $page.innerHTML = "";
        $page = null;
    }
}

acode.setPluginInit(
    plugin.id,
    init
);

acode.setPluginUnmount(
    plugin.id,
    unmount
);