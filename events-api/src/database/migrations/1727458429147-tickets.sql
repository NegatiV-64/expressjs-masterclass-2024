-- UP
CREATE TABLE IF NOT EXISTS tickets (
                                       ticket_id TEXT PRIMARY KEY,
                                       ticket_quantity INTEGER NOT NULL,
                                       ticket_price DECIMAL NOT NULL,
                                       event_id TEXT NOT NULL,
                                       FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
    );

-- DOWN
DROP TABLE IF EXISTS tickets;