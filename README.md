# COVID-19 Dashboard

This is a web application project to track COVID-19 cases around the world. It was built with Laravel 9 and Vue.js 3.

## Getting Started
This section shows how to set up a local development environment using [Laravel Sail](https://laravel.com/docs/9.x/sail).

### Prerequisites
In order to run this project locally, make sure to have [Git](https://git-scm.com/) and [Docker](https://www.docker.com/) installed.

### Installation
Clone (or download) the repository to your local computer and navigate to the project's directory:

```sh
git clone https://github.com/faqeel/covid-dashboard.git

cd covid-dashboard
```

Run the following commands to install the project's dependencies:

```sh
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

### Configure Environment Variables
Copy the `.env.example` file to `.env`.

```sh
# Windows
copy .env.example .env
# Linux
cp .env.example .env 
```

Set the `DB_HOST` environment variable to `mysql`: 

```
DB_HOST=mysql
```

### Last Steps  

Run the following commands:

```sh
# start laravel sail
./vendor/bin/sail up

# generate an app key
./vendor/bin/sail artisan key:generate

# migrate the database
./vendor/bin/sail artisan migrate

# install npm dependencies
./vendor/bin/sail npm install

# restart laravel sail
./vendor/bin/sail restart
```

## Running the project

> **Note**
> The project can be stopped by running `./vendor/bin/sail stop`

To start the project, simply run the following commands:

```sh
# start laravel sail
./vendor/bin/sail up -d # detached mode

# build the project...
./vendor/bin/sail npm run build
# or run the Vite development server instead
./vendor/bin/sail npm run dev
```

That's it, you can access the web application by visiting this URL `http://localhost`. 🥳

### Populate The Database

When visiting the web application for the first time, no data will be displayed as we still need to send a *fetch* request in order to run the `FillDataJob`.

#### Start The Fill Data Job

Run the queue worker using the following command:

```sh
./vendor/bin/sail artisan queue:work
```

#### Send a Fetch Request

Go to the web application, and click on the *fetch* button which can be found on the top right of the page. The `FillDataJob` will start running and populate data into the database.
