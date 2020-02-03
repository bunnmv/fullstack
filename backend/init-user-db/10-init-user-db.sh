#!/bin/bash
#set -e #cat 10-db_dump_11_07_2019.sql | psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" #echo not doing nada

#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: $POSTGRES_DB; Type: DATABASE; Schema: -; Owner: $POSTGRES_USER
--

ALTER DATABASE $POSTGRES_DB OWNER TO $POSTGRES_USER;

\connect $POSTGRES_DB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE $POSTGRES_DB; Type: COMMENT; Schema: -; Owner: $POSTGRES_USER
--

COMMENT ON DATABASE $POSTGRES_DB IS 'default administrative connection database';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: address; Type: TABLE; Schema: public; Owner: $POSTGRES_USER
--

CREATE TABLE public.address (
    id integer NOT NULL,
    street character varying(50) NOT NULL,
    number character varying(10) NOT NULL,
    zip_code character varying(9) NOT NULL,
    state character varying(20) NOT NULL,
    neighborhood character varying(50) NOT NULL,
    city character varying(50) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.address OWNER TO $POSTGRES_USER;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: $POSTGRES_USER
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO $POSTGRES_USER;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $POSTGRES_USER
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: phone; Type: TABLE; Schema: public; Owner: $POSTGRES_USER
--

CREATE TABLE public.phone (
    id integer NOT NULL,
    user_id integer,
    number character varying(16),
    type character varying(15)
);


ALTER TABLE public.phone OWNER TO $POSTGRES_USER;

--
-- Name: phone_id_seq; Type: SEQUENCE; Schema: public; Owner: $POSTGRES_USER
--

CREATE SEQUENCE public.phone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phone_id_seq OWNER TO $POSTGRES_USER;

--
-- Name: phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $POSTGRES_USER
--

ALTER SEQUENCE public.phone_id_seq OWNED BY public.phone.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: $POSTGRES_USER
--

CREATE TABLE public."user" (
    name character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    cpf character varying(14) NOT NULL,
    id integer NOT NULL,
    date_added date DEFAULT CURRENT_DATE NOT NULL,
    birth_date date NOT NULL
);


ALTER TABLE public."user" OWNER TO $POSTGRES_USER;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: $POSTGRES_USER
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO $POSTGRES_USER;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $POSTGRES_USER
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: phone id; Type: DEFAULT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.phone ALTER COLUMN id SET DEFAULT nextval('public.phone_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: $POSTGRES_USER
--

COPY public.address (id, street, number, zip_code, state, neighborhood, city, user_id) FROM stdin;
\.


--
-- Data for Name: phone; Type: TABLE DATA; Schema: public; Owner: $POSTGRES_USER
--

COPY public.phone (id, user_id, number, type) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: $POSTGRES_USER
--

COPY public."user" (name, email, cpf, id, date_added, birth_date) FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $POSTGRES_USER
--

SELECT pg_catalog.setval('public.address_id_seq', 14, true);


--
-- Name: phone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $POSTGRES_USER
--

SELECT pg_catalog.setval('public.phone_id_seq', 11, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $POSTGRES_USER
--

SELECT pg_catalog.setval('public.user_id_seq', 43, true);


--
-- Name: address address_pk; Type: CONSTRAINT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pk PRIMARY KEY (id);


--
-- Name: phone phone_pk; Type: CONSTRAINT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT phone_pk PRIMARY KEY (id);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: address_id_uindex; Type: INDEX; Schema: public; Owner: $POSTGRES_USER
--

CREATE UNIQUE INDEX address_id_uindex ON public.address USING btree (id);


--
-- Name: phone_id_uindex; Type: INDEX; Schema: public; Owner: $POSTGRES_USER
--

CREATE UNIQUE INDEX phone_id_uindex ON public.phone USING btree (id);


--
-- Name: user_cpf_uindex; Type: INDEX; Schema: public; Owner: $POSTGRES_USER
--

CREATE UNIQUE INDEX user_cpf_uindex ON public."user" USING btree (cpf);


--
-- Name: user_id_uindex; Type: INDEX; Schema: public; Owner: $POSTGRES_USER
--

CREATE UNIQUE INDEX user_id_uindex ON public."user" USING btree (id);


--
-- Name: address address_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: phone phone_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: $POSTGRES_USER
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT phone_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


EOSQL
