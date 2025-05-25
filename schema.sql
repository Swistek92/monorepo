--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: item_category_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.item_category_enum AS ENUM (
    'cars',
    'computers',
    'books',
    'fashion',
    'tools',
    'others'
);


ALTER TYPE public.item_category_enum OWNER TO neondb_owner;

--
-- Name: user_roles_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.user_roles_enum AS ENUM (
    'ADMIN',
    'MODERATOR',
    'USER'
);


ALTER TYPE public.user_roles_enum OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bid; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.bid (
    id integer NOT NULL,
    amount numeric NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "userName" character varying NOT NULL,
    "userEmail" character varying NOT NULL,
    "userAvatar" character varying,
    "productId" integer
);


ALTER TABLE public.bid OWNER TO neondb_owner;

--
-- Name: bid_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.bid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bid_id_seq OWNER TO neondb_owner;

--
-- Name: bid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.bid_id_seq OWNED BY public.bid.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.item (
    id integer NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    name character varying NOT NULL,
    image character varying DEFAULT 'https://media.sketchfab.com/models/4bdae44017424870b1759db195618576/thumbnails/332515a54cb242948ab45fe368a63e69/7ee040f9cb6b4f12a383ea299bc9b0bf.jpeg'::character varying NOT NULL,
    "startingPrice" double precision DEFAULT '0'::double precision NOT NULL,
    "buyNowPrice" numeric,
    quantity integer DEFAULT 1 NOT NULL,
    "auctionEndDate" timestamp without time zone DEFAULT (now() + '7 days'::interval) NOT NULL,
    "ownerId" integer NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    available boolean DEFAULT true NOT NULL,
    tags text NOT NULL,
    location character varying NOT NULL,
    rating double precision DEFAULT '0'::double precision NOT NULL,
    "isAuction" boolean DEFAULT true NOT NULL,
    category public.item_category_enum DEFAULT 'others'::public.item_category_enum NOT NULL
);


ALTER TABLE public.item OWNER TO neondb_owner;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_id_seq OWNER TO neondb_owner;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.review (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment character varying NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "productId" integer,
    "userId" integer
);


ALTER TABLE public.review OWNER TO neondb_owner;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_id_seq OWNER TO neondb_owner;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying,
    email character varying NOT NULL,
    password character varying NOT NULL,
    roles public.user_roles_enum[] DEFAULT '{USER}'::public.user_roles_enum[] NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    avatar character varying DEFAULT 'https://rapidapi-prod-apis.s3.amazonaws.com/b42aa17d-8ae0-4a28-b29f-587af5454390.png'::character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "lastLogin" timestamp without time zone,
    "hashedRefreshToken" character varying
);


ALTER TABLE public."user" OWNER TO neondb_owner;

--
-- Name: user_favorites; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_favorites (
    "userId" integer NOT NULL,
    "itemId" integer NOT NULL
);


ALTER TABLE public.user_favorites OWNER TO neondb_owner;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO neondb_owner;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: bid id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bid ALTER COLUMN id SET DEFAULT nextval('public.bid_id_seq'::regclass);


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- Name: user_favorites PK_ae80d763dac7d73855d3f01f9ed; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT "PK_ae80d763dac7d73855d3f01f9ed" PRIMARY KEY ("userId", "itemId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: item PK_d3c0c71f23e7adcf952a1d13423; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);


--
-- Name: bid PK_ed405dda320051aca2dcb1a50bb; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY (id);


--
-- Name: IDX_1dd5c393ad0517be3c31a7af83; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "IDX_1dd5c393ad0517be3c31a7af83" ON public.user_favorites USING btree ("userId");


--
-- Name: IDX_8461d8f4286c79382db97846be; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "IDX_8461d8f4286c79382db97846be" ON public.user_favorites USING btree ("itemId");


--
-- Name: review FK_1337f93918c70837d3cea105d39; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user_favorites FK_1dd5c393ad0517be3c31a7af836; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT "FK_1dd5c393ad0517be3c31a7af836" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review FK_2a11d3c0ea1b2b5b1790f762b9a; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES public.item(id);


--
-- Name: item FK_3b030ef7f2840a721547a3c492e; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT "FK_3b030ef7f2840a721547a3c492e" FOREIGN KEY ("ownerId") REFERENCES public."user"(id);


--
-- Name: user_favorites FK_8461d8f4286c79382db97846bee; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT "FK_8461d8f4286c79382db97846bee" FOREIGN KEY ("itemId") REFERENCES public.item(id);


--
-- Name: bid FK_984420b02abbd6c64e46e55ba33; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT "FK_984420b02abbd6c64e46e55ba33" FOREIGN KEY ("productId") REFERENCES public.item(id);


--
-- Name: bid FK_b0f254bd6d29d3da2b6a8af262b; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT "FK_b0f254bd6d29d3da2b6a8af262b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

