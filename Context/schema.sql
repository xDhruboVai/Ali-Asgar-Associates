-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.company_profile (
  id integer NOT NULL DEFAULT nextval('company_profile_id_seq'::regclass),
  name character varying NOT NULL,
  established_year integer,
  type character varying,
  address text,
  telephone character varying,
  email character varying,
  bank_account text,
  services_offered ARRAY,
  CONSTRAINT company_profile_pkey PRIMARY KEY (id)
);
CREATE TABLE public.licenses_and_registrations (
  id integer NOT NULL DEFAULT nextval('licenses_and_registrations_id_seq'::regclass),
  company_id integer,
  license_type character varying NOT NULL,
  license_number character varying NOT NULL,
  authority character varying,
  CONSTRAINT licenses_and_registrations_pkey PRIMARY KEY (id),
  CONSTRAINT licenses_and_registrations_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company_profile(id)
);
CREATE TABLE public.team_members (
  id integer NOT NULL DEFAULT nextval('team_members_id_seq'::regclass),
  name character varying NOT NULL,
  designation character varying,
  role_category character varying,
  discipline character varying,
  degree character varying,
  passing_year integer,
  institution character varying,
  certifications text,
  display_order integer,
  CONSTRAINT team_members_pkey PRIMARY KEY (id)
);
CREATE TABLE public.clients (
  id integer NOT NULL DEFAULT nextval('clients_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  category character varying,
  address text,
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);
CREATE TABLE public.projects (
  id integer NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
  name character varying NOT NULL,
  address text,
  client_id integer,
  category character varying,
  description text,
  status character varying,
  land_area character varying,
  structural_system character varying,
  earthquake_zone character varying,
  design_wind_speed character varying,
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);
CREATE TABLE public.project_images (
  id integer NOT NULL DEFAULT nextval('project_images_id_seq'::regclass),
  project_id integer,
  image_url text NOT NULL,
  caption character varying,
  display_order integer DEFAULT 0,
  CONSTRAINT project_images_pkey PRIMARY KEY (id),
  CONSTRAINT project_images_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);