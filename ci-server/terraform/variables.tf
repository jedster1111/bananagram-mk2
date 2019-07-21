variable "token" {
  description = "Digital Ocean Api Token"
}

variable "region" {
  description = "Digital Ocean Region"
  default = "lon1"
}

variable "droplet_image" {
  description = "Digital Ocean Droplet Image"
  default = "docker-18-04"
}

variable "jenkins_droplet_size" {
  description = "Droplet size for Jenkins server"
  default = "s-1vcpu-1gb"
}

variable "pvt_sshkey" {
  description = "Location of the local private ssh key"
  default = "~/.ssh/id_rsa"
}

variable "ssh_fingerprint" {
  description = "Fingerprint of the public ssh key stored on Digital Ocean"
}
