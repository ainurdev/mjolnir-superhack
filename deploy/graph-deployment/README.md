# The Graph — IaC tooling

This repository contains the infrastructure as code (IaC) definition to deploy The Graph stack to public clouds using the tools:

* Kubernetes
* Helm
* Helmfile

Each part of IaC in this repository can be used completely separately.

## IaC parts

* `charts/` — contains the Helm charts to deploy The Graph stack.
* `helmfile/` - contains the definition of Helm releases that would be deployed to the Kubernetes cluster.

## Quickstart

1. Set up your Kubernetes cluster.

1. Install the infrastructure components by following the instructions in `helmfile/INFRA_README.md`
1. Install The Graph stack by following the instructions in `helmfile/README.md`
