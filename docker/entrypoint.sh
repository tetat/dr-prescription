#!/bin/sh

set -e

cd /var/www

echo "Starting Laravel..."

# Recreate storage symlink for the container
rm -f public/storage
php artisan storage:link

# Install Composer dependencies
if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction
fi

# Install Node dependencies
if [ ! -x node_modules/.bin/vite ]; then
    npm install
fi

# Create .env if missing
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate APP_KEY if missing
if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
fi

echo "Waiting for database..."

until php artisan migrate --force; do
    echo "Database not ready, retrying in 2 seconds..."
    sleep 2
done

php artisan optimize:clear

exec composer run dev