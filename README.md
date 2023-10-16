Please! Use Postman to test this task

## Running the app

```bash
# build
$ docker-compose up
```

## Request example

<hr/>
Request POST http://localhost:5000/api/registration

Body:

```JSON
{
    "email":"user@mail.com",
    "password":"12345"
}
```

Response:

```JSON
{
    "accestoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC4.......",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......",
    "user": {
        "email": "user6@mail.com",
        "id": "652d1a585c445b19edb540f0",
        "role": "Regular User"
    }
}
```

<hr/>

Request POST http://localhost:5000/api/login

Body:

```JSON
{
    "email":"user@mail.com",
    "password":"12345"
}
```

Response:

```JSON
{
    "accestoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC4.......",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......",
    "user": {
        "email": "user6@mail.com",
        "id": "652d1a585c445b19edb540f0",
        "role": "Regular User"
    }
}
```

<hr/>

Request POST http://localhost:5000/api/logout

Need coockies

Response:

```JSON
{
    "acknowledged": true,
    "deletedCount": 1
}
```

<hr/>

Request GET http://localhost:5000/api/refresh

Refresh you refresh token

Response:

```JSON
{
    "accestoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QG1haWwuY29tIiwiaWQiOiI2NTJjZjcyY2I2NjgyY2YxZGQwN2JlZWUiLCJyb2xlIjoiQm9zcyIsImlhdCI6MTY5NzQ1NTk5MiwiZXhwIjoxNjk3NDU3NzkyfQ.OmTbyntFVzsc2HenzpKNAHy77QKXCU7aD8WLzhHI8hk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QG1haWwuY29tIiwiaWQiOiI2NTJjZjcyY2I2NjgyY2YxZGQwN2JlZWUiLCJyb2xlIjoiQm9zcyIsImlhdCI6MTY5NzQ1NTk5MiwiZXhwIjoxNzAwMDQ3OTkyfQ.vP62rCKgH5puOqoXL0oMAvJoStNHtqHa-d7nFDtVbFs",
    "user": {
        "email": "user5@mail.com",
        "id": "652cf72cb6682cf1dd07beee",
        "role": "Boss"
    }
}
```

<hr/>

Request GET http://localhost:5000/api/users

refreshToken from req.cookies;

Response: 

    If you admin:

```JSON
{
    "users": [
        {
            "_id": "652cf72cb6682cf1dd07beee",
            "email": "user5@mail.com",
            "password": "$2b$04$Ahvq.YMlSM0cL82Sy53FY.fE.L3Zdx4SJUYGhDvzAMCdZt.SA2rs6",
            "boss": "652cf705b6682cf1dd07becf",
            "role": "Boss",
            "__v": 0
        },
        {
            "_id": "652cf720b6682cf1dd07bed6",
            "email": "user1@mail.com",
            "password": "$2b$04$oFw3qpWHDbX7cMji31FcVuLlX9CadhdUE.8DY.MYiHafH3HEAD9TK",
            "boss": "652cf72cb6682cf1dd07beee",
            "role": "Regular User",
            "__v": 0
        },
        {
            "_id": "652cf723b6682cf1dd07bedc",
            "email": "user2@mail.com",
            "password": "$2b$04$P8CC2J.bCOQTMr./bsqSpu2DGrAxQ3Oe7Kd7YdCEQpTDPgQoxRIVC",
            "boss": "652cf72cb6682cf1dd07beee",
            "role": "Boss",
            "__v": 0
        },
        {
            "_id": "652cf726b6682cf1dd07bee2",
            "email": "user3@mail.com",
            "password": "$2b$04$xLW.lfrrewTZ9VIee7Mo0OwrjMNawQF4bggR32.rcegFslbXpSldK",
            "boss": "652cf723b6682cf1dd07bedc",
            "role": "Regular User",
            "__v": 0
        },
        {
            "_id": "652cf729b6682cf1dd07bee8",
            "email": "user4@mail.com",
            "password": "$2b$04$rnbmX27x/or89GjDHnYkzugnRYd3JbQpyRweawPzBYLOVMyatKx92",
            "boss": "652cf723b6682cf1dd07bedc",
            "role": "Regular User",
            "__v": 0
        }
    ]
}
```

    If you boss:

```JSON
{
    "boss": [
        {
            "_id": "652cf72cb6682cf1dd07beee",
            "email": "user5@mail.com",
            "password": "$2b$04$Ahvq.YMlSM0cL82Sy53FY.fE.L3Zdx4SJUYGhDvzAMCdZt.SA2rs6",
            "boss": "652cf705b6682cf1dd07becf",
            "role": "Boss",
            "__v": 0
        }
    ],
    "users": [
        {
            "_id": "652cf720b6682cf1dd07bed6",
            "email": "user1@mail.com",
            "password": "$2b$04$oFw3qpWHDbX7cMji31FcVuLlX9CadhdUE.8DY.MYiHafH3HEAD9TK",
            "boss": "652cf72cb6682cf1dd07beee",
            "role": "Regular User",
            "__v": 0
        },
        {
            "_id": "652cf723b6682cf1dd07bedc",
            "email": "user2@mail.com",
            "password": "$2b$04$P8CC2J.bCOQTMr./bsqSpu2DGrAxQ3Oe7Kd7YdCEQpTDPgQoxRIVC",
            "boss": "652cf72cb6682cf1dd07beee",
            "role": "Boss",
            "__v": 0
        },
        {
            "user2@mail.com": [
                {
                    "_id": "652cf726b6682cf1dd07bee2",
                    "email": "user3@mail.com",
                    "password": "$2b$04$xLW.lfrrewTZ9VIee7Mo0OwrjMNawQF4bggR32.rcegFslbXpSldK",
                    "boss": "652cf723b6682cf1dd07bedc",
                    "role": "Regular User",
                    "__v": 0
                },
                {
                    "_id": "652cf729b6682cf1dd07bee8",
                    "email": "user4@mail.com",
                    "password": "$2b$04$rnbmX27x/or89GjDHnYkzugnRYd3JbQpyRweawPzBYLOVMyatKx92",
                    "boss": "652cf723b6682cf1dd07bedc",
                    "role": "Regular User",
                    "__v": 0
                }
            ]
        }
    ]
}
```

    if you Regular User: 

```JSON
{
    "_id": "652cf723b6682cf1dd07bedc",
    "email": "user2@mail.com",
    "password": "$2b$04$P8CC2J.bCOQTMr./bsqSpu2DGrAxQ3Oe7Kd7YdCEQpTDPgQoxRIVC",
    "boss": "652cf72cb6682cf1dd07beee",
    "role": "Boss",
    "__v": 0
},
```
<hr/>



Request POST http://localhost:5000/api/changeboss

Body: 

```JSON
{
    "email": "user1@mail.com", // user that need change boss
    "bossEmailFrom":"user3@mail.com", // current boss
    "bossEmailTo":"user5@mail.com" // next boss
}
```

Response: 

```JSON
{
    "newUser": {
        "_id": "652cf720b6682cf1dd07bed6",
        "email": "user1@mail.com",
        "password": "$2b$04$oFw3qpWHDbX7cMji31FcVuLlX9CadhdUE.8DY.MYiHafH3HEAD9TK",
        "boss": "652cf72cb6682cf1dd07beee",
        "role": "Regular User",
        "__v": 0
    },
    "bossFrom": {
        "_id": "652cf726b6682cf1dd07bee2",
        "email": "user3@mail.com",
        "password": "$2b$04$xLW.lfrrewTZ9VIee7Mo0OwrjMNawQF4bggR32.rcegFslbXpSldK",
        "boss": "652cf723b6682cf1dd07bedc",
        "role": "Regular User",
        "__v": 0
    },
    "bossTo": {
        "_id": "652cf72cb6682cf1dd07beee",
        "email": "user5@mail.com",
        "password": "$2b$04$Ahvq.YMlSM0cL82Sy53FY.fE.L3Zdx4SJUYGhDvzAMCdZt.SA2rs6",
        "boss": "652cf705b6682cf1dd07becf",
        "role": "Boss",
        "__v": 0
    }
}
```
<hr/>