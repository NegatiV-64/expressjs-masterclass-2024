# Homework task for ExpressJS Masterclass

## Prerequisites

- Node.js installed on your machine
- Git installed on your machine and a GitHub account
- Basic knowledge of branching and pull (merge) requests in Git and GitHub
- API client (Postman, Insomnia, Httpie, etc.) for testing the API endpoints

## Installation for Homework

1. Clone this repository to your local machine

    ```bash
    git clone https://github.com/NegatiV-64/expressjs-masterclass-2024.git  expressjs-masterclass
    cd expressjs-masterclass
    ```

2. Create a new branch with your initials

    ```bash
    git checkout -b feat/your-initials/ homework
    # Example: git checkout -b feat/ab(Aziz Bektemirov)/homework
    ```

3. Go to the `events-api` directory and install the dependencies

    ```bash
    cd events-api
    npm install
    ```

## Homework Task

Your task is to update the events API to include the following features:

- Add a new route for events to create a new event.

    The route should be a `POST` request to `/events` and should accept a JSON object with the following properties:

  - `eventName` (string): The name of the event - required
  - `eventDescription` (string): A description of the event - required
  - `eventLocation` (string): The location of the event - required
  - `eventDate` (string): The date of the event in `YYYY-MM-DDTHH:mm` format - required

    The DTO should be validated using the `zod` library and return a 400 status code with the validation errors if the DTO is invalid.

    This endpoint should return a 201 status code with the created event object in the response body.

- Add a new route for events to update an existing event.

    The route should be a `PATCH` request to `/events/:eventId` and should accept a JSON object with the following properties:

  - `eventName` (string): The name of the event - optional
  - `eventDescription` (string): A description of the event - optional
  - `eventLocation` (string): The location of the event - optional
  - `eventDate` (string): The date of the event in `YYYY-MM-DDTHH:mm` format - optional

    The DTO should be validated using the `zod` library and return a 400 status code with the validation errors if the DTO is invalid.

    The eventId parameter should be validated to ensure it is a valid UUID and return a 400 status code with an error message if it is not.

    This endpoint should return a 200 status code with the updated event object in the response body.

- Add a new route for events to delete an existing event.

    The route should be a `DELETE` request to `/events/:eventId`.

    The eventId parameter should be validated to ensure it is a valid UUID and return a 400 status code with an error message if it is not.

    This endpoint should return a 204 status code with the event that was deleted.

- Add a new migration to the `events-api` project to create a new `tickets` table.

    The `tickets` table should have the following columns:

  - `ticket_id` (UUID): The primary key for the ticket
  - `ticket_quantity` (integer): The quantity of tickets available for the event - not null
  - `ticket_price` (decimal): The price of the ticket - not null
  - `event_id` (UUID): The foreign key to the event that the ticket is for - not null

    Create a foreign key constraint between the `event_id` column in the `tickets` table and the `event_id` column in the `events` table. Events and tickets should have a one-to-many relationship (one event can have many tickets). Please refer to the [database schema](./database-schema.png) for the table structure.

    Migration should be created using special commands in the project (see `package.json` for the commands).

- Add a new route for tickets to create a new ticket for an event.

    The route should be a `POST` request to `/tickets` and should accept a JSON object with the following properties:

  - `ticketQuantity` (integer): The quantity of tickets available for the event - required
  - `ticketPrice` (decimal): The price of the ticket - required
  - `eventId` (string): The ID of the event that the ticket is for - required

    The DTO should be validated using the `zod` library and return a 400 status code with the validation errors if the DTO is invalid.

    If the event does not exist, return a 400 status code with an error message.

    This endpoint should return a 201 status code with the created ticket object in the response body.

- Add a new route to get all tickets for an event.

    The route should be a `GET` request to `/events/:eventId/tickets`.

    The eventId parameter should be validated to ensure it is a valid UUID and return a 400 status code with an error message if it is not.

    This endpoint should return a 200 status code with an array of ticket objects in the response body.

- Add a new route to get a single ticket for an event.

    The route should be a `GET` request to `/tickets/:ticketId`.

    The ticketId parameter should be validated to ensure it is a valid UUID and return a 400 status code with an error message if it is not.

    If the ticket does not exist, return a 404 status code with an error message.

    This endpoint should return a 200 status code with the ticket object in the response body as well as the event object that the ticket is for.

## How to Submit Your Homework

Submission of homework will be done through a pull request on GitHub. Follow these steps to submit your homework:

1. Commit your changes to your branch. You can commit as many times as you like.

    ```bash
    git add .
    git commit -m "feat: add new features to events API"
    ```

2. Push your branch to GitHub

    ```bash
    git push origin feat/your-initials/homework
    ```

3. Go to the GitHub repository and create a new pull request from your branch to the `main` branch.

4. In the pull request description, write a brief summary of the changes you made and attach a screenshots of the API client showing that the new features are working correctly using the API endpoints and the API testing client.

5. Assign the pull request to me (NegatiV-64) and request a review. This will notify me that your homework is ready for review. And it means that you have completed the homework.

6. Wait for me to review your pull request and provide feedback. If I am not reviewing your pull request within 24 hours, please send me a message in Microsoft Teams.

## Deadlines, Guidelines, and Late Submissions

- The deadline for submitting your homework is 23:59, Friday, 25th September 2024.
- Late submissions will not be accepted.
- If you are unable to complete the homework by the deadline, please let me know as soon as possible.
- The homework would be marked as submitted if you have created a pull request before the deadline. If you don't create a pull request, your homework will be considered as not submitted.
- If you have any questions or need help with the homework, please reach out to me on Microsoft Teams or personally.
- You can use any resources available to you to complete the homework, even AI (ChatGPT, etc.). You can try to cheat and just copy-paste the code from what GitHub Copilot or ChatGPT suggests, but you will not learn anything from it. I encourage you to try to solve the homework on your own, try not to use any AI tools, read the documentation, and ask for help from the groupmates or me if you need it. It's okay to ask for help, but it's not okay to cheat.

Good luck with your homework! 🚀
