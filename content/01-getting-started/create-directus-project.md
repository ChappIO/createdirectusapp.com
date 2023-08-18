+++
title = "Create a Directus Project"
weight = 1
pre = "<b>1.1 </b>"
+++

Our first step is to structure our project.
Throughout his guide we will add multiple workspaces to the project

So we will start off by creating our root `package.json`:

```json
{
  "private": true,
  "workspaces": [
    "directus-app"
  ]
}
```

And our `directus-app/package.json`:

```json
{
  "name": "directus-app",
  "version": "0.0.0",
  "license": "MIT"
}
```

Then we install `directus`:

```bash
yarn workspace directus-app add directus
```

To be able to run directus, we need a database to connect to.
Let's set up a `postgres` database using `directus-app/docker-compose.yml`:

```yaml
version: "3.8"

services:
  database:
    image: postgres:15
    environment:
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus
    ports:
      - "5432:5432"
```

Now to run scripts we will install 2 utilities into our project: `wsrun` to run scripts across multiple workspaces and `npm-run-all` to run scripts sequentially or in parallel.

```bash
yarn add -D -W wsrun npm-run-all
```

We can now add our scripts to `directus-app` by editing `directus-app/package.json`:

```json
{
  "name": "directus-app",
  "version": "0.0.0",
  "license": "MIT",
  "dependencies": {
    ...
  },
  "scripts": {
    "dev": "run-s dev:**",
    "dev:docker": "docker compose up -d",
    "dev:bootstrap": "directus bootstrap",
    "dev:start": "directus start"
  }
}
```

And we will also add the `dev` script our root `package.json` which forwards the `dev` script to all our workspaces.
This will come in handy later:

```json
{
  "private": true,
  "workspaces": [
    "directus-app"
  ],
  "scripts": {
    "dev": "wsrun -m dev"
  }
}
```

And finally, configure your directus instance using `directus-app/.env`:

```.env
KEY=development key
SECRET=development secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin

DB_CLIENT=pg
DB_CONNECTION_STRING=postgresql://directus:directus@127.0.0.1/directus

EXTENSIONS_AUTO_RELOAD=true
```

Now you should be able to start directus:

``` bash
yarn dev
```

When you see the message `Server started at http://0.0.0.0:8055` you will be able to open directus on [http://localhost:8055](http://localhost:8055).