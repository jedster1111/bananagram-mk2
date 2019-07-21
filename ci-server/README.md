# CI Server 

## Terraform

See [the Terraform setup instructions](./terraform/README.terraform.md)

```sh
cd terraform
export TF_VAR_token=Your_Digital_Ocean_Api_Token
export TF_VAR_ssh_fingerprint=Your_SSH_Fingerprint
terraform apply
```

## Ansible

See [the Ansible setup instructions](./ansible/README.md)

```sh
cd ansible
ansible-playbook -i 'YourServerIp,' create_user.yaml
ssh jed@YourServerIp
cd /tmp/ci-server-files/docker-compose
docker-compose up -d -p bananagram
```

Point the domain https://jenkins.bananagram.jedthompson.co.uk to the new server ip using NameCheap.

Need to get the admin password for new instance of Jenkins.

```sh
docker volume inspect bananagram_jenkins-home
cd MountFromAboveCommand
cat secrets/initialAdminPassword
```

Set up Jenkins using BlueOcean.

If docker group doesn't have GID 999 your builds won't work. You can change [.env](./ci-server-files/)

`DOCKER_GID=$(getent group docker | cut -d: -f3)` to find the id of your docker group.
