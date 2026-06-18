-- ========================================
-- DROP TABLES (correct order: child → parent)
-- ========================================
DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- ========================================
-- ORGANIZATION TABLE
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Insert Organizations
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- SERVICE PROJECT TABLE
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- Insert Service Projects
INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(1, 'Community Clean-Up', 'Cleaning local parks and streets', 'New York', '2026-06-15'),
(1, 'Food Drive', 'Collecting food donations', 'Chicago', '2026-07-01'),
(1, 'Tree Planting', 'Planting trees in urban areas', 'Los Angeles', '2026-08-10'),

(2, 'School Supplies Donation', 'Providing school kits for children', 'Texas', '2026-06-20'),
(2, 'Health Outreach', 'Free medical checkups', 'Florida', '2026-07-15'),
(2, 'Community Workshop', 'Skill training programs', 'Nevada', '2026-08-05'),

(3, 'Volunteer Recruitment', 'Registering new volunteers', 'Boston', '2026-06-25'),
(3, 'Clothing Donation', 'Collecting clothes for the needy', 'Seattle', '2026-07-10'),
(3, 'Charity Run', 'Fundraising marathon', 'Denver', '2026-08-18');

-- ========================================
-- CATEGORY TABLE
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Insert Categories
INSERT INTO category (name) VALUES
('Environment'),
('Health'),
('Education'),
('Community Service');

-- ========================================
-- PROJECT-CATEGORY (JOIN TABLE)
-- ========================================
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- Link Projects to Categories
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1),
(1, 4),
(2, 4),
(3, 1),
(4, 3),
(5, 2),
(6, 4),
(7, 4),
(8, 4),
(9, 1);

-- ========================================
-- ROLES TABLE
-- ========================================
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- Insert Roles
INSERT INTO roles (role_name, role_description)
VALUES 
('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');

-- ========================================
-- USERS TABLE
-- ========================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
);

-- Insert Test User (safe)
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1)
ON CONFLICT (email) DO NOTHING;

-- ========================================
-- VERIFY DATA
-- ========================================

-- View all users
SELECT * FROM users;

-- View roles
SELECT * FROM roles;

-- Join users and roles
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- View projects (future only)
SELECT sp.title, sp.date, o.name AS organization
FROM service_project sp
JOIN organization o ON sp.organization_id = o.organization_id
--WHERE sp.date >= CURRENT_DATE
ORDER BY sp.date DESC;








