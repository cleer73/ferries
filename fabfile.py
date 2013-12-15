from fabric.api import *
import json

env.type = 'dev'
env.hosts = ['127.0.0.1:2200']
env.user = 'vagrant'
env.password = 'vagrant'

@task(default=True)
def everything(destroy=False):

    if destroy: local('vagrant destroy')
    local('vagrant up --provider virtualbox')

    # Update to latest
    sudo('apt-get -yqq update')
    sudo('apt-get -yqq upgrade')

    # Install VM tools, to help with vagrant virtual environments
    sudo('apt-get -yqq install dkms')

    # Install tools for adding Ubuntu PPA's & add PHP 5.4.* PPA
    sudo('apt-get -yqq install python-software-properties')
    sudo('add-apt-repository -y ppa:ondrej/php5')

    # Update and install LAMP stack.
    sudo('apt-get -yqq update')
    sudo('apt-get -yqq upgrade')
    sudo('apt-get -yqq install php5 apache2 curl')

    # Install Composer in VM
    sudo('curl -sS https://getcomposer.org/installer | php')
    sudo('mv composer.phar /usr/local/bin/composer')
    with cd('/vagrant'):
        sudo('composer install')

    # Push Apache Configs, and restart apache.
    put('./config/apache2.conf', '/etc/apache2/sites-available/000-default.conf', use_sudo=True)
    sudo('service apache2 restart')
