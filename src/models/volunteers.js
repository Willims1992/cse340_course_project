import db from './db.js';

/**
 * Add a user as a volunteer for a service project.
 *
 * A user cannot sign up for the same project more than once.
 *
 * @param {number} userId - ID of the logged-in user.
 * @param {number} projectId - ID of the service project.
 * @returns {Promise<boolean>} True if a signup was created.
 */
const addVolunteerToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING user_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rowCount > 0;
};

/**
 * Remove a user's volunteer signup from a project.
 *
 * @param {number} userId - ID of the logged-in user.
 * @param {number} projectId - ID of the service project.
 * @returns {Promise<boolean>} True if a signup was removed.
 */
const removeVolunteerFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1
          AND project_id = $2
        RETURNING user_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rowCount > 0;
};

/**
 * Check whether a user is already volunteering for a project.
 *
 * @param {number} userId - ID of the logged-in user.
 * @param {number} projectId - ID of the service project.
 * @returns {Promise<boolean>}
 */
const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteer
        WHERE user_id = $1
          AND project_id = $2
        LIMIT 1;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rowCount > 0;
};

/**
 * Retrieve all projects for which a user has volunteered.
 *
 * @param {number} userId - ID of the logged-in user.
 * @returns {Promise<Array>}
 */
const getVolunteeredProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM project_volunteer pv
        JOIN service_project sp
            ON pv.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY sp.date ASC, sp.title ASC;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

export {
    addVolunteerToProject,
    removeVolunteerFromProject,
    isUserVolunteering,
    getVolunteeredProjectsByUserId
};