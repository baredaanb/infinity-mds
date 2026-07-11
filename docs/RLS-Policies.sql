-- ==============================================================================
-- Phase 7: Multi-Tenant Row-Level Security (RLS) Policies
-- Database: PostgreSQL (Supabase / Prisma)
-- ==============================================================================

-- 1. Enable RLS on core tables
ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;

-- 2. Define the Tenant ID context retrieval function
-- We assume the API/Middleware sets the custom claims in the Postgres session
-- e.g., SET request.jwt.claim.tenant_id = 'agency1';
CREATE OR REPLACE FUNCTION current_tenant_id()
RETURNS text AS $$
  SELECT current_setting('request.jwt.claim.tenant_id', true);
$$ LANGUAGE sql STABLE;

-- 3. Policy: Clients can only see and modify their own tenant's data
-- Requires adding a `tenantId` column to the `Client` table in Prisma.
CREATE POLICY "Tenant isolation for Clients" ON "Client"
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- 4. Policy: Projects isolated by tenant
-- Assuming Project has a direct tenant_id, or joins through Client
CREATE POLICY "Tenant isolation for Projects" ON "Project"
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- 5. Policy: Invoices strictly locked to tenant and role
CREATE POLICY "Tenant isolation for Invoices" ON "Invoice"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (tenant_id = current_tenant_id());
  
-- Only Franchise Admins can insert/update invoices within their tenant
CREATE POLICY "Franchise Admins can modify tenant Invoices" ON "Invoice"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (
    tenant_id = current_tenant_id() AND 
    current_setting('request.jwt.claim.role', true) IN ('ADMIN', 'ACCOUNT_MANAGER')
  );

-- Note: In Prisma, you would utilize Prisma Client Extensions to automatically 
-- append the tenant_id to all WHERE clauses as a secondary application-layer protection,
-- but this SQL strictly enforces it at the database layer.
