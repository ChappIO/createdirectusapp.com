+++
title = "Create an Extension"
weight = 3
pre = "<b>1.3 </b>"
+++

Now let's add some functionality to Directus in the form of an extension.
In this guide we will set up a `bundle` extension which is an extension that can contain features from all available types of extensions.

First we need to generate our extension files:

```yarn
yarn create directus-extension
```

*Choose the extension type:* `bundle`\
*Choose a name for the extension:* `directus-extension-example`

{{% notice warning %}}
It is important to prefix your extension name with `directus-extension-`.
If you don't, Directus will not load your extension.
{{% /notice %}}

And add this new package to your root `package.json`:

```json
{
  "private": true,
  "workspaces": [
    ...
    "directus-extension-example"
  ],
  ...
}
```

And add the extension as a dependency to `directus-app/package.json`.
Use version `"*"` to make sure yarn is always linking to your local package.

```json
{
  "name": "directus-app",
  "version": "0.0.0",
  "license": "MIT",
  "dependencies": {
    "directus": "^10.5.3",
    "directus-extension-example": "*"
  },
  ...
}

```

Now run `yarn install` in the root of your project to link the dependencies and run `yarn dev` to test your project.

You should see the following message in your console: `Loaded extensions: directus-extension-example`.
This means the extension was loaded.

## Optional: Autogenerate Directus TypeScript Definitions

I've created an extension called `directus-extension-models` which generates TypeScript types from your Directus collection.
This is particularly useful while developing Directus extensions.

Add the package:
```bash
yarn workspace directus-app add directus-extension-models
```

Then add a dump script to `directus-app/package.json`:

```json
{
  "name": "directus-app",
  ...
  "scripts": {
    ...
    "dump:models": "directus models snapshot ../directus-extension-example/src/models.d.ts"
  }
}
```

And run `yarn dump` to generate the type definition files.

You should now have a file at `directus-extension-example/src/models.d.ts` contains a bunch of Directus related types.

{{% notice tip %}}
You can optionally specify the `--global` flag to the `models` command to generate global type declarations for your
extension.
When you do this, you don't have to import your types. They will be globally available instead.
In that case, the command looks like this: `directus models snapshot --global ../directus-extension-example/src/models.d.ts`
{{% /notice %}}
