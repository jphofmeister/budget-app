--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE josephhofmeister;
ALTER ROLE josephhofmeister WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:+vrdSPA4AqDbqalBktt9MA==$mQ6Y3WzVhMA2YrJ8VheB3/Rsp4t/gahkiHdE3Wsz6nI=:wjdLlHCoZS8rByZDF0uopODqMCz+s+DLH/VcaJuROPw=';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:wIGhdhlY93pWKPSYwTn+6A==$HZlChnbbmGckWyiRHEJWZzQoQkX2WR6z9lG2y0vikoY=:/4VZ4ObBI6+Xu6/S+81/GQKENe6p/bbyG3b0gYoRJXw=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "budget-calendar" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: budget-calendar; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "budget-calendar" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "budget-calendar" OWNER TO postgres;

\connect -reuse-previous=on "dbname='budget-calendar'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills (
    bill_id integer NOT NULL,
    bill_name character varying(30) NOT NULL,
    bill_amount numeric NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean,
    bill_url character varying(255),
    bill_description character varying(255),
    frequency_interval integer,
    frequency_type character varying(30),
    frequency_day integer,
    frequency_start_date timestamp without time zone,
    user_id integer NOT NULL
);


ALTER TABLE public.bills OWNER TO postgres;

--
-- Name: bills_bill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bills ALTER COLUMN bill_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bills_bill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: income; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.income (
    income_id integer NOT NULL,
    income_name character varying(255) NOT NULL,
    income_amount numeric NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    active boolean NOT NULL,
    frequency_interval integer,
    frequency_type character varying(30),
    frequency_start_date timestamp without time zone,
    user_id integer NOT NULL,
    frequency_day character varying(30)
);


ALTER TABLE public.income OWNER TO postgres;

--
-- Name: income_income_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.income ALTER COLUMN income_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.income_income_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(30) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    active boolean,
    updated_on timestamp without time zone,
    user_password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills (bill_id, bill_name, bill_amount, created_on, updated_on, active, bill_url, bill_description, frequency_interval, frequency_type, frequency_day, frequency_start_date, user_id) FROM stdin;
7	IU Loan	40	2025-11-23 10:36:39.476	\N	t	https://heartland.ecsi.net		1	month	1	2025-11-01 00:00:00	8
8	PayPal Mastercard	40	2025-11-23 10:38:17.82	\N	t		variable	1	month	2	2025-11-02 00:00:00	8
6	AES	79	2025-02-06 14:26:45.285	2025-11-23 10:38:49.611	t			1	month	5	2025-01-02 00:00:00	8
9	Student Loan	241.90	2025-11-23 10:40:52.261	2025-11-23 10:43:10.835	t	https://myaccount.aidvantage.com		1	month	10	2025-10-11 00:00:00	8
10	AT&T	80	2025-11-23 10:43:59.032	\N	t			1	month	11	2025-11-11 00:00:00	8
11	Verizon	127.80	2025-11-23 10:44:35.227	\N	t			1	month	13	2025-11-13 00:00:00	8
12	PayPal Credit	137	2025-11-23 10:45:14.525	\N	t		variable	1	month	20	2025-11-20 00:00:00	8
13	Car Loan	351.34	2025-11-23 10:45:48.831	\N	t			1	month	21	2025-11-21 00:00:00	8
14	Geico	194.57	2025-11-23 10:46:35.595	\N	t		Car insurance	1	month	21	2025-11-21 00:00:00	8
15	Citizens	90	2025-11-23 10:47:25.871	\N	t		variable	1	month	22	2025-10-22 00:00:00	8
16	ADT	73.95	2025-11-23 10:48:07.077	\N	t			1	month	26	2025-10-26 00:00:00	8
\.


--
-- Data for Name: income; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.income (income_id, income_name, income_amount, created_on, updated_on, active, frequency_interval, frequency_type, frequency_start_date, user_id, frequency_day) FROM stdin;
1	Orbis	1744.05	2025-06-12 13:58:36.505	\N	t	2	week	2025-06-06 00:00:00	8	Friday
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_name, created_on, last_login, active, updated_on, user_password) FROM stdin;
2	test2	2024-09-05 16:20:01.093	\N	t	\N	$2b$10$uBXAgwYxTHLJYz86GEI2jON1Swltwu5c97BJMk2B55y16K3I2XpZi
3	test3	2024-09-05 16:22:53.364	\N	t	\N	$2b$10$Jk3RKZQkm3EVOWbtg8.Pwe1j5yP8aEPj/9JApaznQJF.kT77j3l.O
4	test4	2024-09-05 16:24:20.085	\N	t	\N	$2b$10$45Deg08VrLB4jyV8gyPMOO81gV7LJpyRnZmf.GCYYrOLg66DTJeLG
5	test5	2024-09-05 16:26:22.417	\N	t	\N	$2b$10$Sykad5M91zmYV7S8r9LIMetqhg7P4UEVZHiDPpmDoQnYpJj6dxqea
6	test6	2024-09-05 16:28:53.981	\N	t	\N	$2b$10$MN8J7ZSR0O1XgAxyYeDZ.OakJaRjY5WGaFJwr5spLFvJtWO/MnpRO
7	test6	2024-09-05 16:29:20.261	\N	t	\N	$2b$10$03TuZ/JQ8MTvKaYC9K8J1elvRuV00zm42JD4RquXg9UUD1lv33Jx.
1	test	2024-09-05 16:17:32.687	2024-09-19 16:09:06.87	t	\N	$2b$10$6PcCAyiRcjy7J3eZaeqdK.jbUEliwzFq86tlcPn3FWr/liOuulgWe
8	testuser	2025-02-06 14:12:57.59	\N	t	\N	$2b$10$H6DQ0ERRKQoDw1K3zSgbIeqddqCnq4yR7zTYrSLNLq56w5c3YLXbK
\.


--
-- Name: bills_bill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_bill_id_seq', 16, true);


--
-- Name: income_income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.income_income_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);


--
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_pkey PRIMARY KEY (bill_id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (income_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: fki_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id ON public.bills USING btree (user_id);


--
-- Name: fki_user_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id_fk ON public.income USING btree (user_id);


--
-- Name: bills user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: income user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

--
-- Database "color-picker" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: color-picker; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "color-picker" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "color-picker" OWNER TO postgres;

\connect -reuse-previous=on "dbname='color-picker'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: color_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.color_groups (
    color_group_id integer NOT NULL,
    color_group_name character varying(30) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.color_groups OWNER TO postgres;

--
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_groups_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.color_groups_color_group_id_seq OWNER TO postgres;

--
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_groups_color_group_id_seq OWNED BY public.color_groups.color_group_id;


--
-- Name: color_in_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.color_in_color_group (
    color_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.color_in_color_group OWNER TO postgres;

--
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.color_in_color_group_color_group_id_seq OWNER TO postgres;

--
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_group_id_seq OWNED BY public.color_in_color_group.color_group_id;


--
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.color_in_color_group_color_id_seq OWNER TO postgres;

--
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_id_seq OWNED BY public.color_in_color_group.color_id;


--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    color_id integer NOT NULL,
    color_name character varying(30) NOT NULL,
    hex_code character varying(6) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: colors_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colors_color_id_seq OWNER TO postgres;

--
-- Name: colors_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_color_id_seq OWNED BY public.colors.color_id;


--
-- Name: user_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color (
    user_id integer NOT NULL,
    color_id integer NOT NULL
);


ALTER TABLE public.user_color OWNER TO postgres;

--
-- Name: user_color_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_color_color_id_seq OWNER TO postgres;

--
-- Name: user_color_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_color_id_seq OWNED BY public.user_color.color_id;


--
-- Name: user_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color_group (
    user_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.user_color_group OWNER TO postgres;

--
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_color_group_color_group_id_seq OWNER TO postgres;

--
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_color_group_id_seq OWNED BY public.user_color_group.color_group_id;


--
-- Name: user_color_group_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_color_group_user_id_seq OWNER TO postgres;

--
-- Name: user_color_group_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_user_id_seq OWNED BY public.user_color_group.user_id;


--
-- Name: user_color_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_color_user_id_seq OWNER TO postgres;

--
-- Name: user_color_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_user_id_seq OWNED BY public.user_color.user_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(30) NOT NULL,
    user_password character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: color_groups color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_groups ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_groups_color_group_id_seq'::regclass);


--
-- Name: color_in_color_group color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_id SET DEFAULT nextval('public.color_in_color_group_color_id_seq'::regclass);


--
-- Name: color_in_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_in_color_group_color_group_id_seq'::regclass);


--
-- Name: colors color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN color_id SET DEFAULT nextval('public.colors_color_id_seq'::regclass);


--
-- Name: user_color user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_user_id_seq'::regclass);


--
-- Name: user_color color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN color_id SET DEFAULT nextval('public.user_color_color_id_seq'::regclass);


--
-- Name: user_color_group user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_group_user_id_seq'::regclass);


--
-- Name: user_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.user_color_group_color_group_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: color_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.color_groups (color_group_id, color_group_name, created_on, active, updated_on) FROM stdin;
\.


--
-- Data for Name: color_in_color_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.color_in_color_group (color_id, color_group_id) FROM stdin;
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (color_id, color_name, hex_code, created_on, active, updated_on) FROM stdin;
\.


--
-- Data for Name: user_color; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_color (user_id, color_id) FROM stdin;
\.


--
-- Data for Name: user_color_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_color_group (user_id, color_group_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_name, user_password, created_on, last_login, active, updated_on) FROM stdin;
4	joseph.hofmeister	$2b$10$J4/3DhWesimb44sJuNBxZOSvKyKd2z6dKJRYpnS76YWtdvEz8vzKi	2024-04-17 12:04:32.28	\N	t	\N
5	joseph.hofmeister2	$2b$10$sn3gRljcYNWkbsNUPsBMK.DjryYP/wbhmW4jNlcT9KTy4ymLcfOAS	2024-04-17 12:06:44.714	\N	t	\N
6	joseph.hofmeister3	$2b$10$A6wzAfdkDJhBOTlwwVcG..TFETkPPXrEK5IG0yK9.Qez9B3GyHegS	2024-04-17 12:09:19.276	\N	t	\N
7	joseph.hofmeister4	$2b$10$dYr2INjGAw06dnw0wekVLeFj6AkAQSBLdW55OFYNyYfMLQ4z7v6EO	2024-04-17 12:16:27.8	\N	t	\N
8	test2	$2b$10$k1e1.lB9o3b3tXL1t.ggc.bsJARG1y.xLKbdDHq/POyUuxN03gRZy	2024-04-18 14:27:55.826	\N	t	\N
\.


--
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_groups_color_group_id_seq', 1, false);


--
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_in_color_group_color_group_id_seq', 1, false);


--
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_in_color_group_color_id_seq', 1, false);


--
-- Name: colors_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colors_color_id_seq', 1, false);


--
-- Name: user_color_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_color_id_seq', 1, false);


--
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_group_color_group_id_seq', 1, false);


--
-- Name: user_color_group_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_group_user_id_seq', 1, false);


--
-- Name: user_color_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_user_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

