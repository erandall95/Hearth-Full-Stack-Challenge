# Getting Started

This project was created to complete the "Full-Stack Challenge" from Shogun Enterprises Inc. Hearth®.
(!)[Hearth Full-Stack Challenge App](./../assest/readme_img.png)

* Search returns homes related to address query "123 Fake St.")
* HTML/CSS/JS web app frontend React or similar frontend framework, basic design)
* Backend with single endpoint Rails, Node, etc) and ability to parse csv of
* homes (see below for getting csv of homes)
* Readme with instructions on how to run the app
* Basic styling and design

## How to run the App

This app can either be run with Docker or with Node through NPM.\
To download - [Docker](https://www.docker.com/products/docker-desktop)
To download - [Node](https://nodejs.org/en/download/)

### Run with Docker

Open a terminal and run:

> docker pull erandall95/hearth_challenge_app
>
> docker run -it -p 3000:3000 -p 3001:3001 erandall95/hearth_challenge_app

### Run with NPM

In the project directory, you can run:

#### `npm run install_all`

Installs all npm modules.\
This command only needs to be run when first opened.

#### `npm run dev`

Launches the app backend and frontend.\

## How to use the App

Open a browser and head to [http://localhost:3000](http://localhost:3000).\

Once open, feel free to type any address starting with the numeric identifier.\
If a portion of data catches the eye, click a card to be routed to the listing.\

Also feel free to edit the .csv file on the server and add, remove, or change data.\
The frontend will reflect these changes.\
**NOTE: the .csv file should be sorted by address for the binary search to work correctly**
