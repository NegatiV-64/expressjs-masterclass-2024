-- UP
CREATE TABLE tickets (
    ticket_id TEXT PRIMARY KEY,
    ticket_quantity INTEGER NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    ticket_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_id TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE
);
-- DOWN
DROP TABLE IF EXISTS tickets;