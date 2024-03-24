# App

Urbaniza

## Functional requirements

- [x] User can register providing name, email and password;
- [x] User can authenticate providing their email and password;
- [] User must accept the terms of use, in accordance with LGPD, in order to authenticate in the app;
- [] User must confirm their email before authenticating;
- [] Authenticated user can see their own profile containing their information excepting the password;
- [] Authenticated user can change their profile picture;
- [] Authenticated user can change their password;
- [] Authenticated user can change their notifications status;

## Business rules

- [x] User cannot register with duplicate email;
- [] Authenticated user cannot change their profile picture twice a day;
- [] Authenticated user cannot change their password twice a day;
- [] Authenticated user can only change their password after confirming by email;

## Non-functional requirements

- [x] User's password must be encrypted;
- [] Data must be persisted in an SQL database;