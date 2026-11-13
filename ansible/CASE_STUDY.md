# EC2 deployment case study

## Goal and setup

Deploy this portfolio reproducibly from Ubuntu in WSL on Windows to an Amazon Linux 2023 EC2 instance. The site is built as a Docker image and served by Nginx on port 8080. The lab now includes a CI-verified image published to GHCR and manually promoted to EC2 by digest. Terraform, Kubernetes, and automatic deployment are outside this lab.

## Implementation

1. `bootstrap-amazon-linux.yml` installs Docker from the Amazon Linux repository and enables the service.
2. `deploy.yml` checks that it owns the target directory and container, copies the build inputs from WSL, builds `portfolio:lab`, and starts `my-portfolio-app` with a restart policy.
3. The deploy playbook requests `http://127.0.0.1:8080/` on the instance and checks that the expected page was served.
4. GitHub Actions runs lint, tests, a production build, and a Docker HTTP smoke test. On `main`, it transfers the tested image to a publish job, pushes it to GHCR, and records its immutable digest.
5. `deploy-image.yml` checks the target architecture and container ownership, pulls the image by digest, starts it on EC2, and verifies HTTP. If the switch or check fails, it attempts to restore the previous image.

The real SSH key and inventory are kept outside Git. The browser check reached the site through the instance's public address on port 8080.

## Observed results

Logs from two consecutive runs of `ansible/deploy.yml` on 2026-11-06 show the result. The first run copied files, built the image, and started the container:

```text
portfolio-ec2 : ok=15 changed=6 unreachable=0 failed=0 skipped=0
```

The second run copied no files, skipped the image build, kept the container running, and passed the HTTP checks:

```text
portfolio-ec2 : ok=14 changed=0 unreachable=0 failed=0 skipped=1
```

This demonstrates idempotence for the unchanged source and host state in this lab. It does not establish behavior for every future configuration change.

After updating the portfolio content and installing `community.docker` 4.8.9, another deployment completed with `ok=15 changed=4 unreachable=0 failed=0 skipped=0`. The playbook copied the changed `index.html` and `src`, rebuilt the image, updated the container, and passed both HTTP checks.

The following run with the same source and collection version completed without changes or warnings:

```text
portfolio-ec2 : ok=14 changed=0 unreachable=0 failed=0 skipped=1
```

The image build was skipped, the container remained `ok`, and both HTTP checks passed.

## Verified image promotion

The [GitHub Actions run for commit `3f0e845`](https://github.com/mihntriet/Portfolio/actions/runs/43422450291) completed all three jobs successfully: quality checks, Docker smoke test, and GHCR publication. The image reference recorded for this release was:

```text
ghcr.io/mihntriet/portfolio@sha256:f3ca1b39845367b8cee77922b7dfdfef3812a5463bc0160f3ff130330aa277a8
```

On 2026-11-13, the first run of `ansible/deploy-image.yml` on the Amazon Linux 2023 EC2 host pulled this digest, replaced the Ansible-managed container, and passed its local HTTP and page-content checks:

```text
portfolio-ec2 : ok=13 changed=4 unreachable=0 failed=0 skipped=1 rescued=0 ignored=0
```

An external HTTP request to the instance's public port 8080 returned status 200 and the expected page marker. The second run with the same digest did not pull or replace anything:

```text
portfolio-ec2 : ok=10 changed=0 unreachable=0 failed=0 skipped=4 rescued=0 ignored=0
```

This establishes idempotence for this image and host state. The rollback path is implemented but has not been exercised by an observed failure.

## Compatibility note

The first two runs succeeded but warned that `community.docker` 5.4.0 does not support the WSL control node's Ansible 2.16.3. The repository now pins the compatible 4.8.9 collection in `requirements.yml`. After installing 4.8.9, the next two deployment runs completed without the collection compatibility warning. The final run also had no interpreter discovery warning; the inventory template explicitly selects `/usr/bin/python3` for Amazon Linux 2023.

## Current limits

The older `deploy.yml` still builds on EC2 from the local workspace, including uncommitted changes, and will switch the container away from the GHCR release if run again. The first GitHub Actions smoke test failed on a connection reset just after starting the container; the retry and diagnostic update passed in the [next run on `main`](https://github.com/mihntriet/Portfolio/actions/runs/42351969216). Promotion to EC2 is still triggered manually from WSL. The endpoint uses HTTP on port 8080; automatic deployment, HTTPS, monitoring, and a tested rollback scenario remain future work.
