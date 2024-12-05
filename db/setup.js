async function createTables(pool){
    try{

        const createAuthorsTable = `
            CREATE TABLE IF NOT EXISTS authors(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                surname VARCHAR(100) NOT NULL,
                patronymic VARCHAR(100)
            )
        `;
        

        const createGenresTable = `
            CREATE TABLE IF NOT EXISTS genres(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE NOT NULL
            )
        `;

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            )
        `;

        const createStatusesTable = `
            CREATE TABLE IF NOT EXISTS statuses(
                id SERIAL PRIMARY KEY,
                username_id INTEGER REFERENCES users(id) NOT NULL,
                loan_date DATE NOT NULL,
                return_date DATE NOT NULL,
                count INTEGER
            )
        `;

        const createBooksTable = `
            CREATE TABLE IF NOT EXISTS book(
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
                genre VARCHAR(100) REFERENCES genres(name) ON DELETE CASCADE ,
                status INTEGER REFERENCES statuses(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;


        await pool.query(createAuthorsTable)
        console.log('Authors table created.')

        await pool.query(createUsersTable)
        console.log('Users table created.')

        await pool.query(createGenresTable)
        console.log('Genre table created.')

        await pool.query(createStatusesTable)
        console.log('Statuses table created.')

        await pool.query(createBooksTable)
        console.log('Books table created.')
    } catch (error) {
        console.error('Error creating tables:', error.message)
    }
}

module.exports = createTables