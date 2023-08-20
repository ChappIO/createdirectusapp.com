+++
title = "Commit Your Schema to Git"
weight = 2
pre = "<b>1.2 </b>"
+++

In the previous step we've set up a directus project.
Now we want to export our schema when we change it.

Add a new script to `directus-app/package.json`:

```json
{
  "name": "directus-app",
  ...
  "scripts": {
    ...
    "dump": "run-p dump:**",
    "dump:schema": "directus schema snapshot -y ./schema.yml"
  }
}

```

And add the forwarder to the root `package.json`:

```json
{
  "private": true,
  ...
  "scripts": {
    ...
    "dump": "wsrun -m dump"
  },
  ...
}
```

Now run `yarn dump` to save your schema to `directus-app/schema.yml`.
Confirm that this file exists.

Next we will add a script to `directus-app/package.json` to load this schema when directus starts:

```json
{
  "name": "directus-app",
  ...
  "scripts": {
    ...
    "dev:bootstrap": "directus bootstrap",
    "dev:schema": "directus schema apply ./schema.yml",
    "dev:start": "directus start",
    ...
  }
}

```


{{% notice warning %}}
Make sure you place the `dev:schema` script in the same place as in the example above.
The order is important because it determines the order in which `run-s` runs the scripts.
The schema apply will fail if the database has not been bootstrapped.
{{% /notice %}}


Now, when you check out your project, you will be able to run `yarn install` followed by `yarn dev` and your
directus instance will be immediately available for you.
