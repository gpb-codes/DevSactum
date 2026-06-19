package services

import (
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
)

type JobService struct{}

func NewJobService() *JobService {
	return &JobService{}
}

func (s *JobService) CreateJob(companyID uuid.UUID, req *models.CreateJobRequest) (*models.Job, error) {
	job := &models.Job{
		ID:              uuid.New(),
		CompanyID:       companyID,
		Title:           req.Title,
		Location:        req.Location,
		Remote:          req.Remote,
		JobType:         req.JobType,
		ExperienceLevel: req.ExperienceLevel,
		SalaryMin:       req.SalaryMin,
		SalaryMax:       req.SalaryMax,
		Currency:        req.Currency,
		Description:     req.Description,
		Requirements:    req.Requirements,
		Benefits:        req.Benefits,
		Tags:            req.Tags,
		IsFeatured:      req.IsFeatured,
		IsUrgent:        req.IsUrgent,
		IsActive:        true,
	}
	if job.JobType == "" {
		job.JobType = "full-time"
	}
	if job.ExperienceLevel == "" {
		job.ExperienceLevel = "mid"
	}
	if job.Currency == "" {
		job.Currency = "USD"
	}

	err := repository.CreateJob(job)
	return job, err
}

func (s *JobService) GetJob(id uuid.UUID) (*models.Job, error) {
	return repository.GetJobByID(id)
}

func (s *JobService) GetJobs(limit, offset int) ([]models.Job, error) {
	return repository.GetJobs(limit, offset)
}

func (s *JobService) UpdateJob(id uuid.UUID, req *models.CreateJobRequest) (*models.Job, error) {
	job, err := repository.GetJobByID(id)
	if err != nil {
		return nil, err
	}
	job.Title = req.Title
	job.Location = req.Location
	job.Remote = req.Remote
	job.JobType = req.JobType
	job.ExperienceLevel = req.ExperienceLevel
	job.SalaryMin = req.SalaryMin
	job.SalaryMax = req.SalaryMax
	job.Currency = req.Currency
	job.Description = req.Description
	job.Requirements = req.Requirements
	job.Benefits = req.Benefits
	job.Tags = req.Tags
	job.IsFeatured = req.IsFeatured
	job.IsUrgent = req.IsUrgent

	err = repository.UpdateJob(job)
	return job, err
}

func (s *JobService) DeleteJob(id uuid.UUID) error {
	return repository.DeleteJob(id)
}

func (s *JobService) ApplyToJob(jobID, developerID uuid.UUID, req *models.ApplyToJobRequest) (*models.JobApplication, error) {
	app := &models.JobApplication{
		ID:          uuid.New(),
		JobID:       jobID,
		DeveloperID: developerID,
		Status:      "pending",
		CoverLetter: &req.CoverLetter,
		Portfolio:   &req.Portfolio,
	}
	err := repository.CreateJobApplication(app)
	if err != nil {
		return nil, err
	}
	_ = repository.IncrementJobApplicants(jobID)
	return app, nil
}

func (s *JobService) GetJobApplications(jobID uuid.UUID) ([]models.JobApplication, error) {
	return repository.GetJobApplications(jobID)
}

func (s *JobService) UpdateApplicationStatus(id uuid.UUID, status string) error {
	return repository.UpdateJobApplicationStatus(id, status)
}

func (s *JobService) GetCompanyDashboardStats(companyID uuid.UUID) (map[string]int, error) {
	totalJobs, activeJobs, totalApplicants, shortlisted, interviews, hired, err := repository.GetCompanyDashboardStats(companyID)
	if err != nil {
		return nil, err
	}
	return map[string]int{
		"totalJobs":      totalJobs,
		"activeJobs":     activeJobs,
		"totalApplicants": totalApplicants,
		"shortlisted":    shortlisted,
		"interviews":     interviews,
		"hired":          hired,
	}, nil
}

func (s *JobService) GetCompanyJobs(companyID uuid.UUID) ([]models.Job, error) {
	return repository.GetJobsByCompany(companyID)
}
