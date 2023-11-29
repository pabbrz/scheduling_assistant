CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY,
    user_id VARCHAR(8) NOT NULL,
    appointment_id INT NOT NULL,
    notification_message TEXT NOT NULL,
    notification_time_sent DATETIME NOT NULL,
    notification_status VARCHAR(15) NOT NULL DEFAULT 'Unread',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    FOREIGN KEY (appointment_id) REFERENCES Apointments(appointment_id)
);

-- Example of record to be inserted into the "Notifications Table."
INSERT INTO Notifications (notification_id, user_id, appointment_id, notification_message, notification_time_sent, notification_status);
