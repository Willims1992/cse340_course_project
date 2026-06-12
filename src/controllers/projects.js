
// Import any needed model functions
import { getCategoriesByProjectId } from '../models/categories.js';

import { getUpcomingProjects, getProjectDetails } from '../models/projects.js'
import { getAllProjects } from '../models/projects.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;
// Define any controller functions

//  Updated projects page controller
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    res.render('projects', {
        title: 'Upcoming Service Projects',
        projects
    });
};


//  NEW controller for project details page
const showProjectDetailsPage = async (req, res) => {
    // Get ID from URL
    const id = req.params.id;

    // Get project from database
    const project = await getProjectDetails(id);

    const categories = await getCategoriesByProjectId(id);

    // Render view
    res.render('project', {
        title: project.title,
        project,
        categories
    });
};



// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };