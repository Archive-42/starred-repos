# MITH (Static) Website

This is the Gatsby static site for https://mith.umd.edu. It builds pages based
on data stored in several Airtable bases.

## Deploy

Pushing to GitHub will trigger an automated GitHub action that builds the
staging site at:

    https://umd-mith.github.io/mith-static/

## Release

There is also an scheduled cron job which will deploy tagged releases that have
been added to the Releases Airtable table. This job is contained here in the
`npm run release` command, and is setup using the Ansible playbook in
[mith-ansible].

## Develop

To build the site you will need to install a few things:

* [Node]: a JavaScript programming environment
* [Git]: version control software

Then you will need to get this repository:

    git clone https://github.com/umd-mith/mith-static/

Then you need to install some of the site dependencies:

    cd mith-static
    npm install

You will need to configure your environment so that you can fetch data from the MITH Airtable:

    cp .env-template .env

Ask a MITH team member for the correct values to add to your .env file.

Now you are ready to start the development server:

    npm run develop

[Node]: https://nodejs.org
[Git]: https://git-scm.com/
[mith-ansible]: https://github.com/umd-mith/mith-ansible
