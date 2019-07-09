# Ansible

## Getting started

Firstly install Ansible: `brew install ansible`

Create the file `/etc/ansible/hosts` and enter the ip of your server like below:

```sh
[bananagram]
104.248.173.60
```

Ensure you have set up your server using ssh keys for authentication.

Ping the server: `ansible all -m ping -u root`

Should see:

```sh
104.248.173.60 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Run the `create_user.yaml` playbook: 
```sh
ansible-playbook create_user.yaml
```
