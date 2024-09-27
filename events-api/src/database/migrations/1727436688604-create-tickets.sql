-- UP
CREATE TABLE tickets (
    ticket_id UUID PRIMARY KEY,
    ticket_quantity INTEGER NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    event_id UUID NOT NULL,
    CONSTRAINT fk_events
        FOREIGN KEY (event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE
    );
-- DOWN
DROP TABLE IF EXISTS tickets;