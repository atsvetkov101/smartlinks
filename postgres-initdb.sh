#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "smartlinks";
  Grant all privileges on database smartlinks to postgres;
EOSQL
