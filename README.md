# COVID-19 Dashboard

This is a web application project to track COVID-19 cases around the world. It was built with Laravel 9 and Vue.js 3.

## Getting Started
This section shows how to run the project on your local machine using [Laravel Sail](https://laravel.com/docs/9.x/sail).

### Prerequisites
In order to run this project locally, you need to make sure that [Docker](https://www.docker.com/) is installed on your machine.

### Installation

**1. Download The Project**

Clone (or download) the repo to your local computer and navigate to the application's directory:

```sh
git clone https://github.com/faqeel/covid-dashboard.git

cd covid-dashboard
```

**2. Install The Application's Dependencies**

Run the following command to install the application's dependencies:

```sh
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

**3. Create `.env` file**

Copy the `.env.example` file to `.env` file. *There is no need to configure/update the `.env` file as it will be configured later by Laravel Sail.*

```sh
# Windows
copy .env.example .env
# Linux
cp .env.example .env 
```

**4. Replace the host variables in the `.env` file**

> You can configure a shell alias for the Sail command. Please refer to the [Configuring A Shell Alias](https://laravel.com/docs/9.x/sail#configuring-a-shell-alias) section.

Start the Laravel Sail by running the following command:

```sh
./vendor/bin/sail up
```

Run the following command to republish Sail's `docker-compose.yml` file and update the host environment variables in the `.env` file. After running the command, you will be asked to choose the services to be installed. Choose `mysql` by entering `0`.

```sh
./vendor/bin/sail artisan sail:install

Which services would you like to install? [mysql]:
 [0] mysql
 [1] pgsql
 [2] mariadb
 [3] redis
 [4] memcached
 [5] meilisearch
 [6] minio
 [7] mailhog
 [8] selenium
> 0
```

**5. Generate Application Key**

```sh
./vendor/bin/sail artisan key:generate
```

**6. Run Database Migrations**

```sh
./vendor/bin/sail artisan migrate
```

**7. Install NPM Dependencies**

```sh
./vendor/bin/sail npm install
```

Finally, it would be better if you restart the application by running the following command:

```sh
./vendor/bin/sail restart
```

### Running the project

Start Laravel Sail:

```sh
./vendor/bin/sail up -d
```

Start the Vite development server (or just build the project):

```sh
# Run Vite development server
./vendor/bin/sail npm run dev
# Build the project 
./vendor/bin/sail npm run build
```
The application will be running on `http://localhost`.

### Populate Database

Run the queue worker using the following command:

```sh
./vendor/bin/sail artisan queue:work
```

Go to the web application, `http://localhost`, and click on the *fetch* button which can be found on the top right of the page. The `FillDataJob` will start running and populate data into the database.
