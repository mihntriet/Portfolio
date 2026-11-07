# EC2 deployment case study

## Goal and setup

Deploy this portfolio reproducibly from Ubuntu in WSL on Windows to an Amazon Linux 2023 EC2 instance. The site is built as a Docker image and served by Nginx on port 8080. Terraform, Kubernetes, and automated CD are outside this lab.

## Implementation

1. `bootstrap-amazon-linux.yml` installs Docker from the Amazon Linux repository and enables the service.
2. `deploy.yml` checks that it owns the target directory and container, copies the build inputs from WSL, builds `portfolio:lab`, and starts `my-portfolio-app` with a restart policy.
3. The deploy playbook requests `http://127.0.0.1:8080/` on the instance and checks that the expected page was served.

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

## Compatibility note

The first two runs succeeded but warned that `community.docker` 5.4.0 does not support the WSL control node's Ansible 2.16.3. The repository now pins the compatible 4.8.9 collection in `requirements.yml`. After installing 4.8.9, the next two deployment runs completed without the collection compatibility warning. The final run also had no interpreter discovery warning; the inventory template explicitly selects `/usr/bin/python3` for Amazon Linux 2023.

## Current limits

The image is built on EC2 from the local workspace, including uncommitted changes. The first GitHub Actions run passed lint, test, build, and Docker build, but its HTTP smoke check failed on a connection reset just after starting the container. The workflow now retries that transient error, and the [next hosted run on `main`](https://github.com/mihntriet/Portfolio/actions/runs/42351969216) passed both jobs. The endpoint uses HTTP on port 8080. Versioned image releases, automated delivery, HTTPS, and monitoring remain future work.
