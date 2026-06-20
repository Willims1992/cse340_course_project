import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    /*const query = `
        SELECT user_id, name, email, password_hash, role_id 
        FROM users 
        WHERE email = $1
        this was originally in the code but I changed it to include the role name instead of just the role_id
    `;*/
    const query = `
      SELECT u.user_id, u.email, u.password_hash, r.role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.role_id
      WHERE u.email = $1
  `;
    const queryParams = [email];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    return result.rows[0];
};

// ✅ Helper function (NOT exported)
const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// ✅ Main function (THIS is what you export)
const authenticateUser = async (email, password) => {
    try {
        // 1. Find user by email
        const user = await findUserByEmail(email);

        // 2. If user not found → return null
        if (!user) {
            return null;
        }

        // 3. Verify password
        const isValid = await verifyPassword(password, user.password_hash);

        // 4. If password correct → remove hash and return user
        if (isValid) {
            const { password_hash, ...safeUser } = user;
            return safeUser;
        }

        // 5. If password incorrect → return null
        return null;

    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
};

const getAllUsers = async () => {
    const query = `
        SELECT 
            u.user_id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.name
    `;

    const result = await db.query(query);
    return result.rows;
};


export { createUser, authenticateUser,getAllUsers};