import {
    addVolunteerToProject,
    removeVolunteerFromProject
} from '../models/volunteers.js';

/**
 * Add the logged-in user as a volunteer for a project.
 */
const processAddVolunteer = async (req, res) => {
    const userId = req.session.user?.user_id;
    const projectId = Number(req.params.projectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        req.flash('error', 'Invalid project.');
        return res.redirect('/projects');
    }

    try {
        const added = await addVolunteerToProject(userId, projectId);

        if (added) {
            req.flash('success', 'You are now volunteering for this project.');
        } else {
            req.flash('success', 'You are already volunteering for this project.');
        }

        return res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error adding volunteer:', error);
        req.flash('error', 'Unable to sign up for this project. Please try again.');
        return res.redirect(`/project/${projectId}`);
    }
};

/**
 * Remove the logged-in user's volunteer signup.
 */
const processRemoveVolunteer = async (req, res) => {
    const userId = req.session.user?.user_id;
    const projectId = Number(req.params.projectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        req.flash('error', 'Invalid project.');
        return res.redirect('/dashboard');
    }

    try {
        const removed = await removeVolunteerFromProject(userId, projectId);

        if (removed) {
            req.flash('success', 'You have withdrawn from this project.');
        } else {
            req.flash('error', 'You are not signed up for this project.');
        }

        // Return to the page where the user initiated the action.
        const referer = req.get('Referer');

        if (referer && new URL(referer).origin === `${req.protocol}://${req.get('host')}`) {
            return res.redirect(referer);
        }

        return res.redirect('/dashboard');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'Unable to withdraw from this project. Please try again.');
        return res.redirect('/dashboard');
    }
};

export {
    processAddVolunteer,
    processRemoveVolunteer
};