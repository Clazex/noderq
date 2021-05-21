# noderq

*A module providing short-hands for some commands*

## Usage

```bash
# In terminal
npx noderq <magic string>
# Remove `npx` prefix when in `package.json`
```

The `node` used is the same one that executed this command.

## Magic String Reference

A `magic string` contains a sequence of characters, each represents for a module to be `require`-d using `-r`.

| Character |             Module              |
| :-------: | :-----------------------------: |
|     b     |         @babel/register         |
|     c     |      coffeescript/register      |
|     e     |               esm               |
|     t     |        ts-node/register         |
|     T     | ts-node/register/transpile-only |
|     v     |        v8-compile-cache         |

*All modules have to be installed separately.*

Modules will be `require`-d in the order in which the corresponding character in the `magic string` appear, except for `v8-compile-cache`, who will always be the first one to be `require`-d.

Specially, the `l` character in the `magic string` will cause locally installed `node` to be used instead (using `npx --no-install node`).
