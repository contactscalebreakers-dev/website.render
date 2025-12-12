-- Enable RLS on all public tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."workshopTickets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."portfolioItems" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."muralRequests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."newsletterSubscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."cartItems" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for PUBLIC READ access (products, portfolio, workshops should be viewable by anyone)
CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public."portfolioItems" FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.workshops FOR SELECT USING (true);

-- For tables that need authenticated/service role access only
-- Users table - only service role or own user
CREATE POLICY "Service role full access" ON public.users FOR ALL USING (auth.role() = 'service_role');

-- Orders - service role access (your backend uses service role key)
CREATE POLICY "Service role full access" ON public.orders FOR ALL USING (auth.role() = 'service_role');

-- Cart items - service role access
CREATE POLICY "Service role full access" ON public."cartItems" FOR ALL USING (auth.role() = 'service_role');

-- Workshop tickets - service role access  
CREATE POLICY "Service role full access" ON public."workshopTickets" FOR ALL USING (auth.role() = 'service_role');

-- Mural requests - allow insert from anyone (form submission), service role for read
CREATE POLICY "Allow public insert" ON public."muralRequests" FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role read access" ON public."muralRequests" FOR SELECT USING (auth.role() = 'service_role');

-- Newsletter - allow insert from anyone (signup), service role for read
CREATE POLICY "Allow public insert" ON public."newsletterSubscriptions" FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role read access" ON public."newsletterSubscriptions" FOR SELECT USING (auth.role() = 'service_role');
