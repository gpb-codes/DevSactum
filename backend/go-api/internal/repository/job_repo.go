package repository

import (
	"database/sql"
	"time"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func CreateJob(job *models.Job) error {
	query := `INSERT INTO jobs (id, company_id, title, location, remote, job_type, experience_level,
		salary_min, salary_max, currency, description, requirements, benefits, tags)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
		RETURNING applicants_count, is_featured, is_urgent, is_active, posted_at, updated_at`
	return DB.QueryRow(query, job.ID, job.CompanyID, job.Title, job.Location, job.Remote,
		job.JobType, job.ExperienceLevel, job.SalaryMin, job.SalaryMax, job.Currency,
		job.Description, pq.Array(job.Requirements), pq.Array(job.Benefits), pq.Array(job.Tags),
	).Scan(&job.ApplicantsCount, &job.IsFeatured, &job.IsUrgent, &job.IsActive, &job.PostedAt, &job.UpdatedAt)
}

func GetJobByID(id uuid.UUID) (*models.Job, error) {
	job := &models.Job{}
	query := `SELECT id, company_id, title, location, remote, job_type, experience_level,
		salary_min, salary_max, currency, description, requirements, benefits, tags,
		applicants_count, is_featured, is_urgent, is_active, posted_at, updated_at
		FROM jobs WHERE id = $1`
	err := DB.QueryRow(query, id).Scan(&job.ID, &job.CompanyID, &job.Title, &job.Location,
		&job.Remote, &job.JobType, &job.ExperienceLevel, &job.SalaryMin, &job.SalaryMax,
		&job.Currency, &job.Description, pq.Array(&job.Requirements), pq.Array(&job.Benefits),
		pq.Array(&job.Tags), &job.ApplicantsCount, &job.IsFeatured, &job.IsUrgent,
		&job.IsActive, &job.PostedAt, &job.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return job, nil
}

func GetJobs(limit, offset int) ([]models.Job, error) {
	query := `SELECT id, company_id, title, location, remote, job_type, experience_level,
		salary_min, salary_max, currency, description, requirements, benefits, tags,
		applicants_count, is_featured, is_urgent, is_active, posted_at, updated_at
		FROM jobs WHERE is_active = true ORDER BY is_featured DESC, posted_at DESC LIMIT $1 OFFSET $2`
	rows, err := DB.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var jobs []models.Job
	for rows.Next() {
		var j models.Job
		err := rows.Scan(&j.ID, &j.CompanyID, &j.Title, &j.Location, &j.Remote,
			&j.JobType, &j.ExperienceLevel, &j.SalaryMin, &j.SalaryMax, &j.Currency,
			&j.Description, pq.Array(&j.Requirements), pq.Array(&j.Benefits), pq.Array(&j.Tags),
			&j.ApplicantsCount, &j.IsFeatured, &j.IsUrgent, &j.IsActive, &j.PostedAt, &j.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		jobs = append(jobs, j)
	}
	return jobs, nil
}

func GetJobsByCompany(companyID uuid.UUID) ([]models.Job, error) {
	query := `SELECT id, company_id, title, location, remote, job_type, experience_level,
		salary_min, salary_max, currency, description, requirements, benefits, tags,
		applicants_count, is_featured, is_urgent, is_active, posted_at, updated_at
		FROM jobs WHERE company_id = $1 ORDER BY posted_at DESC`
	rows, err := DB.Query(query, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var jobs []models.Job
	for rows.Next() {
		var j models.Job
		err := rows.Scan(&j.ID, &j.CompanyID, &j.Title, &j.Location, &j.Remote,
			&j.JobType, &j.ExperienceLevel, &j.SalaryMin, &j.SalaryMax, &j.Currency,
			&j.Description, pq.Array(&j.Requirements), pq.Array(&j.Benefits), pq.Array(&j.Tags),
			&j.ApplicantsCount, &j.IsFeatured, &j.IsUrgent, &j.IsActive, &j.PostedAt, &j.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		jobs = append(jobs, j)
	}
	return jobs, nil
}

func UpdateJob(job *models.Job) error {
	query := `UPDATE jobs SET title=$1, location=$2, remote=$3, job_type=$4, experience_level=$5,
		salary_min=$6, salary_max=$7, currency=$8, description=$9, requirements=$10, benefits=$11,
		tags=$12, is_featured=$13, is_urgent=$14, is_active=$15, updated_at=$16 WHERE id=$17`
	_, err := DB.Exec(query, job.Title, job.Location, job.Remote, job.JobType, job.ExperienceLevel,
		job.SalaryMin, job.SalaryMax, job.Currency, job.Description, pq.Array(job.Requirements),
		pq.Array(job.Benefits), pq.Array(job.Tags), job.IsFeatured, job.IsUrgent, job.IsActive,
		time.Now(), job.ID)
	return err
}

func DeleteJob(id uuid.UUID) error {
	_, err := DB.Exec("DELETE FROM jobs WHERE id = $1", id)
	return err
}

func CreateJobApplication(app *models.JobApplication) error {
	query := `INSERT INTO job_applications (id, job_id, developer_id, status, cover_letter, portfolio)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING applied_at`
	return DB.QueryRow(query, app.ID, app.JobID, app.DeveloperID, app.Status,
		app.CoverLetter, app.Portfolio).Scan(&app.AppliedAt)
}

func GetJobApplications(jobID uuid.UUID) ([]models.JobApplication, error) {
	query := `SELECT id, job_id, developer_id, status, cover_letter, portfolio, applied_at
		FROM job_applications WHERE job_id = $1 ORDER BY applied_at DESC`
	rows, err := DB.Query(query, jobID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var apps []models.JobApplication
	for rows.Next() {
		var a models.JobApplication
		err := rows.Scan(&a.ID, &a.JobID, &a.DeveloperID, &a.Status, &a.CoverLetter,
			&a.Portfolio, &a.AppliedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		apps = append(apps, a)
	}
	return apps, nil
}

func UpdateJobApplicationStatus(id uuid.UUID, status string) error {
	_, err := DB.Exec("UPDATE job_applications SET status = $1 WHERE id = $2", status, id)
	return err
}

func IncrementJobApplicants(jobID uuid.UUID) error {
	_, err := DB.Exec("UPDATE jobs SET applicants_count = applicants_count + 1, updated_at = $2 WHERE id = $1", jobID, time.Now())
	return err
}

func GetCompanyDashboardStats(companyID uuid.UUID) (totalJobs, activeJobs, totalApplicants, shortlisted, interviews, hired int, err error) {
	err = DB.QueryRow("SELECT COUNT(*) FROM jobs WHERE company_id = $1", companyID).Scan(&totalJobs)
	if err != nil {
		return
	}
	err = DB.QueryRow("SELECT COUNT(*) FROM jobs WHERE company_id = $1 AND is_active = true", companyID).Scan(&activeJobs)
	if err != nil {
		return
	}

	err = DB.QueryRow(`SELECT COUNT(*) FROM job_applications ja
		JOIN jobs j ON ja.job_id = j.id WHERE j.company_id = $1`, companyID).Scan(&totalApplicants)
	if err != nil {
		return
	}
	err = DB.QueryRow(`SELECT COUNT(*) FROM job_applications ja
		JOIN jobs j ON ja.job_id = j.id WHERE j.company_id = $1 AND ja.status = 'shortlisted'`, companyID).Scan(&shortlisted)
	if err != nil {
		return
	}
	err = DB.QueryRow(`SELECT COUNT(*) FROM job_applications ja
		JOIN jobs j ON ja.job_id = j.id WHERE j.company_id = $1 AND ja.status = 'interview'`, companyID).Scan(&interviews)
	if err != nil {
		return
	}
	err = DB.QueryRow(`SELECT COUNT(*) FROM job_applications ja
		JOIN jobs j ON ja.job_id = j.id WHERE j.company_id = $1 AND ja.status = 'offered'`, companyID).Scan(&hired)
	return
}
