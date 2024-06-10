const logger = require("../util/logger");
const database = require('../database/database.connection');

let languageService = {
    getAll: (callback) => {
        logger.info('Retrieving all languages');

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error connecting to database', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT name FROM language';

            logger.debug('query', query);

            connection.query(query, (error, results, fields) => {
                connection.release();

                if (error) {
                    logger.error('Error retrieving languages', error);
                    callback(error, null);
                } else {
                    logger.trace('Languages retrieved', results);

                    callback(null, {
                        status: 200,
                        message: 'Languages retrieved',
                        data: results,
                    });
                }
            });
        });
    },

    setLanguages: (languages, userEmail, callback) => {
        console.log("languages", languages);
        console.log("Adding languages for teacher", userEmail);
    
        database.getConnection((err, connection) => {
            if (err) {
                logger.error("Error setting languages", err);
                callback(err, null);
                return;
            }
    
            // Get teacherId
            connection.query("SELECT id FROM user WHERE email = ?", [userEmail], (fetchError, results) => {
                if (fetchError) {
                    logger.error("Error fetching teacherId", fetchError);
                    connection.release();
                    callback(fetchError, null);
                    return;
                }
    
                const teacherId = results[0].id;
    
                // Delete existing qualifications
                connection.query("DELETE FROM userLanguageQualification WHERE userId = ?", [teacherId], (deleteError) => {
                    if (deleteError) {
                        logger.error("Error deleting existing qualifications", deleteError);
                        connection.release();
                        callback(deleteError, null);
                        return;
                    }
    
                    if (languages.length === 0) {
                        // No new languages to add
                        connection.release();
                        callback(null, {
                            status: 200,
                            message: "No new languages to add",
                            data: [],
                        });
                        return;
                    }
    
                    const values = languages.map(languageId => [teacherId, languageId]);
    
                    connection.query("INSERT INTO userLanguageQualification (userId, languageId) VALUES ?", [values], (insertError, results, fields) => {
                        connection.release();
    
                        if (insertError) {
                            logger.error("Error setting user languages", insertError);
                            callback(insertError, null);
                        } else {
                            callback(null, {
                                status: 200,
                                message: "Languages set successfully",
                                data: results,
                            });
                        }
                    });
                });
            });
        });
    }
    
};

module.exports = languageService;
