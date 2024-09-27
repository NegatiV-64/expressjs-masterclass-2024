-- CreateTable
CREATE TABLE "Event" (
    "event_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "event_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" TEXT NOT NULL,
    "ticket_quantity" INTEGER NOT NULL,
    "ticket_price" DOUBLE PRECISION NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
