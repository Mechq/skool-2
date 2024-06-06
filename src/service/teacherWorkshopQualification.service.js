const database = require("../database/database.connection");
const logger = require("../util/logger");

const teacherWorkshopQualificationService = {
    getAllByCustomerId: (id, callback) => {
        logger.info("get all teacherWorkshopQualificationService");

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error("Error getting teacherWorkshopQualificationService", err);
                callback(err, null);
                return;
            }

            connection.query(
                "SELECT * FROM workshop WHERE id IN (SELECT workshopId FROM teacherWorkshopQualification WHERE userId = ?)",
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error(
                            "Error getting teacherWorkshopQualificationService",
                            error
                        );
                        callback(error, null);
                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} teacherWorkshopQualification retrieved`,
                            data: results,
                        });
                    }
                }
            );
        });
    },

    setWorkshops: (workshops, teacherId, callback) => {
        console.log("workshops", workshops);
        console.log("Adding qualification for teacher", teacherId);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error("Error setting teacherWorkshopQualification", err);
                callback(err, null);
                return;
            }

            // First fetch existing qualifications
            connection.query(
                "SELECT workshopId FROM teacherWorkshopQualification WHERE userId = ?",
                [teacherId],
                function (fetchError, existingResults) {
                    if (fetchError) {
                        logger.error("Error fetching existing qualifications", fetchError);
                        connection.release();
                        callback(fetchError, null);
                        return;
                    }

                    const existingWorkshopIds = existingResults.map(item => item.workshopId);
                    const newWorkshops = workshops.filter(workshopId => !existingWorkshopIds.includes(workshopId));

                    if (newWorkshops.length === 0) {
                        // No new workshops to add
                        connection.release();
                        callback(null, {
                            status: 200,
                            message: "No new teacherWorkshopQualification to add",
                            data: [],
                        });
                        return;
                    }

                    const values = [];
                    for (const workshopId of newWorkshops) {
                        values.push([teacherId, workshopId]);
                    }

                    connection.query(
                        `INSERT INTO teacherWorkshopQualification (userId, workshopId) VALUES ?`,
                        [values],
                        function (insertError, results, fields) {
                            connection.release();

                            if (insertError) {
                                logger.error(
                                    "Error setting teacherWorkshopQualification",
                                    insertError
                                );
                                callback(insertError, null);
                            } else {
                                callback(null, {
                                    status: 200,
                                    message: "teacherWorkshopQualification set successfully",
                                    data: results,
                                });
                            }
                        }
                    );
                }
            );
        });
    },
};

module.exports = teacherWorkshopQualificationService;
