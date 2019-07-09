provider "digitalocean" {
  token = "${var.token}"
}

provider "namecheap" {
  username = "jedster1111"
  api_user = "jedster1111" # Same as username
  token = "your_token"
  ip = "86.139.249.155"
  use_sandbox = true # Toggle for testing/sandbox mode
}

resource "digitalocean_droplet" "jenkinsci-server" {
  image = "${var.droplet_image}"
  name = "jenkinsci-server"
  region = "${var.region}"
  size = "${var.jenkins_droplet_size}"
  monitoring = true
  ssh_keys = [
    "${var.ssh_fingerprint}"
  ]
  
  connection {
    user = "root"
    type = "ssh"
    agent = true
    timeout = "2m"
    host = "${self.ipv4_address}"
  }

  //  copy the ci-server-files to newly created instance
  provisioner "file" {
      source      = "../ci-server-files"
      destination = "/tmp"
  }

  provisioner "remote-exec" {
      inline = [
          "echo 'Hello World'"
        ]
  }

  # provisioner "local-exec" {
  #   command = "ansible-playbook -i '${digitalocean_droplet.jenkinsci-server.ipv4_address},' ./ansible/create_user.yaml"
  # }
}

  # Use the namecheap api to update our DNS Host records
  # resource "namecheap_record" "jenkins-bananagram-jedthompson-co-uk" {
  #   name = "jenkins.bananagram"
  #   domain = "jedthompson.co.uk"
  #   address = "${digitalocean_droplet.jenkinsci-server.ipv4_address}"
  #   mx_pref = 10
  #   type = "A"
  # }

output "service-ip" {
  value = "${digitalocean_droplet.jenkinsci-server.ipv4_address}"
}

