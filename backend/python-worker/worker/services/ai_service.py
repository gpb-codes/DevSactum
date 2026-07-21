import httpx
from loguru import logger
from worker.config import settings


class AiService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)

    async def process(self, pattern: str, data: dict) -> dict | None:
        handlers = {
            "match_candidates": self._match_candidates,
            "match_jobs": self._match_jobs,
            "analyze_resume": self._analyze_resume,
            "skill_gap": self._skill_gap,
            "generate_description": self._generate_description,
        }

        handler = handlers.get(pattern)
        if not handler:
            logger.warning(f"No handler for AI pattern: {pattern}")
            return None

        return await handler(data)

    async def _match_candidates(self, data: dict) -> dict:
        job_id = data.get("jobId")
        top_k = data.get("topK", 10)
        logger.info(f"AI matching candidates for job {job_id}")
        return {"matches": []}

    async def _match_jobs(self, data: dict) -> dict:
        developer_id = data.get("developerId")
        top_k = data.get("topK", 10)
        logger.info(f"AI matching jobs for developer {developer_id}")
        return {"recommendations": []}

    async def _analyze_resume(self, data: dict) -> dict:
        resume_text = data.get("resumeText", "")
        target_role = data.get("targetRole")
        logger.info(f"AI analyzing resume for role: {target_role}")
        return {
            "overallScore": 75,
            "sections": {
                "skills": {"score": 70, "found": [], "missing": []},
                "experience": {"score": 80, "years": 0, "level": "mid"},
                "education": {"score": 75, "degree": "", "institution": ""},
                "projects": {"score": 70, "count": 0, "highlights": []},
                "keywords": {"score": 75, "matched": [], "density": 0},
            },
            "suggestions": [],
            "atsScore": 70,
            "atsIssues": [],
        }

    async def _skill_gap(self, data: dict) -> dict:
        current_skills = data.get("currentSkills", [])
        target_role = data.get("targetRole", "")
        logger.info(f"AI analyzing skill gap for {target_role}")
        return {
            "currentSkills": current_skills,
            "targetRole": target_role,
            "requiredSkills": [],
            "matchingSkills": [],
            "gapSkills": [],
            "recommendations": [],
        }

    async def _generate_description(self, data: dict) -> dict:
        title = data.get("title", "")
        company = data.get("company", "")
        logger.info(f"AI generating job description for {title} at {company}")
        return {"description": f"We are looking for a {title} to join {company}."}

    async def close(self):
        await self.client.aclose()
