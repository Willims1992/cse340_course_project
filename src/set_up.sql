-- Drop tables correctly
DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;

-- ========================================
-- Organization Table
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

-- ✅ Create service_project AFTER organization
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_org
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

-- Verify
SELECT * FROM organization;
SELECT * FROM service_project
