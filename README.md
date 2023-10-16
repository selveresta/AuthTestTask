Please!
Use Postman to test this task

## Running the app

```bash
# build
$ docker-compose up
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Request example

Request POST
http://localhost:5000/api/registration
<hr/>
Body:

{
    "email":"user@mail.com",
    "password":"12345"
}

Response:

{
    "accestoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI2QG1haWwuY29tIiwiaWQiOiI2NTJkMWE1ODVjNDQ1YjE5ZWRiNTQwZjAiLCJyb2xlIjoiUmVndWxhciBVc2VyIiwiaWF0IjoxNjk3NDU0NjgxLCJleHAiOjE2OTc0NTY0ODF9.ZaCnbeH0qjdDJ2T_gwjTw1QHczDABjE8G0zpNF7A4g4",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI2QG1haWwuY29tIiwiaWQiOiI2NTJkMWE1ODVjNDQ1YjE5ZWRiNTQwZjAiLCJyb2xlIjoiUmVndWxhciBVc2VyIiwiaWF0IjoxNjk3NDU0NjgxLCJleHAiOjE3MDAwNDY2ODF9.s7RFSVQZeFIdWgtl26GjTruLjzKzubkwN8z1CtuDVW8",
    "user": {
        "email": "user6@mail.com",
        "id": "652d1a585c445b19edb540f0",
        "role": "Regular User"
    }
}
<hr/>



Request POST
http://localhost:5000/api/login
<hr/>
Body:

{
    "email":"user@mail.com",
    "password":"12345"
}

Response:

{
    "accestoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI2QG1haWwuY29tIiwiaWQiOiI2NTJkMWE1ODVjNDQ1YjE5ZWRiNTQwZjAiLCJyb2xlIjoiUmVndWxhciBVc2VyIiwiaWF0IjoxNjk3NDU0NjgxLCJleHAiOjE2OTc0NTY0ODF9.ZaCnbeH0qjdDJ2T_gwjTw1QHczDABjE8G0zpNF7A4g4",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI2QG1haWwuY29tIiwiaWQiOiI2NTJkMWE1ODVjNDQ1YjE5ZWRiNTQwZjAiLCJyb2xlIjoiUmVndWxhciBVc2VyIiwiaWF0IjoxNjk3NDU0NjgxLCJleHAiOjE3MDAwNDY2ODF9.s7RFSVQZeFIdWgtl26GjTruLjzKzubkwN8z1CtuDVW8",
    "user": {
        "email": "user6@mail.com",
        "id": "652d1a585c445b19edb540f0",
        "role": "Regular User"
    }
}
<hr/>
