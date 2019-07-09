# Terraform

## Setup

Install terraform: `brew install terraform`

Install [namecheap provider](https://github.com/adamdecaf/terraform-provider-namecheap):
```sh
mkdir -p ~/.terraform.d/plugins/
curl -L https://github.com/adamdecaf/terraform-provider-namecheap/releases/download/1.3.0/terraform-provider-namecheap-osx-amd64 > ~/.terraform.d/plugins/terraform-provider-namecheap 
chmod +x ~/.terraform.d/plugins/terraform-provider-namecheap 
```

Init terraform: `terraform init`

Create ssh key and add to Digital Ocean account

## Create Digital Ocean Server

```sh
export TF_VAR_token=Your_Digital_Ocean_Api_Token
export TF_VAR_ssh_fingerprint=Your_SSH_Fingerprint
```


