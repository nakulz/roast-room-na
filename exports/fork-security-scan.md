---
cursor:
  subagentId: "bc-eb857161-4480-512f-86b4-c4f16a7f4b24"
---

# Roast Room fork: security scan and upstream push lock

Scan of `/workspace` (Roast Room) on 2026-10-23. The lock lives in this checkout’s local git config and hooks. `main` was not committed, and nothing was pushed.

## Remotes

`gh repo view` on this checkout:

- Fork: `nakulz/roast-room-na` (`https://github.com/nakulz/roast-room-na`), `isFork: true`, default branch `main`.
- Parent (the repo this was forked from): `nateherkai/roast-room` (`https://github.com/nateherkai/roast-room`).

`origin` is Nakul’s fork. It is not the parent.

### Before

Configured in `/workspace/.git/config` (no credential embedded in the stored URL):

| Remote | Fetch | Push |
|---|---|---|
| `origin` | `https://github.com/nakulz/roast-room-na` | same URL (no separate push URL) |

No `upstream` remote. `main` tracks `origin/main`.

A global `insteadOf` in the machine gitconfig rewrites `https://github.com/`, `git@github.com:`, and the `ssh://` / `git+ssh://` GitHub forms to an authenticated `https://` URL when git actually uses them. That rewrite does not change the repository path. It was left in place so fetch still authenticates. It is not a redirect onto the parent.

### After

| Remote | Fetch | Push |
|---|---|---|
| `origin` | `https://github.com/nakulz/roast-room-na` | unchanged (the fork). Not used. |
| `upstream` | `https://github.com/nateherkai/roast-room.git` | `file:///dev/null/refused-push-nateherkai-roast-room` |

`git fetch upstream main` succeeded and created `upstream/main`. The working tree and `main` were not merged or rebased.

## How push was disabled

All of this is local. Nothing was committed.

1. **Fetch-only parent remote.** `upstream` points at `nateherkai/roast-room`. Its push URL is a `file://` path that is not a GitHub remote, so a push cannot be sent to the parent even if the pre-push hook is skipped.
2. **`pushInsteadOf` (local config only).** Pushes whose URL starts with the parent repo are rewritten to that same refused `file://` path. Fetch is unchanged. Covered prefixes: `https://github.com/nateherkai/roast-room`, `www`, `http`, `git://`, `git@github.com:`, `ssh://git@github.com/`, `ssh://git@github.com:22/`, and the `git+ssh://` forms of those. This applies to the raw URL on push, so the global credential `insteadOf` does not turn a parent push into an authenticated GitHub request.
3. **Pre-push hook.** `/workspace/.git/hooks/pre-push` exits 1 with a clear error when the push URL or that remote’s fetch URL is the parent. It matches host `github.com` (optional `www`), path `nateherkai/roast-room` with an optional `.git`, any userinfo, SSH and HTTPS forms, and any letter case. It also matches the refused `file://` path. A push to `nakulz/roast-room-na` is allowed by the hook. The hook redacts `user:password@` before printing the URL.
4. **Hook actually runs.** This clone sets `core.hooksPath` to the Cursor dispatcher at `/home/ubuntu/.cursor/agent-hooks/L3dvcmtzcGFjZQ`. That directory had no `pre-push` entry, so a hook only in `.git/hooks` would never run. `pre-push` there is now a symlink to `.dispatcher`, which runs `/workspace/.git/hooks/pre-push` and stops when it exits non-zero.

Checked without `git push`: direct hook and dispatcher both refuse parent URLs (including a credentialed HTTPS URL and `git@` / `ssh://`) and allow the fork URL. `git fetch upstream main` still works.

`origin` was left able to push to the fork. This scan did not push.

Side effect: `pushInsteadOf` is prefix matching, so a different `nateherkai` repo whose URL starts with `…/nateherkai/roast-room` would also have pushes rewritten. `nakulz/roast-room-na` does not match.

## How to download updates

From `/workspace`. These commands fetch and update the local branch. They do not push.

```bash
git fetch upstream
git merge upstream/main
```

Or, if you prefer a linear history and you are comfortable rewriting local commits:

```bash
git fetch upstream
git rebase upstream/main
```

`main` still tracks `origin`. After either update, do not run `git push` if the goal is only to take upstream changes. Pushing `origin` would update the fork `nakulz/roast-room-na`, not the parent. Pushing `upstream` is refused.

## External communications

Runtime calls only. Citation links inside the advisor brain files are not fetched by the app.

| Path | What it contacts |
|---|---|
| `app/public/index.html` | On every page load the browser requests `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (Montserrat CSS). |
| `app/lib/anthropic.mjs` | `POST https://api.anthropic.com/v1/messages` with header `x-api-key` from `ANTHROPIC_API_KEY` (env or `.env`). Streaming and JSON calls. |
| `app/lib/council.mjs` | No HTTP of its own. In API runner mode it calls `anthropic.mjs` and writes session files under `sessions/`. |
| `app/scripts/smoke.mjs` | One Anthropic streaming call through `anthropic.mjs` (`npm run smoke`). |
| `app/server.mjs` | Listens on `127.0.0.1:4730` only. No outbound HTTP. Browser traffic is same-origin `/api/*` and server-sent events. |
| `app/public/app.js` | `fetch` only to same-origin `/api/sessions`, `/api/seats`, `/api/council`, `/api/usage`. |
| `app/public/pdf.js` | `fetch` of same-origin `/vendor/jspdf.umd.min.js` and `/brand/fonts/Montserrat-*.ttf`. |
| `app/lib/watch.mjs`, `app/lib/env.mjs`, `app/lib/seats.mjs` | Local files only. |
| `.claude/skills/newroaster/scripts/fetch.mjs` | Any URL passed on the command line (`redirect: "follow"`). YouTube ids go to `https://www.youtube.com/watch`, `POST https://www.youtube.com/youtubei/v1/player`, the caption URL returned by YouTube, and `yt-dlp` against YouTube when it is installed. `pdftotext` is local. |
| `.claude/skills/newroaster/scripts/portrait.mjs` | `POST https://kieai.redpandaai.co/api/file-base64-upload` (photo and style image). `POST https://api.kie.ai/api/v1/jobs/createTask`, `GET https://api.kie.ai/api/v1/jobs/recordInfo`, then `GET` of whatever result URL the API returns. `probe` calls `GET https://api.kie.ai/api/v1/chat/credit`. `photo` with an `http(s)` argument downloads that URL. Auth is `Bearer` `KIE_AI_API_KEY`. |
| `.claude/skills/newroaster/scripts/add_seat.mjs`, `build_portraits.py` | Local roster, brain, and image files. No network. |
| `package.json` | Scripts are `start` (`node app/server.mjs`) and `smoke`. No dependencies, no `postinstall` / `preinstall`. |
| `.env.example` | Empty `ANTHROPIC_API_KEY` and `KIE_AI_API_KEY`. Comments point at `https://console.anthropic.com/settings/keys` and `https://kie.ai/api-key`. No `.env` file is in this checkout. `.gitignore` ignores `.env`. |
| CI, Docker, hooks in the repo | No `.github` workflows, no Dockerfile, no compose file, no npm config, no tracked git hooks. |
| Git | Fetch/push talk to the GitHub remotes above. No other remotes. |

No websockets, analytics, telemetry SDKs, OAuth, email, or webhooks in first-party code. The vendored `app/public/vendor/jspdf.umd.min.js` file contains license and documentation URLs in comments. The PDF button path loads it from the same origin.

## Security issues

No hardcoded API keys, tokens, or private keys in the repo. No workflow that pushes or calls an external service.

### 1. Portrait upload and unbounded download — medium

` .claude/skills/newroaster/scripts/portrait.mjs`

Sends a real photo (and the style reference) to kie.ai / `kieai.redpandaai.co`, and sends `KIE_AI_API_KEY` as a bearer token. After the job, it downloads the first result URL the API puts in the JSON, with no host allowlist. `nsfw_checker` is sent as `false`.

Impact: photos and the API key leave the machine whenever this script runs. A hostile or compromised API response can make the script request an arbitrary URL and write the bytes into the portrait folder.

Fix direction: keep the upload opt-in and documented; allowlist result hosts (or require the result host to be `api.kie.ai` / the known CDN); refuse redirects to other hosts; do not log the bearer token.

### 2. Unauthenticated local API can spend the Anthropic key — medium when API mode is on

`app/server.mjs`, `app/lib/anthropic.mjs`, `app/lib/council.mjs`

The server binds `127.0.0.1` and has no auth. `POST /api/council` starts a council on `ANTHROPIC_API_KEY` when `COUNCIL_RUNNER=api`. The default runner is `viewer`, and that POST returns 403. `GET /api/sessions` and `GET /api/seats` are open on localhost either way. `/api/seats` reports whether a key is present, not the key. Anthropic error text (up to 300 characters) can be returned to the client.

Impact: any local process can read session history (the founder’s numbers and decisions). With API mode on, any local process can start billable Anthropic calls. Cross-origin browser reads are blocked because the server sends no CORS headers. A JSON POST from another site is a preflighted request and does not get a CORS success.

Fix direction: leave the default runner as `viewer`. If API mode is needed, require a local secret on `/api/council` and bind only to localhost (already done). Avoid returning upstream error bodies to the page.

### 3. Source fetcher will request any URL — medium-low

`.claude/skills/newroaster/scripts/fetch.mjs`

Operator-supplied URLs are fetched with redirects followed. There is no allowlist and no block on link-local, loopback, or private addresses. YouTube handling also requests caption URLs taken from YouTube’s response.

Impact: a URL pointed at a cloud metadata address or an internal service will be requested, and the body can be written into `build/…/corpus`. This is a local CLI, not a listening service. It runs when someone (or an agent following `/newroaster`) passes URLs.

Fix direction: allow only `https:` (and explicit `http:` if you still want it); resolve DNS and refuse private, loopback, and link-local targets; cap redirects and re-check the host after each hop.

### 4. Google Fonts on the room page — low

`app/public/index.html` lines 8–10.

Opening the room contacts Google for Montserrat. Google sees the client IP and that this page loaded. The PDF path already uses local Montserrat files under `/brand/fonts/`.

Fix direction: drop the Google stylesheet and serve those local font files (or a system stack) from `/styles.css`.

### 5. Option ids and quote source ids are inserted as HTML — low

`app/public/app.js` (option rows around the setup renderer, and the card dialog that prints `q.source` beside an escaped quote).

Most seat text goes through `esc()`. Option `id` is concatenated into HTML, and `q.source` is concatenated without `esc()`. The API runner’s schema limits option ids to A–D. The file watcher uppercases ids from `council.json` and does not limit them to those letters. Seat keys added by `add_seat.mjs` are restricted to a short lowercase token, but a hand-edited roster is rendered into attributes as-is.

Impact: a session file or roster opened in the local room can run script in the `localhost:4730` origin. That origin can read `/api/sessions` and, in API mode, start councils. The server is localhost-only, so this is local content trust, not a remote injection.

Fix direction: run option ids, seat keys, and `q.source` through `esc()`, and constrain watcher option ids to `A`–`D`.

### 6. Static file prefix check — low

`app/server.mjs` (the static branch: `path.normalize(path.join(PUBLIC, …))` then `file.startsWith(PUBLIC)`).

`PUBLIC` has no trailing separator, so a path that merely shares that string prefix can pass. This checkout has no sibling of `app/public` whose name starts with `public`. The server is bound to localhost.

Fix direction: resolve the path and require `file === PUBLIC` or a prefix of `PUBLIC + path.sep`, and reject anything whose relative path leaves `PUBLIC`.

## What was not confirmed

- No `git push` was attempted, including `--no-verify`, and no GitHub setting on the parent was changed. Refusal was checked by running the hook and the dispatcher, and by reading the configured push URL.
- Whether the machine’s GitHub credential can write to `nateherkai/roast-room` was not tested. The lock does not depend on that.
- The minified jsPDF bundle was not fully audited for unused network helpers. The room’s PDF code only fetches same-origin URLs.
- There is no `.env` here, so live key loading was not observed.
- The app was not exercised in a browser.
- Advisor brain markdown files contain many source URLs (YouTube, essays, and similar). Those are citations, not client calls.
- Editing `/workspace/.git/config`, deleting `/workspace/.git/hooks/pre-push`, or removing the dispatcher symlink undoes the lock. `git push --no-verify` skips the hook; the `upstream` push URL and the `pushInsteadOf` rules still do not point at GitHub.

A detached git worktree at `/tmp/roast-room-wt-4b24` (HEAD `e40f406`) was used so this work did not touch the shared working tree. It has no commits. `main` is clean.
