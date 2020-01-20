--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-01-20 12:21:55 CST

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
-- TOC entry 202 (class 1259 OID 50592)
-- Name: buy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buy (
    "rentId" integer NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    "boughtDate" timestamp without time zone DEFAULT '2020-01-16 15:14:51.568'::timestamp without time zone NOT NULL
);


ALTER TABLE public.buy OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 50596)
-- Name: buy_rentId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."buy_rentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."buy_rentId_seq" OWNER TO postgres;

--
-- TOC entry 3107 (class 0 OID 0)
-- Dependencies: 203
-- Name: buy_rentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."buy_rentId_seq" OWNED BY public.buy."rentId";


--
-- TOC entry 204 (class 1259 OID 50598)
-- Name: jwt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jwt (
    id integer NOT NULL,
    jwt character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.jwt OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 50604)
-- Name: jwt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jwt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jwt_id_seq OWNER TO postgres;

--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 205
-- Name: jwt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jwt_id_seq OWNED BY public.jwt.id;


--
-- TOC entry 206 (class 1259 OID 50606)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    poster character varying NOT NULL,
    stock integer NOT NULL,
    trailer character varying NOT NULL,
    "salePrice" integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    availability boolean NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createDate" timestamp without time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 50616)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_id_seq OWNER TO postgres;

--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 207
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 208 (class 1259 OID 50618)
-- Name: movie_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_tags_tag (
    "movieId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public.movie_tags_tag OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 50621)
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    "userId" integer NOT NULL,
    "boughtDate" timestamp without time zone DEFAULT '2020-01-17 22:00:00.32'::timestamp without time zone NOT NULL,
    total integer NOT NULL,
    "updatedDate" timestamp without time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 58777)
-- Name: order_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_detail (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "movieId" integer NOT NULL,
    quantity integer NOT NULL,
    subtotal integer NOT NULL
);


ALTER TABLE public.order_detail OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 58775)
-- Name: order_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_detail_id_seq OWNER TO postgres;

--
-- TOC entry 3110 (class 0 OID 0)
-- Dependencies: 218
-- Name: order_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_detail_id_seq OWNED BY public.order_detail.id;


--
-- TOC entry 223 (class 1259 OID 58804)
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO postgres;

--
-- TOC entry 3111 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- TOC entry 210 (class 1259 OID 50628)
-- Name: rent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rent (
    "rentId" integer NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    "rentDate" timestamp without time zone DEFAULT '2020-01-16 15:14:51.569'::timestamp without time zone NOT NULL,
    devolution boolean NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createDate" timestamp without time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp without time zone DEFAULT now() NOT NULL,
    "devolutionDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.rent OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 50636)
-- Name: rent_rentId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."rent_rentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."rent_rentId_seq" OWNER TO postgres;

--
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 211
-- Name: rent_rentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."rent_rentId_seq" OWNED BY public.rent."rentId";


--
-- TOC entry 220 (class 1259 OID 58785)
-- Name: rental; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental (
    "userId" integer NOT NULL,
    total integer NOT NULL,
    "updatedDate" timestamp without time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    "createDate" timestamp without time zone DEFAULT '2020-01-17 22:00:00.267'::timestamp without time zone NOT NULL,
    "isReturned" boolean DEFAULT false NOT NULL,
    "devolutionDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.rental OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 58795)
-- Name: rental_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental_detail (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "movieId" integer NOT NULL,
    quantity integer NOT NULL,
    subtotal integer NOT NULL,
    "rentalId" integer
);


ALTER TABLE public.rental_detail OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 58793)
-- Name: rental_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rental_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rental_detail_id_seq OWNER TO postgres;

--
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 221
-- Name: rental_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rental_detail_id_seq OWNED BY public.rental_detail.id;


--
-- TOC entry 224 (class 1259 OID 66485)
-- Name: rental_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rental_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rental_id_seq OWNER TO postgres;

--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 224
-- Name: rental_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rental_id_seq OWNED BY public.rental.id;


--
-- TOC entry 226 (class 1259 OID 74838)
-- Name: reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_token (
    id integer NOT NULL,
    jwt character varying NOT NULL,
    "createDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.reset_token OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 74836)
-- Name: reset_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reset_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reset_token_id_seq OWNER TO postgres;

--
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 225
-- Name: reset_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reset_token_id_seq OWNED BY public.reset_token.id;


--
-- TOC entry 212 (class 1259 OID 50638)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 50644)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 213
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 214 (class 1259 OID 50646)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    title character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createDate" timestamp without time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 50655)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO postgres;

--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 215
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- TOC entry 216 (class 1259 OID 50657)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2020-01-17 22:00:00.319'::timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT '2020-01-17 22:00:00.319'::timestamp without time zone NOT NULL,
    "roleId" integer,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 50666)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2873 (class 2604 OID 50668)
-- Name: buy rentId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buy ALTER COLUMN "rentId" SET DEFAULT nextval('public."buy_rentId_seq"'::regclass);


--
-- TOC entry 2875 (class 2604 OID 50669)
-- Name: jwt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jwt ALTER COLUMN id SET DEFAULT nextval('public.jwt_id_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 50670)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 2883 (class 2604 OID 58806)
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 58780)
-- Name: order_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail ALTER COLUMN id SET DEFAULT nextval('public.order_detail_id_seq'::regclass);


--
-- TOC entry 2884 (class 2604 OID 50672)
-- Name: rent rentId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent ALTER COLUMN "rentId" SET DEFAULT nextval('public."rent_rentId_seq"'::regclass);


--
-- TOC entry 2901 (class 2604 OID 66487)
-- Name: rental id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental ALTER COLUMN id SET DEFAULT nextval('public.rental_id_seq'::regclass);


--
-- TOC entry 2903 (class 2604 OID 58798)
-- Name: rental_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_detail ALTER COLUMN id SET DEFAULT nextval('public.rental_detail_id_seq'::regclass);


--
-- TOC entry 2904 (class 2604 OID 74841)
-- Name: reset_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_token ALTER COLUMN id SET DEFAULT nextval('public.reset_token_id_seq'::regclass);


--
-- TOC entry 2889 (class 2604 OID 50673)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 50674)
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 50675)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3077 (class 0 OID 50592)
-- Dependencies: 202
-- Data for Name: buy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buy ("rentId", "userId", "movieId", "boughtDate") FROM stdin;
\.


--
-- TOC entry 3079 (class 0 OID 50598)
-- Dependencies: 204
-- Data for Name: jwt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jwt (id, jwt, "userId") FROM stdin;
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhpczEzIiwiaWF0IjoxNTc4Njc4NzU1LCJleHAiOjE1Nzg2ODIzNTV9.r5hLBJeQl1WfWGGim91UYfal226jWSkXsvtkB5jDgmc	6
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhpczEzIiwiaWF0IjoxNTc4NjgyMDYwLCJleHAiOjE1Nzg2ODU2NjB9.Dec6iBk_0EGWBEt6qklGXPf3sJHoyLcbqD0trQLb66U	6
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhpczEzIiwiaWF0IjoxNTc4NjgyNzcyLCJleHAiOjE1Nzg2ODYzNzJ9.6Dz9hty1FX1nSAg30Jq0AKJCAaCjIINQ9aNuAVG5Unw	6
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhpczEzIiwiaWF0IjoxNTc4NjgzMDAzLCJleHAiOjE1Nzg2ODY2MDN9.eGhnpuck2hM6-UFLNmd8bZjk9R9TBqRT0jkMEs0LRTk	6
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhpczEyMyIsImlhdCI6MTU3ODkyODc3MywiZXhwIjoxNTc4OTMyMzczfQ.2fUIpaGuBMap4hAWdCqRcz_x4lcf_mojHsnbjAcKCxw	7
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkwNDQ0MDgsImV4cCI6MTU3OTA0ODAwOH0.TkpZjnZfXu7ZH7IkTGZd45rN52bOR4a3tNt21h7A50w	3
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMTEyNzAsImV4cCI6MTU3OTExNDg3MH0.uagJ8HGtj-_jc1_9ySWiN2hEwvhF5mmt_Mt8OSGYGCE	3
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMTQ5NDUsImV4cCI6MTU3OTExODU0NX0.BiyIQx5aunsc43n7M5cm6gZFVAm1Aj26MsYIYDOJ2cY	3
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMTQ5NTYsImV4cCI6MTU3OTExODU1Nn0.RpyeJPfMALLdh543PqyVGM8v5NrOHc0Ir95utSi4M5Q	3
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMjE5MzQsImV4cCI6MTU3OTEyNTUzNH0.4wLLwNMm--KljNGaiAiSx5w2KbRyDWVfdIfMx4gZfNg	3
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMzU2MDAsImV4cCI6MTU3OTEzOTIwMH0.Gmui9uQz2cZz4IVUCmtqzdWhOVWk3lE6eQugtu8h_U0	3
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc5MjgwOTQwLCJleHAiOjE1NzkyODQ1NDB9.5TUj2maRHA4uTa3j3fwIeISZQGqzGNIDnQsF3T1SoaM	3
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc5MjgyNTI4LCJleHAiOjE1NzkyODYxMjh9.r0ipBO4WRI5HplHQ5hGN13L3RS_IIvOALRDJfZX2HAo	3
\.


--
-- TOC entry 3081 (class 0 OID 50606)
-- Dependencies: 206
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, title, description, poster, stock, trailer, "salePrice", likes, availability, "isActive", "createDate", "updateDate") FROM stdin;
6	Toy Story	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
1	marselo 1	hehe xd	linkdelposter.com	2	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-09 22:32:40.170838
8	Toy Story 5	hehe xd	linkdelposter.com	0	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-13 09:38:11.366045
2	frozen 3	hehe xd	linkdelposter.com	0	linkdeltrailer.com	10	0	t	t	2020-01-09 22:32:40.170838	2020-01-10 13:14:52.702088
9	Citizen Kane	loren	Ipsum	0	Some trailer	10	0	t	f	2020-01-13 09:21:28.101128	2020-01-15 12:07:12.300175
7	Toy Story 2	hehe xd	linkdelposter.com	0	linkdeltrailer.com	10	0	f	t	2020-01-09 22:32:40.170838	2020-01-15 13:00:47.252289
3	frozen 4	hehe xd	linkdelposter.com	74	linkdeltrailer.com	10	5	t	t	2020-01-09 22:32:40.170838	2020-01-15 15:54:18.489428
10	Harry Potter	An useful description	posterlink.com	10	trailerlink.com	25	0	t	t	2020-01-17 11:40:54.505791	2020-01-17 11:40:54.505791
\.


--
-- TOC entry 3083 (class 0 OID 50618)
-- Dependencies: 208
-- Data for Name: movie_tags_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_tags_tag ("movieId", "tagId") FROM stdin;
9	1
10	6
10	10
\.


--
-- TOC entry 3084 (class 0 OID 50621)
-- Dependencies: 209
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" ("userId", "boughtDate", total, "updatedDate", id) FROM stdin;
6	2020-01-10 19:03:19.794	20	2020-01-10 13:03:37.493177	1
6	2020-01-10 19:03:19.794	20	2020-01-10 13:06:37.163996	2
7	2020-01-13 15:25:59.271	20	2020-01-13 09:38:11.400336	3
3	2020-01-14 23:34:51.691	0	2020-01-14 17:35:17.764678	5
3	2020-01-14 23:38:54.839	16	2020-01-14 17:39:01.927029	6
3	2020-01-14 23:42:22.378	7	2020-01-14 17:42:42.850154	7
3	2020-01-14 23:44:13.482	6	2020-01-14 17:45:09.902458	8
3	2020-01-14 23:48:06.131	5	2020-01-14 17:48:15.432622	9
3	2020-01-14 23:52:31.887	5	2020-01-14 17:53:17.521646	10
3	2020-01-15 00:11:10.957	5	2020-01-14 18:11:21.505122	11
3	2020-01-15 00:15:44.959	4	2020-01-14 18:16:00.127558	12
3	2020-01-15 18:00:18.331	10	2020-01-15 12:01:32.99561	13
3	2020-01-15 18:04:48.572	10	2020-01-15 12:05:05.811573	14
3	2020-01-15 18:06:01.878	0	2020-01-15 12:06:05.894593	15
3	2020-01-15 18:07:06.261	10	2020-01-15 12:07:12.262142	16
3	2020-01-15 18:08:17.488	10	2020-01-15 12:08:35.48125	17
3	2020-01-15 18:59:52.019	10	2020-01-15 13:00:47.209919	47
3	2020-01-15 19:02:01.16	10	2020-01-15 13:04:24.027558	48
3	2020-01-15 19:09:17.254	10	2020-01-15 13:10:08.365093	49
3	2020-01-15 19:11:36.845	10	2020-01-15 13:11:47.146309	50
3	2020-01-15 19:13:06.085	10	2020-01-15 13:13:11.490488	51
3	2020-01-15 19:17:19.744	10	2020-01-15 13:17:28.22631	52
3	2020-01-15 20:56:57.355	10	2020-01-15 14:59:06.541418	53
3	2020-01-15 21:20:04.523	10	2020-01-15 15:20:27.994926	54
3	2020-01-15 21:21:37.239	50	2020-01-15 15:21:50.509053	55
3	2020-01-15 21:53:47.229	50	2020-01-15 15:54:18.391469	56
\.


--
-- TOC entry 3094 (class 0 OID 58777)
-- Dependencies: 219
-- Data for Name: order_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_detail (id, "orderId", "movieId", quantity, subtotal) FROM stdin;
1	6	9	2	16
2	7	9	1	7
3	8	9	1	6
4	9	9	1	5
5	10	9	1	5
6	11	9	1	5
7	12	9	1	4
8	13	9	1	10
9	14	9	1	10
10	15	9	1	10
11	16	9	1	10
12	17	7	1	10
42	47	7	1	10
43	48	3	1	10
44	49	3	1	10
45	50	3	1	10
46	51	3	1	10
47	52	3	1	10
48	53	3	1	10
49	54	3	1	10
50	55	3	5	50
51	56	3	5	50
\.


--
-- TOC entry 3085 (class 0 OID 50628)
-- Dependencies: 210
-- Data for Name: rent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rent ("rentId", "userId", "movieId", "rentDate", devolution, "isActive", "createDate", "updateDate", "devolutionDate") FROM stdin;
\.


--
-- TOC entry 3095 (class 0 OID 58785)
-- Dependencies: 220
-- Data for Name: rental; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental ("userId", total, "updatedDate", id, "createDate", "isReturned", "devolutionDate") FROM stdin;
3	50	2020-01-15 15:25:54.819368	1	2020-01-15 21:21:37.238	f	2020-01-17 14:55:57.298
3	50	2020-01-15 15:35:40.304161	2	2020-01-15 21:35:02.363	f	2020-01-17 14:55:57.298
\.


--
-- TOC entry 3097 (class 0 OID 58795)
-- Dependencies: 222
-- Data for Name: rental_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental_detail (id, "orderId", "movieId", quantity, subtotal, "rentalId") FROM stdin;
1	1	3	5	50	\N
2	2	3	5	50	\N
\.


--
-- TOC entry 3101 (class 0 OID 74838)
-- Dependencies: 226
-- Data for Name: reset_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_token (id, jwt, "createDate", "userId") FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMzIzNDIsImV4cCI6MTU3OTEzNTk0Mn0.qIsCyfwtEbyFfOs9PChjGPq8pBmLLkmHMj0yKejQF6Q	2020-01-15 17:52:22.709964	3
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMzI0MzEsImV4cCI6MTU3OTEzNjAzMX0.W7lS2fvFqbqRIhgzUKDzjNCZ97yB2cNvNDqKQy1h5Bc	2020-01-15 17:53:51.637644	3
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcnR5NjkiLCJpYXQiOjE1NzkxMzI4NjYsImV4cCI6MTU3OTEzNjQ2Nn0.6TulXPhzoRb6pxmYyP5qxZfizm5FMR5jzcaey3rYnOY	2020-01-15 18:01:06.412538	3
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc5Mjc5MjAzLCJleHAiOjE1NzkyODI4MDN9.p0Hyi2UZ_uy0Lceb1zuZDbfVQE-zGgx88WGEWcTh_RU	2020-01-17 10:40:03.595174	3
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc5Mjc5NTUwLCJleHAiOjE1NzkyODMxNTB9.w2jI3At6NNpQkHbTD21TfD4Zeq51I4GYfZxWZNCBiiI	2020-01-17 10:45:50.27465	3
\.


--
-- TOC entry 3087 (class 0 OID 50638)
-- Dependencies: 212
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, title) FROM stdin;
3	client
4	admin
\.


--
-- TOC entry 3089 (class 0 OID 50646)
-- Dependencies: 214
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, title, "isActive", "createDate", "updateDate") FROM stdin;
1	HORROR	t	2020-01-10 11:27:31.489127	2020-01-10 11:27:31.489127
2	ACTION	t	2020-01-10 11:27:42.359389	2020-01-10 11:27:42.359389
3	DRAMA	t	2020-01-10 11:27:45.859507	2020-01-10 11:27:45.859507
4	COMEDY	t	2020-01-10 11:27:54.509756	2020-01-10 11:27:54.509756
5	ROMANCE	t	2020-01-10 11:28:46.242956	2020-01-10 11:28:46.242956
6	ADVENTURE	t	2020-01-10 11:28:49.753758	2020-01-10 11:28:49.753758
8	WESTERN	t	2020-01-10 11:29:06.658408	2020-01-10 11:29:06.658408
9	NOIR	t	2020-01-10 11:29:19.719539	2020-01-10 11:29:19.719539
10	FICTION	t	2020-01-10 11:29:25.054652	2020-01-10 11:29:25.054652
7	ANIMATED	t	2020-01-10 11:29:02.511782	2020-01-13 09:46:05.662736
\.


--
-- TOC entry 3091 (class 0 OID 50657)
-- Dependencies: 216
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, salt, "createdAt", "updatedAt", "roleId", "isActive") FROM stdin;
4	kevin420	kevin420@gmail.com	$2b$10$6pCo1bBw1Ph/udSF0oeOsuL9CgWASrYVfmGsVrTeB4RcC0UTkwYKm	$2b$10$6pCo1bBw1Ph/udSF0oeOsu	2020-01-10 17:41:29.372	2020-01-10 17:41:29.372	3	t
5	frank123	frank123@gmail.com	$2b$10$PzDjDH27PVeSeaEHYBiJgOPbKZzE2yza8krc7j73HoOlrTiZzuxbG	$2b$10$PzDjDH27PVeSeaEHYBiJgO	2020-01-10 17:45:30.003	2020-01-10 17:45:30.003	3	t
6	alexis13	alexis13@gmail.com	$2b$10$S6zZGD2xGyZVZ2JA1YvnYupQizE/oE7eVWoOc/rhOynIu30hil7S.	$2b$10$S6zZGD2xGyZVZ2JA1YvnYu	2020-01-10 17:50:44.089	2020-01-10 12:50:02.371352	4	t
7	alexis123	alexis123@gmail.com	$2b$10$h/znQkZfDgxvJwiyN89GPeA7YM3b4oZF5tOz0XmzK9YS4G9aL.awC	$2b$10$h/znQkZfDgxvJwiyN89GPe	2020-01-13 15:16:48.966	2020-01-13 15:16:48.966	4	t
8	alexis132	alexis132@gmail.com	$2b$10$pcYk38yrMmdMYIctOykrmOICp4HiFnCl2Z24BsUseQX68uRhmldHu	$2b$10$pcYk38yrMmdMYIctOykrmO	2020-01-16 15:31:59.144	2020-01-16 15:31:59.145	3	t
9	alexis420	alexis420@gmail.com	$2b$10$qEi/gAjftI32roTCgEWISe/W.KMoleDom3mtcBIUu1ek.g2psELwG	$2b$10$qEi/gAjftI32roTCgEWISe	2020-01-16 15:38:56.758	2020-01-16 15:38:56.758	3	t
10	anthony	anthony@gmail.com	$2b$10$mxbXP0TjigaOzhGzdIAsBe/oAYXYWOZ19j7tnpe4dQMdsOHk5LLQy	$2b$10$mxbXP0TjigaOzhGzdIAsBe	2020-01-16 15:51:32.46	2020-01-16 15:51:32.46	3	t
11	pepe123	pepe@gmail.com	$2b$10$Ffm5FHwBR8qzEEod784wyey5lfc9jzfvpmvMzne5rNp5obUJwdPv6	$2b$10$Ffm5FHwBR8qzEEod784wye	2020-01-16 15:55:35.298	2020-01-16 15:55:35.298	3	t
12	toto123	toto@gmail.com	$2b$10$mw2fuQf1sqmAMszRVeEF2OmF8fOZEBxLphWhVPxV4MdR9mKMafTy.	$2b$10$mw2fuQf1sqmAMszRVeEF2O	2020-01-16 16:00:09.566	2020-01-16 16:00:09.566	3	t
13	toto12	toto@gmail.com	$2b$10$tkDFPwCv/tGxOUXeURmba./0pU6aaey7dpbdmNoDvL5wXiyUVlPv2	$2b$10$tkDFPwCv/tGxOUXeURmba.	2020-01-16 16:01:49.511	2020-01-16 16:01:49.511	3	t
14	toto13	toto13@gmail.com	$2b$10$Um9tA//8GL.asQjCCMYv1OVLTg2OtWtMFqgn1XsLf3A0w7qc5cbk.	$2b$10$Um9tA//8GL.asQjCCMYv1O	2020-01-16 16:06:40.636	2020-01-16 16:06:40.637	3	t
15	toto133	toto133@gmail.com	$2b$10$/A5vfhtZqD5C3Vv/l0sGE.6oAnq6uuMpinTc5O2xTO6.9d2slr9Qi	$2b$10$/A5vfhtZqD5C3Vv/l0sGE.	2020-01-16 16:14:13.56	2020-01-16 16:14:13.56	3	t
16	alejo123	alejo123@gmail.com	$2b$10$EA1.rbyK9LlJZaFRbncVseD9vkVeelw1xP81PzXc7j2TKx9461DPa	$2b$10$EA1.rbyK9LlJZaFRbncVse	2020-01-16 16:15:53.706	2020-01-16 16:15:53.706	3	t
17	luism123	luism123@gmail.com	$2b$10$NDogF0ARW9EYRV1WydcRCeqbR/WE.Xi1sFKPNziGNcEqgVQqwOybS	$2b$10$NDogF0ARW9EYRV1WydcRCe	2020-01-16 16:28:54.747	2020-01-16 16:28:54.747	3	t
3	admin	torty69@gmail.com	$2b$10$xThEizzATqv05HihJTO9luEp9gLilh7GbwnY6THOoxT/n9zFKAvHu	$2b$10$xThEizzATqv05HihJTO9lu	2020-01-10 17:19:45.27	2020-01-17 11:08:42.369299	4	t
\.


--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 203
-- Name: buy_rentId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."buy_rentId_seq"', 1, false);


--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 205
-- Name: jwt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jwt_id_seq', 17, true);


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 207
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 10, true);


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 218
-- Name: order_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_detail_id_seq', 51, true);


--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 56, true);


--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 211
-- Name: rent_rentId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."rent_rentId_seq"', 3, true);


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 221
-- Name: rental_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rental_detail_id_seq', 2, true);


--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 224
-- Name: rental_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rental_id_seq', 2, true);


--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 225
-- Name: reset_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_token_id_seq', 6, true);


--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 213
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 4, true);


--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 215
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 10, true);


--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 17, true);


--
-- TOC entry 2929 (class 2606 OID 58782)
-- Name: order_detail PK_0afbab1fa98e2fb0be8e74f6b38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY (id);


--
-- TOC entry 2917 (class 2606 OID 58811)
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 58800)
-- Name: rental_detail PK_1c88f5cf28c50bc471cf2dcfa61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_detail
    ADD CONSTRAINT "PK_1c88f5cf28c50bc471cf2dcfa61" PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 50677)
-- Name: rent PK_1d46ea7203310bfcc41c9994453; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "PK_1d46ea7203310bfcc41c9994453" PRIMARY KEY ("rentId");


--
-- TOC entry 2909 (class 2606 OID 50679)
-- Name: jwt PK_5d23295f3f8f90b85e63e8040fd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jwt
    ADD CONSTRAINT "PK_5d23295f3f8f90b85e63e8040fd" PRIMARY KEY (id);


--
-- TOC entry 2907 (class 2606 OID 50681)
-- Name: buy PK_65398e2130ebc88163b003f1783; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buy
    ADD CONSTRAINT "PK_65398e2130ebc88163b003f1783" PRIMARY KEY ("rentId");


--
-- TOC entry 2923 (class 2606 OID 50685)
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 74847)
-- Name: reset_token PK_93e1171b4a87d2d0478295f1a99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_token
    ADD CONSTRAINT "PK_93e1171b4a87d2d0478295f1a99" PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 66492)
-- Name: rental PK_a20fc571eb61d5a30d8c16d51e8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY (id);


--
-- TOC entry 2915 (class 2606 OID 50687)
-- Name: movie_tags_tag PK_a63fb1cc6083d9417e67029dece; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "PK_a63fb1cc6083d9417e67029dece" PRIMARY KEY ("movieId", "tagId");


--
-- TOC entry 2921 (class 2606 OID 50689)
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 2925 (class 2606 OID 50691)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 50693)
-- Name: movie PK_cb3bb4d61cf764dc035cbedd422; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 50695)
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- TOC entry 2912 (class 1259 OID 50696)
-- Name: IDX_5c229532ab9c842d9f712c44a4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5c229532ab9c842d9f712c44a4" ON public.movie_tags_tag USING btree ("movieId");


--
-- TOC entry 2913 (class 1259 OID 50697)
-- Name: IDX_7f5d867068b30d8263854b3e98; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7f5d867068b30d8263854b3e98" ON public.movie_tags_tag USING btree ("tagId");


--
-- TOC entry 2946 (class 2606 OID 58823)
-- Name: order_detail FK_053665fe719e0a2132b493aed1f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT "FK_053665fe719e0a2132b493aed1f" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 2950 (class 2606 OID 74858)
-- Name: reset_token FK_1d61419c157e5325204cbee7a28; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_token
    ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2942 (class 2606 OID 50698)
-- Name: rent FK_49296d11229074f058b7274ae2e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "FK_49296d11229074f058b7274ae2e" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2939 (class 2606 OID 50703)
-- Name: movie_tags_tag FK_5c229532ab9c842d9f712c44a4d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "FK_5c229532ab9c842d9f712c44a4d" FOREIGN KEY ("movieId") REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 2947 (class 2606 OID 58828)
-- Name: rental FK_5c91d10c5ee7afddcb2dbbfbbd0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental
    ADD CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2938 (class 2606 OID 50708)
-- Name: jwt FK_690dc6b83bb053b2ccd4342a17f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jwt
    ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2943 (class 2606 OID 50713)
-- Name: rent FK_70f58463bf7ef70f66b3f6c7b46; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "FK_70f58463bf7ef70f66b3f6c7b46" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 2936 (class 2606 OID 50718)
-- Name: buy FK_73b6d9b1037a714d3314e038819; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buy
    ADD CONSTRAINT "FK_73b6d9b1037a714d3314e038819" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2940 (class 2606 OID 50723)
-- Name: movie_tags_tag FK_7f5d867068b30d8263854b3e98d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "FK_7f5d867068b30d8263854b3e98d" FOREIGN KEY ("tagId") REFERENCES public.tag(id) ON DELETE CASCADE;


--
-- TOC entry 2945 (class 2606 OID 58818)
-- Name: order_detail FK_88850b85b38a8a2ded17a1f5369; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- TOC entry 2937 (class 2606 OID 50728)
-- Name: buy FK_8dca499dff630c6fc0662bd3325; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buy
    ADD CONSTRAINT "FK_8dca499dff630c6fc0662bd3325" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 2944 (class 2606 OID 50738)
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- TOC entry 2941 (class 2606 OID 50743)
-- Name: order FK_caabe91507b3379c7ba73637b84; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2949 (class 2606 OID 66505)
-- Name: rental_detail FK_dd490f911c7263cb3eb6de20a0f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_detail
    ADD CONSTRAINT "FK_dd490f911c7263cb3eb6de20a0f" FOREIGN KEY ("rentalId") REFERENCES public.rental(id);


--
-- TOC entry 2948 (class 2606 OID 58838)
-- Name: rental_detail FK_e667322fc2321d47cf261759c6a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_detail
    ADD CONSTRAINT "FK_e667322fc2321d47cf261759c6a" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


-- Completed on 2020-01-20 12:21:56 CST

--
-- PostgreSQL database dump complete
--

