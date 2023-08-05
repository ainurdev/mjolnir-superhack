import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  resolve: {
    alias: {
      "@/components": path.resolve("./src/pages/_components"),
      "@/constants": path.resolve("./src/constants"),
      "@/icons": path.resolve("./src/pages/_components/icons"),
      "@/stores": path.resolve("./src/stores"),
      "@/types": path.resolve("./src/types"),
      "@/utils": path.resolve("./src/utils"),
    },
  },
};
