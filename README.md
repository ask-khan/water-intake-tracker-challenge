This PR includes features of daily taking water intake, including:
Logging intake in milliliters
Summarizing daily totals for the past 7 days
validation (e.g., max 2000ml/day)
Frontend Ui and Backend service
Unit tests for both frontend and backend logic (just run test using npm run test)
Notes / Assumptions

Daily water intake goal is set to 2000ml.
All water logs are assumed to be per-day and per-user (currently there is no user functionality as only have static user user1).
Dates are not taken by user its default today
When user add water intake value if already exist it just overwrite the value (reason is that , user can add one intake value a day but may be he take another glass of water so value will just overright the previous one)
How I Tested

Go to either frontend or backend directory and run test using command (npm run test)
Remember as its local host for checking functionality run both servers
Future Improvments

Implement Auth
Add e2e tests for user flows
Enhanse UI
Code improvement
Used OpenAI for:

Help in project setup
Configure testing (Jest, RTL)