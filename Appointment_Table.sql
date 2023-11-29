CREATE TABLE Apointments (
    appointment_id INT PRIMARY KEY,
    appointment_start_time TIMESTAMP NOT NULL,
    appointment_end_time TIMESTAMP NOT NULL,
    user_id VARCHAR(8) NOT NULL,
    resource_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (resource_id) REFERENCES Resources(resource_id),
    CHECK (appointment_start_time < appointment_end_time)

);

-- Example of record to be inserted into the "Apointments Table."
INSERT INTO Apointments (appointment_id, appointment_start_time, appointment_end_time, user_id, resource_id)
VALUES (1, '2023-11-28 09:30:00', '2023-11-01 11:45:00', '1', '1');