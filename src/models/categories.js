import db from './db.js';


//  Get ALL categories 
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category
        ORDER BY name;
    `;
    const result = await db.query(query);
    return result.rows;
};


//  1. Get ONE category by ID
const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, name
        FROM category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
};


//  2. Get ALL categories for a given project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT 
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};


//  3. Get ALL projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT 
            sp.project_id,
            sp.title
        FROM service_project sp
        JOIN project_category pc
        ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.title;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};


//  EXPORT ALL FUNCTIONS
export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};