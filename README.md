# Dr. Prescription

## Installation

First, clone this repository:

```bash
git clone https://github.com/tetat/dr-prescription
```

Switch to the repository folder:

```bash
cd dr-prescription
```

Install all dependencies using Composer:

```bash
composer install
npm install
```

Copy the `.env.example` file and make the required configuration changes in the `.env` file:

```bash
cp .env.example .env
```

Generate a new application key:

```bash
php artisan key:generate
```

Run the database migrations (set the database connection in `.env` before migrating):

```bash
php artisan migrate
```

Start the local development server:

```bash
composer run dev
```
