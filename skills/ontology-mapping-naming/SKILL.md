---
name: ontology-mapping-naming
description: Map product ontology and improve naming so the product's concepts match the user's mental graph. Use when Codex needs to review code, UI copy, specs, APIs, docs, menus, labels, and workflows for ambiguity, overloaded terms, opaque internal names, weak discoverability, or missing domain-native language.
---

# Ontology Mapping and Naming

Use this skill when a product, feature, API, or internal tool is hard to understand because the names and concepts make sense to the builders but not to the users.

This skill is grounded in Drew Hoskins's framing of ontology, signifiers, and discoverability. The ontology is the graph of names, concepts, and relationships that the product presents. Products become easier to discover and use when that graph overlaps with the user's existing mental graph. Products become harder to learn when they rely on internal jargon, opaque codenames, or concepts that are only obvious if you know the implementation.

## What this skill does

It reviews whether the product's naming:
- matches user concepts that already exist
- reduces ambiguity between similar concepts
- improves discovery and searchability
- supports the right persona's mental model
- balances consistency with specificity
- avoids internal language leaking into user-facing surfaces

## Expected output

Respond in five blocks:

1. Current ontology snapshot
2. Naming mismatches
3. Ambiguities and collision risks
4. Recommended terms
5. Rollout notes

If context is incomplete, state the assumptions briefly and proceed.

## Workflow

1. Identify the target persona and domain.
2. Extract the current nouns, verbs, categories, and relationships.
3. Compare product language to user language.
4. Find ambiguity, jargon, and discoverability gaps.
5. Propose more idiomatic and specific terms.

## 1. Map the ontology

List the product's current conceptual graph:
- key entities
- key actions
- groupings and menus
- user-visible states
- similar terms that may collide

Do this across surfaces when relevant:
- UI labels
- navigation
- button text
- error messages
- docs
- API names
- code abstractions that leak into product language

## 2. Check whether names live in the user's ontology

Ask:
- Would the target user already know this term?
- Would they search for this concept using this word?
- Is this a system name or a user name?
- Is the name generic where the domain expects specificity?
- Is the name precise for the right persona, or only for the team?

Prefer names and concepts users already bring with them.

Examples of weak naming:
- internal codenames
- broad words like "Review" where the domain expects a narrower term
- different concepts sharing one label
- one concept represented by multiple labels without a good reason

## 3. Look for ontology failures

Common failure modes:
- opaque codename
- overloaded term
- false synonym
- generic label hiding a domain-specific job
- backend concept leaking into UX
- menu grouping that reflects implementation instead of usage
- inconsistent verb pairs
- name that works for one persona and confuses another
- label that hurts searchability in docs, app search, or code search

## 4. Trade off consistency with specificity

Do not optimize for consistency in the abstract.

Sometimes the right move is:
- one global term everywhere

Sometimes the right move is:
- a more specific, domain-native term in the place where the user makes a decision

Ask:
- Does consistency help users transfer knowledge?
- Or does specificity help them recognize the right action faster?

A naming system that is perfectly consistent but semantically weak is still bad.

## 5. Suggest better terms

When proposing replacements, optimize for:
- domain fit
- discoverability
- clarity at point of use
- searchability
- distinction from adjacent concepts

For each recommendation, include:
- current term
- problem
- proposed term
- why it fits the persona better
- risks or migration notes

Recommended format:

```text
Current term: Review
Problem: too generic for beer enthusiasts and collides with broader feedback concepts
Proposed term: Tasting Notes
Why: matches the user's domain language and better signals what belongs in the field
Migration note: keep "Review" as a search synonym in docs and app search during transition
```

## When to go deeper

If the task touches IA, search, docs, SDKs, or domain-heavy products, read [references/checklists.md](./references/checklists.md).

Use that file to:
- pressure-test terminology across personas
- review naming collisions
- align code names with product names when needed
- plan renames with minimal user confusion

## Operating rules

- Do not defend a term just because the team is used to it.
- Do not treat code-friendly naming as automatically user-friendly naming.
- Do not rename in isolation; inspect adjacent concepts and hierarchy.
- Do not optimize only for elegance; optimize for recognition and discovery.
- Do not assume one ontology fits every persona.

## Signs of good application

This skill is working when:
- the analysis exposes where the product's ontology differs from the user's ontology
- the proposed names feel more idiomatic and searchable
- adjacent concepts become easier to distinguish
- the product becomes easier to discover, understand, and talk about
