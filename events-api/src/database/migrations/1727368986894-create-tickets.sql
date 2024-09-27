-- UP
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id TEXT PRIMARY KEY,
    ticket_quantity INT NOT NULL,
    ticket_price DECIMAL NOT NULL,
    event_id TEXT NOT NULL,
    ticket_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- DOWN
DROP TABLE IF EXISTS tickets;
