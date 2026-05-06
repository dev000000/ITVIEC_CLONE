-- Tạo một schema (database) mới tên là itviec_db
CREATE SCHEMA IF NOT EXISTS itviec_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Chọn schema để làm việc
USE itviec_db;
-- Bảng kỹ năng
CREATE TABLE skills (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(100) NOT NULL
);
-- Bảng thành phố
CREATE TABLE cities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city_name VARCHAR(100) NOT NULL
);
-- Bảng đất nước
CREATE TABLE countries (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  country_name VARCHAR(100) NOT NULL
);
-- Bảng tài khoản
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'EMPLOYER', 'SEEKER') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Bảng token xác thực
CREATE TABLE tokens (
  id VARCHAR(255) PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  token_type ENUM('BEARER') DEFAULT 'BEARER',
  expiry_time DATETIME,
  is_revoked BOOLEAN DEFAULT FALSE,
  is_access_token BOOLEAN DEFAULT FALSE,
  user_id VARCHAR(255) NOT NULL,
  CONSTRAINT fk_tokens_user FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Bảng ứng viên
CREATE TABLE seekers (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  phone_number VARCHAR(10),
  date_of_birth DATE,
  gender ENUM('MALE', 'FEMALE', 'OTHERS'),
  city_id BIGINT,
  address VARCHAR(255),
  personal_link VARCHAR(255),
  cover_letter VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_seekers_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_seekers_city FOREIGN KEY (city_id) REFERENCES cities(id)
);
-- Bảng nhà tuyển dụng
CREATE TABLE employers (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  phone_number VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_employers_user FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Bảng công ty
CREATE TABLE companies (
  id VARCHAR(255) PRIMARY KEY,
  employer_id VARCHAR(255) NOT NULL UNIQUE,
  -- nhân viên quản lý tài khoản công ty
  company_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  website VARCHAR(255),
  logo_url VARCHAR(255),
  address VARCHAR(255),
  company_model ENUM(
    'PRODUCT',
    'OUTSOURCING',
    'CONSULTING_SOLUTION',
    'STARTUP',
    'CLOUD_PLATFORM',
    'RESEARCH_LAB'
  ),
  industry VARCHAR(100),
  company_size ENUM(
    'SIZE_1_10',
    'SIZE_11_50',
    'SIZE_51_150',
    'SIZE_151_300',
    'SIZE_301_500',
    'SIZE_501_1000',
    'SIZE_1000_PLUS'
  ),
  country_id BIGINT,
  working_hours ENUM(
    'MON_FRI',
    'MON_SAT_HALF',
    'MON_SAT',
    'FLEXIBLE',
    'HYBRID',
    'FULL_REMOTE'
  ),
  overtime_policy ENUM(
    'NO_OVERTIME',
    'OPTIONAL',
    'OCCASIONAL',
    'PAID_OT',
    'FREQUENT'
  ),
  company_introduction MEDIUMTEXT,
  our_expertise MEDIUMTEXT,
  why_work_here MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_companies_employer FOREIGN KEY (employer_id) REFERENCES employers(id),
  CONSTRAINT fk_companies_country FOREIGN KEY (country_id) REFERENCES countries(id)
);
-- Bảng job
CREATE TABLE jobs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  job_reason MEDIUMTEXT,
  job_description MEDIUMTEXT,
  job_requirements MEDIUMTEXT,
  why_join_us MEDIUMTEXT,
  location VARCHAR(255),
  city_id BIGINT,
  salary VARCHAR(100),
  job_type ENUM('ONSITE', 'HYBRID', 'REMOTE', 'FLEXIBLE'),
  experience_level ENUM(
    'INTERN',
    'FRESHER',
    'JUNIOR',
    'MID',
    'SENIOR',
    'LEAD',
    'MANAGER'
  ),
  posted_at DATETIME,
  expires_at DATETIME,
  status ENUM('ACTIVE', 'CLOSED', 'DRAFT', 'EXPIRED') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_jobs_company FOREIGN KEY (company_id) REFERENCES companies(id),
  CONSTRAINT fk_jobs_city FOREIGN KEY (city_id) REFERENCES cities(id)
);
-- Bảng đơn ứng tuyển
CREATE TABLE applications (
  id VARCHAR(255) PRIMARY KEY,
  seeker_id VARCHAR(255) NOT NULL,
  job_id BIGINT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10),
  resume_url VARCHAR(255),
  cover_letter VARCHAR(500),
  status ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
  employer_message MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_applications_seeker FOREIGN KEY (seeker_id) REFERENCES seekers(id),
  CONSTRAINT fk_applications_job FOREIGN KEY (job_id) REFERENCES jobs(id)
);
-- Bảng application vs city ( địa điểm làm việc mong muốn )
CREATE TABLE application_cities (
  application_id VARCHAR(255) NOT NULL,
  city_id BIGINT NOT NULL,
  PRIMARY KEY(application_id, city_id),
  CONSTRAINT fk_app_cities_application FOREIGN KEY (application_id) REFERENCES applications(id),
  CONSTRAINT fk_app_cities_city FOREIGN KEY (city_id) REFERENCES cities(id)
);
-- Bảng seeker vs city ( địa điểm làm việc mong muốn của ứng viên )
CREATE TABLE seeker_cities (
  seeker_id VARCHAR(255) NOT NULL,
  city_id BIGINT NOT NULL,
  PRIMARY KEY(seeker_id, city_id),
  CONSTRAINT fk_seeker_cities_seeker FOREIGN KEY (seeker_id) REFERENCES seekers(id),
  CONSTRAINT fk_seeker_cities_city FOREIGN KEY (city_id) REFERENCES cities(id)
);
-- Bảng seeker vs skill ( skill của ứng viên )
CREATE TABLE seeker_skills (
  seeker_id VARCHAR(255) NOT NULL,
  skill_id BIGINT NOT NULL,
  PRIMARY KEY(seeker_id, skill_id),
  CONSTRAINT fk_seeker_skills_seeker FOREIGN KEY (seeker_id) REFERENCES seekers(id),
  CONSTRAINT fk_seeker_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id)
);
-- Bảng company vs skill ( skill chính của công ty )
CREATE TABLE company_skills (
  company_id VARCHAR(255) NOT NULL,
  skill_id BIGINT NOT NULL,
  PRIMARY KEY(company_id, skill_id),
  CONSTRAINT fk_company_skills_company FOREIGN KEY (company_id) REFERENCES companies(id),
  CONSTRAINT fk_company_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id)
);
-- Bảng job vs skill (skill yêu cầu của công việc )
CREATE TABLE job_skills (
  job_id BIGINT NOT NULL,
  skill_id BIGINT NOT NULL,
  PRIMARY KEY (job_id, skill_id),
  CONSTRAINT fk_job_skills_job FOREIGN KEY (job_id) REFERENCES jobs(id),
  CONSTRAINT fk_job_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id)
);