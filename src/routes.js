import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewProjectForm, processNewProjectForm } from './controllers/projects.js';
import { projectValidation } from './controllers/projects.js';
import {showAssignCategoriesForm, processAssignCategoriesForm} from './controllers/categories.js';

const router = express.Router();

// ✅ Main pages
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// ✅ Details pages
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// ✅ Form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// ✅ Error route
router.get('/test-error', testErrorPage);


// Route to handle the edit organization form submission
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm, projectValidation);

// Route to display the assign categories form
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);

// Route to handle the assign categories form submission
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

export default router;