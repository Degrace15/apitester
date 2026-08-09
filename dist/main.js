var b={$schema:"https://acode.app/schema/plugin/v0.1.0.json",id:"com.degrace.apitester",name:"Api Tester",main:"dist/main.js",version:"1.1.0",readme:"readme.md",changelogs:"CHANGELOG.md",repository:"https://github.com/Degrace15/apitester",icon:"icon.png",minVersionCode:290,license:"MIT",price:0,keywords:["api","tester","http","rest","request","response","json","developer","debugging"],author:{name:"Hacker2.0",email:"kiminoudegrace64@gmail.com",github:"Degrace15"},description:"Test and debug REST APIs directly inside Acode. Send HTTP requests, configure headers and request bodies, and inspect server responses without leaving the editor."};var e=null,x=`
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
`;function v(){if(document.getElementById("api-tester-style"))return;let t=document.createElement("style");t.id="api-tester-style",t.textContent=x,document.head.appendChild(t)}function h(){let t=document.getElementById("api-tester-style");t&&t.remove()}async function g({url:t,method:s,headers:c,body:o}){let n=performance.now(),r={method:s,headers:c};o&&["POST","PUT","PATCH","DELETE"].includes(s)&&(r.body=o);let a=await fetch(t,r),l=Math.round(performance.now()-n),u=a.headers.get("content-type")||"",d;if(u.includes("application/json")){let i=await a.json();d=JSON.stringify(i,null,2)}else d=await a.text();return{status:a.status,statusText:a.statusText,time:l,data:d}}function y(){v(),e.innerHTML=`
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
                            \u25B6 Run
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
    `,f()}function f(){let t=e.querySelectorAll(".api-tab"),s=e.querySelectorAll(".api-tab-content");t.forEach(o=>{o.addEventListener("click",()=>{let n=o.dataset.tab;t.forEach(a=>{a.classList.remove("active")}),s.forEach(a=>{a.classList.remove("active")}),o.classList.add("active");let r=e.querySelector(`[data-content="${n}"]`);r&&r.classList.add("active")})}),e.querySelector(".api-send").addEventListener("click",w)}async function w(){let t=e.querySelector(".api-method"),s=e.querySelector(".api-url"),c=e.querySelector(".api-headers"),o=e.querySelector(".api-body"),n=e.querySelector(".api-status"),r=e.querySelector(".api-time"),a=e.querySelector(".api-response"),l=s.value.trim();if(!l){n.textContent="Enter an API URL.";return}let u={};if(c.value.trim())try{u=JSON.parse(c.value)}catch{n.textContent="Invalid headers JSON.";return}let d;if(["POST","PUT","PATCH","DELETE"].includes(t.value)&&o.value.trim())try{JSON.parse(o.value),d=o.value}catch{n.textContent="Invalid body JSON.";return}n.textContent="Sending...",r.textContent="",a.textContent="";try{let i=await g({url:l,method:t.value,headers:u,body:d});n.textContent=`${i.status} ${i.statusText}`,r.textContent=`${i.time} ms`,a.textContent=i.data;let p=e.querySelector('[data-tab="response"]');p&&p.click()}catch(i){n.textContent="Request failed",r.textContent="",a.textContent=i.message;let p=e.querySelector('[data-tab="response"]');p&&p.click()}}function S(t,s,c){e=s,acode.require("commands").addCommand({name:"api-tester",description:"Open API Tester",exec(){y(),e.show()}})}function q(){acode.require("commands").removeCommand("api-tester"),h(),e&&(e.innerHTML="",e=null)}acode.setPluginInit(b.id,S);acode.setPluginUnmount(b.id,q);
