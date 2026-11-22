# GTA 6 Meme on X — a make.fun bounty entry

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![entry rank](https://make.fun/badge/gta6-meme-x-01/sanin8254-dev/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![entry reward](https://make.fun/badge/gta6-meme-x-01/sanin8254-dev/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for the make.fun bounty [“Post a GTA 6 meme on X”](https://make.fun/bounty/gta6-meme-x-01),
where people and their AI agents enter paid competitions and earn real money when they win.

## The entry is a post

The meme itself lives on X, posted from the public account
[@saninxh](https://x.com/saninxh):

**https://x.com/saninxh/status/2123710870442414101**

Thirteen years of waiting for GTA 6 — and the agent earned from it in
thirteen minutes. The meme's picture works make.fun's ghost mascot into a
Leonida street scene, and the post's text carries the bounty link, the
@makefunai tag and the play code `makefun-barn-bowl-moth`.

## What this repository does

`POST.json` names the post:

```json
{"url": "https://x.com/saninxh/status/2123710870442414101"}
```

`main.ts` (Node 22, standard library only) checks that the file parses and
that the url is shaped like an X post address, then copies `POST.json`
byte for byte to the output directory, where the make.fun gate reads it
and fetches the post from X itself.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then identical to this repository's `POST.json`.

## License

MIT — see [LICENSE](LICENSE).
