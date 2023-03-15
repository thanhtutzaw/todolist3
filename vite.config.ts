import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default () => {
  return defineConfig({
    plugins: [react()],
    // define: {
    //     "process.env.NODE_ENV": `"${mode}"`,
    // },
    // esbuild: {
    //   jsxFactory: "React.createElement",
    //   jsxFragment: "React.Fragment",
    // },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": "/src",
        "@Elements": "/src/components/Elements",
      },
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
  });
};
