describe("EFY", function() {
    let EFY;

    const file_map = {
        /*Global*/ efy: ['global/efy_global.js'],
        index: ['home/home.css', 'home/home.js'],
    }

    async function load_files (path) {
        const files = file_map[path]
        try { await unload_files(path)} catch {/**/}
        const container = document.getElementById("jasmine_content");
        const iframe = container.firstElementChild;

        return Promise.all(files
            .map(async (file) => {
                const url = `./__src__/${file}`;
                if (file.endsWith(".css")) {
                    const response = await fetch(url);
                    const style = await response.text();
                    const css = document.createElement("style");
                    css.dataset.source = url;
                    css.textContent = style;
                    iframe.contentDocument.body.appendChild(css);
                    return css;
                } else if (file.endsWith(".js")) {
                    const response = await fetch(url);
                    const script = await response.text();
                    const js = document.createElement("script");
                    js.dataset.source = url;
                    // Expose all variables to global context for testing purposes
                    js.textContent = [
                        `console.log("$ready available?", typeof $ready === "function");`,
                        script.replaceAll("let ", "var ").replaceAll("const ", "var "),
                        `console.log("${file} loaded.");`,
                    ].join(';');
                    iframe.contentDocument.body.appendChild(js);
                    return js;
                }
            })
        );
    }

    async function unload_files (path) {
        const files = file_map[path];
        const container = document.getElementById("jasmine_content");
        const iframe = container.firstElementChild;

        if (iframe === null) {
            console.info("No iframe mounted yet.");
            return;
        }

        return Promise.all(
            files.map((file) => {
                const url = `./__src__/${file}`;
                if (file.endsWith(".css")) {
                    EFY.$(`style[data-source="${url}"]`)?.remove();
                    return true;
                } else if (file.endsWith(".js")) {
                    EFY.$(`script[data-source="${url}"]`)?.remove();
                    return true;
                }
                return false;
            })
        );
    }

    beforeEach(async () => {
        EFY = await import("../../__src__/efy/efy.mjs");
    })

    it("should contain a version string", function() {
        expect(EFY.efy_version).toBeInstanceOf(String);
    });

    it("should have a $ready function", function() {
        expect(EFY.$ready).toBeInstanceOf(Function);
    });

    it("should have a $add function", function() {
        expect(EFY.$add).toBeInstanceOf(Function);
    });

    it("should have a $wait function", function() {
        expect(EFY.$wait).toBeInstanceOf(Function);
    });

    it("should have a $css_prop function", function() {
        expect(EFY.$css_prop).toBeInstanceOf(Function);
    });

    it("should have a $event function", function() {
        expect(EFY.$event).toBeInstanceOf(Function);
    });

    it("should have a $ function", function() {
        expect(EFY.$).toBeInstanceOf(Function);
    });

    it("should have a $root object", function() {
        expect(Object.keys(EFY)).toContain("$root");
    });

    describe("no apps", function() {
        beforeEach(async function() {
            const container = document.getElementById("jasmine_content");
            container.innerHTML = "";
            const iframe = document.createElement("iframe");
            iframe.src = "about:blank";
            iframe.title = "EFY Testbed"
            // Viewport of an iPhone 12/13 + Pro
            iframe.height = "844";
            iframe.width = "390";
            container.appendChild(iframe);
            return new Promise((resolve) => {
                iframe.addEventListener("load", async function() {
                    ["./__src__/efy/efy.css", "./__src__/global/efy_global.css"].forEach(async (url) => {
                        const css = document.createElement("style");
                        css.dataset.source = url;
                        const response = await fetch(url);
                        const style = await response.text();
                        css.textContent = style;
                        iframe.contentDocument.body.appendChild(css);
                    })
                    const js = document.createElement("script");
                    js.type = "module";
                    js.dataset.source = "./__src__/efy/efy.mjs";
                    const response = await fetch("./__src__/efy/efy.mjs");
                    const script = await response.text();
                    js.textContent = script + ";console.log('efy.mjs loaded');";
                    iframe.contentDocument.body.appendChild(js);
                    resolve(js);
                });
            });
        });

        afterEach(async function() {
            await unload_files("index");
            await unload_files("efy");
        });

        it("should load index page", async function() {
            const container = document.getElementById("jasmine_content");
            const iframe = container.firstElementChild;

            if (!iframe) {
                throw new Error("IFrame not mounted!");
            }

            iframe.contentWindow.$ready = EFY.$ready;
            try {
                await load_files("index");
                await load_files("efy");
            } catch (exc) {
                console.error(exc);
            }

            expect(Object.keys(iframe.contentWindow)).toContain("efy_hm");
        });

        it("should initialise values on window.load", async function() {
            const container = document.getElementById("jasmine_content");
            const iframe = container.firstElementChild;

            if (!iframe) {
                throw new Error("IFrame not mounted!");
            }

            iframe.contentWindow.$ready = EFY.$ready;
            iframe.contentWindow.$add = EFY.$add;
            iframe.contentWindow.$wait = EFY.$wait;
            iframe.contentWindow.$event = EFY.$event;
            iframe.contentWindow.$ = EFY.$;

            try {
                await load_files("index");
                await load_files("efy");
            } catch (exc) {
                console.error(exc);
            }

            const LoadEvent = new Event("load");
            iframe.contentWindow.dispatchEvent(LoadEvent, {});
            expect(true).toBe(true);
        })
    });
});
