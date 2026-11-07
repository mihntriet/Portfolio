# EC2 deployment lab (Windows + WSL + Amazon Linux 2023)

Your Windows PC runs Ubuntu 24.04 in WSL. Ubuntu in WSL is the **Ansible control node**; the EC2 Linux instance is the **managed node**. Docker Desktop is useful for local Docker tests, but Ansible can connect to EC2 without Docker Desktop running.

The bootstrap and deployment playbooks have been run on the Amazon Linux 2023 EC2 instance. The portfolio was reachable from a browser through its public address on port 8080. The deployment playbook was run a second time with `changed=0`. See the [case study](CASE_STUDY.md) for the recorded results.

## 1. Check the EC2 instance

Connect to EC2 using your existing method and run:

```bash
cat /etc/os-release
whoami
uname -m
docker --version
free -h
```

The confirmed instance runs Amazon Linux 2023, uses `ec2-user`, and has a Public IPv4 address. You currently connect through **EC2 Instance Connect in the browser**. That browser session uses a temporary key; it does not give WSL a private key for Ansible. Direct SSH from WSL needs a security-group rule allowing TCP 22 from **your current public IP**, not from all addresses. In EC2 Console → Instances → select this instance → Security → select its security group → Edit inbound rules, add SSH/TCP 22 with source **My IP** if it is not already present. For a temporary HTTP demo, port 8080 must also be reachable from the intended viewers. AWS resources may incur charges; set a budget alert before leaving the instance running.

## 2. Prepare the WSL control node

Open a WSL shell on Windows:

```powershell
wsl -d Ubuntu
```

Inside WSL, install and check Ansible:

```bash
sudo apt update
sudo apt install -y ansible
ansible --version
```

Create a new key pair **in WSL**, outside this repository. Check that the chosen filename is unused before generating it. Set a passphrase when prompted:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ls -l ~/.ssh/portfolio-ec2*
ssh-keygen -t ed25519 -f ~/.ssh/portfolio-ec2 -C "portfolio-ansible"
chmod 600 ~/.ssh/portfolio-ec2
cat ~/.ssh/portfolio-ec2.pub
```

If `ls` shows an existing key with that name, choose a new filename instead of replacing it. The `.pub` output is the **public key**; never paste the private file content into chat or the EC2 browser. If you set a passphrase, unlock the key for the current WSL session before connecting:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/portfolio-ec2
```

In your existing **browser EC2 Instance Connect session**, run:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
vi ~/.ssh/authorized_keys
```

In `vi`, press `G` to go to the end, then `o` to add a new line. Paste the **complete public key line** printed by `cat ~/.ssh/portfolio-ec2.pub` in WSL. Press `Esc`, type `:wq`, and press Enter. Preserve every existing line. Then on EC2 run:

```bash
chmod 600 ~/.ssh/authorized_keys
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

The second command prints the EC2 host fingerprint to compare with the first SSH connection from WSL. Adding the public key creates persistent SSH access for your WSL key; you can later remove only that added line to revoke it. Do not remove the existing keys.

## 3. Test Ansible connectivity

From WSL, test the new SSH route first. Replace the placeholder with the instance's Public IPv4 DNS or Public IPv4 address:

```bash
ssh -o IdentitiesOnly=yes -i ~/.ssh/portfolio-ec2 ec2-user@EC2_PUBLIC_DNS_OR_IP
```

On the first connection, verify the SSH host fingerprint against the instance before accepting it. If SSH times out, check the Public IPv4 address and the security-group rule for TCP 22 from your IP. If authentication fails, check the public key line and permissions on EC2.

After SSH works, open this repository in WSL:

```bash
cd /mnt/d/24C02/Portfolio
cp ansible/inventory.example.ini ansible/inventory.ini
```

Edit `ansible/inventory.ini` with your EC2 address and the absolute path to the new private key in WSL. Keep `ansible_user=ec2-user`. The template pins `ansible_python_interpreter=/usr/bin/python3` for Amazon Linux 2023 so installing another Python version does not change Ansible's interpreter choice. The real inventory is ignored by Git. Then run:

```bash
ansible -i ansible/inventory.ini portfolio -m ansible.builtin.ping
```

`pong` means Ansible authenticated over SSH and could run its Python module on the EC2 instance. It does not mean the web application is deployed.

## 4. Bootstrap Docker, then deploy

Install the Ansible Docker collection on WSL, then run the Amazon Linux 2023 bootstrap playbook:

```bash
ansible-galaxy collection install -r ansible/requirements.yml --force
ansible-playbook -i ansible/inventory.ini ansible/bootstrap-amazon-linux.yml
```

The bootstrap playbook installs the `docker` package from the Amazon Linux repository, starts the service, and enables it at boot. It does not add `ec2-user` to the Docker group; the deployment playbook uses `sudo` through Ansible. Docker Compose is not required on EC2 for this lab.

Before deploying, check on EC2 that port 8080 and the container name used by this project are not already in use:

```bash
sudo ss -ltnp
sudo docker ps -a --filter name=my-portfolio-app
```

Then return to WSL and run:

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

The deployment playbook checks Docker, copies only the build inputs from your current workspace to `/opt/portfolio` on EC2, builds an image, starts a container, and checks `http://127.0.0.1:8080/` from the instance. It refuses to overwrite an existing `/opt/portfolio` directory or an existing `my-portfolio-app` container unless they were created by this playbook.

Run the deployment playbook a second time and compare `changed=` in the recap. The recorded second run had `changed=0`; the build was skipped and the container task remained `ok`. The current workflow builds on EC2 and deploys local workspace files, including any uncommitted changes. A later CI/CD phase will publish a versioned image from a reviewed commit.

If the playbook passes and the EC2 security group permits port 8080, open `http://EC2_PUBLIC_DNS_OR_IP:8080/` in your browser. This is an HTTP lab endpoint, not a production HTTPS setup. Docker builds can use considerable memory and network bandwidth on small EC2 instances.
