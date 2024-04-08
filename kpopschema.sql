-- Create users table
CREATE TABLE users (
  id bigserial PRIMARY KEY,
  username varchar UNIQUE,
  email varchar,
  password varchar,
  fav_boy_group varchar,
  fav_girl_group varchar,
  bias varchar,
  alt_bias varchar,
  bias_wrecker varchar,
  fav_girl_group_song varchar,
  fav_boy_group_song varchar
);

-- Create videos table
CREATE TABLE videos (
  release_date varchar NULL,
  artist text,
  song_name text NULL,
  korean_name text NULL,
  director text NULL,
  video text,
  song_type text,
  release text NULL
);

-- Create girl_groups table
CREATE TABLE girl_groups(
  group_name text PRIMARY KEY,
  short text NULL,
  korean_name text NULL,
  debut varchar NULL, 
  company text,
  members bigint,
  members_names text[],
  videos text[],
  original_memb bigint,
  fanclub_name text NULL,
  active text,
  group_type text NULL
);

-- Create boy_groups table
CREATE TABLE boy_groups (
  group_name text PRIMARY KEY,
  short text NULL,
  korean_name text NULL,
  debut varchar NULL, 
  company text,
  members bigint,
  members_names text[], 
  videos text[], 
  original_memb bigint,
  fanclub_name text NULL,
  active text,
  group_type text NULL
);

-- Create idols table 
CREATE TABLE idols (
  stage_name varchar,
  full_name varchar NULL,
  korean_name varchar NULL,
  k_stage_name varchar NULL,
  date_of_birth varchar NULL,
  group_name varchar NULL,
  country varchar,
  birthplace varchar NULL,
  other_group varchar NULL,
  gender varchar
);

-- Add unique constraint to username column in users table
ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);


