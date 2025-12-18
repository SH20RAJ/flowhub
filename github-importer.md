Below is a **focused, production-grade Cursor prompt** specifically for **GitHub repository ingestion & importing attached n8n templates**, aligned with everything you’ve already enforced (SEO-first, server components, Turso, open-source safe).

This corresponds to **Prompt #5 — GitHub Importer (bulk ingestion + dedupe)**.

---

# 📦 Cursor Prompt — GitHub Repo Importer & Template Ingestion System

> **Role:** You are a senior backend engineer building a safe, idempotent GitHub ingestion system.
> **Goal:** Import n8n workflow templates from attached GitHub repositories into the database with deduplication, attribution, and license safety.
> **Scope:** Backend + scripts only. No UI changes.

---

## 1️⃣ Core Requirements (NON-NEGOTIABLE)

* Import workflows from **attached GitHub repositories**
* Support **bulk ingestion**
* **Deduplicate workflows** reliably
* Preserve **attribution, source, and license**
* Idempotent (safe to run multiple times)
* No breaking changes to existing data
* No client-side logic

---

## 2️⃣ Supported Sources (Initial)

Hardcode support for these repos (config-driven):

* [https://github.com/ritik-prog/n8n-automation-templates-5000](https://github.com/ritik-prog/n8n-automation-templates-5000)
* [https://github.com/enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates)
* [https://github.com/wassupjay/n8n-free-templates](https://github.com/wassupjay/n8n-free-templates)
* [https://github.com/n8n-io/n8n-workflow-examples](https://github.com/n8n-io/n8n-workflow-examples) - https://github.com/Zie619/n8n-workflows/tree/main/workflows - https://zie619.github.io/n8n-workflows/ 

Store each repo in the `sources` table.

---

## 3️⃣ Folder Structure (MANDATORY)

```txt
scripts/
  importers/
    github/
      index.ts
      fetchRepoTree.ts
      parseWorkflow.ts
      dedupe.ts
      saveWorkflow.ts
      config.ts

db/
  queries/
    workflows.ts
    sources.ts
```

---

## 4️⃣ Import Flow (STRICT ORDER)

### Step 1: Repo Discovery

* Fetch repo tree via GitHub REST API
* Recursively find `.json` files
* Ignore:

  * node_modules
  * build artifacts
  * docs-only JSON

---

### Step 2: Workflow Parsing

For each JSON file:

* Validate it is a valid n8n workflow
* Extract:

  * name
  * nodes used
  * description (fallback-safe)
* Normalize JSON (stable key order)

---

### Step 3: Deduplication (CRITICAL)

* Generate **SHA-256 hash** of normalized JSON
* If hash exists in `workflows.hash`:

  * Skip import
* Otherwise:

  * Insert new workflow

❗ Hash-based dedupe is the **single source of truth**

---

### Step 4: Attribution & Licensing

For every imported workflow:

* `source_type = "github"`
* `source_url = repo/file path`
* `license`:

  * Read from repo LICENSE file if present
  * Default to `unknown`
* Author:

  * Repo owner
  * Stored as system user if not present

---

### Step 5: Tag & Node Mapping

* Auto-create tags from:

  * Folder names
  * Repo metadata (best-effort)
* Extract node names from workflow JSON
* Insert into:

  * `nodes`
  * `workflow_nodes`

---

## 5️⃣ Database Safety Rules

* Never delete existing workflows
* Never overwrite community-submitted workflows
* Imported workflows must be:

  * `is_verified = false`
  * `author_id = system_importer`

---

## 6️⃣ Runtime Model

* Importer runs as:

  * CLI script (`pnpm import:github`)
* No cron required yet
* Designed to scale to 10k+ workflows

---

## 7️⃣ Logging & Observability

* Log:

  * Repo name
  * Files scanned
  * Workflows imported
  * Duplicates skipped
* Fail gracefully on:

  * Invalid JSON
  * API rate limits
  * Missing files

---

## 8️⃣ Config File

Create `config.ts`:

```ts
export const GITHUB_REPOS = [
  {
    name: 'n8n-automation-templates-5000',
    owner: 'ritik-prog',
    repo: 'n8n-automation-templates-5000'
  }
]
```

---

## 9️⃣ Environment Variables

```env
GITHUB_TOKEN=
```

* Token must be optional (public repos only)
* Respect GitHub rate limits

---

## 🔒 Security & Ethics

* Respect repository licenses
* Do NOT rebrand imported workflows
* Always link back to original source
* Never allow edits to imported workflows

---

## 10️⃣ Output Rules

* Code only
* No UI changes
* No markdown
* No TODOs
* Clean, readable, typed code

---

## 🏁 FINAL INSTRUCTION

**Build the importer as if this project will ingest 50k workflows.
Correctness > speed.
Deduplication > everything else.**

---

### What comes next (natural order)

* Prompt #6 — Moderation & verification system
* Prompt #7 — Programmatic SEO pages for workflows/tags/nodes
* Prompt #8 — Monetization (teams, private workflows, API access)

If you want the **next one**, say **“next: moderation”**, **“next: seo”**, or **“next: monetization”**.
