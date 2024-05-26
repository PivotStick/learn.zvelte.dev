import { defineConfig } from "vite";
import { zvelte } from "./ZveltePlugin";

export default defineConfig({
    plugins: [zvelte()]
})
