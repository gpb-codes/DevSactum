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
exports.ReputationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
let ReputationService = class ReputationService {
    constructor(profilesRepository, eventsRepository) {
        this.profilesRepository = profilesRepository;
        this.eventsRepository = eventsRepository;
    }
    async getUserReputation(userId) {
        const result = await this.eventsRepository
            .createQueryBuilder('event')
            .select('COALESCE(SUM(event.points), 0)', 'total')
            .where('event.user_id = :userId', { userId })
            .getRawOne();
        return parseInt(result.total, 10);
    }
    async getHistory(userId, limit = 20) {
        return this.eventsRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getLeaderboard(limit = 10) {
        return this.profilesRepository.find({
            order: { reputationScore: 'DESC' },
            take: limit,
            relations: ['user'],
        });
    }
    async addEvent(userId, points, reason) {
        const event = this.eventsRepository.create({ userId, points, reason });
        await this.eventsRepository.save(event);
        await this.profilesRepository
            .createQueryBuilder()
            .update(profile_entity_1.Profile)
            .set({ reputationScore: () => `reputation_score + ${points}` })
            .where('user_id = :userId', { userId })
            .execute();
        return event;
    }
};
exports.ReputationService = ReputationService;
exports.ReputationService = ReputationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.ReputationEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReputationService);
//# sourceMappingURL=reputation.service.js.map