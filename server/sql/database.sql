-- Database: color-picker

-- DROP DATABASE IF EXISTS "color-picker";

CREATE DATABASE "color-picker"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE public.color_groups (
    color_group_id integer NOT NULL,
    color_group_name character varying(30) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.color_groups OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16555)
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_groups_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_groups_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 218
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_groups_color_group_id_seq OWNED BY public.color_groups.color_group_id;


--
-- TOC entry 222 (class 1259 OID 16564)
-- Name: color_in_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.color_in_color_group (
    color_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.color_in_color_group OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16563)
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_in_color_group_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 221
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_group_id_seq OWNED BY public.color_in_color_group.color_group_id;


--
-- TOC entry 220 (class 1259 OID 16562)
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_in_color_group_color_id_seq OWNER TO postgres;

--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 220
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_id_seq OWNED BY public.color_in_color_group.color_id;


--
-- TOC entry 217 (class 1259 OID 16549)
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
-- TOC entry 216 (class 1259 OID 16548)
-- Name: colors_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colors_color_id_seq OWNER TO postgres;

--
-- TOC entry 3659 (class 0 OID 0)
-- Dependencies: 216
-- Name: colors_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_color_id_seq OWNED BY public.colors.color_id;


--
-- TOC entry 225 (class 1259 OID 16583)
-- Name: user_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color (
    user_id integer NOT NULL,
    color_id integer NOT NULL
);


ALTER TABLE public.user_color OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16582)
-- Name: user_color_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_color_id_seq OWNER TO postgres;

--
-- TOC entry 3660 (class 0 OID 0)
-- Dependencies: 224
-- Name: user_color_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_color_id_seq OWNED BY public.user_color.color_id;


--
-- TOC entry 228 (class 1259 OID 16602)
-- Name: user_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color_group (
    user_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.user_color_group OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16601)
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_group_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_color_group_id_seq OWNED BY public.user_color_group.color_group_id;


--
-- TOC entry 226 (class 1259 OID 16600)
-- Name: user_color_group_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_group_user_id_seq OWNER TO postgres;

--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_color_group_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_user_id_seq OWNED BY public.user_color_group.user_id;


--
-- TOC entry 223 (class 1259 OID 16581)
-- Name: user_color_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_user_id_seq OWNER TO postgres;

--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_color_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_user_id_seq OWNED BY public.user_color.user_id;


--
-- TOC entry 215 (class 1259 OID 16542)
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
-- TOC entry 214 (class 1259 OID 16541)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3469 (class 2604 OID 16559)
-- Name: color_groups color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_groups ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_groups_color_group_id_seq'::regclass);


--
-- TOC entry 3470 (class 2604 OID 16567)
-- Name: color_in_color_group color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_id SET DEFAULT nextval('public.color_in_color_group_color_id_seq'::regclass);


--
-- TOC entry 3471 (class 2604 OID 16568)
-- Name: color_in_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_in_color_group_color_group_id_seq'::regclass);


--
-- TOC entry 3468 (class 2604 OID 16552)
-- Name: colors color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN color_id SET DEFAULT nextval('public.colors_color_id_seq'::regclass);


--
-- TOC entry 3472 (class 2604 OID 16586)
-- Name: user_color user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_user_id_seq'::regclass);


--
-- TOC entry 3473 (class 2604 OID 16587)
-- Name: user_color color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN color_id SET DEFAULT nextval('public.user_color_color_id_seq'::regclass);


--
-- TOC entry 3474 (class 2604 OID 16605)
-- Name: user_color_group user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_group_user_id_seq'::regclass);


--
-- TOC entry 3475 (class 2604 OID 16606)
-- Name: user_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.user_color_group_color_group_id_seq'::regclass);


--
-- TOC entry 3467 (class 2604 OID 16545)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);

