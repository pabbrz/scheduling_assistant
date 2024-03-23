CREATE TABLE Resources (
    resource_id INT PRIMARY KEY,
    resource_name VARCHAR(75) NOT NULL,
    resource_description VARCHAR(200),
    resource_status VARCHAR(15) NOT NULL DEFAULT 'Available'

);

-- Example of record to be inserted into the "Resources Table."
INSERT INTO Resources (resource_id, resource_name, resource_description)
VALUES (1, 'Conference Room 3E03', 'A conference room on the east section of the third floor with 9 tables and 45 chairs.', 'Occupied');