import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores"dist"] },
  {
    extends.configs.recommended, ...tseslint.configs.recommended],
    files,tsx}"],
    languageOptions{
      ecmaVersion
      globals.browser,
    },
    plugins{
      "react-hooks"
      "react-refresh"
    },
    rules{
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components"
        "warn",
        { allowConstantExport
      ],
      "@typescript-eslint/no-unused-vars""off",
    },
  }
);
