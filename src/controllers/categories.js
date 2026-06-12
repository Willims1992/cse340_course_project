// Import any needed model functions
import { getAllCategories } from '../models/categories.js';
import { getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

//  Categories list page
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title: 'Service Categories', categories });
};

//  ADD THIS (Category details page)
const showCategoryDetailsPage = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryById(id);
    const projects = await getProjectsByCategoryId(id);

    res.render('category', {
        title: category.name,
        category,
        projects
    });
};

// ✅ Export BOTH
export { showCategoriesPage, showCategoryDetailsPage };