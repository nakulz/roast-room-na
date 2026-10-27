# How Roast Room makes seat portraits, and what else can draw them

For Nakul Arora. Written 27 Oct 2026 from the `nakulz/roast-room-na` checkout.

This note is only about the cartoon busts. It does not change the portrait script, the loopback lock, or any seat brain.

The room never calls an image model. A seat's face is four still pictures on disk. `portrait.mjs` is the only program that asks an image service for those pictures, and it will only ask a server on your own machine. The sections below name the functions and files, then the other image tools that could produce the same four frames.

Prices appear only when a page opened for this note printed a number. KIE's own site did not open from this machine. Where a dollar figure is missing, the note says so.

## 1. What `KIE_AI_BASE_URL` does

`KIE_AI_BASE_URL` is read by one script: `.claude/skills/newroaster/scripts/portrait.mjs`. The room server does not read it. A council does not read it.

The script's header says the picture model is Seedream 5 Pro image-to-image. The JSON it posts names that model in one string:

```js
model: "seedream/5-pro-image-to-image"
```

KIE, in the pages that did open, is a credit-based marketplace. One API key reaches many image and video models. The job shape is upload a file, create a task, poll the task, then download the result. That description is from third-party writeups of KIE, not from kie.ai itself. kie.ai, docs.kie.ai, and api.kie.ai all failed TLS from this machine (`SSL_ERROR_SYSCALL`). There is no public fallback in the script, so those hosts are not used even when the docs fail to load.

### The loopback rule

`assertLoopbackUrl` accepts only `http:` or `https:`. The hostname must be one of `localhost`, `127.0.0.1`, or `::1`. The check lowercases the host and strips square brackets, so `http://[::1]:8081` counts as `::1`.

```js
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
```

Anything else throws a policy error and the process exits 3. The error text names `kie.ai` and `kieai.redpandaai.co` and says there is no public fallback. The literal string `api.kie.ai` is not in the file. `api.kie.ai` is still refused, because it is not one of the three hosts.

`loopbackFetch` does not follow redirects by itself (`redirect: "manual"`). A 3xx with a `Location` is checked again, up to five hops. `307` and `308` keep the original method and body. Any other redirect is turned into a GET with the body dropped. A `Location` on a public host is refused.

The same check covers:

- the base URL
- every path joined onto that base
- the URL returned by an upload
- the URL returned when a job succeeds
- a `photo` argument that starts with `http://` or `https://`

A path on the base is kept as a prefix. `.env.example` says this. `kieUrl` concatenates the suffix onto `base.pathname`.

### The four HTTP paths

All four are joined onto `KIE_AI_BASE_URL`. Auth is `Authorization: Bearer <KIE_AI_API_KEY>` and `Content-Type: application/json`. The key is attached in `probe`, `base`, and `frames` only.

| Call | What the script uses it for |
|---|---|
| `POST {base}/api/file-base64-upload` | Sends one local image as a data URL. Body fields are `base64Data`, `uploadPath` (`roast-room`), and `fileName`. The script reads `data.downloadUrl`, then `data.fileUrl`, then `data.url`. That URL must be loopback. |
| `POST {base}/api/v1/jobs/createTask` | Starts one image job. Body is `model` plus `input`. `input` is `prompt`, `image_urls` (the upload URLs), `aspect_ratio` `1:1`, `quality` `high`, `output_format` `png`, and `nsfw_checker` `false`. The script needs `data.taskId`. |
| `GET {base}/api/v1/jobs/recordInfo?taskId=` | Polls until `data.state` or `data.status` is `success`, or `fail` / `failed`. Anything else waits. On success it parses `resultJson` (a string or an object) and takes the first of `resultUrls` or `urls`. That image URL must be loopback. The bytes are written to the output path. |
| `GET {base}/api/v1/chat/credit` | The `probe` command. It prints the JSON `data` field. It does not make a picture. |

`still` waits at most 15 minutes per file. The first pause is 4 seconds, then it grows by 1.25 up to 15 seconds. `all` runs the jobs together. A failed job is tried once more, unless the failure was the loopback rule.

### Env vars

`fromEnv` uses the process environment first. If that is empty, it walks up to eight directories looking for a line in `.env`. `bare` strips one pair of matching quotes.

| Variable | Role |
|---|---|
| `KIE_AI_BASE_URL` | Required before any upload, job, credit probe, or result download. Unset, invalid, or non-loopback: policy error, exit 3. Sample in `.env.example`: `http://127.0.0.1:8081` (commented out). |
| `KIE_AI_API_KEY` | Sent only on those loopback requests. Missing key: message on stderr, exit 3. `photo` of a local file and `pick` do not ask for the key. |

No other env var selects the model, the host, or the output size.

### Inputs and output files

The working folder is `<build>/portrait/`. `build/` is in `.gitignore`, so this folder stays on the machine.

| Command | Inputs | Files written |
|---|---|---|
| `photo <dir> <file or loopback URL>` | A local image path, or an `http(s)` URL that is already loopback. A public photo URL is refused. | `photo.jpg`, `photo-source.txt` |
| `base <dir> "<who and what they wear>" [--n 2]` | `photo.jpg` plus `.claude/skills/newroaster/assets/style-reference.jpg` (the skill calls this the Buffett cartoon). Default is two candidates. | `cand1.png`, `cand2.png`, and so on |
| `pick <dir> <n>` | `cand<n>.png` | Copies it to `base.png`. No network. |
| `frames <dir>` | `base.png` | `open.png` (mouth wide, "ah"), `mid.png` (mouth "oh"), `blink.png` (both eyes closed) |
| `probe` | Key and base URL | Nothing on disk |

The style sentence and the three edit sentences are constants in `portrait.mjs` (`STYLE`, `KEEP`, `EDITS`). The base prompt is that style sentence plus `Person: ` and the text you passed.

`build_portraits.py` is separate and does not read `KIE_AI_BASE_URL`. Its `build` command reads `base.png`, `open.png`, `mid.png`, and `blink.png`. It writes:

- `app/public/portraits/<key>-base.webp`
- `app/public/portraits/<key>-open.webp`
- `app/public/portraits/<key>-mid.webp`
- `app/public/portraits/<key>-blink.webp`
- `<build>/portrait/review.jpg`
- `<build>/portrait/candidates.jpg` when you run `sheet`

`<key>` is the seat key you pass to `build`, the same key as in `.claude/skills/roast-room/roster.json` (`bezos`, `garyvee`, `leila`, and the rest). Output frames are 560 by 560 WebP at quality 88, with the green screen turned into alpha.

The room will also serve a PNG or JPG if it is named the same way (`<key>-<shape>.png` or `.jpg`). The generator asks KIE for PNG. The build step writes WebP.

## 2. How a bust is created, then how the room draws it

The new-seat steps live in `.claude/skills/newroaster/SKILL.md` under "Step 8: Portrait". The commands below are the ones that skill runs. Two docs still talk about a public kie.ai key and a photo URL (`SKILL.md`, `README.md`). The script that actually runs will refuse both a public KIE host and a public photo URL.

1. **Find a photo.** The skill wants one clear, front-facing photo of the person alone. For a public figure it points at their own channel, site, or a Wikimedia file. For you or a mentor, it uses a photo you hand over. Saving that photo is a local copy unless the URL is already loopback.

2. **`portrait.mjs photo`.** `photo` makes `<build>/portrait/`, copies the file to `photo.jpg` (or downloads a loopback URL with a browser user-agent), and writes `photo-source.txt`. This step does not call KIE.

3. **`portrait.mjs base`.** `kieBase()` checks the loopback URL. `key()` loads the bearer token. `upload` posts `photo.jpg` and `style-reference.jpg`. `still` posts `createTask` with both URLs and the style prompt plus the clothing description. Default `--n` is 2, so two jobs run together. Results land as `cand1.png` and `cand2.png`.

4. **`build_portraits.py sheet`.** `sheet` builds `candidates.jpg`: the photo, then each candidate, same height, labeled. No network. You pick the face closest to the photo. `portrait.mjs pick <dir> <n>` copies that candidate to `base.png`.

5. **`portrait.mjs frames`.** Three edits of `base.png`, in parallel. The prompts are `EDITS.open`, `EDITS.mid`, and `EDITS.blink`. Each says to keep the character, pose, clothes, lighting, framing, and green background, and to change only the mouth or only the eyes. Outputs are `open.png`, `mid.png`, and `blink.png`.

6. **`build_portraits.py build`.** `build()` in `.claude/skills/newroaster/scripts/build_portraits.py`:
   - Resizes each PNG to 1024 by 1024.
   - `align` matches ORB features outside the mouth or the eyes and warps the edit onto the base.
   - `patch_mask` feathers the changed pixels back onto the base, clipped to a box. Mouth boxes cover the lower face. The blink box covers the eyes.
   - `key_green` turns green-screen spill into alpha and pulls green off the edges.
   - `crop_box` crops every head toward the same width (`HEAD_W` 375 at the working size). `--zoom 0.9` or `--zoom 1.1` changes that crop.
   - Writes the four `<key>-<shape>.webp` files and `review.jpg`.

A normal seat is two candidates plus three edits, which is the "about 5 image jobs" line in the skill and the README. That is a count of jobs, not a price. `--n` changes the count. `probe` is not one of the five.

### What the room draws

`app/server.mjs` listens on `127.0.0.1`, port `4730` unless `PORT` is set. `GET /api/seats` calls `loadRoster()` and, for each seat, looks in `app/public/portraits/` for `<key>-base`, `<key>-open`, `<key>-mid`, and `<key>-blink`. For each shape, `frame` picks the first file that exists, in this order: `.webp`, `.png`, `.jpg`. The JSON value is `/portraits/<filename>`.

Those files are ordinary static files. The handler after the `/api` routes sends `app/public/<path>` with a WebP, PNG, or JPEG content type.

`app/public/app.js` function `portrait(key, shape)` returns the URL for that shape, then the base frame, then `drawnBust(key, shape)`. `renderSeats` puts four `<img>` tags inside `.bust`, one per shape (`base`, `open`, `mid`, `blink`). `app/public/styles.css` shows the one image whose class matches `data-shape` and hides the other three.

While a seat talks, `speak` calls `shapesFor` on each word, then `setShape`. Vowels `a`, `e`, `i` use `open`. `o`, `u`, `w`, `y` use `mid`. `m`, `b`, `p`, `f` use `base`. Other letters add no shape. `startBlinking` flips a resting bust to `blink` for 130ms. That is the only use of the blink frame.

If a shape file is missing, the browser still has a tag. Its `src` is the base picture, or the drawn bust if the base is missing too. `drawnBust` builds an SVG data URL: a colored shoulders-and-head shape, open or closed eyes, one of three mouths, and initials. Initials come from the roster field `initials`, then `short`, then the key, uppercased, at most three characters. The fill is the seat `color` when it is a six-digit hex, otherwise `#37bdf8`. The SVG is cached in `bustCache` until `refreshSeats`.

So a new seat with no files in `app/public/portraits/` still sits at the table. The face is that initials bust. The skill calls this the placeholder and says to finish the seat anyway when there is no key.

The shipped seats already have all four WebP files (`bezos-base.webp` through `jensen-blink.webp`).

## 3. Alternatives

The current script can call an alternative only when that alternative is a loopback server that answers the four paths above and returns loopback image URLs. `portrait.mjs` has no Gemini client, no OpenAI client, no Flux client, and no ComfyUI client. The model string stays `seedream/5-pro-image-to-image`.

The room does not care which program drew the frames. Point the room at a result by writing `<key>-base.webp`, `<key>-open.webp`, `<key>-mid.webp`, and `<key>-blink.webp` into `app/public/portraits/` (PNG or JPG with the same names also work). Reload `http://localhost:4730`. Leave the loopback lock as it is.

A public image API cannot sit in `KIE_AI_BASE_URL`. The script will refuse the host. A process on `127.0.0.1` can sit there. If that process then forwards the prompt to a public host, the script's lock still holds and the prompt still leaves the machine. That is not a local generation. The notes below keep those two facts apart.

### KIE, as the script already speaks it

KIE is the protocol this script implements. Pages that describe it, all third-party:

- "LLM Start Here" in [gateway/kie-api](https://github.com/gateway/kie-api/blob/main/docs/LLM_START_HERE.md) calls Kie.ai a credit-based model marketplace for image and video models, and links to `https://kie.ai/pricing`. This note did not open that pricing page.
- The heading of [docs/vision.md](https://github.com/zpoint/vibe-seller/blob/main/docs/vision.md) in zpoint/vibe-seller is "Vision" followed by "AI image generation". That page calls kie.ai a unified aggregator: one key, many models, all through `POST /api/v1/jobs/createTask`. It lists Seedream 5 Pro (Basic/High) among the image-to-image models. It also gives one dollar example for a different model: GPT Image 2 at 1K/2K/4K as $0.03/$0.05/$0.08, and says those catalog numbers were checked against KIE in July 2026. It does not print a dollar price for Seedream 5 Pro. Treat the GPT Image 2 numbers as that repo's note, not as a price confirmed on kie.ai on 27 Oct 2026.
- "Kie.ai Tool Reference" in [felores/kie-cli-mcp](https://github.com/felores/kie-cli-mcp/blob/main/docs/TOOLS.md) describes Seedream 5 Pro and 5 Flash. Pro quality `basic` is 1K and `high` is 2K. Editing takes `image_urls` (up to 10). `output_format` is `png` or `jpeg`. `nsfw_checker` is a boolean. Those field names match the script. The page does not print the slug `seedream/5-pro-image-to-image`. That slug is only confirmed in `portrait.mjs`.
- "kie.ai API Reference" in [nateherkai/gpt-image-2-vs-nano-banana-2](https://github.com/nateherkai/gpt-image-2-vs-nano-banana-2/blob/master/docs/api-reference.md) documents `POST /jobs/createTask`, `GET /jobs/recordInfo`, and `GET /chat/credit` on `https://api.kie.ai/api/v1`, plus a base64 upload on `https://kieai.redpandaai.co/api/file-base64-upload`. Its model strings are `gpt-image-2-text-to-image`, `gpt-image-2-image-to-image`, and `nano-banana-2`, not Seedream. A ComfyUI node in [Bzbaozi/ComfyUI-YK-Banana2-Batch](https://github.com/Bzbaozi/ComfyUI-YK-Banana2-Batch/blob/main/YK_banana2_batch.py) posts `nano-banana-pro` to `https://api.kie.ai/api/v1/jobs/createTask` and uploads to `https://kieai.redpandaai.co/api/file-base64-upload`. Those are the public hosts the script now refuses.

Can the script call it: yes, only through a loopback base URL. A server on `127.0.0.1` that speaks those four paths can answer. This repo does not ship that server.

Loopback: the script's side is loopback-only. KIE's own cloud is a public host. A proxy on localhost that then calls `api.kie.ai` would send prompts and photos out. Do not do that if the point of the lock is to keep the prompt on the machine.

KIE dollar prices: not on any kie.ai page opened for this note. The credit probe returns whatever JSON `data` the local server sends. The nateherkai reference says that number's unit (dollars or credits) is not in the envelope.

### Gemini image models people call Nano Banana

Google's cookbook names these as Gemini's built-in image models. The notebook title line is "Gemini Built-in Image generation (aka Nano-Banana models)". Source: [Get_Started_Nano_Banana.ipynb](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb), linked from the cookbook README.

| Name in the notebook | Model id in the notebook |
|---|---|
| Nano-Banana 2 Lite | `gemini-3.1-flash-lite-image` |
| Nano-Banana 2 | `gemini-3.1-flash-image` |
| Nano-Banana 2.1 | `gemini-nano-banana-2.1` |
| Nano-Banana Pro | `gemini-3-pro-image-preview` |

The notebook says you call `client.interactions.create` with the Google GenAI SDK, and you can ask for image output. It says an edit can follow a previous interaction, and that you can mix several input images (up to 3 on the lite model, up to 14 on Nano-Banana 2 and Pro). Square 1:1 at 1K is listed as 1024 by 1024. 2K and 4K are listed for Nano-Banana 2 and Pro. That is the same job the busts need: a photo, a style reference, then small edits for mouth and eyes. It is a different API from `createTask`.

The notebook says Nano-Banana 2 Lite has a free tier and calls it the cheapest of the four. It does not print a dollar price. The billing page it links, `https://ai.google.dev/gemini-api/docs/billing`, did not open (TLS failure). `https://ai.google.dev/gemini-api/docs/image-generation` did not open either.

Can the script call it: no. Nothing in `portrait.mjs` posts to Google or sends a `gemini-` model id.

Point the room at it: run the generation yourself, save `base.png`, `open.png`, `mid.png`, and `blink.png` on a green background if you want `build_portraits.py` to key them, then run `build`. Or write the four WebP files straight into `app/public/portraits/`.

Loopback: the notebook describes Google's hosted API. A call to Google is a public host, so `KIE_AI_BASE_URL` cannot be that API. A proxy on `127.0.0.1` could translate the four KIE paths into a Gemini call. That proxy would still send the prompt to Google. The notebook does not describe a weight file you run offline. No local Nano Banana path was verified.

KIE's catalog, in the vibe-seller note, also has slugs people label Nano Banana (`nano-banana-pro`, `nano-banana-2`). Those are KIE model names in that writeup. `portrait.mjs` does not send them.

### OpenAI image

The official Python SDK posts image generation to `/images/generations` and edits to `/images/edits`. File: [openai-python `images.py`](https://github.com/openai/openai-python/blob/main/src/openai/resources/images.py). The page title of the repo is "GitHub - openai/openai-python: The official Python library for the OpenAI API".

Model ids named on the edit path include `gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, `gpt-image-2.5-flare-2026-09-08`, and `chatgpt-image-latest`. The same file says `gpt-image-1` was shut down on 23 Oct 2026, and points at `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare`. Edits take image files plus a prompt. That can do a style pass and a mouth edit. The request shape is not KIE's `createTask`.

`images.py` contains no prices. `https://platform.openai.com/docs/guides/image-generation` did not open (TLS failure). Do not treat the vibe-seller $0.03/$0.05/$0.08 line as OpenAI's price. That line is about a KIE slug for GPT Image 2 in a different repo, checked by them in July 2026.

Can the script call it: no.

Point the room at it: same file drop as above. `KIE_AI_BASE_URL` cannot be `api.openai.com`.

Loopback: OpenAI's API is a public host. A localhost proxy could translate, and would then send prompts to OpenAI. This note did not find an offline weight for these GPT image models.

The nateherkai reference uses KIE slugs `gpt-image-2-text-to-image` and `gpt-image-2-image-to-image`. Those strings are not the SDK model ids above, and `portrait.mjs` does not send them.

### Flux and the hosts that serve it

Black Forest Labs publishes an API skill. Repo title: "GitHub - black-forest-labs/skills: Official agent skills from Black Forest Labs for FLUX image and video generation". The pricing table is in [skills/bfl-api/SKILL.md](https://github.com/black-forest-labs/skills/blob/master/skills/bfl-api/SKILL.md). The paths are in [endpoints.md](https://github.com/black-forest-labs/skills/blob/master/skills/bfl-api/references/endpoints.md).

That skill says the API hosts are `https://api.bfl.ai`, `https://api.eu.bfl.ai`, and `https://api.us.bfl.ai`, with header `x-key`. It says every FLUX.2 model on that list can edit from `input_image` (and more reference images, up to 4 on klein and 8 on pro, max, and flex). It says 1 credit is $0.01, and prints this table:

| Model | Path | 1 megapixel text-to-image | 1 megapixel image-to-image |
|---|---|---|---|
| FLUX.2 klein 4B | `/v1/flux-2-klein-4b` | $0.014 | $0.015 |
| FLUX.2 klein 9B | `/v1/flux-2-klein-9b` | $0.015 | $0.017 |
| FLUX.2 pro | `/v1/flux-2-pro` | $0.03 | $0.045 |
| FLUX.2 max | `/v1/flux-2-max` | $0.07 | $0.10 |
| FLUX.2 flex | `/v1/flux-2-flex` | $0.05 | $0.10 |
| FLUX.2 dev | no API path in the table | Free | Free, labeled "local development (non-commercial)" |

FLUX.1 rows on the same page: Kontext pro `/v1/flux-kontext` $0.04, Kontext max `/v1/flux-kontext-max` $0.08, FLUX1.1 pro $0.04, Ultra and Raw $0.06, Fill $0.05. The page says cost scales with megapixels for FLUX.2 and tells you to use `https://bfl.ai/pricing` for other sizes. `bfl.ai` and `docs.bfl.ai` did not open from this machine. `fal.ai` did not open either, so this note has no fal price and no fal request shape.

Open weights, from Hugging Face model records opened here:

- [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev). Page title "black-forest-labs/FLUX.1-dev · Hugging Face". API record: pipeline `text-to-image`, library `diffusers`, class `FluxPipeline`. The README file returned HTTP 401, so the long model card was not read.
- [black-forest-labs/FLUX.1-Kontext-dev](https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev). Page title "black-forest-labs/FLUX.1-Kontext-dev · Hugging Face". API record: pipeline `image-to-image`, class `FluxKontextPipeline`, gated (`gated: auto`), license name `flux-1-dev-non-commercial-license`. README returned HTTP 401. This is the Flux weight that matches "edit this picture" more closely than a plain text-to-image Flux. The non-commercial name is in the card metadata. Read the license file on that model page before you use the weight. This note did not open `LICENSE.md` (the README fetch was 401, and the license body was not fetched separately).

[stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) lists FLUX.1-dev, FLUX.2, FLUX.3 Image Klein, and FLUX.1-Kontext-dev as models it can run. That is a local binary. The per-model command pages were not opened, so the exact flags are not verified here.

Can the script call Flux: no. It never sends `x-key`, never posts `/v1/flux-2-pro`, and never loads a Flux weight.

Point the room at it: generate the four frames in a local Flux UI or with the BFL API on a machine you accept sending prompts from, then run `build_portraits.py` or copy the WebP files into `app/public/portraits/`. To drive `portrait.mjs` unchanged, the process on `KIE_AI_BASE_URL` would have to pretend to be the KIE job API. The script would still send `seedream/5-pro-image-to-image`. The proxy would have to ignore that name and call Flux. Nothing in this repo does that.

Loopback: `api.bfl.ai` cannot be the base URL. A local Flux weight in ComfyUI, Diffusers, or stable-diffusion.cpp can keep the prompt on the machine after the weight file is already on disk. Downloading the weight contacts Hugging Face once. That download is not the prompt. Kontext is gated, so the download asks you to accept the license.

### Local Stable Diffusion runners

These run on the machine. None of them speak the four KIE paths. The script will not call them unless you put a translator in front, and that translator is new code this repo does not have.

**ComfyUI.** Repo title: "GitHub - Comfy-Org/ComfyUI: The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface." The README says the core runs fully offline and does not download unless you ask, and that `--offline` turns off paid partner API nodes. `comfy/cli_args.py` defaults `--listen` to `127.0.0.1` and `--port` to `8188`. Passing `--listen` with no address switches it to `0.0.0.0,::`, which is the opposite of the loopback rule. Leave the default.

The img2img example README says you encode a loaded image and sample with denoise below 1. The example uses 0.87. Lower denoise keeps more of the source. Source: [ComfyUI_examples img2img](https://github.com/comfyanonymous/ComfyUI_examples/blob/master/img2img/README.md). Classic img2img is a blunt tool for "change only the mouth." An edit model loaded in the same UI (Kontext or Qwen Image Edit, if you have the weights) fits the four frames better. ComfyUI's own HTTP API is `/upload/image` and a workflow prompt, not `/api/v1/jobs/createTask`. That difference is from a GitHub discussion on the ComfyUI repo about uploading before a Load Image node. This note did not re-read `server.py`.

**Automatic1111.** Repo title: "GitHub - AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI". The README lists txt2img and img2img. `modules/cmd_args.py` has `--listen`, which the help text says binds Gradio to `0.0.0.0`. `--port` defaults to 7860 when that port is free. `--api` turns on the HTTP API. `gradio_server_name()` in `modules/initialize_util.py` returns `0.0.0.0` when `--listen` is set, and `None` otherwise. What Gradio does with `None` was not on a page opened here. Leave `--listen` off if you want the local default that function implements.

**Forge.** Repo title: "GitHub - lllyasviel/stable-diffusion-webui-forge". The README describes it as a platform on top of Automatic1111, with img2img and an API. A status table in that same README marks "API endpoints (txt2img, img2img, etc)" as "Normal, but pending improved Flux support" and dates the row 29 Aug 2024. That row is old text in the file, not a fresh check.

**stable-diffusion.cpp.** Title above. Pure C/C++ inference for Stable Diffusion, Flux, Wan, Qwen Image, and others. The feature list includes image-edit models: FLUX.1-Kontext-dev and the Qwen Image Edit series. No listen port was in the portion of the README that was read. A CLI that never opens a socket honors the loopback rule because there is no host to refuse. You still copy the pictures into the portrait folder yourself.

**Invoke.** Repo title: "GitHub - invoke-ai/InvokeAI: Invoke is a leading creative engine for Stable Diffusion models...". The README describes a local Web UI for generating and refining images. A listen address was not in the lines opened here.

**Diffusers.** Page title "Diffusers · Hugging Face" at `https://huggingface.co/docs/diffusers/en/index`, and "Image-to-image · Hugging Face" at `https://huggingface.co/docs/diffusers/using-diffusers/img2img`. This is a Python library, not a server. A script on the machine can load a pipeline and write PNGs. It honors loopback when the weights are already local and the script does not call a hosted inference URL. The image-to-image guide's steps were not copied out. Only the page title and URL were confirmed.

Loopback for this whole group: yes, if you bind to loopback or do not open a port, and if you do not enable a partner or cloud node. ComfyUI's `--offline` is the switch the README and `cli_args.py` document for that. Point the room at the result with the four portrait files, not with `KIE_AI_BASE_URL`.

### Other current options that fit a four-frame bust

**Seedream outside KIE.** The script's model name is Seedream. Other hosts serve Seedream too. They are not drop-in replacements.

- OpenRouter page title "Seedream 5.0 Pro - API Pricing & Benchmarks | OpenRouter", URL `https://openrouter.ai/bytedance-seed/seedream-5-0-pro`. The page says Seedream 5.0 Pro is an image generation and editing model from ByteDance Seed, released 12 Aug 2026, with up to 14 reference images, resolutions 1K and 2K. Its FAQ says the price is $0.045 per image for image output, $0.09 per image for high-resolution image output, and $0.003 per image for image input. A provider row on the same page shows Seed at $0.003 image input and $0.045 image output. A later "$0.04 per output image" sentence in the extracted text sits with Seed 1.6 Flash, a different model. It is not used here as a Seedream price. The API example posts to `https://openrouter.ai/api/v1/images` with model `bytedance-seed/seedream-5-0-pro`. That is a public host. The script cannot call it. A localhost proxy could, and would send the prompt to OpenRouter.
- Hugging Face Space title "Seedream 5.0 Pro - a Hugging Face Space by wavespeed", URL `https://huggingface.co/spaces/wavespeed/seedream-v5-pro`. The README on that Space says it runs `bytedance/seedream-v5.0-pro` through the WaveSpeed API, and that your key is sent only to `api.wavespeed.ai`. Public host. No price on that README.
- AceDataCloud's Seedream MCP README (repo title "GitHub - AceDataCloud/SeedreamMCP") says Seedream 5.0 Pro can generate and edit, including a transparent background, at 1K, 1.5K, and 2K. The model id it prints is `doubao-seedream-5-0-pro-260628`. Prices are "Tiered Credits" and "See live pricing", not dollars. The "local stdio" install still calls the AceDataCloud API. That does not keep prompts on the machine.
- ComfyUI's embedded help page "ByteDance Seedream 4.5 & 5.0 Node" lists model menu strings `seedream 5.0 pro` and `seedream 5.0 lite` and says the node is marked deprecated. The page does not say whether the node runs weights locally or calls a vendor. Unverified. Do not assume it is offline.

**Qwen Image Edit.** Repo title: "GitHub - QwenLM/Qwen-Image: Qwen-Image is a powerful image generation foundation model capable of complex text rendering and precise image editing." The README's quick start loads `QwenImageEditPlusPipeline` from `Qwen/Qwen-Image-Edit-2511` in local PyTorch. That is an edit model you can run on the machine, which is what the mouth and blink frames need. The sample then downloads a demo PNG with `requests.get` from an Aliyun URL. For a local try, open a file on disk instead of that URL. No price is printed in the quick start. The Qwen Chat and demo Space links are public sites. The pipeline load itself is local once the weights are downloaded.

**Ideogram, Midjourney, Recraft, Grok Imagine.** The felores tool list and the vibe-seller catalog name some of these as more KIE models behind `createTask`. `portrait.mjs` does not select them. No separate vendor price page for them was opened. Skip them until a page with a price and an API shape is actually read. They are public services if you call the vendor directly, so they fail the loopback rule the same way OpenAI does.

## 4. Smallest way to try one alternative without sending prompts to a public host

Use ComfyUI on the loopback default, draw the four PNGs there, and run the build script you already have. Do not start `portrait.mjs`. Do not set `KIE_AI_BASE_URL` to a public host. Do not remove the lock.

1. Install ComfyUI from the Comfy-Org repo. Start it with `--offline`. Do not pass `--listen` with an empty value. The default in `cli_args.py` is `127.0.0.1:8188`.
2. Load a local edit model you already have on disk. FLUX.1 Kontext dev and Qwen-Image-Edit-2511 are the two edit models confirmed in pages above. Kontext is gated and the card metadata names a non-commercial license. If the weights are not on disk yet, the download talks to Hugging Face. After that, the prompt stays in the local UI. Do not use a partner API node. `--offline` is what the ComfyUI README says turns those off.
3. Put the real photo and `style-reference.jpg` in the ComfyUI input folder. Make one green-screen bust (closed mouth), then three edits: mouth open, mouth "oh", eyes closed. Save them as `base.png`, `open.png`, `mid.png`, and `blink.png` in `<build>/portrait/`.
4. Run `python .claude/skills/newroaster/scripts/build_portraits.py build <build>/portrait <key> --out app/public/portraits`. Needs `opencv-python` and `numpy`. Open `review.jpg`.
5. Reload `http://localhost:4730`. `GET /api/seats` picks up `<key>-base.webp` and the other three. The room still does not call an image model.

That path never executes `upload`, `still`, or `loopbackFetch`. A KIE-shaped proxy in front of ComfyUI would be a second program. It is larger than this, and it is not in the repo.

If ComfyUI is already running and bound to something other than loopback, stop it and start it on `127.0.0.1` before you paste a prompt.

## What was not verified

These hosts failed TLS from this machine (`SSL_ERROR_SYSCALL` on the HTTPS handshake). Nothing in this note is taken from their response bodies:

- `https://kie.ai/`, `https://kie.ai/api-key`, `https://kie.ai/pricing`, `https://docs.kie.ai/`, `https://api.kie.ai/`
- `https://ai.google.dev/gemini-api/docs/image-generation` and the billing URL linked from the Nano Banana notebook
- `https://platform.openai.com/docs/guides/image-generation`
- `https://bfl.ai/`, `https://docs.bfl.ai/`, `https://bfl.ai/pricing`
- `https://fal.ai/models`

Also unverified:

- The Hugging Face README bodies for FLUX.1-dev and FLUX.1-Kontext-dev (HTTP 401). Pipeline tag, class name, gated flag, and license name come from the model JSON and the card metadata. The license text itself was not read.
- Gradio's bind address when Automatic1111 passes `server_name=None`.
- Whether the deprecated ComfyUI Seedream node runs locally.
- stable-diffusion.cpp command lines for Kontext and Qwen (the feature index was read, the per-model docs were not).
- Invoke's listen port.
- Any KIE dollar price. The July 2026 GPT Image 2 figures in vibe-seller were not re-checked on kie.ai.
- The "$0.04 per output image" sentence on the OpenRouter page, which the extracted text attaches to Seed 1.6 Flash, not to Seedream 5.0 Pro.

`README.md` and `SKILL.md` still tell you to put a kie.ai key in `.env` and to pass a photo URL. That is what those files say. `portrait.mjs` and `.env.example` are the files that enforce the loopback rule.

## Sources

Web pages opened for this note. The title is the HTML `<title>` unless the row says the title is the document heading.

| Title | URL | Used for |
|---|---|---|
| GitHub - gateway/kie-api: Python toolkit for KIE.AI image and video workflows with validation, upload-first handling, prompt presets, and local run artifacts. | https://github.com/gateway/kie-api | Repo page. The "What Kie.ai Is" section is the file below. |
| LLM Start Here (document heading; raw file has no HTML title) | https://github.com/gateway/kie-api/blob/main/docs/LLM_START_HERE.md | KIE as a credit marketplace. Pricing link not opened. |
| GitHub - gateway/media-studio: Open-source AI image and video studio with a Next.js + FastAPI UI on top of the KIE Python/API layer and pay-as-you-go generation. | https://github.com/gateway/media-studio | KIE as the generation backend. No per-image price in the README that was read. |
| GitHub - zpoint/vibe-seller: (long bilingual title on the repo page) | https://github.com/zpoint/vibe-seller/blob/main/docs/vision.md | KIE `createTask` as one endpoint for many models. GPT Image 2 example prices. Seedream 5 Pro named, no Seedream dollar price. |
| GitHub - felores/kie-cli-mcp: Kie.ai CLI + MCP Server... | https://github.com/felores/kie-cli-mcp/blob/main/docs/TOOLS.md | Seedream 5 Pro fields: quality, image_urls, output format, nsfw_checker. |
| GitHub - nateherkai/gpt-image-2-vs-nano-banana-2: Head-to-head benchmark of GPT Image 2 vs Nano Banana 2, judged by Claude Opus 4.7. Student template for an AI engineering course. | https://github.com/nateherkai/gpt-image-2-vs-nano-banana-2/blob/master/docs/api-reference.md | Public KIE paths the script now refuses. Different model strings. Credit unit not documented. |
| GitHub - Bzbaozi/ComfyUI-YK-Banana2-Batch | https://github.com/Bzbaozi/ComfyUI-YK-Banana2-Batch/blob/main/YK_banana2_batch.py | Example of the public upload host and `createTask` with `nano-banana-pro`. |
| GitHub - google-gemini/cookbook: Examples and guides for using the Gemini API | https://github.com/google-gemini/cookbook | Points at the Nano Banana notebook. |
| Gemini Built-in Image generation (aka Nano-Banana models) (first heading in the notebook) | https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb | Model ids, edit and multi-image behavior, resolutions, free tier with no dollar price. |
| GitHub - openai/openai-python: The official Python library for the OpenAI API | https://github.com/openai/openai-python/blob/main/src/openai/resources/images.py | `/images/generations`, `/images/edits`, model ids, gpt-image-1 shutdown date. No prices. |
| GitHub - black-forest-labs/skills: Official agent skills from Black Forest Labs for FLUX image and video generation | https://github.com/black-forest-labs/skills/blob/master/skills/bfl-api/SKILL.md | Flux API prices and hosts. |
| BFL API Endpoints (document heading) | https://github.com/black-forest-labs/skills/blob/master/skills/bfl-api/references/endpoints.md | Flux paths and image-to-image parameters. |
| black-forest-labs/FLUX.1-dev · Hugging Face | https://huggingface.co/black-forest-labs/FLUX.1-dev | Text-to-image Flux weight. README body not read (401). |
| black-forest-labs/FLUX.1-Kontext-dev · Hugging Face | https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev | Image-to-image Flux edit weight, gated, non-commercial license name. README body not read (401). |
| Seedream 5.0 Pro - API Pricing & Benchmarks \| OpenRouter | https://openrouter.ai/bytedance-seed/seedream-5-0-pro | Seedream 5.0 Pro description and the $0.045 / $0.09 / $0.003 prices. |
| Seedream 5.0 Pro - a Hugging Face Space by wavespeed | https://huggingface.co/spaces/wavespeed/seedream-v5-pro | WaveSpeed calls `api.wavespeed.ai`. No price on the README. |
| GitHub - AceDataCloud/SeedreamMCP: MCP server for ByteDance Seedream image generation and editing via Ace Data Cloud. | https://github.com/AceDataCloud/SeedreamMCP/blob/main/README.md | Seedream Pro sizes and model id. Local stdio still calls AceDataCloud. No dollar price. |
| GitHub - Comfy-Org/embedded-docs: ComfyUI help pages | https://github.com/Comfy-Org/embedded-docs/blob/main/comfyui_embedded_docs/docs/ByteDanceSeedreamNode/en.md | Deprecated Seedream node. Local vs cloud not stated. |
| GitHub - Comfy-Org/ComfyUI: The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface. | https://github.com/Comfy-Org/ComfyUI | Local engine, `--offline`. |
| ComfyUI `cli_args.py` (raw file; HTML title not used) | https://github.com/Comfy-Org/ComfyUI/blob/master/comfy/cli_args.py | Default listen `127.0.0.1`, port `8188`, `--offline`. |
| GitHub - comfyanonymous/ComfyUI_examples: Examples of ComfyUI workflows | https://github.com/comfyanonymous/ComfyUI_examples/blob/master/img2img/README.md | Img2img denoise. |
| GitHub - AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI | https://github.com/AUTOMATIC1111/stable-diffusion-webui | txt2img and img2img. `--listen` and port from `modules/cmd_args.py` and `modules/initialize_util.py` on the same repo. |
| GitHub - lllyasviel/stable-diffusion-webui-forge | https://github.com/lllyasviel/stable-diffusion-webui-forge | Forge on top of Automatic1111. Dated API status row. |
| GitHub - leejet/stable-diffusion.cpp: Diffusion model(SD,Flux,Wan,Qwen Image,Z-Image,...) inference in pure C/C++ | https://github.com/leejet/stable-diffusion.cpp | Local binary. Lists Kontext and Qwen Image Edit. |
| GitHub - invoke-ai/InvokeAI: Invoke is a leading creative engine for Stable Diffusion models... | https://github.com/invoke-ai/InvokeAI | Local Stable Diffusion UI. Port not verified. |
| Diffusers · Hugging Face | https://huggingface.co/docs/diffusers/en/index | Local Python pipelines exist as a library. |
| Image-to-image · Hugging Face | https://huggingface.co/docs/diffusers/using-diffusers/img2img | Image-to-image guide page. Steps not quoted. |
| GitHub - QwenLM/Qwen-Image: Qwen-Image is a powerful image generation foundation model capable of complex text rendering and precise image editing. | https://github.com/QwenLM/Qwen-Image | Local `QwenImageEditPlusPipeline` quick start. Sample demo image is a remote URL. |

Repo files this note is based on, all in the checkout:

- `.claude/skills/newroaster/scripts/portrait.mjs`
- `.claude/skills/newroaster/scripts/build_portraits.py`
- `.claude/skills/newroaster/SKILL.md`
- `.claude/skills/newroaster/assets/style-reference.jpg`
- `.env.example`
- `.gitignore`
- `README.md`
- `app/server.mjs`
- `app/public/app.js`
- `app/public/styles.css`
- `.claude/skills/roast-room/roster.json`
