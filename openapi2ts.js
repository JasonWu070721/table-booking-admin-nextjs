import { generateService } from '@umijs/openapi';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    console.log('🚀 Generating OpenAPI TypeScript client...');

    await generateService({
        schemaPath: 'http://127.0.0.1:8000/api/schema.json',
        serversPath: resolve(__dirname, 'services/v1'),
        requestImportStatement: `import request from '@/utils/request';`,
    });

    console.log('✅ OpenAPI TS Client Generated Successfully!');
}

main().catch((err) => {
    console.error('❌ Failed:', err);
});
