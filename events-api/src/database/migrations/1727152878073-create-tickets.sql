-- UP
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id TEXT PRIMARY KEY,  -- Corrected from 'ticked_id'
    ticket_quantity INTEGER NOT NULL,
    ticket_price DECIMAL NOT NULL,
    event_id TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- DOWN
DROP TABLE IF EXISTS tickets;
