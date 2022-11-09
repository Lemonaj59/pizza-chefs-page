--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE lemonada_piza;
DROP DATABASE todo;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:+gZ+piwdSoPCManfi7chAg==$rsIa+q7q8KTjmx7m1WWudXpcmF4sMJRIjXtflk5nAm8=:vhz7LK0oxEUti/VCK4lD6BJadz5FP4XhlkHbEAjoLrw=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 14.4 (Debian 14.4-1.pgdg110+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "lemonada_piza" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 14.4 (Debian 14.4-1.pgdg110+1)

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
-- Name: lemonada_piza; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE lemonada_piza WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE lemonada_piza OWNER TO postgres;

\connect lemonada_piza

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
-- Name: auths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auths (
    auths_id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    CONSTRAINT auths_password_check CHECK ((length(password) > 6)),
    CONSTRAINT auths_username_check CHECK ((length(username) > 6))
);


ALTER TABLE public.auths OWNER TO postgres;

--
-- Name: auths_auths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auths_auths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auths_auths_id_seq OWNER TO postgres;

--
-- Name: auths_auths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auths_auths_id_seq OWNED BY public.auths.auths_id;


--
-- Name: pizzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas (
    pizza_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.pizzas OWNER TO postgres;

--
-- Name: pizzas_and_toppings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas_and_toppings (
    pizza_mix_id integer NOT NULL,
    pizza integer,
    toppings integer
);


ALTER TABLE public.pizzas_and_toppings OWNER TO postgres;

--
-- Name: pizzas_and_toppings_pizza_mix_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizzas_and_toppings_pizza_mix_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizzas_and_toppings_pizza_mix_id_seq OWNER TO postgres;

--
-- Name: pizzas_and_toppings_pizza_mix_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_and_toppings_pizza_mix_id_seq OWNED BY public.pizzas_and_toppings.pizza_mix_id;


--
-- Name: pizzas_pizza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizzas_pizza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizzas_pizza_id_seq OWNER TO postgres;

--
-- Name: pizzas_pizza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_pizza_id_seq OWNED BY public.pizzas.pizza_id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    "user" json
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: toppings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toppings (
    topping_id integer NOT NULL,
    type text NOT NULL,
    topping text NOT NULL,
    CONSTRAINT topping_type_check CHECK (((type = 'meat'::text) OR (type = 'vegetable'::text) OR (type = 'sauce'::text) OR (type = 'other'::text)))
);


ALTER TABLE public.toppings OWNER TO postgres;

--
-- Name: toppings_topping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.toppings_topping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.toppings_topping_id_seq OWNER TO postgres;

--
-- Name: toppings_topping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.toppings_topping_id_seq OWNED BY public.toppings.topping_id;


--
-- Name: auths auths_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auths ALTER COLUMN auths_id SET DEFAULT nextval('public.auths_auths_id_seq'::regclass);


--
-- Name: pizzas pizza_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas ALTER COLUMN pizza_id SET DEFAULT nextval('public.pizzas_pizza_id_seq'::regclass);


--
-- Name: pizzas_and_toppings pizza_mix_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_and_toppings ALTER COLUMN pizza_mix_id SET DEFAULT nextval('public.pizzas_and_toppings_pizza_mix_id_seq'::regclass);


--
-- Name: toppings topping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toppings ALTER COLUMN topping_id SET DEFAULT nextval('public.toppings_topping_id_seq'::regclass);


--
-- Data for Name: auths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auths (auths_id, username, password) FROM stdin;
1	topchef1	topchef
2	thebestowner	number1pizza
\.


--
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas (pizza_id, name) FROM stdin;
2	Peporoni
4	Meaty Meaty
1	Supreme
\.


--
-- Data for Name: pizzas_and_toppings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas_and_toppings (pizza_mix_id, pizza, toppings) FROM stdin;
4	1	7
5	1	8
7	1	9
8	1	15
9	2	1
10	2	15
11	4	1
12	4	2
13	4	3
14	4	4
15	4	5
16	4	6
17	4	9
18	4	15
22	1	10
23	1	5
24	1	1
295	1	3
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire, "user") FROM stdin;
Ps3Jkg56yr81LDQS0V-7ixlRmeYmZ1XW	{"cookie":{"originalMaxAge":10799997,"expires":"2022-11-08T07:10:25.257Z","secure":false,"httpOnly":false,"path":"/"},"user":{"userId":1,"username":"topchef1"}}	2022-11-08 07:10:26	\N
Wi9ChiBKQgNUjJGpUH9tmpzhl1U1Kvy4	{"cookie":{"originalMaxAge":10800000,"expires":"2022-11-08T07:37:09.704Z","secure":false,"httpOnly":false,"path":"/"},"user":{"userId":1,"username":"topchef1"}}	2022-11-08 07:37:10	\N
\.


--
-- Data for Name: toppings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.toppings (topping_id, type, topping) FROM stdin;
1	meat	pepperoni
2	meat	sausage
4	meat	ham
5	meat	beef
7	vegetable	Mushrooms
8	vegetable	Bell peppers
9	vegetable	Onions
10	vegetable	Olives
11	vegetable	pepperoncinis
12	vegetable	Pineapple
13	vegetable	Green Chiles
14	vegetable	Jalapeno
15	sauce	Original
16	sauce	BBQ
17	sauce	Ranch
18	sauce	Buffalo
19	sauce	Alfredo Sauce
6	meat	pork
3	meat	bacon
\.


--
-- Name: auths_auths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auths_auths_id_seq', 2, true);


--
-- Name: pizzas_and_toppings_pizza_mix_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_and_toppings_pizza_mix_id_seq', 296, true);


--
-- Name: pizzas_pizza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_pizza_id_seq', 98, true);


--
-- Name: toppings_topping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.toppings_topping_id_seq', 33, true);


--
-- Name: auths auths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auths
    ADD CONSTRAINT auths_pkey PRIMARY KEY (auths_id);


--
-- Name: pizzas_and_toppings pizzas_and_toppings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_and_toppings
    ADD CONSTRAINT pizzas_and_toppings_pkey PRIMARY KEY (pizza_mix_id);


--
-- Name: pizzas pizzas_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzas_name_key UNIQUE (name);


--
-- Name: pizzas pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzas_pkey PRIMARY KEY (pizza_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: toppings toppings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toppings
    ADD CONSTRAINT toppings_pkey PRIMARY KEY (topping_id);


--
-- Name: pizzas unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: pizzas_and_toppings pizzas_and_toppings_pizza_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_and_toppings
    ADD CONSTRAINT pizzas_and_toppings_pizza_fkey FOREIGN KEY (pizza) REFERENCES public.pizzas(pizza_id) ON DELETE CASCADE;


--
-- Name: pizzas_and_toppings pizzas_and_toppings_toppings_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_and_toppings
    ADD CONSTRAINT pizzas_and_toppings_toppings_fkey FOREIGN KEY (toppings) REFERENCES public.toppings(topping_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 14.4 (Debian 14.4-1.pgdg110+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "todo" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 14.4 (Debian 14.4-1.pgdg110+1)

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
-- Name: todo; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE todo OWNER TO postgres;

\connect todo

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
-- PostgreSQL database cluster dump complete
--

