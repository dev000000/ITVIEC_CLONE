-- Tạo một schema (database) mới tên là itviecDB
CREATE SCHEMA IF NOT EXISTS itviecDB;

-- Chọn schema để làm việc
USE itviecDB;

-- Bảng kỹ năng
CREATE TABLE skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(100) NOT NULL
);


-- Bảng thành phố
CREATE TABLE cities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city_name NVARCHAR(100) NOT NULL
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
  role ENUM('ADMIN', 'EMPLOYER', 'USER') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Bảng ứng viên
CREATE TABLE seekers (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  full_name NVARCHAR(255) NOT NULL,
  job_title NVARCHAR(255),
  phone_number VARCHAR(10),
  date_of_birth DATE,
  gender ENUM('MALE', 'FEMALE', 'OTHERS'),
  city_id BIGINT,
  address NVARCHAR(255),
  personal_link VARCHAR(255),
  cover_letter NVARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);


-- Bảng nhà tuyển dụng
CREATE TABLE employers (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  full_name NVARCHAR(255) NOT NULL,
  job_title NVARCHAR(255),
  phone_number VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Bảng công ty
CREATE TABLE companies (
  id VARCHAR(255) PRIMARY KEY ,
  employer_id VARCHAR(255) NOT NULL,                           -- nhân viên quản lý tài khoản công ty
  company_name NVARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description NVARCHAR(255),
  website VARCHAR(255),
  logo_url VARCHAR(255),
  address NVARCHAR(255),
  company_model ENUM(
  'PRODUCT',
  'OUTSOURCING',
  'CONSULTING_SOLUTION',
  'STARTUP',
  'CLOUD_PLATFORM',
  'RESEARCH_LAB'),
  industry NVARCHAR(100),
  company_size ENUM(
  'SIZE_1_10',
  'SIZE_11_50',
  'SIZE_51_150',
  'SIZE_151_300',
  'SIZE_301_500',
  'SIZE_501_1000',
  'SIZE_1000_PLUS'),
  country_id BIGINT,
  working_hours ENUM(
  'MON_FRI',
  'MON_SAT_HALF',
  'MON_SAT',
  'FLEXIBLE',
  'HYBRID',
  'FULL_REMOTE'),
  overtime_policy ENUM(
  'NO_OVERTIME',
  'OPTIONAL',
  'OCCASIONAL',
  'PAID_OT',
  'FREQUENT'),
  company_introduction MEDIUMTEXT,
  our_expertise MEDIUMTEXT,
  why_work_here MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (employer_id) REFERENCES employers(id),
  FOREIGN KEY (country_id) REFERENCES countries(id)
);


-- Bảng job
CREATE TABLE jobs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_id VARCHAR(255) NOT NULL,
  title NVARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  job_reason MEDIUMTEXT,
  job_description MEDIUMTEXT,
  job_requirements MEDIUMTEXT,
  why_join_us MEDIUMTEXT,
  location NVARCHAR(255),
  city_id BIGINT,
  salary VARCHAR(100),
  job_type ENUM('ONSITE','HYBRID','REMOTE','FLEXIBLE'),
  experience_level ENUM('INTERN','FRESHER','JUNIOR','MID','SENIOR','LEAD','MANAGER'),
  posted_at DATETIME ,
  expires_at DATETIME,
  status ENUM('ACTIVE','CLOSED','DRAFT','EXPIRED') NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (city_id)    REFERENCES cities(id)
);


-- Bảng đơn ứng tuyển
CREATE TABLE applications (
  id VARCHAR(255) PRIMARY KEY,
  seeker_id VARCHAR(255) NOT NULL,
  job_id BIGINT NOT NULL,
  full_name NVARCHAR(255) NOT NULL,
  phone_number VARCHAR(10),
  resume_url VARCHAR(255),
  cover_letter NVARCHAR(500),
  status ENUM('PENDING',
              'ACCEPTED','REJECTED')
         NOT NULL,
  employer_message MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seeker_id) REFERENCES seekers(id),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);


-- Bảng application vs city ( desired location[thành phố làm việc ứng viên mong muốn])
CREATE TABLE application_city (
	application_id VARCHAR(255) NOT NULL,
    city_id BIGINT NOT NULL,
    PRIMARY KEY(application_id, city_id),
    FOREIGN KEY (application_id) REFERENCES applications(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);


-- Bảng seeker vs city ( desired location[thành phố làm việc ứng viên mong muốn])
CREATE TABLE seeker_city (
	seeker_id VARCHAR(255) NOT NULL,
    city_id BIGINT NOT NULL,
    PRIMARY KEY(seeker_id, city_id),
    FOREIGN KEY (seeker_id) REFERENCES seekers(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Bảng seeker vs skill ( skill của ứng viên )
CREATE TABLE seeker_skill (
	seeker_id VARCHAR(255) NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY(seeker_id, skill_id),
    FOREIGN KEY (seeker_id) REFERENCES seekers(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);


-- Bảng company vs skill ( skill chính của công ty )
CREATE TABLE company_skill (
	company_id VARCHAR(255) NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY(company_id, skill_id),
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);


-- Bảng job vs skill (skill yêu cầu của công việc)
CREATE TABLE job_skill (
  job_id BIGINT NOT NULL,
  skill_id BIGINT NOT NULL,
  PRIMARY KEY (job_id, skill_id),
  FOREIGN KEY (job_id)   REFERENCES jobs(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);