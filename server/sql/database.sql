-- Database: budget-calendar

-- DROP DATABASE IF EXISTS "budget-calendar";

CREATE DATABASE "budget-calendar"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    active boolean,
    updated_on timestamp without time zone,
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.bills

-- DROP TABLE IF EXISTS public.bills;

CREATE TABLE IF NOT EXISTS public.bills
(
    bill_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    bill_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean,
    bill_amount numeric NOT NULL,
    bill_date timestamp without time zone NOT NULL,
    CONSTRAINT bills_pkey PRIMARY KEY (bill_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bills
    OWNER to postgres;