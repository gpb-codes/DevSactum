"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const communities_module_1 = require("./communities/communities.module");
const messages_module_1 = require("./messages/messages.module");
const reputation_module_1 = require("./reputation/reputation.module");
const auth_module_1 = require("./auth/auth.module");
const websocket_module_1 = require("./websocket/websocket.module");
const useSqlite = process.env.DB_DRIVER !== 'postgres';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(useSqlite ? {
                type: 'better-sqlite3',
                database: process.env.DB_PATH || 'devsactum.db',
                autoLoadEntities: true,
                synchronize: true,
            } : {
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT, 10) || 5432,
                username: process.env.DB_USER || 'devsactum',
                password: process.env.DB_PASSWORD || 'devsactum',
                database: process.env.DB_NAME || 'devsactum',
                autoLoadEntities: true,
                synchronize: false,
            }),
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            communities_module_1.CommunitiesModule,
            messages_module_1.MessagesModule,
            reputation_module_1.ReputationModule,
            auth_module_1.AuthModule,
            websocket_module_1.WebSocketModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map