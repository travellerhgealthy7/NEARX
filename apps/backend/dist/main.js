"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://nearx-travellershealth7-2672s-projects.vercel.app',
            /\.vercel\.app$/,
        ],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`NEARX backend running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap().catch((error) => {
    console.error('Failed to bootstrap backend', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map