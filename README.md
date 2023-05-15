## Description

[Star-wars-api](https://github.com/sambayour/star-wars-api) Star wars API.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoint

## baseUrl

Either of this baseurl can be used while testing the application

`https://lobster-app-5qld2.ondigitalocean.app`
or
`https://star-wars-service.onrender.com`

## Endpoint Documentation(Swagger)

The endpoints are properly documented with Swagger and can be access at
[digitalocean](https://lobster-app-5qld2.ondigitalocean.app/api/docs#)
or
[render](https://star-wars-service.onrender.com/api/docs#).

## movies

- GET - [all movies](https://lobster-app-5qld2.ondigitalocean.app/movies)

## movies comment

- GET - [get movies comments](https://lobster-app-5qld2.ondigitalocean.app/movies/2/comments)
- POST - [add movies comments](https://lobster-app-5qld2.ondigitalocean.app/movies/2/comments)

## characters

- GET -[allcharacters](https://lobster-app-5qld2.ondigitalocean.app/movies/characters)
- GET -[allcharacters sort by name asc](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?sort=name:asc)
- GET -[allcharacters sort by name desc](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?sort=name:desc)
- GET -[allcharacters filter by gender male](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?filter=male)
- GET -[allcharacters filter by gender female](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?filter=female)

## movies characters

- GET -[movieId 3 with characters](https://lobster-app-5qld2.ondigitalocean.app/movies/3/characters)
- GET -[sort movieId 3 characters by name asc](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?sort=name:asc)
- GET -[sort movieId 3 characters by name desc](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?sort=name:desc)
- GET -[filter movieId 3 characters by gender male](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?filter=male)
- GET -[filter movieId 3 characters by gender female](https://lobster-app-5qld2.ondigitalocean.app/movies/characters?filter=female)

## Stay in touch

- Author - [Samuel Olubayo](https://www.linkedin.com/in/samuelolubayo/)
- Medium - [@samuelolubayo](https://medium.com/@samuelolubayo)
- Devto - [sambayour](https://dev.to/sambayour)

## License

Nest is [MIT licensed](LICENSE).
