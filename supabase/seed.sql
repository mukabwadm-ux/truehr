insert into public.testimonials (
  quote,
  client_name,
  client_role,
  company,
  consent_confirmed,
  sort_order,
  published
)
select
  'Working with TruewardHR was a great experience! The consultation was insightful, professional, and incredibly helpful in guiding our hiring process at Hera Collections. I highly recommend his services to any business looking for practical and reliable HR support.',
  'Nicole Kunta',
  'CEO & Co-Founder',
  'Hera Collections',
  true,
  1,
  true
where not exists (
  select 1
  from public.testimonials
  where client_name = 'Nicole Kunta'
    and company = 'Hera Collections'
);
