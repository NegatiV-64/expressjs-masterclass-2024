-- UP
CREATE TABLE IF NOT EXISTS events (
    event_id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_description TEXT NOT NULL,
    event_location TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    event_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id TEXT PRIMARY KEY,
    ticket_quantity INTEGER NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    event_id TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);


-- DOWN
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS tickets;