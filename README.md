# candidate-skill-rating-assignment
# Steps : 
1. yarn install
2. Update env file to connect local postgreSQL DB
3. Run migrations : NODE_ENV=local npm run typeorm -- migration:run
4. npm run start : To start the project

# Required API EndPoints 
1. POST : /auth/register -> To register user
2. PUT: /user-responses/rate/:candidateId -> To rate candidate response
3. GET : /user-responses/aggregate/:candidateId -> To get aggregate score of user based on skillId

# Entities 
1. User - id, name, email , password ( hashPass), role (candidate/reviewer) 
2. UserResponses -> id, question, response, difficulty (easy, medium, hard), skillId (1 to 100 allowed ), rating (0 to 5 allowed), candidateId ( foreign key for user as candidate)

