"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityMember = exports.Community = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Community = class Community {
};
exports.Community = Community;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Community.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], Community.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Community.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Community.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_count', default: 0 }),
    __metadata("design:type", Number)
], Community.prototype, "memberCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured', default: false }),
    __metadata("design:type", Boolean)
], Community.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Community.prototype, "createdAt", void 0);
exports.Community = Community = __decorate([
    (0, typeorm_1.Entity)('communities')
], Community);
let CommunityMember = class CommunityMember {
};
exports.CommunityMember = CommunityMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CommunityMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'community_id', type: 'uuid' }),
    __metadata("design:type", String)
], CommunityMember.prototype, "communityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], CommunityMember.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'member' }),
    __metadata("design:type", String)
], CommunityMember.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'joined_at' }),
    __metadata("design:type", Date)
], CommunityMember.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Community, community => community.id),
    (0, typeorm_1.JoinColumn)({ name: 'community_id' }),
    __metadata("design:type", Community)
], CommunityMember.prototype, "community", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CommunityMember.prototype, "user", void 0);
exports.CommunityMember = CommunityMember = __decorate([
    (0, typeorm_1.Entity)('community_members')
], CommunityMember);
//# sourceMappingURL=community.entity.js.map