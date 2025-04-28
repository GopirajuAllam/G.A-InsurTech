/*
  # Initial Schema for Insurance Application

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip_code` (text)
      - `date_of_birth` (text, nullable)
      - `created_at` (timestamptz)
    - `policies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `policy_number` (text, unique)
      - `policy_type` (text)
      - `effective_date` (timestamptz)
      - `expiry_date` (timestamptz)
      - `status` (text)
      - `premium_amount` (numeric)
      - `created_at` (timestamptz)
    - `coverages`
      - `id` (uuid, primary key)
      - `policy_id` (uuid, foreign key to policies)
      - `coverage_type` (text)
      - `coverage_amount` (numeric)
      - `deductible` (numeric)
      - `created_at` (timestamptz)
    - `claims`
      - `id` (uuid, primary key)
      - `policy_id` (uuid, foreign key to policies)
      - `claim_number` (text, unique)
      - `incident_date` (timestamptz)
      - `claim_date` (timestamptz)
      - `status` (text)
      - `claim_amount` (numeric)
      - `description` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  date_of_birth text,
  created_at timestamptz DEFAULT now()
);

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  policy_number text UNIQUE DEFAULT 'POL-' || floor(random() * 90000000 + 10000000)::text,
  policy_type text NOT NULL,
  effective_date timestamptz NOT NULL,
  expiry_date timestamptz NOT NULL,
  status text DEFAULT 'Active',
  premium_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create coverages table
CREATE TABLE IF NOT EXISTS coverages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id uuid REFERENCES policies(id) NOT NULL,
  coverage_type text NOT NULL,
  coverage_amount numeric NOT NULL,
  deductible numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id uuid REFERENCES policies(id) NOT NULL,
  claim_number text UNIQUE DEFAULT 'CLM-' || floor(random() * 90000 + 10000)::text,
  incident_date timestamptz NOT NULL,
  claim_date timestamptz NOT NULL,
  status text DEFAULT 'Processing',
  claim_amount numeric NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE coverages ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users table policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies table policies
CREATE POLICY "Users can read own policies"
  ON policies
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own policies"
  ON policies
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Coverages table policies
CREATE POLICY "Users can read own coverages"
  ON coverages
  FOR SELECT
  TO authenticated
  USING (policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid()));

CREATE POLICY "Users can create own coverages"
  ON coverages
  FOR INSERT
  TO authenticated
  WITH CHECK (policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid()));

-- Claims table policies
CREATE POLICY "Users can read own claims"
  ON claims
  FOR SELECT
  TO authenticated
  USING (policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid()));

CREATE POLICY "Users can create own claims"
  ON claims
  FOR INSERT
  TO authenticated
  WITH CHECK (policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own claims"
  ON claims
  FOR UPDATE
  TO authenticated
  USING (policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid()));