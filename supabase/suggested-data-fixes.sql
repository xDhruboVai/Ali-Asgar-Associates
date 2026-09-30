-- NOT APPLIED. Review before running in the Supabase SQL editor.
--
-- 20 rows in public.projects have category 'General' and only carry an image.
-- The website shows them under "Other work" with no details. The statements
-- below fill in category, address, description and area from the firm's 2016
-- corporate profile (Context/ALI ASGAR & ASSOCIATES (03.09.2016).md), so they
-- appear under the right sector with their details.
--
-- Status is deliberately left out: the profile's "On Going" values date from
-- 2016. Set status ('Completed', 'On Going', 'Planning level') once confirmed.

begin;

update public.projects set category = 'Hotel', address = 'Plot # 7/B, Block # NEK, Gulshan Avenue, Gulshan, Dhaka',
  description = '15-Storied Exclusive Hotel Building with 3 Basements', land_area = '16.00 Katha'
  where category = 'General' and name = 'Asset Northstar';

update public.projects set category = 'Industrial', address = 'Sreepur, Gazipur',
  description = '4-Storied Readymade Garment Building', construction_area = '16,500 sft per floor'
  where category = 'General' and name = 'Aswad Composite Mills Ltd (Unit-1 Extn.)';

update public.projects set category = 'Industrial', address = 'Sreepur, Gazipur',
  description = '5-Storied Garment Building', construction_area = '43,560 sft per floor'
  where category = 'General' and name = 'Aswad Composite Mills Ltd (Unit-5)';

update public.projects set category = 'Industrial', address = 'Sreepur, Gazipur',
  description = '4-Storied Central Store cum Garment Building', construction_area = '50,000 sft per floor'
  where category = 'General' and name = 'Aswad Composite Mills Ltd (Unit-6)';

update public.projects set category = 'Hospital', address = 'By Pass Road, Nurpur, Pabna',
  description = '13-Storied Hospital Building with Single Basement', land_area = '40.00 Katha'
  where category = 'General' and name = 'Community Health & Heart Hospital';

update public.projects set category = 'Industrial', address = 'Bagher Bazar, Gazipur',
  description = '6-Storied Readymade Garment Building', construction_area = '12,750 sft per floor'
  where category = 'General' and name = 'Cortz Apparels Ltd';

update public.projects set category = 'Commercial', address = 'Plot # 05, Road # 3/A, Dhanmondi, Dhaka',
  description = '06-Storied Commercial Building with Single Basement', land_area = '9.11 Katha'
  where category = 'General' and name = 'Green Akshay Plaza';

update public.projects set category = 'Commercial', address = 'Plot # 129, Mirpur Road, Kalabagan, Dhaka',
  description = '14-Storied Commercial Building with Double Basement', land_area = '12.65 Katha'
  where category = 'General' and name = 'Green Landmark';

update public.projects set category = 'Commercial', address = 'Plot # 621/1, 621/2 & 622, Kazipara, Begum Rokeya Sharani, Mirpur, Dhaka',
  description = '14-Storied Commercial cum Residential Building with Double Basement', land_area = '10.00 Katha'
  where category = 'General' and name = 'Green Mizan Square';

update public.projects set category = 'Residential', address = 'Plot # 40, Road # 09, Dhanmondi R/A, Dhaka',
  description = '12-Storied Residential Building with Single Basement', land_area = '20.00 Katha'
  where category = 'General' and name = 'Green Rest';

update public.projects set category = 'Commercial', address = 'Plot # 206, 207 & 208, Bara Mogbazar, Dhaka',
  description = '14-Storied Commercial cum Residential Building with Double Basement', land_area = '25.45 Katha'
  where category = 'General' and name = 'Green Shatmahal';

update public.projects set category = 'Commercial', address = 'Plot # 07, Mohakhali Commercial Area, Dhaka',
  description = '14-Storied Commercial Building with Double Basement', land_area = '8.30 Katha'
  where category = 'General' and name = 'Green Trade Point';

update public.projects set category = 'Commercial', address = 'Plot # 2/3, Block # A, Mohammadpur, Dhaka',
  description = '09-Storied Commercial cum Residential Building with Double Basement', land_area = '12.00 Katha'
  where category = 'General' and name = 'HALCYON HEIGHTS';

update public.projects set category = 'Industrial', address = 'Zirani, Savar, Dhaka',
  description = '8-Storied Furniture Factory Building', construction_area = '29,350 sft per floor'
  where category = 'General' and name = 'Hatil Complex';

update public.projects set category = 'Residential', address = 'Plot # 40, Segunbagicha, Dhaka',
  description = '16-Storied Residential Building with Double Basement', land_area = '15.70 Katha'
  where category = 'General' and name = 'Navana Alpenrose';

update public.projects set category = 'Residential', address = 'Plot # 26, Road # 04, Block # C, Banani, Dhaka',
  description = '09-Storied Residential Building with Single Basement', land_area = '7.00 Katha'
  where category = 'General' and name = 'NHL Fortuna';

update public.projects set category = 'Residential', address = 'Plot # 415 & 419, Block # A, Bashundhara, Dhaka',
  description = '15-Storied Residential Building with Double Basement', land_area = '10.00 Katha'
  where category = 'General' and name = 'NHL Khans Legacy';

update public.projects set category = 'Residential', address = 'Plot # 57/1, 57/2, 57/3, 57/4, East Razabazar, Dhaka',
  description = '10-Storied Residential Building with Double Basement', land_area = '21.35 Katha'
  where category = 'General' and name = 'Parveen Pearl Residences';

update public.projects set category = 'Industrial', address = 'Mouchak, Gazipur',
  description = '6-Storied Printing & Readymade Garment Building', construction_area = '36,720 sft per floor'
  where category = 'General' and name = 'Rahmat Fashion';

update public.projects set category = 'Industrial', address = 'Sardhaganj, Kashimpur, Gazipur',
  description = '8-Storied Printing & Garment Building', construction_area = '36,720 sft per floor'
  where category = 'General' and name = 'Thanbee Printing Ltd';

commit;
