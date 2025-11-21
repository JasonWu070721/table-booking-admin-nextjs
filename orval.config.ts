// orval.config.ts
import { defineConfig } from "orval";
import { oas } from "@stoplight/spectral-rulesets";

// Light-touch validation that accepts kebab-case paths and the project's error envelope.
const validationRuleset = {
    extends: [oas],
    rules: {
        // No additional constraints; defaults already respect kebab-case and error.details[].
    },
};

export default defineConfig({
    restaurantAdmin: {
        input: {
            target: "./schema.yaml",
            validation: validationRuleset,
        },
        output: {
            mode: "tags-split", // per-tag outputs (Tables / Reservations / Orders...)
            target: "./generated/index.ts",
            schemas: "./generated/models",
            client: "axios",
            prettier: true,
            override: {
                mutator: {
                    path: "./lib/axiosClient.ts",
                    name: "axiosClient",
                },
            },
        },
    },
});
