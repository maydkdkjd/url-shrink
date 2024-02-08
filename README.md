# Lil URL - A url shortener

🚀 View the [live demo]((https://lil-url.onrender.com/login).

## Usage

### Setting up the environment

```sh
# clone the repository
git clone https://github.com/tripathics/url-shortener
cd url-shortener    # cd into the server directory
npm i               # install packages
touch .env          # create .env file at the root of the project
```

Open the `.env` file and set it as follows. The values are for demo purpose only. Enter your own values accordinglly

```.env
SERVER_PORT=5000                            # Server will run on this port
PORT=3000                                   # React Development server port
DB_URI="mongodb://user:password@127.0.0.1"  # MongoDB URI
DB_NAME='mydb'                              # Database name
JWT_SECRET='secret'                         # JWT public key
NODE_ENV='development'                      # development environment
CLIENT_URL='http://localhost:3000'          # for CORS during development
```

### Running the application (Scripts)

```sh
npm start       # start development servers (frontend and backend concurrently)
npm run build   # build the application (client)
npm run serve   # serve the production build
```

**Development**

The server will run at `http://localhost:SERVER_PORT` and client at `http://localhost:PORT`.

**Production**

During production, the react frontend is served from Express from the `build` folder and the server runs at `http://localhost:SERVER_PORT`.
