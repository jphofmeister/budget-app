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
    bill_amount numeric NOT NULL,
    bill_date timestamp without time zone NOT NULL,
    bill_url character varying(255) COLLATE pg_catalog."default",
    bill_description character varying(2000) COLLATE pg_catalog."default",
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean,
    CONSTRAINT bills_pkey PRIMARY KEY (bill_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bills
    OWNER to postgres;

-- Table: public.income

-- DROP TABLE IF EXISTS public.income;

CREATE TABLE IF NOT EXISTS public.income
(
    income_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    income_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    income_amount numeric NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean NOT NULL,
    CONSTRAINT income_pkey PRIMARY KEY (income_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.income
    OWNER to postgres;

-- Table: public.user_bills

-- DROP TABLE IF EXISTS public.user_bills;

CREATE TABLE IF NOT EXISTS public.user_bills
(
    user_id integer NOT NULL,
    bill_id integer NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean NOT NULL,
    CONSTRAINT user_bills_pkey PRIMARY KEY (user_id, bill_id),
    CONSTRAINT fk_bill_id FOREIGN KEY (bill_id)
        REFERENCES public.bills (bill_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_bills
    OWNER to postgres;

-- Table: public.user_income

-- DROP TABLE IF EXISTS public.user_income;

CREATE TABLE IF NOT EXISTS public.user_income
(
    user_id integer NOT NULL,
    income_id integer NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean NOT NULL,
    CONSTRAINT user_income_pkey PRIMARY KEY (user_id, income_id),
    CONSTRAINT fk_income_id FOREIGN KEY (income_id)
        REFERENCES public.income (income_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_income
    OWNER to postgres;