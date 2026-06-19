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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const community_entity_1 = require("./community.entity");
let CommunitiesService = class CommunitiesService {
    constructor(communitiesRepository, membersRepository) {
        this.communitiesRepository = communitiesRepository;
        this.membersRepository = membersRepository;
    }
    async create(data, userId) {
        const existing = await this.communitiesRepository.findOne({ where: { name: data.name } });
        if (existing) {
            throw new common_1.ConflictException('Community name already taken');
        }
        const community = this.communitiesRepository.create(data);
        const saved = await this.communitiesRepository.save(community);
        await this.membersRepository.save({
            communityId: saved.id,
            userId,
            role: 'admin',
        });
        saved.memberCount = 1;
        await this.communitiesRepository.save(saved);
        return saved;
    }
    async findById(id) {
        const community = await this.communitiesRepository.findOne({ where: { id } });
        if (!community) {
            throw new common_1.NotFoundException('Community not found');
        }
        return community;
    }
    async findAll(limit = 20, offset = 0) {
        return this.communitiesRepository.find({
            order: { memberCount: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async join(communityId, userId) {
        const existing = await this.membersRepository.findOne({
            where: { communityId, userId },
        });
        if (existing) {
            throw new common_1.ConflictException('Already a member');
        }
        await this.membersRepository.save({ communityId, userId, role: 'member' });
        const community = await this.findById(communityId);
        community.memberCount += 1;
        await this.communitiesRepository.save(community);
    }
    async leave(communityId, userId) {
        const member = await this.membersRepository.findOne({
            where: { communityId, userId },
        });
        if (member) {
            await this.membersRepository.remove(member);
            const community = await this.findById(communityId);
            community.memberCount = Math.max(0, community.memberCount - 1);
            await this.communitiesRepository.save(community);
        }
    }
    async isMember(communityId, userId) {
        const member = await this.membersRepository.findOne({
            where: { communityId, userId },
        });
        return !!member;
    }
    async delete(id) {
        const community = await this.findById(id);
        await this.communitiesRepository.remove(community);
    }
};
exports.CommunitiesService = CommunitiesService;
exports.CommunitiesService = CommunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_entity_1.Community)),
    __param(1, (0, typeorm_1.InjectRepository)(community_entity_1.CommunityMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommunitiesService);
//# sourceMappingURL=communities.service.js.map