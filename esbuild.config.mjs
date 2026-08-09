import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/main.js"],
    bundle: true,
    outfile: "dist/main.js",
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    minify: true,
    sourcemap: false
});

console.log("Build completed successfully.");