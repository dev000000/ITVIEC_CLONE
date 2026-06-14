-- Chọn schema để làm việc
USE itviec_db;
INSERT INTO skills (skill_name)
VALUES ('ABAP'),
  ('Agile'),
  ('AI'),
  ('Android'),
  ('Angular'),
  ('AngularJS'),
  ('ASP.NET'),
  ('Automation Test'),
  ('AWS'),
  ('Azure'),
  ('Big Data'),
  ('Blockchain'),
  ('Bridge Engineer'),
  ('Business Analyst'),
  ('Business Intelligence'),
  ('C#'),
  ('C++'),
  ('C language'),
  ('Cloud'),
  ('COBOL'),
  ('Computer Vision'),
  ('CSS'),
  ('Dart'),
  ('Data Analyst'),
  ('Database'),
  ('Data Science'),
  ('Data Warehousing'),
  ('Deep Learning'),
  ('Designer'),
  ('DevOps'),
  ('DevSecOps'),
  ('Django'),
  ('Embedded'),
  ('Embedded Android'),
  ('Embedded C'),
  ('English'),
  ('ERP'),
  ('Figma'),
  ('Flutter'),
  ('Games'),
  ('GCP'),
  ('Golang'),
  ('HTML5'),
  ('iOS'),
  ('IT Support'),
  ('J2EE'),
  ('Japanese'),
  ('Java'),
  ('JavaScript'),
  ('Jira'),
  ('JQuery'),
  ('JSON'),
  ('Kotlin'),
  ('Laravel'),
  ('Linux'),
  ('Lua'),
  ('Machine Learning'),
  ('Magento'),
  ('MANAGER'),
  ('MongoDB'),
  ('MVC'),
  ('MySQL'),
  ('NestJS'),
  ('.NET'),
  ('Networking'),
  ('NextJS'),
  ('NodeJS'),
  ('NoSQL'),
  ('Objective C'),
  ('Odoo'),
  ('OOP'),
  ('Oracle'),
  ('OutSystems'),
  ('PHP'),
  ('PostgreSql'),
  ('Presale'),
  ('Product Designer'),
  ('Product Manager'),
  ('Product Owner'),
  ('Project Manager'),
  ('Python'),
  ('PyTorch'),
  ('QA QC'),
  ('ReactJS'),
  ('React Native'),
  ('Risk Management'),
  ('Ruby'),
  ('Ruby on Rails'),
  ('Rust'),
  ('Salesforce'),
  ('SAP'),
  ('Scala'),
  ('Scrum'),
  ('Security'),
  ('Sharepoint'),
  ('Shopify'),
  ('Software Architect'),
  ('Solidity'),
  ('Solution Architect'),
  ('Spring'),
  ('Spring Boot'),
  ('SQL'),
  ('Swift'),
  ('System Admin'),
  ('System Engineer'),
  ('Team Leader'),
  ('Tester'),
  ('TypeScript'),
  ('UI-UX'),
  ('Unity'),
  ('VueJS'),
  ('Wordpress');
INSERT INTO job_domains (domain_name)
VALUES ('Blockchain & Web3 Services'),
  ('Food and Beverage'),
  ('Tourism and Hospitality Services'),
  ('Insurance'),
  ('Consumer Goods'),
  ('E-commerce'),
  ('Education and Training'),
  ('Banking'),
  ('Game'),
  ('Government'),
  ('IT Hardware and Computing'),
  ('Non-Profit and Social Services'),
  ('Manufacturing and Engineering'),
  ('Media, Advertising and Entertainment'),
  ('Environment'),
  ('Pharmaceuticals'),
  ('Real Estate, Property and Construction'),
  ('Retail and Wholesale'),
  ('IT Services and IT Consulting'),
  ('Telecommunication'),
  ('Transportation, Logistics and Warehouse'),
  ('Cyber Security'),
  ('Trading and Commercial'),
  ('Network and Infrastructure'),
  ('Software Development Outsourcing'),
  ('Software Products and Web Services'),
  ('Agriculture'),
  ('Sports and Fitness'),
  ('Apparel and Fashion'),
  ('Creative and Design'),
  ('Staffing and Recruiting'),
  ('Publishing and Printing'),
  ('Facility Management'),
  ('Research Services'),
  ('Healthcare'),
  ('Materials and Mining'),
  ('Utilities'),
  ('Professional Services'),
  ('Securities & Investment'),
  ('Financial Services'),
  ('Emerging Tech R&D'),
  ('AI Software & Services');
INSERT INTO industries (industry_name)
VALUES ('Blockchain & Web3 Services'),
  ('Food and Beverage'),
  ('Tourism and Hospitality Services'),
  ('Insurance'),
  ('Consumer Goods'),
  ('E-commerce'),
  ('Education and Training'),
  ('Banking'),
  ('Game'),
  ('Government'),
  ('IT Hardware and Computing'),
  ('Non-Profit and Social Services'),
  ('Manufacturing and Engineering'),
  ('Media, Advertising and Entertainment'),
  ('Environment'),
  ('Pharmaceuticals'),
  ('Real Estate, Property and Construction'),
  ('Retail and Wholesale'),
  ('IT Services and IT Consulting'),
  ('Telecommunication'),
  ('Transportation, Logistics and Warehouse'),
  ('Cyber Security'),
  ('Trading and Commercial'),
  ('Network and Infrastructure'),
  ('Software Development Outsourcing'),
  ('Software Products and Web Services'),
  ('Agriculture'),
  ('Sports and Fitness'),
  ('Apparel and Fashion'),
  ('Creative and Design'),
  ('Staffing and Recruiting'),
  ('Publishing and Printing'),
  ('Facility Management'),
  ('Research Services'),
  ('Healthcare'),
  ('Materials and Mining'),
  ('Utilities'),
  ('Professional Services'),
  ('Securities & Investment'),
  ('Financial Services'),
  ('Emerging Tech R&D'),
  ('AI Software & Services');
INSERT INTO cities (city_name, slug)
VALUES ('Tuyên Quang', 'tuyen-quang'),
  ('Lào Cai', 'lao-cai'),
  ('Thái Nguyên', 'thai-nguyen'),
  ('Phú Thọ', 'phu-tho'),
  ('Bắc Ninh', 'bac-ninh'),
  ('Hưng Yên', 'hung-yen'),
  ('Hải Phòng', 'hai-phong'),
  ('Ninh Bình', 'ninh-binh'),
  ('Quảng Trị', 'quang-tri'),
  ('Đà Nẵng', 'da-nang'),
  ('Quảng Ngãi', 'quang-ngai'),
  ('Gia Lai', 'gia-lai'),
  ('Khánh Hòa', 'khanh-hoa'),
  ('Lâm Đồng', 'lam-dong'),
  ('Đắk Lắk', 'dak-lak'),
  ('Hồ Chí Minh', 'ho-chi-minh'),
  ('Đồng Nai', 'dong-nai'),
  ('Tây Ninh', 'tay-ninh'),
  ('Cần Thơ', 'can-tho'),
  ('Vĩnh Long', 'vinh-long'),
  ('Đồng Tháp', 'dong-thap'),
  ('Cà Mau', 'ca-mau'),
  ('An Giang', 'an-giang'),
  ('Hà Nội', 'ha-noi'),
  ('Huế', 'hue'),
  ('Lai Châu', 'lai-chau'),
  ('Điện Biên', 'dien-bien'),
  ('Sơn La', 'son-la'),
  ('Lạng Sơn', 'lang-son'),
  ('Quảng Ninh', 'quang-ninh'),
  ('Thanh Hóa', 'thanh-hoa'),
  ('Nghệ An', 'nghe-an'),
  ('Hà Tĩnh', 'ha-tinh'),
  ('Cao Bằng', 'cao-bang'),
  ('Khác', 'khac');
INSERT INTO countries (country_name)
VALUES ('Vietnam'),
  ('Japan'),
  ('South Korea'),
  ('Singapore'),
  ('Thailand'),
  ('Malaysia'),
  ('Philippines'),
  ('Indonesia'),
  ('China'),
  ('India'),
  ('Australia'),
  ('New Zealand'),
  ('United States'),
  ('Canada'),
  ('United Kingdom'),
  ('Germany'),
  ('France'),
  ('Netherlands'),
  ('Sweden'),
  ('Norway'),
  ('Denmark'),
  ('Finland'),
  ('Switzerland'),
  ('Ireland'),
  ('Italy'),
  ('Spain'),
  ('Portugal'),
  ('Poland'),
  ('Czech Republic'),
  ('Russia'),
  ('Ukraine'),
  ('United Arab Emirates'),
  ('Saudi Arabia'),
  ('Qatar'),
  ('Kuwait'),
  ('Afghanistan'),
    ('Albania'),
    ('Algeria'),
    ('Andorra'),
    ('Angola'),
    ('Antigua and Barbuda'),
    ('Argentina'),
    ('Armenia'),
    ('Austria'),
    ('Azerbaijan'),
    ('Bahamas'),
    ('Bahrain'),
    ('Bangladesh'),
    ('Barbados'),
    ('Belarus'),
    ('Belgium'),
    ('Belize'),
    ('Benin'),
    ('Bhutan'),
    ('Bolivia'),
    ('Bosnia and Herzegovina'),
    ('Botswana'),
    ('Brazil'),
    ('Brunei'),
    ('Bulgaria'),
    ('Burkina Faso'),
    ('Burundi'),
    ('Cabo Verde'),
    ('Cambodia'),
    ('Cameroon'),
    ('Central African Republic'),
    ('Chad'),
    ('Chile'),
    ('Colombia'),
    ('Comoros'),
    ('Congo (Congo-Brazzaville)'),
    ('Costa Rica'),
    ('Croatia'),
    ('Cuba'),
    ('Cyprus'),
    ('Democratic Republic of the Congo'),
    ('Djibouti'),
    ('Dominica'),
    ('Dominican Republic'),
    ('Ecuador'),
    ('Egypt'),
    ('El Salvador'),
    ('Equatorial Guinea'),
    ('Eritrea'),
    ('Estonia'),
    ('Eswatini'),
    ('Ethiopia'),
    ('Fiji'),
    ('Gabon'),
    ('Gambia'),
    ('Georgia'),
    ('Ghana'),
    ('Greece'),
    ('Grenada'),
    ('Guatemala'),
    ('Guinea'),
    ('Guinea-Bissau'),
    ('Guyana'),
    ('Haiti'),
    ('Honduras'),
    ('Hungary'),
    ('Iceland'),
    ('Iran'),
    ('Iraq'),
    ('Israel'),
    ('Ivory Coast'),
    ('Jamaica'),
    ('Jordan'),
    ('Kazakhstan'),
    ('Kenya'),
    ('Kiribati'),
    ('Kosovo'),
    ('Kyrgyzstan'),
    ('Laos'),
    ('Latvia'),
    ('Lebanon'),
    ('Lesotho'),
    ('Liberia'),
    ('Libya'),
    ('Liechtenstein'),
    ('Lithuania'),
    ('Luxembourg'),
    ('Madagascar'),
    ('Malawi'),
    ('Maldives'),
    ('Mali'),
    ('Malta'),
    ('Marshall Islands'),
    ('Mauritania'),
    ('Mauritius'),
    ('Mexico'),
    ('Micronesia'),
    ('Moldova'),
    ('Monaco'),
    ('Mongolia'),
    ('Montenegro'),
    ('Morocco'),
    ('Mozambique'),
    ('Myanmar'),
    ('Namibia'),
    ('Nauru'),
    ('Nepal'),
    ('Nicaragua'),
    ('Niger'),
    ('Nigeria'),
    ('North Korea'),
    ('North Macedonia'),
    ('Oman'),
    ('Pakistan'),
    ('Palau'),
    ('Palestine'),
    ('Panama'),
    ('Papua New Guinea'),
    ('Paraguay'),
    ('Peru'),
    ('Rwanda'),
    ('Saint Kitts and Nevis'),
    ('Saint Lucia'),
    ('Saint Vincent and the Grenadines'),
    ('Samoa'),
    ('San Marino'),
    ('Sao Tome and Principe'),
    ('Senegal'),
    ('Serbia'),
    ('Seychelles'),
    ('Sierra Leone'),
    ('Slovakia'),
    ('Slovenia'),
    ('Solomon Islands'),
    ('Somalia'),
    ('South Africa'),
    ('South Korea'),
    ('South Sudan'),
    ('Sri Lanka'),
    ('Sudan'),
    ('Suriname'),
    ('Syria'),
    ('Taiwan'),
    ('Tajikistan'),
    ('Tanzania'),
    ('Timor-Leste'),
    ('Togo'),
    ('Tonga'),
    ('Trinidad and Tobago'),
    ('Tunisia'),
    ('Turkey'),
    ('Turkmenistan'),
    ('Tuvalu'),
    ('Uganda'),
    ('Uruguay'),
    ('Uzbekistan'),
    ('Vanuatu'),
    ('Vatican City'),
    ('Venezuela'),
    ('Yemen'),
    ('Zambia'),
    ('Zimbabwe'),
  ('Others');
INSERT INTO users (id, email, password, role, status, created_at)
VALUES (
    'a1b2c3d4-e5f6-11ee-b1a2-0242ac120002',
    'mb@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  -- mk : Temp@2025!
  (
    'a1b2c3d4-e5f6-11ee-b1a3-0242ac120003',
    'scandinavian@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a4-0242ac120004',
    'onetechstop@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a5-0242ac120005',
    'mcredit@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a6-0242ac120006',
    'tymex@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a7-0242ac120007',
    'andpad@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a8-0242ac120008',
    'employmenthero@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a9-0242ac120009',
    'boschhr@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b0-0242ac120010',
    'ssihhr@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'EMPLOYER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1a1-0242ac120001',
    'seeker1@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-03 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b1-0242ac120011',
    'seeker2@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-04 10:20:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b2-0242ac120012',
    'seeker3@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-04 12:30:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b3-0242ac120013',
    'seeker4@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-05 09:15:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b4-0242ac120014',
    'seeker5@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-05 11:30:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b5-0242ac120015',
    'seeker6@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-06 08:45:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b6-0242ac120016',
    'seeker7@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-06 14:20:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b7-0242ac120017',
    'seeker8@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 10:00:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b8-0242ac120018',
    'seeker9@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 13:15:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1b9-0242ac120019',
    'seeker10@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 15:30:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1c0-0242ac120020',
    'seeker11@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 17:00:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1c1-0242ac120021',
    'seeker12@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 18:30:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1c2-0242ac120022',
    'seeker13@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-05-07 20:00:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1c3-0242ac120023',
    'seeker14@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-06-22 10:10:41'
  ),
  (
    'a1b2c3d4-e5f6-11ee-b1c9-0242ac120029',
    'seeker20@example.com',
    '$2b$10$dTX/bVkznNo72Fh3d.bz4uGglkSyM9QHSzk/uOoqzYfq3a7hA3ani',
    'SEEKER',
    'ACTIVE',
    '2025-06-25 09:00:00'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'admin@example.com',
    '$2b$10$jV0YhD2FctnfQcuuaCQWf.DjHIaIzmJUUK3QtXbFg3gRB/dg5SbPK',
    'ADMIN',
    'ACTIVE',
    '2025-05-01 00:00:00'
  );
-- mk : admin@123
INSERT INTO seekers (
    id,
    user_id,
    full_name,
    job_title,
    phone_number,
    date_of_birth,
    gender,
    city_id,
    address,
    personal_link,
    cover_letter
  )
VALUES -- seeker1
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    'a1b2c3d4-e5f6-11ee-b1a1-0242ac120001',
    'Vương Đắc Tú',
    'Fullstack Developer',
    '0187127876',
    '2004-06-27',
    'MALE',
    24,
    '123 Street, Hanoi',
    'https://linkedin.com/in/vuongdachaivang',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.'
  ),
  -- seeker2
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    'a1b2c3d4-e5f6-11ee-b1b1-0242ac120011',
    'Nguyễn Minh Bách',
    'Backend Developer (Java)',
    '0912345678',
    '2002-02-14',
    'MALE',
    24,
    'Phường Dịch Vọng, Cầu Giấy, Hà Nội',
    'https://linkedin.com/in/minh-b',
    'Quan tâm cơ hội backend Java/Spring, sẵn sàng học hỏi và làm việc theo nhóm.'
  ),
  -- seeker3
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    'a1b2c3d4-e5f6-11ee-b1b2-0242ac120012',
    'Trần Thu Trang',
    'Frontend Developer (React)',
    '0987654321',
    '2001-11-05',
    'FEMALE',
    16,
    'Quận Bình Thạnh, TP.HCM',
    'https://github.com/thu-c',
    'Yêu thích xây UI/UX tối giản, tối ưu hiệu năng React.'
  ),
  -- seeker4
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    'a1b2c3d4-e5f6-11ee-b1b3-0242ac120013',
    'Lê Hoàng Dư',
    'Fullstack JS (Node/React)',
    '0901122334',
    '2000-07-19',
    'MALE',
    10,
    'Quận Hải Châu, Đà Nẵng',
    'https://lehoangd.dev',
    'Mong muốn môi trường sản phẩm, code sạch, CI/CD bài bản.'
  ),
  -- seeker5
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    'a1b2c3d4-e5f6-11ee-b1b4-0242ac120014',
    'Phạm Quỳnh Lan',
    'QA/QC Engineer',
    '0911223344',
    '2001-04-22',
    'FEMALE',
    24,
    'Quận Nam Từ Liêm, Hà Nội',
    'https://linkedin.com/in/quynh-e',
    'Kinh nghiệm viết test case, test API, ưu tiên quy trình chuẩn.'
  ),
  -- seeker6
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    'a1b2c3d4-e5f6-11ee-b1b5-0242ac120015',
    'Đỗ Văn Phúc',
    'DevOps/Cloud Engineer',
    '0933445566',
    '1999-09-09',
    'MALE',
    16,
    'Thủ Đức, TP.HCM',
    'https://dev.to/vanf',
    'Quan tâm IaC, monitoring, autoscaling, bảo mật hạ tầng.'
  ),
  -- seeker7
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    'a1b2c3d4-e5f6-11ee-b1b6-0242ac120016',
    'Bùi Thảo Giang',
    'Data Analyst',
    '0977112233',
    '2002-12-01',
    'FEMALE',
    24,
    'Long Biên, Hà Nội',
    'https://medium.com/@thaog',
    'Phân tích dữ liệu, kể chuyện bằng dữ liệu, trực quan hoá.'
  ),
  -- seeker8
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    'a1b2c3d4-e5f6-11ee-b1b7-0242ac120017',
    'Vũ Quốc Hưng',
    'Mobile Developer (Flutter)',
    '0966887799',
    '2003-03-03',
    'MALE',
    16,
    'Quận 7, TP.HCM',
    'https://vuquoch.dev',
    'Ưu tiên build app đa nền tảng, performance tốt, UX mượt.'
  ),
  -- seeker9
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    'a1b2c3d4-e5f6-11ee-b1b8-0242ac120018',
    'Hoàng Gia Linh',
    'Python Developer',
    '0955667788',
    '2001-06-10',
    'MALE',
    24,
    'Hoàn Kiếm, Hà Nội',
    'https://github.com/hoanggiai',
    'Quan tâm backend Python/Django, data pipeline cơ bản.'
  ),
  -- seeker10
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    'a1b2c3d4-e5f6-11ee-b1b9-0242ac120019',
    'Phan Mỹ Khánh',
    'UI/UX Designer',
    '0944556677',
    '2000-01-28',
    'FEMALE',
    10,
    'Sơn Trà, Đà Nẵng',
    'https://behance.net/myk',
    'Thích thiết kế hệ thống design, component có thể tái sử dụng.'
  ),
  -- seeker11
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    'a1b2c3d4-e5f6-11ee-b1c0-0242ac120020',
    'Ngô Đức Linh',
    'Golang Backend',
    '0922334455',
    '1999-05-15',
    'MALE',
    16,
    'Phú Nhuận, TP.HCM',
    'https://linkedin.com/in/ducl',
    'Tập trung microservices, hiệu năng và quan sát hệ thống.'
  ),
  -- seeker12
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    'a1b2c3d4-e5f6-11ee-b1c1-0242ac120021',
    'Đinh Hà Mạnh',
    'Android (Kotlin)',
    '0919001122',
    '2002-08-02',
    'FEMALE',
    24,
    'Đống Đa, Hà Nội',
    'https://github.com/hadinhm',
    'Ưu tiên clean architecture, Jetpack, CI cho mobile.'
  ),
  -- seeker13
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    'a1b2c3d4-e5f6-11ee-b1c2-0242ac120022',
    'Phùng Trọng Tú',
    'Rust/Systems Dev',
    '0933111444',
    '1998-10-20',
    'MALE',
    16,
    'Quận 3, TP.HCM',
    'https://rustacean.dev/trongn',
    'Quan tâm hiệu năng thấp tầng, concurrency, memory safety.'
  ),
  -- seeker14
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130014',
    'a1b2c3d4-e5f6-11ee-b1c3-0242ac120023',
    'Vũ Lan Oanh',
    'NodeJS/NestJS Backend',
    '0909090909',
    '2001-03-30',
    'OTHERS',
    10,
    'Liên Chiểu, Đà Nẵng',
    'https://vu-lan.dev',
    'Ưu tiên REST/gRPC chuẩn hoá, testing và bảo trì lâu dài.'
  ),
  -- seeker20
  (
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130020',
    'a1b2c3d4-e5f6-11ee-b1c9-0242ac120029',
    'Trịnh Khánh Phú',
    'Software Engineer',
    '0888990011',
    '2000-10-15',
    'MALE',
    24,
    'Thanh Xuân, Hà Nội',
    'https://github.com/khanhp-dev',
    'Đang tìm kiếm cơ hội mới phù hợp với định hướng phát triển bản thân.'
  );
INSERT INTO seeker_skills (seeker_id, skill_id)
VALUES -- seeker1
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 42),
  -- HTML5
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 22),
  -- CSS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 48),
  -- JavaScript
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 59),
  -- MongoDB
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 60),
  -- MySQL
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 61),
  -- NestJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 64),
  -- NextJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 65),
  -- NodeJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 81),
  -- ReactJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 98),
  -- Spring Boot
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 104),
  -- TypeScript
  -- seeker2 (Java backend)users
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 47),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 97),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 98),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 101),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 60),
  -- seeker3 (React FE)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 48),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 81),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 42),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 22),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 104),
  -- seeker4 (Fullstack JS)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 48),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 65),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 81),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 64),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 60),
  -- seeker5 (QA/QC)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 82),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 50),
  -- Jira
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 63),
  -- .NET (test tool awareness)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 101),
  -- seeker6 (DevOps/Cloud)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 30),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 9),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 40),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 19),
  -- Cloud
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 101),
  -- seeker7 (Data Analyst)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 26),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 101),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 79),
  -- Python
  -- seeker8 (Flutter)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 39),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 23),
  -- Dart
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 60),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 48),
  -- seeker9 (Python/Django)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 79),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 32),
  -- Django
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 59),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 60),
  -- seeker10 (UI/UX)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 105),
  -- UI-UX
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 38),
  -- Figma
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 42),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 22),
  -- seeker11 (Go backend)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 41),
  -- Golang
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 60),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 101),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 30),
  -- seeker12 (Android/Kotlin)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 4),
  -- Android
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 53),
  -- Kotlin
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 47),
  -- Java
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 60),
  -- seeker13 (Rust/Systems)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 88),
  -- Rust
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 41),
  -- Golang
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 65),
  -- NodeJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 101),
  -- seeker14 (Node/Nest)
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 65),
  -- NodeJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 61),
  -- NestJS
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 60),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 101),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 104);
INSERT INTO seeker_cities (seeker_id, city_id)
VALUES -- seeker1
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 24),
  -- Hà Nội
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 16),
  -- Hồ Chí Minh
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130001', 10),
  -- Đà Nẵng
  -- seeker2
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130002', 16),
  -- seeker3
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 16),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130003', 24),
  -- seeker4
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 10),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130004', 16),
  -- seeker5
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130005', 16),
  -- seeker6
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 16),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130006', 24),
  -- seeker7
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130007', 16),
  -- seeker8
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 16),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130008', 10),
  -- seeker9
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130009', 16),
  -- seeker10
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 10),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130010', 16),
  -- seeker11
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 16),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130011', 24),
  -- seeker12
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 24),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130012', 10),
  -- seeker13
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 16),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130013', 24),
  -- seeker14
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 10),
  ('a1b2c3d4-e5f6-11ee-s1ek-0111ac130014', 16);
INSERT INTO employers (id, user_id, full_name, job_title, phone_number)
VALUES (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120002',
    'a1b2c3d4-e5f6-11ee-b1a2-0242ac120002',
    'MB HR Manager',
    'HR Manager',
    '0909876543'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120003',
    'a1b2c3d4-e5f6-11ee-b1a3-0242ac120003',
    'Scandinavian HR Manager',
    'HR Manager',
    '0909876544'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120004',
    'a1b2c3d4-e5f6-11ee-b1a4-0242ac120004',
    'ONETECHSTOP HR Manager',
    'HR Manager',
    '0909876545'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120005',
    'a1b2c3d4-e5f6-11ee-b1a5-0242ac120005',
    'MCREDIT HR Manager',
    'HR Manager',
    '0909876546'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120006',
    'a1b2c3d4-e5f6-11ee-b1a6-0242ac120006',
    'TYMEX HR Manager',
    'HR Manager',
    '0909876547'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120007',
    'a1b2c3d4-e5f6-11ee-b1a7-0242ac120007',
    'ANDPAD HR Manager',
    'HR Manager',
    '0909876548'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120008',
    'a1b2c3d4-e5f6-11ee-b1a8-0242ac120008',
    'EMPLOYMENTHERO Manager',
    'HR Manager',
    '0909876549'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120009',
    'a1b2c3d4-e5f6-11ee-b1a9-0242ac120009',
    'Bosch HR Manager',
    'HR Manager',
    '0909876550'
  ),
  (
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120010',
    'a1b2c3d4-e5f6-11ee-b1b0-0242ac120010',
    'SSI HR Manager',
    'HR Manager',
    '0909876551'
  );
INSERT INTO companies (
    id,
    employer_id,
    company_name,
    slug,
    description,
    website,
    address,
    company_model,
    industry_id,
    company_size,
    country_id,
    working_hours,
    overtime_policy,
    company_introduction,
    our_expertise,
    why_work_here,
    created_at
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120002',
    'MB bank',
    'mb-bank',
    'Doanh nghiệp ngân hàng hàng đầu!!!',
    'http://example.com',
    'Hà Nội - TP Hồ Chí Minh',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Banking' LIMIT 1),
    'SIZE_11_50',
    1,
    'MON_FRI',
    'OPTIONAL',
    '<div class="company-introduction"><div class="paragraph text-break text-contain-hyperlink">Ngân hàng TMCP Quân Đội (MB)<p><strong>Về chúng tôi</strong></p><p>Với tầm nhìn "Trở thành Doanh nghiệp số, Tập đoàn tài chính dẫn đầu" cùng mục tiêu "Top 3 thị trường về hiệu quả, hướng đến Top đầu châu Á", MB đã và đang tiếp tục xây dựng, phát triển trong và ngoài nước, nhằm đáp ứng yêu cầu chuyển dịch số, mục tiêu tăng trưởng kinh doanh và nâng cao năng lực cạnh tranh. </p><p>Sở hữu đội ngũ hơn 10.000 nhân sự, trong đó có hơn 1000 MBITers - chiếm 10% tổng nhân sự toàn Ngân hàng - nằm trong top đầu các ngân hàng tại Việt Nam về tỉ lệ nhân sự thuộc nhóm Công nghệ và Đổi mới, MB đang không ngừng đầu tư mạnh mẽ cho hệ thống, con người và kinh doanh nền tảng nhằm đem đến những trải nghiệm xuất sắc nhất cho khách hàng, xây dựng môi trường làm việc hạnh phúc, bền vững cho người MB.</p><p><strong>Tự hào là Ngân hàng Số số 01 Việt Nam, được phục vụ hơn 30 triệu khách hàng cá nhân và doanh nghiệp.</strong></p><p>Việt Nam đang sở hữu 07 ứng dụng có trên 10 triệu người sử dụng (Theo số liệu của Bộ Thông tin và Truyền thông năm 2023), MB là Ngân hàng duy nhất nằm trong danh sách đầy tự hào này. Tính đến hết năm 2024, MB chính thức chinh phục cột mốc 30 triệu khách hàng, tương đương 30% dân số Việt Nam, và đã cùng người dùng thực hiện 6,5 tỷ giao dịch trên kênh Số - giữ vững vị trí Top 1 quy mô NAPAS (Công ty Cổ phần Thanh toán Quốc gia Việt Nam). Trong đó, riêng ứng dụng App MBBank ghi nhận tần suất đỉnh chạm ngưỡng 20 triệu giao dịch/ngày, cùng hệ thống ổn định, an toàn, bảo mật.</p><p><strong>Môi trường làm việc bền vững, hạnh phúc</strong></p><p>Năm 2024 ghi dấu cột mốc MB30 về văn hoá và con người với 02 giải thưởng danh giá: <i>"Sustainable Workplace Awards – Doanh nghiệp có môi trường làm việc bền vững"</i> do HR Asia Awards (Tạp chí nhân sự uy tín hàng đầu Châu Á) và <i>"Happiness At Work – Doanh nghiệp có Nguồn nhân lực Hạnh phúc"</i> do Anphabe (Tổ chức tư vấn tiên phong về giải pháp Thương hiệu Nhà tuyển dụng và Môi trường làm việc) trao tặng.</p><p>Đặc biệt, MB đã chính thức được vinh danh trong hạng mục "Vietnam Best IT Companies 2025" do chính các ứng viên của ITviec bình chọn. Và chúng tôi vẫn đang liên tục tìm kiếm những nhân tố xuất sắc, sáng tạo, đồng thời cam kết mang đến những giá trị, trải nghiệm tốt nhất cho nhân viên khi gia nhập tổ chức của mình.</p></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break text-contain-hyperlink"><p><strong>Mobile</strong> : React Native (Javascript), Flutter (Dart), Mini App <br><br><strong>Web: </strong>AngularJs, ReactJs, Micro FrontEnd, HTML/Javascript/CSS <br><br><strong>Back-end: </strong>SpringBoot (Java), Golang, Hasura, GraphQL, MongoDB, Oracle, Microservice <br><br><strong>System & Cloud</strong>: AWS, Google Cloud, Viettel Cloud, Kubernetes, Microsoft Azure, Multi DC</p></div></div>',
    '<div class="why-work-here"><div class="paragraph text-break"><ul><li class="ipy-zero fw-700">Mức lương cạnh tranh, hấp dẫn</li><li class="ipy-1 fw-700">Môi trường làm việc chuyên nghiệp, thân thiện</li><li class="ipy-1 fw-700">Được làm việc với các hệ thống hiện đại, tiên tiến</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>Trải nghiệm Thu nhập hấp dẫn với gói đãi ngộ toàn diện:</strong> </p><ul><li>Thưởng thành tích tháng 13; Thưởng thành tích theo kết quả công việc 06 tháng, 1 năm ; Thưởng các dịp lễ tết trong năm ; Thưởng theo danh hiệu cá nhân và tập thể… </li><li>Du lịch nghỉ dưỡng hàng năm</li><li>Khám sức khỏe định kì</li><li>Gói bảo hiểm sức khỏe cá nhân và người thân (MIC)</li><li>Quà tặng và ngày nghỉ sinh nhật hưởng nguyên lương </li></ul><p><strong>Cơ hội nghề nghiệp và phát triển bản thân:</strong> </p><ul><li>Được thử sức với các nền tảng công nghệ mới, tham gia vào những dự án chuyển đổi lớn của ngân hàng </li><li>Có cơ hội học hỏi từ các Chuyên gia, Lãnh đạo nội bộ hàng đầu tại MB trong lĩnh vực IT, Tài chính ngân hàng </li><li>Được trải nghiệm các phương pháp học tập mới và phát triển năng lực theo lộ trình công danh. </li><li>Hưởng các chính sách hỗ trợ, khuyến khích học tập, nâng cao trình độ và phát triển bản thân (chứng chỉ nghề quốc tế...) </li></ul><p><strong>Môi trường làm việc lý tưởng với:</strong> </p><ul><li>Những người cộng sự thân thiện và tài năng </li><li>Cơ sở vật chất, không gian làm việc xanh và hiện đại.<br> </li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120003',
    'Scandinavian Software Park',
    'scandinavian-software-park',
    '1',
    'http://example.com',
    'Quận Đống Đa, Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Software Products and Web Services' LIMIT 1),
    'SIZE_151_300',
    19,
    'MON_FRI',
    'NO_OVERTIME',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">Scandinavian Software Park is a tech hub for Scandinavia’s market leading SaaS companies.<p><span><i>Are you a passionate software developer looking to grow your career in the exciting world of SaaS? Look no further than our Scandinavian companies, leading the market with their innovative and proven products poised for global success. </i></span></p><p><span><i>Join our team and benefit not only from a great company culture, but also from the support of Monterro, the largest private equity tech fund in the Nordics, as we work together to achieve our ambitious goals. With a work-life balance and a Scandinavian culture that values your individuality, you''ll collaborate with experienced software engineers from around the world to make your mark on the industry. </i></span><br><br><span><i>Don''t miss out on the chance to discover your full potential and help us become global players.</i></span></p></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break text-contain-hyperlink"><p>At Scandinavian Software Park, we leverage the latest tech stack to create innovative solutions for a wide range of industries worldwide, bringing together skilled software engineers from Scandinavia''s top SaaS companies.</p></div></div>',
    '<div class="why-work-here"><h2>Tại sao bạn sẽ yêu thích làm việc tại đây?</h2><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Global growth with experienced engineers</li><li class="ipy-1 fw-700">Innovative, balanced, creative culture</li><li class="ipy-1 fw-700">Competitive salary, benefits, training</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>What will you get?</strong></p><p>Join our innovative and market-leading Scandinavian SaaS company and accelerate your growth alongside experienced software engineers from around the world. We value creativity, innovation, and work-life balance in our Scandinavian work culture, and offer a competitive salary with 100% official salary during the probation period, annual reviews, and 13th month salary.</p><p>We prioritize the well-being of our employees with premium healthcare and accident insurance, as well as a wellness package to help you stay healthy and wealthy. You''ll also have the chance to participate in exciting company outings, team-building activities, and on-site training opportunities in the Nordic region.</p><p>Work in a modern and supportive environment where your individuality is valued, and collaborate with a talented team on a mission to become global players in the industry.</p></div></div>',
    '2025-05-05 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120004',
    'ONE Tech Stop Vietnam Company Ltd',
    'one-tech-stop-vietnam-company-ltd',
    '1',
    'http://example.com',    
    'Quận Hải Châu, Đà Nẵng',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'IT Services and IT Consulting' LIMIT 1),
    'SIZE_151_300',
    4,
    'MON_FRI',
    'PAID_OT',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">Join us if you love to build a huge product for the 6th largest shipping company over the world!<p>ONE Tech Stop Group of Companies is the IT arm of a Global Container Shipping Company, Ocean Network Express Pte Ltd, headquartered in Singapore.</p><p>ONE Tech Stop Vietnam Company Limited, in Danang, is a newly established subsidiary that specializes in the design and development of IT products for our Head Office through innovative and efficient digital solutions.</p><p>We use the agile methodology to bring out the best deliverable results in the shortest possible time.  Our objective is to provide the best customer experience to Ocean Network Express and its customers.</p><p>You will love working here! We provide a good benefits package to our employees: </p><ul><li>Annual Salary Review & Increment</li><li>13th-month salary + Performance Bonus</li><li>Social Security co-contribution based on full gross salary</li><li>Premium health care (Bao Viet Insurance) for employees & dependents (parents or spouse and children).</li><li>Lunch allowance</li><li>Free drinks and snacks</li><li>17 days of Annual Leave</li><li>Annual health screening reimbursement: 4,700,000 VND/year</li><li>Well-being allowance: 13,800,000VND/year</li><li>Training and education sponsorship: $1500/year</li></ul></div></div>',
    '',
    '<div class="why-work-here"><h2>Tại sao bạn sẽ yêu thích làm việc tại đây?</h2><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">INNOVATIVE, CREATIVE - Think outside of the box</li><li class="ipy-1 fw-700">KEEP CHALLENGING - Never stay in your comfort zone</li><li class="ipy-1 fw-700">CRITICAL THINKING</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><ul><li>You have an opportunity to build up a very big product for the 6th largest container shipping company: ONE (Ocean Network Express).</li><li>Top benefits package in town</li><li>A unique workplace with a professional Café bar in the office.</li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120005',
    'Mcredit - Công ty Tài chính TNHH MB Shinsei',
    'mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei',
    '1',
    'http://example.com',
    'Quận Đống Đa, Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Financial Services' LIMIT 1),
    'SIZE_1000_PLUS',
    1,
    'MON_FRI',
    'OPTIONAL',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">Overview about Mcredit - Công ty Tài chính TNHH MB Shinsei<p>Được thành lập từ năm 2016, Công Ty Tài Chính Trách Nhiệm Hữu Hạn MB Shinsei (Mcredit) là công ty tài chính liên doanh giữa Ngân hàng TMCP Quân đội (thuộc MB Group) và Ngân hàng SBI Shinsei (Nhật Bản).</p><p>Trong giai đoạn chuyển đổi số mạnh mẽ, Mcredit tập trung phát triển các sản phẩm: Core banking, Core card, Bot, Mobile banking… bằng nền tảng công nghệ: Cloud, Mobile (Flutter) và tối ưu các công nghệ Java, .Net, Python (AI, ML), Flutter cùng sự đồng hành của đối tác hàng đầu: Amazon Web Services, T24…</p><p>Mcredit hướng tới việc xây dựng môi trường làm việc tốt nhất cho nhân viên bằng chế độ làm việc Flexible (Agile), chuyên nghiệp, có máy tập thể hình, bàn bi-a, khu pantry riêng và các hoạt động giải trí đa dạng sau mỗi giờ làm việc. Mcredit còn thường xuyên tổ chức các cuộc thi dành riêng cho khối IT về game cũng như tổ chức các khóa học, buổi chia sẻ về nghiệp vụ và công nghệ.</p></div></div>',
    '',
    '<div class="why-work-here"><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Lương thưởng cạnh tranh, đãi ngộ toàn diện</li><li class="ipy-1 fw-700">Đào tạo chuyên sâu theo Công ty và Tập đoàn MB</li><li class="ipy-1 fw-700">Bảo hiểm sức khỏe MIC</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>Phúc lợi, đãi ngộ:</strong></p><ul><li>Thời gian làm việc: Thứ 2 – Thứ 6, nghỉ thứ 7 và Chủ nhật</li><li>Nghỉ phép:<strong> 12</strong> ngày phép năm. Mỗi 5 năm được tăng thêm 1 ngày theo quy định của luật Lao Động</li><li>Nghỉ lễ Tết: <strong>11 </strong>ngày theo quy định luật lao động Việt Nam</li><li>Nghỉ ốm: hưởng nguyên lương đóng BHXH (75% do BHXH chi trả, 25% do Công ty chi trả)</li><li>Ngày sinh nhật: Nghỉ hưởng nguyên lương<strong> 01</strong> ngày (chế độ tương đương ngày nghỉ phép)</li><li>Bảo hiểm: Bên cạnh Bảo hiểm bắt buộc theo quy định, Mcredit hỗ trợ <strong>Bảo hiểm sức khỏe MIC</strong> theo quy định hàng năm của công ty.</li><li>Chế độ dành riêng cho các mẹ đang nuôi con nhỏ: Happy mom’s room, Happy mom’s hour (được nghỉ tối đa 2h/tháng để đưa đón con đi học từ cấp 1 trở xuống). Các chế độ khác (khám sức khỏe định kỳ hàng năm, nghỉ mát, thăm hỏi ốm đau…) theo quy định của MC từng thời kỳ.</li><li>Hoạt động team building, du lịch, thể thao, Happy Hour hàng tháng…v..v…</li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120006',
    'TymeX',
    'tymex',
    '1',
    'http://example.com',
    'TP Hồ Chí Minh - Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Banking' LIMIT 1),
    'SIZE_301_500',
    4,
    'MON_FRI',
    'NO_OVERTIME',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">TymeX is a part of Tyme Group - one of the world’s fastest-growing digital banking groups.<ul><li><strong>Tyme Group</strong> is one of the world’s fastest-growing digital banking groups, building high-tech and high-touch banks in fast-growing, emerging markets. Headquartered in Singapore with a Technology and product Development Hub in Vietnam, Tyme designs, builds, and commercializes digital banks for emerging markets, with particular expertise in serving under-served and under-banked populations.</li><li>Established in 2016, <strong>TymeX</strong> has been Tyme Group''s Product & Technology Development Hub, bringing together engineering and product people who share a global mission to <strong>become serial bank builders</strong>, shaping the future of banking through technology. We build products with the principle of finding the right balance between the digital and physical worlds.</li><li>We have proudly provided the banking platform as a service for:<ul><li><strong>TymeBank, </strong>based in South Africa, is one of the world’s fastest-growing digital banks, with over 7 million customers since launching in February 2019.</li><li><strong>GoTyme Bank</strong>, based in the Philippines, is a joint venture between the Gokongwei Group and Tyme Group with the official launch in October 2022 and onboarded more than 1 million customers in less than nine months.</li></ul></li></ul></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break"><div class="ipt-4">Here Are Our Expertise</div><div class="ipt-4 text-contain-hyperlink"><ul><li><strong>Mobile/Tablet Development: </strong>Native Android/iOS platforms for Mobile Banking, Kiosk Onboarding & Kiosk Card Printing.</li><li><strong>Web development: </strong>Fully customized Single page Realtime Responsive for Internet Banking, Web Origination, and Backoffice Console.</li><li><strong>Integration: </strong>Integration with Core Banking and many third parties</li><li><strong>If you want to work in a flexible environment with many cool engineering talents can define career pathways and development opportunities</strong></li></ul><p>So why don''t you discover our opening positions now!</p></div></div></div>',
    '<div class="why-work-here"><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Excellent environment and team to help you grow.</li><li class="ipy-1 fw-700">Competitive salary and learning culture.</li><li class="ipy-1 fw-700">Premium health care for you and your family.</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>You’ll love working with us if you are:</strong></p><ul><li>Passionate about technology.</li><li>Independent but also a good team player.</li><li>Comfortable with a high degree of ambiguity.</li><li>Focused on usability and speed.</li><li>Keen on presenting your ideas to your peers and management.</li></ul><p>At <strong>TYME,</strong> opportunities are here for the taking. If you want to be part of our purpose and live and lead through our values, we can offer exciting development opportunities through expanded lateral roles, stretch assignments, or people leadership.</p><p><strong>Some of our benefits:</strong></p><ul><li><strong>Meal and parking allowances</strong> are covered by the company.</li><li><strong>Full benefits and salary rank during probation.</strong></li><li><strong>Insurances</strong> such as Vietnamese labor law and <strong>premium health care</strong> for you and your family.</li><li><strong>SMART goals and clear career opportunities</strong> (technical seminar, conference, and career talk) - we focus on your development.</li><li><strong>Values-driven, international working environment, and agile culture.</strong></li><li><strong>Overseas travel opportunities</strong> for training and work-related.</li><li><strong>Internal Hackathons and company events</strong> (team building, coffee run, etc.).</li><li><strong>Pro-Rate </strong>and <strong>performance bonus</strong>.</li><li><strong>15-day annual + 3-day sick leave</strong> per year from the company.</li><li>Work-life balance <strong>40-hr per week</strong> from <strong>Mon to Fri</strong>.</li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120007',
    'ANDPAD VietNam Co., Ltd',
    'andpad-vietnam-co-ltd',
    '1',
    'http://example.com',
    'TP Hồ Chí Minh - Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'IT Services and IT Consulting' LIMIT 1),
    'SIZE_51_150',
    2,
    'MON_FRI',
    'NO_OVERTIME',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">No.1 Construction Tech Company in Japan<p>Our parent company, ANDPAD Inc., is No.1 cloud-based construction tech company in Japan and providing the construction project management service with more than 410,000 users. ANDPAD covers from communication, site schedule arrangement, quality check, order control to management improvement in the construction industry.</p><p>ANDPAD Vietnam is part of ANDPAD Inc. and was established in early January 2022 in Vietnam.<br>Software engineers and development team in ANDPAD Vietnam enjoy dynamic roles of SaaS product development within an international working environment, not consuming tasks but more on creative engineering works for clients and users in the construction industry.</p></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break"><div class="ipt-4 text-contain-hyperlink"><p><span>As our business continues to grow, we are looking for Talents who can join our team and develop the application in cooperation with the Product Manager. Working in the form of a Squad, a small team can quickly and consistently engage in everything from design to development, testing, and operation.</span></p><p><span>Also, there are a lot of opportunities to work with new languages and FWs other than the main language in an international environment.</span></p></div></div></div>',
    '<div class="why-work-here"><h2>Tại sao bạn sẽ yêu thích làm việc tại đây?</h2><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">No.1 Construction Tech company in Japan</li><li class="ipy-1 fw-700">Hybrid working environment</li><li class="ipy-1 fw-700">Attractive salary and MacBook Pro</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><ul><li><span>Competitive salary package, including full insurance coverage.</span></li><li><span>Annual performance review: twice/ year.</span></li><li><span>13th-month salary Bonus.</span></li><li><span>Hybrid working model (1–2 office days per week).</span></li><li><span>18 days of leave: 12 days of annual leave, 6 days of New Year Leave.</span></li><li><span>Premium Healthcare Insurance Package starting from day one.</span></li><li><span>Annual Health Check-up.</span></li><li><span>Excellent career development opportunities, with exposure to and experience in the latest technologies.</span></li><li><span>Patents and Inventions bonus.</span></li><li><span>Company trip, Year-End Party, Gifts for Tet/ Holidays.</span></li><li><span>MacBook Pro/laptop is provided.</span></li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120008',
    'Employment Hero',
    'employment-hero',
    '1',
    'http://example.com',
    'Quận 10, TP Hồ Chí Minh',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Software Products and Web Services' LIMIT 1),
    'SIZE_1000_PLUS',
    11,
    'MON_FRI',
    'NO_OVERTIME',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">Product Company: SaaS All-in-one Cloud-based HR Platform (Web & Mobile App)<p>At Employment Hero, we’re an ambitious bunch of people on a mission to make employment easier and more valuable for everyone.</p><p>Since our inception in 2014, we''ve had some pretty impressive growth (100% YoY), reached unicorn status in 2022, and now serve 400,000 businesses globally, with 2.9 million+ users on the platform. We have no plans to slow down.</p><p>There’s never been a more exciting time to join one of the fastest-growing SaaS unicorns, so let’s see if we could be a match!</p></div></div>',
    '',
    '<div class="why-work-here"><h2>Tại sao bạn sẽ yêu thích làm việc tại đây?</h2><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Remote-first working</li><li class="ipy-1 fw-700">Top-tier remuneration & premium healthcare package</li><li class="ipy-1 fw-700">Join one of the fastest-growing SaaS unicorns</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>The EH Way</strong></p><p>The EH Way is how we describe our culture at Employment Hero and how we all operate. It is our DNA. You can read all about it on our careers page: <a href="https://employmenthero.com/careers/">https://employmenthero.com/careers/</a></p><p>In short, you''ll love working with us if:</p><ul><li>Revolutionising employment gets your heart racing.</li><li>You thrive on the flexibility (and responsibility) of a remote-first business.</li><li>Our values align, and shape how you show up every day.</li><li>You love the dynamic pace of a startup, are driven by innovation, and enjoy working with other smart people.</li></ul><p>But don’t just take it from us, hear from your local heroes: Thao Ta, Head of People and Culture & Hung Pham, Group Engineer Manager: <a href="https://www.youtube.com/watch?v=wLVh3yoFYZc">Life at Employment Hero</a></p><p><strong>Plus, you''ll get to enjoy a number of great perks, including:</strong></p><ul><li>A generous budget for your home office.</li><li>Cutting-edge tools and technology.</li><li>20 days Annual Leave, plus VN Public Holidays.</li><li>$500 USD for your professional development plan.</li><li>$500 USD for English learning courses.</li><li>Premium Healthcare Insurance Program for you and your loved ones, plus full gross salary paid social insurance.</li><li>Sports club funded by Employment Hero.</li><li>Monthly get-together event in the office for team bonding and VND 80,000 budget for lunch for day-in-office.</li><li>Reward and recognition programs - because great work should be recognised and rewarded.</li><li>Employee Share Option Program: be an owner of Employment Hero.</li><li>Annual Global Gathering - so far we''ve been to Thailand, Vietnam, Bali and are excited to meet in Dubai in 2025</li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120009',
    'Bosch Global Software Technologies Company Limited',
    'bosch-global-software-technologies-company-limited',
    '1',
    'http://example.com',
    'TP Hồ Chí Minh - Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'IT Services and IT Consulting' LIMIT 1),
    'SIZE_1000_PLUS',
    16,
    'MON_FRI',
    'NO_OVERTIME',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">The Bosch Group is a leading global supplier of technology and services<p><strong>The Bosch Group</strong> is a leading global supplier of technology and services. Its operations have been divided into four business sectors: Automotive Technology, Industrial Technology, Consumer Goods, and Energy and Building Technology.</p><p>The Bosch Group comprises Robert Bosch GmbH and its roughly 460 subsidiaries and regional companies in some 60 countries. If its sales and service partners are included, then Bosch is represented in roughly 150 countries.</p><p><strong>Bosch Global Software Technologies Company Limited (BGSV)</strong> is 100% owned subsidiary of Robert Bosch GmbH - one of the world’s leading global suppliers of technology and services, offering end-to-end Engineering, IT, and Business Solutions.</p><p>Starting its operation from 2010 at Etown 2 in HCMC, BGSV is the first software development center of Bosch in Southeast Asia. BGSV nowadays have over 4,000 associates, with a global footprint and presence in the US, Europe, and the Asia Pacific region.</p><p>With our unique ability to offer end-to-end solutions that connect sensors, software, and services, we enable businesses to move from the traditional to digital or improve businesses by introducing a digital element in their products and processes.</p></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break"><div class="ipt-4 text-contain-hyperlink"><ul><li>Embedded Software for Automotive Applications</li><li>Enterprise Software development using Java & .Net</li><li>SAP Consulting</li></ul></div></div></div>',
    '<div class="why-work-here"><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Committed 13th-mth bonus + attractive yearly bonus</li><li class="ipy-1 fw-700">Premium Healthcare for you and 2 family members</li><li class="ipy-1 fw-700">16++ days of paid leave per year</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p>Why <strong>BOSCH</strong>?</p><p>Because we do not just follow trends, we <strong>create </strong>them. Together we turn ideas into reality, working every day to make the world of tomorrow a better place. Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.<br></p><p><strong>Benefits and Career Opportunities</strong><br></p><ul><li>Working in one of the <strong>Best Places to Work</strong> in Vietnam and Top 30 of the <strong>Most Innovative Companies </strong>all over the world</li><li><strong>English-speaking</strong> environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our <strong>diverse training</strong> programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible </strong>working time</li><li><strong>13th-month</strong> salary bonus + attractive <strong>performance bonus</strong> (you''ll love it!) + annual performance appraisal</li><li><strong>100% offered salary</strong> and mandatory <strong>social insurances</strong> in 2-month probation</li><li><strong>15++ days</strong> of annual leave + 1-day of birthday leave</li><li>Premium health insurance for employee and <strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ul></div></div>',
    '2025-05-04 19:17:00'
  ),
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'a1b2c3d4-e5f6-11ee-e1p1-0242ac120010',
    'SSI Securities Corporation',
    'ssi-securities-corporation',
    '1',
    'http://example.com',
    'TP Hồ Chí Minh - Hà Nội',
    'PRODUCT',
    (SELECT id FROM industries WHERE industry_name = 'Financial Services' LIMIT 1),
    'SIZE_1000_PLUS',
    1,
    'MON_FRI',
    'OPTIONAL',
    '<div class="company-introduction"><div class="paragraph ipt-4 text-break text-contain-hyperlink">SSI – A leading Financial Corporation<p>In December 2021, by the 21st anniversary, SSI Securities was honored in the list of "Top 100 best places to work in Vietnam", standing in the "Top 50 attractive employer brands" – Vietnamese business sector” and ranked second in the list of “Best Places to Work in Finance” announced by the Employer Branding solution Anphabe.</p><p>SSI - A leading and reputable financial institution which has the fastest growth rate in term of charter capital in Vietnam. SSI has always been a gateway for foreign investors and owns its extensive branch network. We also were one of the first in industry applying technology in investment and trading services.</p><p>Our strategy is to become a Sustainable - Developed Financial Corporation based on the advanced technological foundation.</p><p>With big investment on technology and long – term IT project, we believe to offer you a very challenging opportunity.</p><p>WE – A team of talented and passionate professionals, with us you will be experienced a strong team spirit, high degrees of openness and innovation, and strong collaboration across fields.</p><p>If you’re looking for a creative environment where you have a chance to approach very trendy technologies in Fintech, Join us!</p></div></div>',
    '<div class="our-expertise"><div class="paragraph text-break"></div></div>',
    '<div class="why-work-here"><div class="paragraph text-break"><ul><li class="ipy-1 fw-700">Attractive salary and bonus package</li><li class="ipy-1 fw-700">Premium AON healthcare insurance</li><li class="ipy-1 fw-700">Fully sponsored training to build your career</li></ul></div><div class="paragraph text-break text-contain-hyperlink"><p><strong>Chứng khoán SSI nhận 3 giải thưởng nơi làm việc tốt nhất: <a href="https://bit.ly/3qTDKKE">https://bit.ly/3qTDKKE</a></strong></p><ul><li>Highly competitive remuneration package: Attractive monthly salary, 13th month salary, KPIs cash bonus, Public holiday cash bonus, Birthday gift, Lunar new year gift,...</li><li>Premium AON healthcare insurance and full labor insurance</li><li>12 days Annual leave + 2 days sick leave with full paid</li><li>Luxury team-building trip and varied engagement activities</li><li>Joining the leisure clubs: Football, E-Sport, Running, Gym, Yoga....</li><li>Fully sponsored training to build your career</li><li>Professional, open minded and supportive working environment</li></ul></div></div>',
    '2025-05-04 19:17:00'
  );
INSERT INTO company_skills (company_id, skill_id)
VALUES ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 48),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 60),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 42),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 22),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000001', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 81),
  -- ReactJS
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 104),
  -- TypeScript
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 65),
  -- NodeJS
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 5),
  -- Angular
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 73),
  -- PHP
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000002', 79),
  -- Python
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000003', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000004', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000005', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000006', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000007', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000008', 79),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 81),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 104),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 65),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 5),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 73),
  ('a1b2c3d4-e5f6-11ee-c0mp-000000000009', 79);
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES -- (1) Test Manager (MB)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Test Manager (Auto-Test & Performance Test)',
    'test-manager-auto-test-performance-test-mb-bank-1',
    '<ul><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ul>',
    '<ul><li>Xây dựng chiến lược Auto-Test và Performance Test</li><li>Xây dựng và nghiên cứu ứng dụng triển khai, cải tiến Framework Auto Test (Công cụ, Quy trình/Quy định)</li><li>Tổ chức triển khai, giám sát và đảm bảo hiệu quả Auto-Test</li><li>Tuyển dụng, đào tạo, quản lý nhân sự</li></ul>',
    '<ul><li>Tốt nghiệp đại học chính quy ...</li><li><strong>7 năm kinh nghiệm sản xuất phần mềm</strong></li><li>5 năm xây dựng/vận hành Framework Auto-Test; 3 năm quản lý</li><li>Kinh nghiệm Automation & Performance Test tài chính</li><li>Ưu tiên ISTQB Expert, kinh nghiệm ngân hàng/lập trình</li></ul>',
    '<p><strong>Trải nghiệm Thu nhập hấp dẫn...</strong> ...</p>',
    'Tòa nhà MB, số 18 Lê Văn Lương, Quận Cầu Giấy, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 20000000, 30000000, 'VND', 'ONSITE', 'SENIOR', '2025-05-04 07:00:00', '2025-06-03 07:00:00', 'ACTIVE'
  ), -- (2) Java Fullstack (MB)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001', '[Middle, Senior] Java FullStack Developer (Spring)', 'middle-senior-java-fullstack-developer-spring-mb-bank-2', '<ul><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Được làm việc với các hệ thống hiện đại, tiên tiến</li></ul>', '<ul><li>Phát triển hệ thống quy mô 30M users...</li><li>API Gateway, tích hợp đối tác</li><li>R&D: GraphQL, Docker/K8s, CI/CD, CQRS, NoSQL...</li><li>Lead nhóm 3-6 thành viên</li></ul>', '<ul><li>Tối thiểu 2 năm Backend (ưu tiên Java)</li><li>1-2 năm Microservice</li><li>Thành thạo Spring (core/security/boot)</li><li>DB: Oracle/SQLServer/PostgreSQL/MongoDB</li><li>Kafka, Redis...</li></ul>', '<p><strong>Trải nghiệm Thu nhập hấp dẫn...</strong> ...</p>', 'Tòa nhà MB, số 18 Lê Văn Lương, Quận Cầu Giấy, Hà Nội', (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 1000, 2000, 'USD', 'ONSITE', 'SENIOR', '2025-04-23 07:00:00', '2025-05-23 07:00:00', 'ACTIVE'
  ), -- (3) Python Backend (MB)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001', '[Middle, Senior] Python Backend Developer (Django)', 'middle-senior-python-backend-developer-django-mb-bank-3', '<ul><li>Mức lương hấp dẫn, cạnh tranh</li><li>Môi trường năng động, sáng tạo</li><li>Dự án công nghệ tiên tiến</li></ul>', '<ul><li>Phát triển backend Python/Django</li><li>Thiết kế/ tối ưu API cho T24/CRM/CIC</li><li>Docker/K8s, CI/CD</li><li>Lead 3-5 thành viên</li></ul>', '<ul><li>≥ 2 năm Python Backend</li><li>Thành thạo Django & REST</li><li>DB: PostgreSQL/MySQL/MongoDB</li><li>Microservice & Cloud</li><li>Ưu tiên DevOps</li></ul>', '<p><strong>Trải nghiệm Thu nhập hấp dẫn...</strong> ...</p>', 'Tòa nhà MB, số 23 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội', (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'SENIOR', '2025-04-22 07:00:00', '2025-05-22 07:00:00', 'ACTIVE'
  ), -- (4) Fullstack SE - Data Engineer (MB)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001', 'Fullstack Software Engineer - Data Engineer', 'fullstack-software-engineer-data-engineer-mb-bank-4', '<ul><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường làm việc chuyên nghiệp, thân thiện</li><li>Hệ thống hiện đại</li></ul>', '<ul><li>Web cho Big Data products</li><li>API tích hợp hiệu năng cao</li><li>Phối hợp BU/BA/DE/DS</li></ul>', '<ul><li>≥ 2 năm vị trí tương đương</li><li>BE: Java(Spring Boot), Python(FastAPI/Flask)</li><li>FE: HTML/CSS/JS – Angular</li><li>DB: Oracle/PostgreSQL/MongoDB/Redis</li><li>Kafka/RabbitMQ/K8s/WebSocket/gRPC/ELK/OAuth2/OIDC/SSO</li></ul>', '<p><strong>Trải nghiệm Thu nhập hấp dẫn...</strong> ...</p>', 'Tòa nhà MB, số 18 Lê Văn Lương, Quận Cầu Giấy, Hà Nội', (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 2000, 3000, 'USD', 'ONSITE', 'MID', '2025-05-05 07:00:00', '2025-06-04 07:00:00', 'ACTIVE'
  ), -- (5) Business Customer Data Analyst (MB)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001', 'Business Customer Data Analyst', 'business-customer-data-analyst-mb-bank-5', '<ul><li>Mức lương cạnh tranh, hấp dẫn</li><li>Môi trường chuyên nghiệp</li><li>Hệ thống hiện đại</li></ul>', '<ul><li>Thu thập & báo cáo dữ liệu kinh doanh KHDN</li><li>Xây dựng báo cáo tự động</li><li>Hỗ trợ chương trình kinh doanh</li></ul>', '<ul><li>ĐH Thống kê/DS/Kinh tế/Tài chính/Ngân hàng</li><li>≥ 1 năm phân tích dữ liệu tài chính</li><li>SQL, Tableau/Power BI, Oracle, DataViz</li><li>TOEIC ≥ 500</li></ul>', '<p><strong>Trải nghiệm Thu nhập hấp dẫn...</strong> ...</p>', 'Tòa nhà MB, số 18 Lê Văn Lương, Quận Cầu Giấy, Hà Nội', (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 10000000, 20000000, 'VND', 'ONSITE', 'JUNIOR', '2025-05-05 07:00:00', '2025-06-04 07:00:00', 'ACTIVE'
  ), -- (6) Viedoc - Senior Fullstack .NET (Scandinavian)
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002', 'Viedoc - Senior Fullstack .NET Developer (C#,SQL,Azure)', 'viedoc-senior-fullstack-net-developer-c-sql-azure-scandinavian-software-park-6', '<ul><li>Global growth with experienced engineers</li><li>Innovative, balanced, creative culture</li><li>Competitive salary, benefits, training</li></ul>', '<p>Lead thiết kế/phát triển hệ thống web, clean architecture, mentoring...</p>', '<ul><li>Expert C#, ASP.NET Core, kiến trúc, Azure/AWS CI/CD, Docker/K8s</li><li>SQL Server, EF, tuning</li><li>FE: HTML/CSS/JS/React</li><li>Testing (xUnit/NUnit), Git, Agile/Scrum</li></ul>', '<p>Bạn sẽ tham gia phát triển SaaS EDC – Clinical Trial Platform... Scandinavian culture...</p>', 'Tầng 19, Peakview Tower, 36 Hoàng Cầu, Đống Đa, Hà Nội', (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'SENIOR', '2025-04-29 07:00:00', '2025-05-29 07:00:00', 'ACTIVE'
  );
-- (7) Trapets – Fullstack .NET Developer
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Trapets - Fullstack .NET Developer (.NET, SQL, JS)',
    'trapets-fullstack-net-developer-net-sql-js-scandinavian-software-park-7',
    '<ul><li>Global growth with experienced engineers</li><li>Innovative, balanced, creative culture</li><li>Competitive salary, benefits, training</li></ul>',
    '<p><strong>Trapets</strong> – A European expert company providing cutting-edge services and systems for securities trading, anti-money laundering surveillance and compliance – is looking for talented and passionately committed agile developers to work in our beautiful office in <strong>HANOI, VIETNAM</strong>. With <strong>Trapets</strong>, it is important to have a team spirit where we share knowledge, support each other and are driven by development both on the personal level and within the team / company.</p><p>At <strong>Trapets</strong>, you get the opportunity to work at a company with continuous profitable growth and which for the fourth year in a row has been named a Gazelle Company by Dagens Industri. Each year the award is given to the fastest growing companies in Sweden.</p><p>Do you want to contribute with us to the benefit of society and work to combat financial crime?</p><p><strong>As a Fullstack .NET Developer, you will:</strong></p><p>Responsible for designing, developing, and maintaining software solutions that meet business and user requirements. This includes writing maintainable code, collaborating with cross-functional teams to gather and analyse requirements, and participating in the entire software development lifecycle. The role involves debugging and resolving issues, optimizing application performance, and ensuring the scalability and reliability of software, which includes:</p><ul><li>Software Design & Development: Design, develop, test, and maintain software products and systems. Write clean, maintainable, and efficient code following best practices and coding standards. Under the guidance of senior team members, if needed.</li><li>Team Collaboration: Collaborate with team members to ensure high-quality code through code reviews and testing.</li><li>Performance Optimization: Optimize software systems for performance, scalability, and reliability.</li><li>Continuous Improvement: Stay updated with new technologies and contribute ideas for process and system improvements.</li><li>Debugging: Debug and resolve technical issues to ensure seamless software functionality, reliability and stability of the codebase. Diagnose, troubleshoot, and resolve software issues as they arise.</li><li>Project Requirements: Participate in the development and design of features and systems based on project requirements.</li><li>Values: Actively contribute to our company values Engagement, Together, Trust, and Growth by embodying these in your daily work, promoting collaboration and fostering a supportive work environment.</li><li>Compliance: Adhere to all company policies, routines, rules, and regulations, ensuring compliance and accountability in daily tasks and decision-making.</li></ul>',
    '<ul><li>At a minimum, you should have a bachelor’s degree in Software Development or equivalent.</li><li>Have solid understanding of the full software development life cycle.</li><li>Have at least 5 years’ experiences with Microsoft’s development stack: <strong>C#, .Net Framework, .Net Core,</strong> SQL Server.</li><li>Have experience with Rest-API, microservices and cloud-based solutions.</li><li>Have knowledge of TypeScript, HTML5, CSS3, JavaScript, and Query.</li><li>Will be advance if you have experience with <strong>Angular and or React.</strong></li><li>Used to working in teams but also independently and have no problems moving freely in the stack and probably have an area you are stronger in.</li><li>Will be advance if you have experience of the financial market or have worked with Regtech / Fintech.</li><li>Have excellent and analytical problem-solving skills.</li><li>Have the ability to learn quickly and manage yourself independently.</li><li><strong>Have strong verbal and written communication skills in English.</strong></li></ul>',
    '<p><strong>You will be:</strong></p><ul><li>Stepping on developing software as services for Regulatory Finance business in a leading company.</li><li>Working agile and being part of one of our development teams across countries and also working in close collaboration with our business experts.</li><li>Long-term developing your career path on the edge of Microsoft as well as modern UI technologies.</li><li>Living on our Scandinavian culture and office while working in Agile environment that has strong team spirit, openness, unceasing creativity and innovation.</li></ul><p><strong>What will you get?</strong></p><ul><li><strong>You’ll get to work with experienced software engineers worldwide at market leading, innovative Scandinavian SaaS company looking to accelerate growth.</strong></li><li><strong>Scandinavian Work Culture: creativity, innovation and work-life balance.</strong></li><li>Competitive salary and 100% official salary during the probation period.</li><li>Annual review and 13th month salary.</li><li>Premium healthcare and accident insurance.</li><li>Wellness package supports employees stay healthy and wealthy.</li><li>Exciting company outing/events and team building activities.</li><li>On-site and training opportunities in Nordic.</li><li>Modern working environment.</li></ul>',
    'Tầng 19, tòa nhà Peakview Tower, 36 Hoàng Cầu, Đống Đa, Hà Nội, Quận Đống Đa, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'MID', '2025-04-29 07:00:00', '2025-05-29 07:00:00', 'ACTIVE'
  );
-- (8) Milient – QA Automation Engineer
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Milient - QA Automation Engineer (Python, JS, Java)',
    'milient-qa-automation-engineer-python-js-java-scandinavian-software-park-8',
    '<ul><li>Global growth with experienced engineers</li><li>Innovative, balanced, creative culture</li><li>Competitive salary, benefits, training</li></ul>',
    '<p><strong>Milient</strong> is currently seeking a QA Automation Engineer with growth ambitions.</p><p>With offices in Norway and Sweden, we are proud of being the Nordic region’s largest SaaS provider within project management, including timekeeping, resource planning, quality assurance, staffing, and recruitment. <strong>Milient</strong> is often used by architects, the staffing industry, advertising, engineering and IT.</p><p><strong>Milient</strong> is seeking a highly skilled and motivated QA Engineer to join the team. The ideal candidate will be responsible for designing and implementing automated tests and test frameworks, debugging, and defining corrective actions. You will also review system requirements and track quality assurance metrics.</p><p><strong>Responsibilities:</strong></p><ul><li>Design, develop, and execute automated and manual test plans and test cases.</li><li>Identify, document, and track bugs and defects.</li><li>Collaborate with cross-functional teams to understand project requirements and specifications.</li><li>Perform thorough regression testing when bugs are resolved.</li><li>Develop and maintain test automation frameworks and scripts.</li><li>Conduct performance and security testing to ensure the software meets quality standards.</li><li>Participate in code reviews and provide feedback to development teams.</li><li>Document testing processes and maintain comprehensive test reports.</li><li>Stay updated with the latest testing tools and industry trends.</li></ul>',
    '<ul><li>Bachelor’s degree in computer science, engineering, or a related field.</li><li>Proven experience as a QA Engineer or similar role.</li><li>Strong knowledge of software QA methodologies, tools, and processes.</li><li>Experience with automated testing tools such as Cypress, JUnit, or TestNG.</li><li>Proficiency in scripting languages such as Python, JavaScript, or Bash.</li><li>Familiarity with SQL and databases.</li><li>Excellent problem-solving skills and attention to detail.</li><li>Strong communication and teamwork skills.</li><li>Ability to work in a fast-paced environment and deliver at the agreed time.</li></ul><p><strong>Preferred Qualifications:</strong></p><ul><li>Experience with continuous integration/continuous deployment (CI/CD) pipelines.</li><li>Knowledge of Agile methodologies and tools (e.g., Jira, Confluence).</li><li>Familiarity with cloud platforms (e.g., AWS, Azure, Google Cloud).</li><li>Experience with performance and security testing tools.</li></ul>',
    '<p><strong>What we offer:</strong></p><p>Challenging responsibilities, an entrepreneurial environment, and a supportive team. If you’re not a perfect fit but have what it takes, reach out. We value diversity.</p><p><strong>What will you get?</strong></p><ul><li><strong>You’ll get to work with experienced software engineers worldwide at market leading, innovative Scandinavian SaaS company looking to accelerate growth.</strong></li><li><strong>Scandinavian Work Culture: creativity, innovation and work-life balance.</strong></li><li>Competitive salary and 100% official salary during the probation period.</li><li>Annual review and 13th month salary.</li><li>Premium healthcare and accident insurance.</li><li>Wellness package supports employees to stay healthy and wealthy.</li><li>Exciting company outing/events and team building activities.</li><li>On-site and training opportunities in Nordic.</li><li>Modern working environment.</li></ul>',
    'Tầng 19, tòa nhà Peakview Tower, 36 Hoàng Cầu, Đống Đa, Hà Nội, Quận Đống Đa, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 1500, 2500, 'USD', 'ONSITE', 'MID', '2025-04-28 07:00:00', '2025-05-28 07:00:00', 'ACTIVE'
  );
-- (9) OTSV – Technical Architect
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    '[Da Nang & Ho Chi Minh] Technical Architect',
    'da-nang-ho-chi-minh-technical-architect-one-tech-stop-9',
    '<ul><li>INNOVATIVE, CREATIVE - Think outside of the box</li><li>KEEP CHALLENGING - Never stay in your comfort zone</li><li>CRITICAL THINKING</li></ul>',
    '<p><strong>PRIMARY JOB RESPONSIBILITIES</strong></p><ul><li><strong>Development Oversight</strong>: Lead the software development life cycle, ensuring project delivery aligns with organizational objectives.</li><li><strong>Technical Solutions Design</strong>: Collaborate with stakeholders to design efficient software solutions and verify technical feasibility.</li><li><strong>Architectural Guidance & Design:</strong> Define system architecture, establish coding standards, and ensure alignment with non-functional requirements.</li><li><strong>Architectural Execution & Integration:</strong> Oversee software development, facilitate continuous integration/deployment, and maintain monitoring for system performance.</li><li><strong>Architectural Validation & Quality Assurance:</strong> Conduct architecture evaluations, enforce continuous testing, and validate non-functional requirements.</li><li><strong>Architectural Management:</strong> Develop project roadmaps, manage technical risks, maintain the technical backlog, and mentor team members.</li></ul>',
    '<p><strong>POSITION QUALIFICATIONS AND REQUIREMENT</strong></p><ul><li><strong>Full-stack Development Expertise</strong>: Extensive experience in both backend (Node.js/NestJS) and frontend (React/Next.js) development.</li><li><strong>Communication</strong>: Fluency in English is required.</li><li><strong>Experience</strong>: 3-5 years of experience in a similar Technical Architect role.</li><li><strong>Cloud Infrastructure</strong>: Advanced knowledge of cloud platforms (preferably Google Cloud), with expertise in Kubernetes, Service Mesh, and optimizing infrastructure for large-scale, secure, and resilient systems.</li><li><strong>Application Architecture</strong>: Expertise in designing, evaluating, and validating modern software architectures such as Microservices, Domain-Driven Design (DDD), Clean Architecture.</li><li><strong>Data Architecture</strong>: Expertise in designing and managing data models, with a strong focus on PostgreSQL, as well as other SQL/NoSQL databases, ensuring optimal performance and scalability.</li><li><strong>Non-Functional Requirements</strong>: Proven expertise in managing and optimizing system non-functional requirements, including performance, security, and scalability.</li><li><strong>Technical Troubleshooting</strong>: Strong problem-solving skills for diagnosing and resolving technical and production incidents effectively.</li><li><strong>Technical Communication</strong>: Excellent communication skills to convey complex technical concepts clearly to both technical and non-technical stakeholders.</li></ul><p><strong>PERSONAL ATTRIBUTES:</strong></p><ul><li>Experience in mentoring people</li><li>Calm in finding resolutions for issues/problems</li></ul>',
    '<p><strong>More on OTSV – what is it like to work in OTSV?</strong></p><p>At OTSV, work is a form of self-fulfillment, we encourage staff to leave their comfort zone, think out of the box, and share their ideas without hesitation. As a team, we analyze and evaluate issues objectively to learn quickly from mistakes. We believe in ‘fail quick, success quick’ and strive to keep pace with the forefront of technology to digitize ONE’s business.</p><p>In line with the Agile methodology, we have an open office concept with lots of meeting areas for spontaneous team meetings.</p><p>We aim to make our staff feel as comfortable in the office as they would feel at home.</p><p>You will love working here!</p><ul><li>13th-month salary</li><li>Performance Bonus</li><li>Social Security co-contribution based on full gross salary</li><li>Premium health care (Bao Viet Insurance) for employees & dependents (parents or spouse + children).</li><li>Lunch allowance</li><li>Free drinks and snacks</li><li>17 days of Annual Leave</li><li>Annual health screening reimbursement: VND4,700,000/year</li><li>Well-being allowance: VND13,800,000 VND/year</li><li>Training and education sponsorship: 38,000,000/year</li></ul>',
    '1 Bis Đường Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), 2000, 4000, 'USD', 'FLEXIBLE', 'SENIOR', '2025-05-06 09:00:00', '2025-06-05 09:00:00', 'ACTIVE'
  );
-- (10) OTSV – Product Owner
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    '[Ho Chi Minh & Da Nang] Product Owner',
    'ho-chi-minh-da-nang-product-owner-one-tech-stop-10',
    '<ul><li>Performance Bonus</li><li>Well-being allowance</li><li>Medical insurance for the staff''s family</li></ul>',
    '<ul><li>Owning a product/product line, developing and maintaining product vision and strategies to achieve it</li><li>Create Inception Deck to align all stakeholders and development team’s members</li><li>Explain to the development team about the product’s market & users</li><li>Creates the Persona and Customer Journey Map</li><li>Creates the User Story Map and define the minimum viable product (MVP)</li><li>Manage Product Backlog (create & list requirements)</li><li>Make the plan for release and each time-box (iteration)</li><li>Perform user acceptance testing</li><li>Encourage the development team to improve development productivity and quality</li><li>Work closely with the development team to make sure that product backlogs are understood correctly, and make adjustments in time if needed</li><li>Work with the designer to create UI/UX flow</li><li>Drive the product evolution through data analysis and user feedback</li><li>Define and validate product KPI and monitor it</li><li>Communicate with business stakeholders</li></ul>',
    '<ul><li><strong>Advantageous to have 3-5 years of experience in product/service planning/UX</strong></li><li>Have a bachelor’s degree in business administration / Marketing / Economics / SCM or practical experience in project management/planning</li><li>Have at least 2-year experiences related to software development</li><li>Fluency in English is a MUST</li><li>Communication & negotiation skill</li><li>Organizational & analytical skill</li><li>Continuous improvement mindset</li><li>Data-driven focus</li><li>Be a savvy application user or have experience in website design</li><li>Familiarity with Agile Software Development</li><li><strong>Having experience in the shipping industry is a plus</strong></li></ul>',
    '<p>At OTSV, work is a self-fulfillment, we encourage staff to leave their comfort zone, think out of the box, and share their ideas without hesitation. As a team, we analyze and evaluate issues objectively to learn quickly from mistakes.</p><p>We believe in ‘fail quick, success quick’ and strive to keep pace with the forefront of technology to digitize ONE’s business.</p><p>The designs of our offices embrace our culture of being flexible and open. Unlike a conventional office, we have an open concept with different work areas which encourages collaboration, open-mindedness, and spontaneity.</p><p>Each work area has its charm and aims to make our staff feel as comfortable in the office as they would feel at home. Have a meet-up at the Café amidst the aroma of coffee!</p><p><strong>You will love working here!</strong></p><ul><li>Annual Salary Review & Increment</li><li>13th-month salary</li><li>Performance Bonus</li><li>Social Security co-contribution based on full gross salary</li><li>Premium health care (Bao Viet Insurance) for employees & dependents (parents or spouse and children).</li><li>Lunch allowance</li><li>Free drinks and snacks</li><li>17 days of Annual Leave</li><li>Annual health screening reimbursement: 4,700,000 VND/ year</li><li>Training and education sponsorship: 38,000,000VND/year</li><li>Well-being allowance: 13,800,000VND/year</li></ul>',
    '1 Bis Đường Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'MID', '2025-05-06 09:00:00', '2025-06-05 09:00:00', 'ACTIVE'
  );
-- (11) OTSV – UI/UX Designer
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    '[Ho Chi Minh & Da Nang] UI/UX Designer',
    'ho-chi-minh-da-nang-uiux-designer-one-tech-stop-11',
    '<ul><li>Performance Bonus</li><li>Premium insurance for family</li><li>Well-being allowance</li></ul>',
    '<ul><li>Lead and execute front-end innovation projects leveraging deep user understanding with the goal of improving user experience (UX) while delivering against strategic business priorities.</li><li>Champion the use of Design-Thinking and Lean Start-Up methodologies to probe, assess, and evaluate behaviors of targeted users and then translate that knowledge into meaningful new insights that drive idea generation and concept development.</li><li>Facilitate design thinking workshops. Use design thinking principles (ideation, prototyping, testing, and feedback) and tools (journey maps, prototyping tools, etc.) to facilitate problem-solving sessions for a range of government audiences, from senior leaders to front-line implementers.</li><li>Conduct in-depth customer interviews to gather deep insight, into hidden motivations, and true needs of existing and future customers</li><li>Compile and interpret the insights for the teams/squads so that everyone has intimate knowledge of the customer</li><li>Define the challenge to be solved from the customer''s perspective, identify jobs to be done</li><li>Design new innovative solutions with feasibility and business viability in focus together with the customer</li><li>Arrange and supervise the prototyping of the designed activities</li><li>Organize and perform user testing of the developed digital and offline solutions in various stages of the service design process</li><li>Gather and systematize user feedback and testing results</li><li>Conduct design reviews of developed solutions</li></ul>',
    '<ul><li>Proven track record of user research and user testing;</li><li><strong>Minimum of 2 years</strong> of relevant experience in <strong>design-thinking/UX </strong>including working on projects with cross-functional teams.</li><li><strong>Service, Product, and UX Design skills</strong></li><li>Proficiency with Sketch and Invision (or other prototyping tools), as well as other UX design programs</li><li>Proficient level of English in speech and writing in order to conduct and facilitate the design process</li><li>Good knowledge of Agile working principles</li><li>Good public speaking and strong facilitation skills</li><li>Prior work leading digital UX definition.</li><li>Trained and experienced in Design Thinking and Lean Start-Up principles.</li></ul>',
    '<p>At OTSV, work is a self-fulfillment, we encourage staff to leave their comfort zone, think out of the box, and share their ideas without hesitation. As a team, we analyze and evaluate issues objectively to learn quickly from mistakes.</p><p>We believe in ‘fail quick, success quick’ and strive to keep pace with the forefront of technology to digitize ONE’s business.</p><p>The designs of our offices embrace our culture of being flexible and open. Unlike a conventional office, we have an open concept with different work areas which encourages collaboration, open-mindedness, and spontaneity.</p><p>Each work area has its charm and aims to make our staff feel as comfortable in the office as they would feel at home. Have a meet-up at the Café amidst the aroma of coffee!</p><p><strong>You will love working here!</strong></p><ul><li>Annual Salary Review & Increment</li><li>13th-month salary</li><li>Performance Bonus</li><li>Social Security co-contribution based on full gross salary</li><li>Premium health care (Bao Viet Insurance) for employees & dependents (parents or spouse and children).</li><li>Lunch allowance</li><li>Free drinks and snacks</li><li>17 days of Annual Leave</li><li>Annual health screening reimbursement: 4,700,000 VND/ year</li><li>Training and education sponsorship: 38,000,000VND/year</li><li>Well-being allowance: 13,800,000VND/year</li></ul>',
    'Tầng 3-4 tòa nhà Phi Long, 52 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng; 1 Bis Đường Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'MID', '2025-05-06 09:00:00', '2025-06-05 09:00:00', 'ACTIVE'
  );
-- (12) OTSV – Full-Stack (React/Node)
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    '[Ho Chi Minh] Full-Stack Developer (React.JS/Node.js)',
    'ho-chi-minh-fullstack-developer-reactjsnodejs-one-tech-stop-12',
    '<ul><li>Performance Bonus</li><li>Health care program for staff & dependants</li><li>Well-being allowance</li></ul>',
    '<p>The developer will be involved in all phases of the product development cycle including requirements analysis, project estimation, detailed design, software development, testing, and deployment.</p><p>He/she has A Good Mindset for Development schedule/Quality/Self-Study and is willing to learn new technologies.</p><p><strong>What you will do</strong></p><ul><li>Perform development & testing features/bugs from backlog items.</li><li>Response quickly to handle incidents if it happens.</li><li>Build and maintain the CI/CD.</li><li>Be Involved in Quality Assurance with good processes, practices, and analysis tools.</li><li>Be Involved in developing Non-Functional Requirements (e.g. Performance, Security, Reliability, Maintainability…)</li><li>Assists leaders to define Technical Backlog</li><li>Be Involved in defining Roadmap and Risk Management.</li><li>Responsible for being committed to the results to be delivered by his/her team and assists his/her teams in achieving such results.</li><li>Responsible for objectively and effectively communicating with his/her counterparts, leaders, and team members</li><li>Responsible for providing his/her team with feedback on their work.</li><li>Developing ideas for new programs, products, or features by monitoring industry developments and trends.</li></ul>',
    '<p><strong>We are looking for the one who:</strong></p><ul><li>Having experience in Web Front-end (HTML/CSS/JS), <strong>NextJS or ReactJS</strong></li><li>Having experience in backend technology of <strong>Nodejs and TypeScript</strong> and frameworks available for Nest.js</li><li>Database programming or design skills, including relational database skills (SQL, etc.) and non-relational database skills (MongoDB, Redis, Cassandra, etc.).</li><li>CODING: The code should be well documented and compliant with good practices, as well as the testing skill (Unit Test, Integration Test, User Acceptance Test, Automation Regression Test.</li><li>RESTful API</li><li>Knowledge of Programming Principles, Design Patterns, etc;</li><li>Willing to learn new technology and have a product mindset.</li></ul><p><strong>Nice to have:</strong></p><ul><li>Experience in cloud architecture/infrastructure, especially on GCP</li><li>Experience with Docker;</li><li>Knowledge about Continuous Integration, Continuous Delivery (CI/CD);</li><li>Familiar with working in an Agile environment;</li></ul>',
    '<p><strong>More on OTSV – what is it like to work in OTSV?</strong></p><p>At OTSV, work is a form of self-fulfillment, we encourage staff to leave their comfort zone, think out of the box, and share their ideas without hesitation. As a team, we analyze and evaluate issues objectively to learn quickly from mistakes. We believe in ‘fail quick, success quick’ and strive to keep pace with the forefront of technology to digitize ONE’s business.</p><p>In line with the Agile methodology, we have an open office concept with lots of meeting areas for spontaneous team meetings.</p><p>We aim to make our staff feel as comfortable in the office as they would feel at home.</p><p>You will love working here!</p><ul><li>Competitive salary</li><li>Annual Increment</li><li>13th-month salary</li><li>Performance Bonus</li><li>Social Security co-contribution based on full gross salary</li><li>Premium health care (Bao Viet Insurance) for employees & dependents (parents or spouse + children).</li><li>Lunch allowance</li><li>Free drinks and snacks</li><li>17 days of Annual Leave</li><li>Annual health screening reimbursement: VND4,700,000/year</li><li>Well-being allowance: VND13,800,000 VND/year</li><li>Training and education sponsorship: 38,000,000/year</li></ul><p><strong>We value Teamwork and organization</strong><br>Team meals, gatherings, and other recreational and team bonding activities regularly.</p>',
    '1 Bis Đường Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'MID', '2025-05-06 09:00:00', '2025-06-05 09:00:00', 'ACTIVE'
  );
-- (13) MCredit – Tester (Manual/Automation)
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Tester (Manual/ Automation)',
    'tester-manual-automation-mcredit-13',
    '<ul><li>Lương thưởng cạnh tranh, đãi ngộ toàn diện</li><li>Đào tạo chuyên sâu theo Công ty và Tập đoàn MB</li><li>Bảo hiểm sức khỏe MIC</li></ul>',
    '<p><strong>Đối với Manual Tester:</strong></p><ul><li>Đọc hiểu tài liệu đặc tả, viết các tài liệu theo mẫu của dự án và sign-off nội bộ: test case, test report, hướng dẫn sử dụng phần mềm</li><li>Tham gia thực hiện SIT, re-test, regression test cho các hệ thống của công ty như:<br>- Chức năng của ứng dụng<br>- Database, webservice<br>- Report</li><li>Smoke test trên môi trường UAT trước khi bàn giao môi trường UAT cho người dùng. Hỗ trợ người dùng nghiệp vụ tạo UAT scenarios và test trong quá trình UAT, log bugs UAT nhận được từ người dùng lên tool quản lý dự án và theo dõi các bug đã log/được assign.</li><li>Hỗ trợ người dùng nghiệp vụ test khi golive (nếu cần)</li><li>Hỗ trợ bộ phận HelpDesk trong việc nhận diện lỗi và đào tạo người dùng</li></ul><p><strong>Đối với Automation Tester</strong></p><ul><li>Thiết kế và xây dựng kịch bản kiểm thử tự động (Automation Test Scripts) cho hệ thống Web/Mobile/API.</li><li>Tham gia vào việc phân tích yêu cầu và làm việc với Developer, BA để hiểu logic nghiệp vụ.</li><li>Phát triển, tối ưu và bảo trì automation test framework sử dụng Selenium/TestNG/Cypress/Playwright/....</li><li>Tích hợp test scripts vào quy trình CI/CD (với Jenkins/GitLab CI/...).</li><li>Ghi nhận lỗi, phối hợp với dev để debug và xác minh lỗi được fix.</li><li>Viết test report, tài liệu kỹ thuật về test scripts, test plans.</li><li>Chủ động đề xuất giải pháp cải tiến chất lượng và hiệu quả kiểm thử.</li></ul>',
    '<ul><li>Hiểu biết về cơ sở dữ liệu SQL, mySQL, Oracle</li><li>Kinh nghiệm làm việc trong các dự án triển khai cho ngân hàng, công ty tài chính là một lợi thế</li><li>Sử dụng các công cụ kiểm thử chức năng (automation test tool), kiểm thử hiệu năng (performance test tool) mã nguồn mở phổ biết trên thị trường như Jmeter, Selenium, SOAPUI.</li><li>Có kinh nghiệm viết test script là một lợi thế.</li></ul>',
    '<p><strong>Phúc lợi, đãi ngộ:</strong></p><ul><li>Thời gian làm việc: Thứ 2 – Thứ 6, nghỉ thứ 7 và Chủ nhật</li><li>Thu nhập xây dựng theo 3P cạnh tranh kèm các chế độ hấp dẫn (Bảo hiểm MIC, Ngày nghỉ sinh nhật, Chế độ dành riêng cho các mẹ đang nuôi con nhỏ: Happy mom’s room, Happy mom’s, hour...)</li><li>Cơ hội làm việc chuyên nghiệp tại môi trường tài chính và giải pháp số hàng đầu Việt Nam (Top 100 nơi làm việc tốt nhất Việt Nam 2024, Top 5 Công ty uy tín nhất ngành tài chính năm 2024)</li><li>Ứng dụng nền tảng công nghệ hiện đại, cập nhật xu hướng công nghệ mới (Data Lake & AI, Cloud AWS, Open API,...)</li><li>Được hướng dẫn từ các cấp quản lý và chuyên gia có kinh nghiệm nhiều năm trong ngành Tài chính & Ngân hàng.</li></ul>',
    'Tầng 9,10,11,12 Tòa nhà MB Bank, số 21 Cát Linh - Phường Cát Linh, Quận Đống Đa, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), 500, 2000, 'USD', 'ONSITE', 'JUNIOR', '2025-04-23 09:00:00', '2025-05-23 09:00:00', 'ACTIVE'
  );
-- (14) MCredit – Senior Java Developer
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Senior Java Developer (J2EE, Spring)',
    'senior-java-developer-j2ee-spring-mcredit-14',
    '<ul><li>Lương thưởng cạnh tranh, đãi ngộ toàn diện</li><li>Đào tạo chuyên sâu theo Công ty và Tập đoàn MB</li><li>Bảo hiểm sức khỏe MIC</li></ul>',
    '<ul><li>Tham gia xây dựng, phát triển các hệ thống cổng thông tin, trang thông tin điện tử, Hệ quản trị nội dung trên nền tảng Java.</li><li>Nghiên cứu tài liệu, giải pháp, tích hợp, mô hình triển khai hệ thống.</li><li>Nhận các yêu cầu công việc & báo cáo kết quả công việc thực hiện cho cán bộ quản lý trực tiếp.</li></ul>',
    '<ul><li>Tốt nghiệp Đại học/cao đẳng các chuyên ngành IT, Khoa học máy tính</li><li>Có từ 5 năm kinh nghiệm tham gia các dự án trên nền tảng Java</li><li>Thành thạo về J2EE và ít nhất 1 trong các framework của Java (Struts, Spring, …);</li><li>Có kinh nghiệm làm việc với các hệ quản trị cơ sở dữ liệu phổ biến, đặc biệt là Oracle.</li><li>Có kinh nghiệm làm việc với Web service, hiểu về SOAP.</li><li>Nắm vững quy trình phát triển các dự án phần mềm.</li><li>Tiếng Anh đọc hiểu tài liệu và giao tiếp ở mức cơ bản.</li><li>Khả năng chịu áp lực cao và tuân thủ kỷ luật tốt.</li><li>Khả năng team work tốt và làm việc độc lập.</li></ul>',
    '<p><strong>Phúc lợi, đãi ngộ:</strong></p><ul><li>Thời gian làm việc: Thứ 2 – Thứ 6, nghỉ thứ 7 và Chủ nhật</li><li>Thu nhập xây dựng theo 3P cạnh tranh kèm các chế độ hấp dẫn (Bảo hiểm MIC, Ngày nghỉ sinh nhật, Chế độ dành riêng cho các mẹ đang nuôi con nhỏ: Happy mom’s room, Happy mom’s, hour...)</li><li>Cơ hội làm việc chuyên nghiệp tại môi trường tài chính và giải pháp số hàng đầu Việt Nam (Top 100 nơi làm việc tốt nhất Việt Nam 2024, Top 5 Công ty uy tín nhất ngành tài chính năm 2024)</li><li>Ứng dụng nền tảng công nghệ hiện đại, cập nhật xu hướng công nghệ mới (Data Lake & AI, Cloud AWS, Open API,...)</li><li>Được hướng dẫn từ các cấp quản lý và chuyên gia có kinh nghiệm nhiều năm trong ngành Tài chính & Ngân hàng.</li></ul>',
    'Tầng 9,10,11,12 Tòa nhà MB Bank, số 21 Cát Linh - Phường Cát Linh, Quận Đống Đa, Hà Nội; Tòa Nhà Scetpa Building - 19A Cộng Hòa, Quận Tân Bình, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), 1000, 3000, 'USD', 'ONSITE', 'SENIOR', '2025-04-23 09:00:00', '2025-05-23 09:00:00', 'ACTIVE'
  );
-- (15) TYME(X) – Java API Engineer
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Java API Engineer - HCM (Microservice, AWS)',
    'java-api-engineer-hcm-microservice-aws-tymex-15',
    '<ul><li>Excellent environment and team to help you grow.</li><li>Competitive salary and learning culture.</li><li>Premium health care for you and your family.</li></ul>',
    '<p><strong>About our Team:</strong></p><p>Our team is responsible for creating a brand of new digital financial platforms and apps that are highly reliable and scalable using modern engineering practices. You will be joining a project which talented software engineers in our Digital Bank Build team who is responsible for designing, building, and maintaining the new digital banking platform and the customer channels. As part of the team, you will be responsible for implementing software features, involve in technical designs, and writing tests to ensure the high-quality delivery of the product. The teams operate in Scrum and DevOps models.</p><p>We’re looking for top engineers out there! During the interview process, we will test your coding and design skills to assess your experience and depth of knowledge. Don’t worry our interview process will be fun!</p><p><strong>Responsibilities:</strong></p><ul><li>As a <strong>Java backend engineer</strong>, you will be working within a specific problem where you will design, develop, and deploy backend services with a focus on scalability, high availability, and low latency.</li><li>Drive the efficient delivery of change through analysis, definition, and documentation of requirements whilst identifying potential solutions using agile delivery frameworks.</li><li>Solve complex technical and business problems and learn new technology and frameworks.</li><li>Be part of a team that will take full responsibility for the features you own.</li><li>Design, develop, test, deploy, monitor, and improve, you are responsible for the full life-cycle of your product – build it, own it.</li></ul>',
    '<p>You will be a perfect match if your profile ticks some below items:</p><p><strong>Must-have:</strong></p><ul><li>A pragmatic mindset.</li><li>Outstanding problem-solving ability, eagerness to learn, and curiosity.</li><li>A few years of software development experience with one or more general-purpose programming languages.</li><li>Strong database and schema design for large-scale applications.</li><li>Adaptable attitude and personality that is ready for continuous change.</li><li>Collaboration and culture fit in the Agile experience will be an advantage.</li><li>Good English skills.</li></ul><p><strong>Nice to have:</strong></p><ul><li>Experience in developing distributed systems on top of micro-services architecture, event-driven architecture <strong>using Java, Spring and Spring boot, Kafka, Redis,</strong> etc. is a big plus</li><li><strong>Experience in AWS, Ansible, Packer, Docker, Rancher, and K8s</strong> is a big plus</li><li>Experienced in automated testing frameworks is a plus</li><li>Good English listening and speaking is a big plus</li><li>Experience working in the banking and the financial domain is a plus</li></ul>',
    '<p><strong>You’ll love working with us if you are:</strong></p><ul><li>Passionate about technology.</li><li>Independent but also a good team player.</li><li>Comfortable with a high degree of ambiguity.</li><li>Focused on usability and speed.</li><li>Keen on presenting your ideas to your peers and management.</li></ul><p>At <strong>TYME,</strong> opportunities are here for the taking. If you want to be part of our purpose and live and lead through our values, we can offer exciting development opportunities through expanded lateral roles, stretch assignments, or people leadership.</p><p><strong>Some of our benefits:</strong></p><ul><li><strong>Meal and parking allowances</strong> are covered by the company.</li><li><strong>Full benefits and salary rank during probation</strong>.</li><li><strong>Insurances</strong> such as Vietnamese labor law and <strong>premium health care</strong> for you and your family.</li><li><strong>SMART goals and clear career opportunities</strong> (technical seminar, conference, and career talk) - we focus on your development.</li><li><strong>Values-driven, international working environment, and agile culture.</strong></li><li><strong>Overseas travel opportunities</strong> for training and work-related.</li><li><strong>Internal Hackathons and company events</strong> (team building, coffee run, etc.).</li><li><strong>Pro-Rate</strong> and <strong>performance bonus</strong>.</li><li><strong>15-day annual + 3-day sick leave</strong> per year from the company.</li><li>Work-life balance <strong>40-hr per week</strong> from <strong>Mon to Fri</strong>.</li></ul>',
    'Level 5 - 6, East Tower, Lumiere Riverside, 277 Vo Nguyen Giap, An Phu Ward, Thu Duc City, HCMC., Thành phố Thủ Đức, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'MID', '2025-05-05 09:00:00', '2025-06-04 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #16
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Product Prompt Engineer (Java/Python)',
    'product-prompt-engineer-java-python-tymex-16',
    '<ul><li>Excellent environment and team to help you grow.</li><li>Competitive salary and learning culture.</li><li>Premium health care for you and your family.</li></ul>',
    '<p><strong>Summary:</strong> We are looking for a visionary Product Prompt Engineer with a strong foundation in backend engineering, capable of building and integrating frontend systems, backend systems, customer service portals, and operations portals using AI tools. In this role, you will be at the forefront of adopting an <strong>AI-first approach</strong> to product development, continually challenging existing workflows and foundational engineering principles, while engaging in rapid experimentation to enhance value delivery to customers. This is an exciting opportunity for those passionate about product development and AI-driven workflows.</p><h3>Top 5 Reasons Why We Are the Next Destination for Your Career</h3><ul><li><strong>Innovation-Driven Environment:</strong> Work with state-of-the-art technologies, including Serverless AWS, AI-augmented engineering, microservices, Java, and Python.</li><li><strong>Impactful Work:</strong> Shape products that enhance financial inclusivity and access in emerging markets.</li><li><strong>Collaborative Culture:</strong> Join a forward-thinking team that values innovation, teamwork, and continuous learning.</li><li><strong>Competitive Benefits:</strong> Enjoy a comprehensive package, professional growth opportunities, and a balanced work-life environment.</li><li><strong>Learning and Growth:</strong> Access SMART goals, technical seminars, conferences, and training to support your career advancement.</li></ul><p><strong>Key Responsibilities:</strong></p><ul><li>Take the lead with <strong>AI-first</strong> adoption, leveraging<strong> AI tools and prompt engineering skills</strong> to automate work wherever possible so that we can improve time-to-value.</li><li>“Question the requirements”, to get to the essence of what is actually needed, ensuring that we are building the right things right.</li><li>Collaborate with a new, <strong>AI-first</strong> <strong>product development team</strong> where you’ll be at the heart of <strong>building and scaling</strong> innovative enterprise financial products, driving <strong>meaningful impact</strong> from day one.</li><li>Take <strong>end-to-end ownership</strong> of the product, designing systems to satisfy customers and validating assumptions with data driven insights.</li><li><strong>Innovate</strong> like a startup—lead the charge from <strong>concept to deployment</strong>, continuously testing, learning, and improving your product with every iteration.</li><li>Embrace the full product lifecycle; <strong>prioritise it</strong>, <strong>understand it</strong>, <strong>design it, build it, test it, run it</strong> and<strong> own it</strong>.</li></ul>',
    '<h3><strong>Must-have</strong> <strong>skills</strong></h3><ol><li><strong>Product-obsessed</strong>: You live and breathe <strong>product thinking</strong>—you’re not just here to generate code, but to <strong>own the product</strong> and drive its success. You focus on solving customer problems and delivering experiences that make a difference.</li><li><strong>Customer focussed</strong>: You can talk to directly customers or subject matter experts and ask questions to deeply understand their needs so that you can deliver products that resonate.</li><li><strong>Creative problem-solver</strong>: You tackle complex challenges with creativity and an analytical mindset, always balancing technical decisions with business outcomes.</li><li><strong>Proven development experience</strong>: You’ve got a solid background in <strong>software development</strong>, with expertise in one or more programming languages (e.g., <strong>Python, Java</strong>).</li><li><strong>Adaptability & hustle</strong>: You thrive in an <strong>ever-evolving environment</strong>, where you can wear many hats, pivot quickly, and move fast without losing focus on the big picture.</li><li><strong>Team player with an edge</strong>: You bring a strong <strong>collaborative spirit</strong> to an <strong>AI-first</strong> <strong>team</strong>, but you’re also ready to <strong>lead initiatives</strong> and be the go-to person for the features you own.</li><li><strong>Fluent in English</strong>: You’re a smooth communicator, capable of turning technical jargon into easy-to-understand ideas for both teammates and stakeholders.</li><li><strong>Automation lover</strong>: You believe in the power of <strong>automated testing frameworks</strong> to build robust and reliable systems.</li><li><strong>Love for Learning</strong>: You love learning new domains of knowledge and technologies so that you can build better products faster. You know there is always more to learn and are always open to being wrong.</li><li><strong>Early Adopter</strong>: You have already built a few simple apps with AI tools, experimented with mcp servers and are familiar with prompt engineering.</li></ol><h3><strong>Nice to Have:</strong></h3><ul><li>Experience developing products for fintech or financial product environments.</li><li>Front-end development experience (eg, reactjs)</li></ul>',
    '<p><strong>You’ll love working with us if you are:</strong></p><ul><li>Passionate about technology.</li><li>Independent but also a good team player.</li><li>Comfortable with a high degree of ambiguity.</li><li>Focused on usability and speed.</li><li>Keen on presenting your ideas to your peers and management.</li></ul><p>At <strong>TYME,</strong> opportunities are here for the taking. If you want to be part of our purpose and live and lead through our values, we can offer exciting development opportunities through expanded lateral roles, stretch assignments, or people leadership.</p><p><strong>Some of our benefits:</strong></p><ul><li><strong>Meal and parking allowances</strong> are covered by the company.</li><li><strong>Full benefits and salary rank during probation</strong>.</li><li><strong>Insurances</strong> such as Vietnamese labor law and <strong>premium health care</strong> for you and your family.</li><li><strong>SMART goals and clear career opportunities</strong> (technical seminar, conference, and career talk) - we focus on your development.</li><li><strong>Values-driven, international working environment, and agile culture.</strong></li><li><strong>Overseas travel opportunities</strong> for training and work-related.</li><li><strong>Internal Hackathons and company events</strong> (team building, coffee run, etc.).</li><li><strong>Pro-Rate</strong> and <strong>performance bonus</strong>.</li><li><strong>15-day annual + 3-day sick leave</strong> per year from the company.</li><li>Work-life balance <strong>40-hr per week</strong> from <strong>Mon to Fri</strong>.</li></ul>',
    'Level 5 - 6, East Tower, Lumiere Riverside, 277 Vo Nguyen Giap, An Phu Ward, Thu Duc City, HCMC., Thành phố Thủ Đức, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-22 09:00:00', '2025-05-22 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #17
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Mobile Technical Lead (iOS, Android, Kotlin, Swift)',
    'mobile-technical-lead-ios-android-kotlin-swift-tymex-17',
    '<ul><li>Excellent environment and team to help you grow.</li><li>Competitive salary and learning culture.</li><li>Premium health care for you and your family.</li></ul>',
    '<p>Are you an experienced <strong>Mobile Technical</strong> <strong>Lead</strong> looking for your next career move? Do you have a background in <strong>design & architecture </strong>and <strong>development of digital products</strong>? If so read on.</p><p><strong>The team:</strong></p><p>You will be part of our Digital Delivery Hub who are responsible for designing, developing and maintaining some of the most interesting and innovative digital apps within the financial services space that are at the forefront of the market. Our Hub is focused on building a world class User Experience, Design and Web / Mobile Development team that can work with the business to realise an exciting digital strategy.</p><p><strong>The role:</strong></p><p>We are looking for a talented<strong> Mobile Technical Lead </strong>who still does hands-on development to contribute in the development and execution of an innovative mobile banking solution in Asia. This will include the development of in-country and cross-border solutions across all facets of a mobile banking operation including customer experience and design, developing and implementing new products and services, process engineering and other functional deliverable. Risk management and technology innovation will be essential for your success.</p><p>You will be responsible for technically leading and coaching our engineers who work in cross-functional delivery teams to design and build best-of-breed mobile solutions whilst maintaining necessary support for ongoing products.</p><h3><strong>Your duties will be to:</strong></h3><ul><li>Collaborate with our technical leaders to establish a vision for our mobile engineering initiatives.<br>Design and develop cutting-edge applications for Android and iOS platforms.</li><li>Work closely with cross-functional teams to define, design, and deliver new features.</li><li>Provide coaching, guidance, and mentorship to mobile developers to facilitate their professional growth.</li><li>Work on addressing bugs and improving application performance.</li><li>Continuously research, evaluate, and implement innovative technologies to optimize development efficiency.</li><li>Participate in the planning process for software development projects, ensuring adherence to quality standards and timely delivery.</li><li>Design the architecture for new products and features.</li><li>Provide leadership and mentorship to a team of mobile developers, offering guidance and support to achieve individual objectives and deliver high-quality code.</li></ul>',
    '<p><strong>Technical Skills:</strong></p><ul><li>6+ years of experience in Mobile Development.</li><li>2+ years of experience as a Mobile Development Team Leader.</li><li>Proven expertise in either iOS (SwiftUI and UIKit) or Android (Kotlin) development. While proficiency in both platforms is not mandatory, it will be a plus.</li><li>Experience working on various mobile apps, preferably large-scale applications with multi-country targets.</li><li>Experience with modern mobile architecture.</li><li>Having experience in KMP(Kotlin Multiplatform) development is a big plus.</li><li>Familiarity with backend development technologies (E.g. APIs and databases)</li><li>Experience with continuous integration and continuous delivery/continuous deployment.</li><li>Experience with Modularization and code artifact management</li></ul><p><strong>Soft skills:</strong></p><ul><li>Excellent communication and teamwork abilities.</li><li>Excellent problem-solving and analytical skills.</li><li>Strong willingness to learn new practices and technologies.</li><li>Exceptional interpersonal skills, including facilitation and negotiation.</li><li>Understanding and experience of Agile methodology.</li><li>Experience in working across several technical domains with the ability to ‘deep dive’ where required and ensure correct solutions are implemented.</li><li>Ability to translate technical talk to the business.</li><li>Ability to deliver convincing presentations that provide significant insight and generate consensus and buy-in.</li><li>Experience managing and leading a development team.</li></ul>',
    '<p><strong>You’ll love working with us if you are:</strong></p><ul><li>Passionate about technology.</li><li>Independent but also a good team player.</li><li>Comfortable with a high degree of ambiguity.</li><li>Focused on usability and speed.</li><li>Keen on presenting your ideas to your peers and management.</li></ul><p>At <strong>TYME,</strong> opportunities are here for the taking. If you want to be part of our purpose and live and lead through our values, we can offer exciting development opportunities through expanded lateral roles, stretch assignments, or people leadership.</p><p><strong>Some of our benefits:</strong></p><ul><li><strong>Meal and parking allowances</strong> are covered by the company.</li><li><strong>Full benefits and salary rank during probation</strong>.</li><li><strong>Insurances</strong> such as Vietnamese labor law and <strong>premium health care</strong> for you and your family.</li><li><strong>SMART goals and clear career opportunities</strong> (technical seminar, conference, and career talk) - we focus on your development.</li><li><strong>Values-driven, international working environment, and agile culture.</strong></li><li><strong>Overseas travel opportunities</strong> for training and work-related.</li><li><strong>Internal Hackathons and company events</strong> (team building, coffee run, etc.).</li><li><strong>Pro-Rate</strong> and <strong>performance bonus</strong>.</li><li><strong>15-day annual + 3-day sick leave</strong> per year from the company.</li><li>Work-life balance <strong>40-hr per week</strong> from <strong>Mon to Fri</strong>.</li></ul>',
    'Level 5 - 6, East Tower, Lumiere Riverside, 277 Vo Nguyen Giap, An Phu Ward, Thu Duc City, HCMC., Thành phố Thủ Đức, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'LEAD', '2025-04-04 09:00:00', '2025-05-04 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #18
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Senior QA Engineer - Manual, Mobile, API Testing',
    'senior-qa-engineer-manual-mobile-api-testing-tymex-18',
    '<ul><li>Excellent environment and team to help you grow.</li><li>Competitive salary and learning culture.</li><li>Premium health care for you and your family.</li></ul>',
    '<p>We are seeking a <strong>Senior</strong> <strong>Quality Assurance Engineer</strong>, who will the takes roles of driving up the quality of our Products in Scrum teams.</p><p><strong>Your Responsibilities:</strong></p><ul><li>Work closely with everyone on the project team. Be involved in Agile activities such as iteration planning, requirements analysis, deployment process, etc.</li><li>Support to drive up Quality of products, assure the quality of releases to Production.</li><li>Create appropriate testing artifacts (such as test strategy, test plan, test case, etc.).</li><li>Carry out all other testing activities such as Functional testing, Smoke test, Regression testing … and Exploratory testing as required by the project.</li><li>Communicate status, risks, and issues to management and team members to prevent issues, risks, defects.</li><li>Create, maintain, execute automation test script in Test framework.</li><li>Have opportunities to learn and practice Automation Testing, Performance Testing… (Automation test for Mobile Testing, Web Testing, API Testing, Serverless Testing, Micro-service Testing…).</li></ul>',
    '<p><strong>Essential:</strong></p><ul><li>5+ years of experience in QA / Testing, preferably in Finance / Banking.</li><li>Experiences in software testing for Mobile Applications (iOS and Android).</li><li>Experiences in API testing (Restful API, SOAP API... with Postman, SOAPUI...).</li><li>Friendly with Database queries, experience with SQL, and NoSQL.</li><li>Familiar with Issue/ Test management tools: Jira, Confluence, Xray, Test Rails…</li><li>Understand fundamental concepts of software <i>testing</i> – Testing Foundation (Functional and Non-functional testing, hoc testing, Exploratory testing…).</li><li>Good communication and well collaboration with members of the Agile team to drive up the Quality of the product.</li><li>Competence in requirements analysis and testing.</li><li>Experience in technical problem solving; root cause analysis; and data gathering, analysis, and reporting within a system.</li><li>Able to communicate English well (write, read, speak, and listen).</li><li>Flexibility and the ability to work effectively with internal and external clients.</li><li>Strong motivation, and intellect. Resourcefulness, independence, and energy.</li><li>Experiences in Behavior-Driven-Development methodology.</li><li>Knowledge/familiarity with object-oriented and programming languages (Java, Python).</li><li>Knowledges / Experiences in Selenium WebDriver, Appium or Rest Assured.</li><li>Experience with Version Control (GIT) and CI/CD (Teamcity / Jenkin).</li></ul><p><strong>Desirable:</strong></p><ul><li>Tertiary qualifications in IT or a related field.</li><li>Have experience in Domains about Finance / Banking is a plus.</li><li>Software development experiences.</li><li>Performance testing experience.</li></ul>',
    '<p><strong>You’ll love working with us if you are:</strong></p><ul><li>Passionate about technology.</li><li>Independent but also a good team player.</li><li>Comfortable with a high degree of ambiguity.</li><li>Focused on usability and speed.</li><li>Keen on presenting your ideas to your peers and management.</li></ul><p>At <strong>TYME,</strong> opportunities are here for the taking. If you want to be part of our purpose and live and lead through our values, we can offer exciting development opportunities through expanded lateral roles, stretch assignments, or people leadership.</p><p><strong>Some of our benefits:</strong></p><ul><li><strong>Meal and parking allowances</strong> are covered by the company.</li><li><strong>Full benefits and salary rank during probation</strong>.</li><li><strong>Insurances</strong> such as Vietnamese labor law and <strong>premium health care</strong> for you and your family.</li><li><strong>SMART goals and clear career opportunities</strong> (technical seminar, conference, and career talk) - we focus on your development.</li><li><strong>Values-driven, international working environment, and agile culture.</strong></li><li><strong>Internal Hackathons and company events</strong> (team building, coffee run, etc.).</li><li><strong>13th-month salary</strong> and <strong>performance bonus (pro-rated)</strong>.</li><li><strong>15-day annual leave + 3-day sick leave</strong> per year from the company.</li><li>Work-life balance <strong>40-hr per week</strong> from <strong>Monday to Friday.</strong></li></ul>',
    'Capital Place, 29 Lieu Giai, Ngoc Khanh Ward, Quận Ba Đình, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-03 09:00:00', '2025-05-03 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #19
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Senior/Principal Ruby on Rails Dev (AWS, Backend)',
    'senior-principal-ruby-on-rails-dev-aws-backend-andpad-19',
    '<ul><li>No.1 Construction Tech company in Japan</li><li>Hybrid working with focus on Engineering team work</li><li>Exciting Opportunities with Rails Committers</li></ul>',
    '<p><strong>The Opportunity</strong></p><p><span>As our business continues to grow, ANDPAD Vietnam is seeking Senior and Principal Ruby on Rails Developers (AWS, Backend) who can join our team and develop the application in cooperation with the product manager. Working in the form of Squad, a small team can quickly and consistently engage in everything from design to development, testing and operation.</span></p><p><span>Also, there are a lot of opportunities to work with new languages ​​and frameworks other than the main language in an international environment. As an innovator, you will contribute to promoting new ways of working in the architecture and construction industry through product development.</span></p><p><strong>Job Scope</strong></p><ul><li><span>Design, develop, test, operate, and refactor products using Ruby on Rails.</span></li><li><span>Propose and implement new features and improvement ideas.</span></li><li><span>Collaborate with product managers and designers to define requirements and specifications.</span></li><li><span>Architecture design based on requirements, middleware selection.</span></li><li><span>Continuously learn about technical trends and industry best practices and apply them to the product.</span></li><li><span>Measurement of effects for quality improvement and implementation of service improvement measures</span></li></ul><p><strong>Development environment</strong></p><ul><li><span>Development Language: Ruby (on Rails)</span></li><li><span>Infrastructure: AWS, GCP</span></li><li><span>CI/CD: Circle CI / CodeBuild</span></li><li><span>DB: Amazon Aurora (MySQL compatible edition), Elasticsearch, DynamoDB</span></li><li><span>Configuration management: Ansible</li><li><span>Deploy / Build: CodePipeline, CodeBuild, CircleCI, GitHub Actions</span></li><li><span>IaC: Packer, Terraform</span></li><li><span>Monitoring: Datadog, bugsnag</span></li><li><span>Others: swagger, Docker, ZenHub, Figma, Slack / Jira</span></li></ul>',
    '<p><strong>Must-have:</strong></p><ul><li><span>Empathy for Andpad''s mission and values</span></li><li><span><strong>5+ years of experience in developing and operating Web services using Ruby on Rails </strong></span></li><li><span><strong>Experience as a technical lead throughout the full project development lifecycle</strong></span></li><li><span>Knowledge and development experience with database systems</span></li><li><span>Experience using cloud platforms (AWS, GCP, Azure, etc.)</span></li><li><span>Experience in API design, development, and documentation</span></li><li><span>Understanding of the software development lifecycle</span></li><li><span>Programming, debugging, and testing skills</span></li><li><span>Good at English communication</span></li></ul><p><strong>Nice to have:</strong></p><ul><li>Experience of discovering problems from logs and solving problems.</li><li>Experience in developing systems using container technologies such as Docker and Kubernetes.</li><li>Experience in designing architecture based on application requirements and selecting middleware.</li><li>Experience of publishing and contributing OSS.</li><li>External technical output experience (writing, technical blog, stage, etc.).</li></ul>',
    '<ul><li><span>Great salary package. Annual performance review: </span><span>twice/ year</span><span>.</span></li><li><span>13th-salary Bonus for all staff.</span></li><li><span>Patents and Inventions bonus.</span></li><li><span>Bao Viet Premium Healthcare Insurance Package </span><span>even during probation period</span><span> </span></li><li><span>Annual Health Check-up for all staff.</span></li><li><span>Good career advancement opportunities.</span></li><li><span>Opportunity to acquire technical knowledge and experience in the latest technologies.</span></li><li><span>12 days annual leaves, + 6 days New Year every year.</span></li><li><span>Company trip, Year-End Party.</span></li><li><span>Insurance in full gross salary.</span></li><li><span>Gift for Tet/ Autumn Festival</span></li><li><span>Hot bonus when introduce members ( Referral )</span></li><li><span>Free Coffee & Tea</span></li><li><span>Flexible working </span></li><li><span>Laptops Macbook Pro, monitors, etc</span></li></ul>',
    '3rd Floor, Dong Nhan Building, 90 Nguyen Dinh Chieu, Da Kao Ward, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-18 09:00:00', '2025-05-18 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #20
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Senior Golang Developer (Backend, AWS, MySQL)',
    'senior-golang-developer-backend-aws-mysql-andpad-20',
    '<ul><li>No.1 Construction Tech company in Japan</li><li>Hybrid working with focus on Engineering team work</li><li>Highly competitive salary and benefits</li></ul>',
    '<p><span>ANDPAD Việt Nam is looking for a Senior Golang (Backend) Engineer who can join our team and develop the application in cooperation with the product manager. Working in the form of Squad, a small team can quickly and consistently engage in everything from design to development, testing and operation.</span></p><p><span>Also, there are a lot of opportunities to work with new languages ​​and FWs other than the main language </span><span>in an international environment</span><span>.</span></p><p><span><strong>■ </strong></span><span><strong>Job Scope</strong></span></p><ul><li><span>Design and implementation function of the product in charge using Golang.</span></li><li><span>Refactoring existing products for microservices.</span></li><li><span>Requirements definition and specification formulation in collaboration with product managers and designers</span></li><li><span>Architecture design based on requirements, middleware selection</span></li><li><span>Measurement of effects for quality improvement and implementation of service improvement measures</span></li></ul><p><span><strong>■ </strong></span><span><strong>Development environment</strong></span></p><ul><li><span> Infrastructure: AWS, GCP</span></li><li><span> CI/CD：Circle CI / Codebuild</span></li><li><span> DB: Amazon Aurora (MySQL compatible edition), Elasticsearch, DynamoDB</span></li><li><span> Configuration management: Ansible</span></li><li><span> Deploy / Build: CodePipeline, CodeBuild, CircleCI, GitHub Actions</span></li><li><span> IaC: Packer, Terraform</span></li><li><span> Monitoring: Datadog, bugsnag</span></li><li><span> Others: swagger, Docker, ZenHub, Figma, Slack/Jira</span></li></ul>',
    '<p><strong>Must have: </strong></p><ul><li><span>Empathy for Andpad''s mission and values</span></li><li><span><strong>5+ years of experience in developing and operating Web services using Golang, AWS, gRPC</strong></span></li><li><span><strong>Experience as a technical lead throughout the full project development lifecycle</strong></span></li><li><span>Experience in developing and operating Web applications using frameworks</span></li><li><span>Experience in schema design such as RDBMS and KVS and design of optimal query</span></li><li><span>Have knowledge of Web application security</span></li><li><span>Experience Test code implementation ( Unit Test )</span></li><li><span><strong>Good at English communication</strong></span></li></ul><p><strong>Nice to have: </strong></p><ul><li><span>Experience of discovering problems from logs and solving problems</span></li><li><span>Experience in developing systems using container technologies such as Docker and Kubernetes</span></li><li><span>Experience in designing architecture based on application requirements and selecting middleware</span></li><li><span>Experience of publishing and contributing OSS</span></li><li><span>External technical output experience (writing, technical blog, stage, etc.)</span></li></ul>',
    '<ul><li>Competitive salary package, including full insurance coverage</li><li>Annual performance review: twice/ year</li><li>13th-month salary Bonus</li><li>Hybrid working</li><li>18 days of leave: 12 days of annual leave, 6 days of New Year''s Leave</li><li>Premium Healthcare Insurance Package starting from day one</li><li>Annual Health Check-up</li><li>Excellent career development opportunities, with exposure to and experience in the latest technologies</li><li>Patents and Inventions bonus</li><li>Company trip, Year-End Party, Gifts for Tet/ Holidays</li><li>MacBook Pro/ Laptop is provided</li></ul>',
    '3rd Floor, Dong Nhan Building, 90 Nguyen Dinh Chieu, Da Kao Ward, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-11 09:00:00', '2025-05-11 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #21
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Senior Frontend Developer (ReactJS/VueJS)',
    'senior-frontend-developer-reactjs-vuejs-andpad-21',
    '<ul><li>No.1 Construction Tech company in Japan</li><li>Hybrid working environment</li><li>Attractive salary and  Macbook Pro</li></ul>',
    '<p>ANDPAD Vietnam is seeking a Senior Frontend Developer (ReactJS/VueJS) who can join to our team and develop the application in cooperation with the product manager, working in the form of Squad, a small team can quickly and consistently engage in everything from design to development, testing and operation.</p><p>Also, there are a lot of opportunities to work with new languages ​​and FWs other than the main language in an international environment.</p><p> </p><p><strong>■ Job Scope</strong></p><ul><li>Design and implementation function of the product in charge using ReactJS/VueJS</li><li>Implement UI and improve UX close to the customer''s business to realize DX promotion</li><li>Requirements definition and specification formulation in collaboration with product managers and designers</li><li>Review the design, programming of other engineers</li></ul><p><strong>■ Development environment</strong></p><ul><li>Programing: TypeScript/HTML/CSS</li><li>Framework: VueJS, NuxtJS, ReactJS, NextJS</li><li>Infrastructure: AWS/GCP</li><li>CI/CD: Circle CI/Bitrise/GitHub Actions</li><li>Knowledge Tool: Confluence/esa</li><li>VCS: GitHub</li><li>Others: Slack/Jira/Trello</li></ul>',
    '<p><strong>Must have: </strong></p><ul><li>Empathy for Andpad''s mission and values</li><li>7+ years of experience in a software development role: Frontend Developer</li><li>Experience with TypeScript language</li><li>Experience with frontend frameworks (VueJS, ReactJS etc.)</li><li>Knowledge and ability to explain principles of web operation and differences of browsers</li><li>Experience as a technical lead throughout the full project development lifecycle</li><li>Basic knowledge of Web application security</li><li>Skills of development and operation using various frameworks</li><li>Experience Test code implementation (Unit Test)</li><li>Good at English communication</li></ul><p><strong>Nice to have: </strong></p><ul><li>Knowledge of backend development (Golang/ Ruby on rails/ Others)</li><li>Experienced developing Front-end microservices.</li><li>Experience of discovering problems from logs and solving problems </li><li>Experience of deciding and progressing the technical policy of the team as a tech lead.</li><li>Experience of using and understanding of  Library and Framework.</li><li>Experience of publishing and contributing to OSS. </li></ul>',
    '<ul><li><span>Competitive salary package, including full insurance coverage. </span></li><li><span>Annual performance review: twice/ year.</span></li><li><span>13th-month salary Bonus.</span></li><li><span>Remote/ Hybrid working model.</span></li><li><span>18 days of leave: 12 days of annual leave, 6 days of New Year Leave.</span></li><li><span>Premium Healthcare Insurance Package starting from day one.</span></li><li><span>Annual Health Check-up.</span></li><li><span>Excellent career development opportunities, with exposure to and experience in the latest technologies.</span></li><li><span>Patents and Inventions bonus.</span></li><li><span>Company trip, Year-End Party, Gifts for Tet/ Holidays.</span></li><li><span>MacBook Pro/laptop is provided.</span></li></ul>',
    '3rd Floor, Dong Nhan Building, 90 Nguyen Dinh Chieu, Da Kao Ward, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-18 09:00:00', '2025-05-18 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #22
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Senior iOS Native Engineer (Swift)',
    'senior-ios-native-engineer-swift-andpad-22',
    '<ul><li>No.1 Construction Tech company in Japan</li><li>Hybrid working with focus on Engineering team work</li><li>Highly competitive salary and benefits</li></ul>',
    '<p><span>ANDPAD Việt Nam is seeking a Senior iOS Native Engineer (Swift) </span><span>who can join our team and develop the application in cooperation with the product manager. Working in the form of Squad, a small team can quickly and consistently engage in everything from design to development, testing and operation.</span></p><p><span>Also, there are a lot of opportunities to work with new languages ​​and frameworks other than the main language in an international environment.</span></p><p> </p><p><span>■<strong> </strong></span><span><strong>Job Scope</strong></span></p><ul><li><span>Design and implementation function of the product in charge of using </span><span>Swift</span><span> and other mobile technologies such as Flutter</span></li><li><span>Refactoring of existing applications, enhancements performance, Cost reduction of regression testing by implementing appropriate test code</span></li><li><span>High-performance design and development of camera module and drawing functions</span></li><li><span>API design and implementation linked with backend</span></li><li><span>Requirements definition and specification formulation in collaboration with product managers, designers and QA</span></li><li><span>Keep up to date on the latest industry trends and best practices in mobile technologies and apply them to the product</span></li><li><span>Enjoy working on challenging solutions and systems</span></li></ul><p><span><i>Note: The assigned product will be determined based on the candidate''s skills and preferences, as well as the internal structure of the company.</i></span></p><p> </p><p><span>■<strong> </strong></span><span><strong>Development environment</strong></span></p><ul><li><span>Programming: Swift, </span><span>Dart</span></li><li><span>Framework: RxSwift, </span><span>Flutter</span></li><li><span>Infrastructure: AWS / GCP</span></li><li><span>CI/CD: CircleCI / Bitrise / Fastlane</span><span> / GitHub Actions</span></li><li><span>Knowledge Tool: Confluence / esa</span></li><li><span>VCS: GitHub</span></li><li><span>Others: Slack / Jira</span></li></ul>',
    '<p><span>Must-haves:</span></p><ul><li><span>Empathy for Andpad''s mission and values</span></li><li><span><strong>6+ years</strong></span><span><strong> of experience</strong></span><span><strong> in developing native applications for iOS Native using Swift</strong></span></li><li><span><strong>Experience of architecture design, frameworks and technologies selection based on application requirements</strong></span></li><li><span>Experience as a technical lead throughout the full project development lifecycle</span></li><li><span>Creating high quality code for security, performance, scalability, etc.</span></li><li><span>Excellent algorithms, analytical, problem-solving skills and improving application performance</span></li><li><span>Continuously discover, evaluate, and implement new technologies to maximize development efficiency</span></li><li><span>Experience in dealing with scalability in line with service growth</span></li><li><span>Experience in </span><span>UIKit and SwiftUI</span></li><li><span>Experience in Asynchronous programming, Reactive programing skills</span></li><li><span>Familiar with Restful / GraphQL API</span></li><li><span>Excellent developing functions with writing test code</span></li><li><span>Have knowledge of Mobile application security</span></li><li><span>Conduct regular code reviews and provide feedback to team members adhering to best practices</span></li><li><span>Participate in the planning process for software development projects, and ensure meeting quality and deadlines on delivery.</span></li><li><span>Skills in communicating smoothly with team members and other stakeholders</span></li><li><span>Good at English communication</span></li></ul><p><span>Nice to haves:</span></p><ul><li><span>Experience to build project from scratch</span></li><li><span>Ensure high-quality work by monitoring individual and team performance and addressing any issues through appropriate guidance and mentoring</span></li><li><span>Responsible for supervising, managing and motivating the mobile development team</span></li><li><span>Ability to write project documentation</span></li><li><span>E</span><span>xperience</span><span> in</span><span> developing </span><span>hybrid</span><span> applications for Flutter using Dart</span></li><li><span>Experience in </span><span>Android Native (Kotlin)</span></li><li><span>Experience in automation test</span></li><li><span>Project management skills</span></li></ul>',
    '<ul><li>Competitive salary package, including full insurance coverage. </li><li>Annual performance review: twice/ year.</li><li>13th-month salary Bonus.</li><li>Hybrid working model.</li><li>18 days of leave: 12 days of annual leave, 6 days of New Year Leave.</li><li>Premium Healthcare Insurance Package starting from day one.</li><li>Annual Health Check-up.</li><li>Excellent career development opportunities, with exposure to and experience in the latest technologies.</li><li>Patents and Inventions bonus.</li><li>Company trip, Year-End Party, Gifts for Tet/ Holidays.</li><li>MacBook Pro/laptop is provided.</li></ul>',
    '3rd Floor, Dong Nhan Building, 90 Nguyen Dinh Chieu, Da Kao Ward, Quận 1, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-05-06 09:00:00', '2025-06-06 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #23
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Mid/Senior Frontend Engineer (ReactJS)',
    'mid-senior-frontend-engineer-reactjs-employment-hero-23',
    '<ul><li>Remote First & 100% Salary During Probation</li><li>20 Annual Leave Days & 1 Leisure Day</li><li>Top-tier Remuneration & Premium Healthcare Package</li></ul>',
    '<p><strong>Our mission and where you fit in</strong></p><p>At Employment Hero, we’re an ambitious bunch of people on a mission to make employment easier and more valuable for everyone.</p><p> </p><p>Our world-class software is the easiest way for businesses to manage HR, payroll, employee engagement, and benefits.</p><p> </p><p>Since our inception in 2014, we''ve had some pretty impressive growth (100% YoY), reached unicorn status in 2022, and now serve 300,000 businesses globally, with 2 million+ users on the platform. We have no plans to slow down. </p><p> </p><p>There’s never been a more exciting time to join one of the fastest-growing SaaS unicorns, so let’s see if we could be a match!</p><p> </p><p><strong>In your role, you''ll be focused on…</strong></p><p>As a growing team, we need innovative and passionate Intermediate Frontend Software Development Engineers to join our squads who will be a vital part of our engineering team, responsible for developing product features and collaborating with colleagues in design, product, and engineering. You will take ownership of writing automated tests for your production codes and work with cutting-edge technologies, focusing on tech stacks such as Ruby on Rails and ReactJS. In addition, you will have the opportunity to work on a diverse range of products and features.</p><p><strong>As a Frontend Software Engineer, you’ll be:</strong></p><ul><li>Develop new product lines with new critical features, using our techstack which includes ReactJS, React Native within an AWS Cloud environment using EC2 and Kubernetes.</li><li>Provide your input into our technical strategy with your squad, including participate in sprint planning</li><li>Develop code for the frontend as an end-to-end Frontend Software Development Engineer</li><li>Ensure both your colleagues and yourself are producing high quality code through testing and code reviews</li><li>Share your knowledge with your squad and mentor junior developers</li><li>Learn and collaborate with highly respected Senior Software Developers, in a high performing and supportive squad</li><li>Show your passion for working in highly complex and technically challenging development</li><li>Enhance legacy features for our award-winning HR tech platform</li></ul>',
    '<p><strong>You’re the hero we’re looking for if:</strong></p><ul><li><strong>Experience in Frontend software development experience, CI/CD, web application performance tuning, ReactJS/Redux applications. In deep in fundamental understanding of Javascript/Typescript, ReactJS/Redux, Building tool such as Webpack, Rollup, ViteJS.</strong></li><li><strong>Strong English communication skills (both verbal & written)</strong></li><li><strong>Over 4 years of experience in Frontend Software Development</strong></li><li>Demonstrated experience implementing, maintaining and deploying full-stack web technologies</li><li>Strong understanding of standard Software Engineering processes, Testing, and Agile methodology</li><li>A team player that always puts colleagues ahead of yourself and has a highly adaptable and versatile approach to work</li><li>You are passionate about learning and sharing your knowledge, and not afraid to challenge your peers, but also welcome being challenged</li><li>We have a number of positions open which would suit many skills and experiences, including being open to candidates who are willing to learn our technical stack</li><li>Experience in translating design wireframes into functioning UI components</li></ul><p><strong>It’ll be great, but not essential, if you also have experience with:</strong></p><ul><li>Bachelor''s degree in Computer Science of Software Engineering or an equivalent</li><li>Experience in developing highly modular mobile applications and mobile application performance tuning</li><li>Experience writing unit tests</li><li>Experience in functional programming</li></ul><p>Experience is important, but for us, the biggest measure of success is people who can live and breathe our values. Show us what you can bring to the table, and we’ll empower you to let your talents shine.</p>',
    '<p><strong>The EH Way</strong></p><p>The EH Way is how we describe our culture at Employment Hero and how we all operate. It is our DNA. You can read all about it on our careers page: </p><p>In short, you’ll love working with us if:</p><ul><li>Revolutionising employment gets your heart racing.</li><li>You thrive on the flexibility (and responsibility) of a remote-first business.</li><li>Our values align, and shape how you show up every day.</li><li>You love the dynamic pace of a startup, are driven by innovation, and enjoy working with other smart people.</li></ul><p>But don’t just take it from us, hear from your local heroes: Thao Ta, Head of People and Culture & Hung Pham, Group Engineer Manager:</p><p>Plus, you’ll get to enjoy a number of great perks, including: </p><ul><li>A generous budget for your home office.</li><li>Cutting-edge tools and technology.</li><li>20 days Annual Leave, plus VN Public Holidays.</li><li>$500 USD for your professional development plan.</li><li>$500 USD for English learning courses.</li><li>Premium Healthcare Insurance Program for you and your loved ones, plus full gross salary paid social insurance.</li><li>Sports club funded by Employment Hero.</li><li>Monthly get-together event in the office for team bonding and VND 80,000 budget for lunch for day-in-office.</li><li>Reward and recognition programs - because great work should be recognised and rewarded.</li><li>Employee Share Option Program: be an owner of Employment Hero.</li><li>Annual Global Gathering - so far we’ve been to Thailand, Vietnam, Bali and are excited to meet in Dubai in 2025</li></ul>',
    'Cach Mang Thang 8, Quận 10, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'REMOTE', 'MID', '2025-05-06 09:00:00', '2025-06-06 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #24
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Mid/Senior Backend Engineer (NodeJS/Java/Go preferred)',
    'mid-senior-backend-engineer-nodejs-java-go-preferred-employment-hero-24',
    '<ul><li>Remote First & 100% Salary During Probation</li><li>20 Annual Leave Days & 1 Leisure Day</li><li>Top-tier Remuneration & Premium Healthcare Package</li></ul>',
    '<p><strong>Our mission and where you fit in</strong></p><p>At Employment Hero, we’re an ambitious bunch of people on a mission to make employment easier and more valuable for everyone.</p><p>Our world-class software is the easiest way for businesses to manage HR, payroll, employee engagement, and benefits.</p><p>Since our inception in 2014, we''ve had some pretty impressive growth (100% YoY), reached unicorn status in 2022, and now serve 300,000 businesses globally, with 2 million+ users on the platform. We have no plans to slow down. </p><p>There’s never been a more exciting time to join one of the fastest-growing SaaS unicorns, so let’s see if we could be a match!</p><p> </p><p><strong>In your role, you''ll be focused on…</strong></p><p>As a growing team, we need innovative and passionate Middle Backend Software Development Engineers to join our squads who will be a vital part of our engineering team, responsible for developing product features and collaborating with colleagues in design, product, and engineering. You will take ownership of writing automated tests for your production codes and work with cutting-edge technologies, focusing on tech stacks such as Ruby on Rails and ReactJS. In addition, you will have the opportunity to work on a diverse range of products and features.</p><p> </p><p><strong>Responsibilities:</strong></p><ul><li>Develop and maintain both frontend and backend components of web applications <strong>using Ruby (80%) and ReactJS (20%)</strong></li><li>Collaborate with product team to gather requirements and translate them into technical solutions</li><li>Contribute to the technical strategy and delivery of your squad and take part in scrum ceremonies.</li><li>Ensure high-quality code by conducting testing and code reviews, both for yourself and your colleagues.</li><li>Share your knowledge and mentor Junior Developers within your squad.</li><li>Collaborate with highly respected Software Development Engineers in a high performing and supportive environment.</li><li>Demonstrate your passion for working on highly complex and technically challenging development projects.</li><li>Enhance legacy features for our award-winning HR tech platform.</li></ul>',
    '<p><strong>You’re the hero we’re looking for if:</strong></p><ul><li>Over 3 years of experience in Software Development, with a focus on Server-side and RESTful API Development and integration.</li><li><strong>Proficiency in OOP languages such as NodeJS, Java, Go, PHP, etc., is highly desirable, with the expectation that you are willing to learn Ruby upon joining our team.</strong></li><li>Demonstrated experience implementing, maintaining and deploying full-stack web technologies</li><li>Strong skills in Object-Oriented Programming (OOP).</li><li>Strong understanding of standard Software Engineering processes, Testing, and Agile methodology</li><li>A team player that always puts colleagues ahead of yourself and has a highly adaptable and versatile approach to work</li><li>You are passionate about learning and sharing your knowledge, and not afraid to challenge your peers, but also welcome being challenged</li><li>You have experience in mentoring team mates, or even leading an Engineering squad</li><li><strong>English language abilities, both written and verbal </strong>- you’ll be working with people across the world, including from Australia</li></ul><p> </p><p><strong>It’ll be great, but not essential, if you also have experience with:</strong></p><ul><li>Bachelor''s degree in Computer Science of Software Engineering or an equivalent</li><li>Experience in developing highly modular mobile applications and mobile application performance tuning</li><li>Experience in translating design wireframes into functioning UI components</li><li>Experience in functional programming</li><li>Familiarity with AWS tooling and environments, including EC2, Kubernetes, etc.</li></ul><p> </p><p>Experience is important, but for us the biggest measure of success is people who can live and breathe our EH Way of working. Show us what you can bring to the table, and we’ll empower you to let your talents shine.</p>',
    '<p><span><strong>Why you love working here</strong></span><strong>?</strong></p><ul><li>We are remote-first, where you can work from the comfort of your home, and enjoy flexible working time</li><li>Work your local hours! 40-hour work week, Monday to Friday</li><li>100% Salary During Probation</li><li>A generous budget to spend on setting up your home office</li><li>We set you up for success with the latest and greatest hardware, tools and tech</li><li>Budgets towards continuing your learning</li><li>Annual Global Gathering in 1 week - Road to Dubai in 2025!!!</li><li>Refer friends to open jobs and receive a cash bonus for every successful referral you make</li><li>Participate in our Employee Share Options Program - you’ll be a part owner of Employment Hero<i>.</i></li></ul>',
    'Cach Mang Thang 8, Quận 10, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'REMOTE', 'MID', '2025-05-06 09:00:00', '2025-06-06 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #25
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Women Leadership in Tech',
    'women-leadership-in-tech-bosch-25',
    '<ul><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ul>',
    '<p><strong>*** Ignite your Impact – Women Leadership in Tech ***</strong></p><p>We’re empowering and promoting women in leadership roles in Engineering and Software Development. This is an incredible opportunity to connect with like-minded professionals, share insights, and unlock new growth opportunities.</p><p> </p><p><i><strong>Key Responsibilities</strong></i></p><ul><li><strong>Leadership & Team Development:</strong> Lead, mentor, and develop a high-performing team of engineers, fostering a collaborative, inclusive, and supportive environment.</li><li><strong>Business Development</strong>: Leverage technical expertise to identify and drive new business opportunities, defining strategies for regional business growth.</li><li><strong>Project Management:</strong> Oversee the planning, execution, and delivery of software projects, ensuring timely and high-quality completion.</li><li><strong>Technical Expertise:</strong> Provide hands-on guidance in product life cycle. Stay updated with emerging technologies to drive innovation.</li><li><strong>Stakeholder Collaboration:</strong> Work closely with cross-functional teams to align business goals.</li><li><strong>Process Improvement:</strong> Enhance engineering processes to boost efficiency, quality, and team performance. Encourage best practices in software development and testing.</li></ul>',
    '<p><i><strong>Who is this for?</strong></i></p><ul><li>Ambitious Women in Tech and aspiring to move into leadership positions.</li><li>Established female leaders looking to expand their influence and mentor others.</li><li>Allies and organizations committed to fostering diversity and inclusion in leadership.</li></ul><p><i><strong>Why join?</strong></i></p><ul><li>Access to exclusive leadership development resources</li><li>Opportunities for mentorship and coaching from seasoned women leaders.</li><li>Networking with a community of dynamic, forward-thinking professionals</li><li>Insights on overcoming challenges unique to female leaders in today’s workplace</li><li>Invitations to webinars, workshops, and networking events focused on leadership growth.</li></ul><p><span><i><strong>Join us now</strong></i></span> to break barriers, share knowledge, and elevate the voices of women in leadership. Together, we’ll build a diverse, inclusive, and transformative future.</p>',
    '<p><strong>WHY</strong> <strong>BOSCH</strong>?</p><p>Because we don''t just follow trends, we <strong>create </strong>them.<br>Because together we turn ideas into reality, working every day to make the world of tomorrow a better place. Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.</p><p><i><strong>Benefits and Career Opportunities</strong></i></p><ul><li>Working in one of the <strong>Best Places to Work i</strong>n Vietnam and Top 30 of the <strong>Most Innovative Companies</strong> all over the world</li><li>Join a dynamic and fast-growing global company (<strong>English-speaking</strong> environment)</li><li><strong>13th-month </strong>salary bonus + attractive <strong>performance bonus </strong>(you''ll love it!) + annual performance appraisal</li><li><strong>100% monthly salary</strong> and <strong>mandatory social insurance</strong> in 2-month probation</li><li><strong>Onsite opportunities</strong>: short-term and long-term assignments</li><li><strong>15++ days of annual leave </strong>+ 1 day of birthday leave</li><li>Premium health insurance for employee and <strong>02 family members</strong></li><li><strong>Flexible working time</strong></li><li>Lunch and parking allowance</li><li>Various training on hot-trend technologies/ foreign language (English/Chinese/Japanese) and soft skills</li><li><strong>Fitness & sports activities</strong>: football, badminton, yoga, Aerobic</li><li>Free in-house entertainment facilities and snack</li><li>Join in various team building, company trips, year-end party, tech talks, and lots of charity events.</li></ul>',
    'Capital Place, 29 Lieu Giai Street, Quận Ba Đình, Hà Nội',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'Hà Nội'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'SENIOR', '2025-04-30 09:00:00', '2025-05-31 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #26
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Android Automotive Expert',
    'android-automotive-expert-bosch-26',
    '<ul><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ul>',
    '<p><strong>Position Overview:</strong><br>We are seeking an expert in Android Automotive development to lead the design, implementation, and optimization of In-Vehicle Infotainment (IVI) systems and Cockpit Domain Controllers. The ideal candidate will possess deep expertise in Android Automotive, AOSP (Android Open-Source Project), and integrating multimedia, navigation, connectivity, and vehicle control features in a real-time automotive environment. This role requires experience in driving the technical architecture, coding, and hands-on system integration to deliver innovative automotive solutions. A key part of your responsibilities will include leading the development of high-performance, low-latency Android Automotive systems and collaborating across multi-OS platforms, including QNX Hypervisor integration.<br><strong>Key Responsibilities:</strong><br><strong>Android Automotive Systems Development</strong><br> </p><ul><li>Lead the development of Android Automotive solutions, customizing AOSP for In-Vehicle Infotainment (IVI) platforms, and integrating multimedia, navigation, and vehicle control features.</li><li>Optimize HMI (Human-Machine Interface) for seamless transitions between infotainment and vehicle systems, enhancing the driver experience.</li></ul><p><strong>Hands-On Development & Debugging</strong></p><p><strong>Platform Architecture & Integration</strong></p><p><strong>Client Engagement & Business Development</strong><br><strong>Leadership & Cross-Functional Collaboration</strong></p>',
    '<ul><li><strong>Extensive Experience in Android Automotive Development:</strong> At least 8 years of hands-on experience in developing Android Automotive solutions, including deep customization of AOSP for IVI systems and infotainment platforms.<br> </li><li><strong>Real-Time Systems Expertise: </strong>Proven experience in optimizing Android for real-time applications, including the integration of safety-critical systems and the implementation of multi-layered solutions with low-latency performance.<br> </li><li><strong>Hands-On Embedded Systems Development:</strong> Expertise in writing low-level code, device drivers, and firmware for automotive platforms running Android, with experience in BSP development and hardware integration.</li><li><strong>Client-Facing & Proposal Skills:</strong> Experience in client-facing roles, delivering technical presentations, and managing proposals and project bids related to Android Automotive solutions.</li></ul>',
    '<p>Why <strong>BOSCH</strong>?</p><ul><li>Because we don''t just follow trends, we <strong>create </strong>them.</li><li>Because we do not just follow trends, we <strong>create </strong>them. Together we turn ideas into reality, working every day to make the world of tomorrow a better place. </li></ul><p>Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.</p><p><strong>Benefits and Career Opportunities</strong></p><ul><li>Working in one of the <strong>Best Places to Work</strong> in Vietnam and Top 30 of the <strong>Most Innovative Companies </strong>all over the world</li><li><strong>English-speaking</strong> environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our <strong>diverse training</strong> programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible </strong>working time and working model</li><li><strong>13th-month</strong> salary bonus + attractive <strong>performance bonus</strong> (you''ll love it!) + annual performance appraisal</li><li><strong>100% offered salary</strong> and mandatory <strong>social insurances</strong> in 2-month probation</li><li><strong>15++ days</strong> of annual leave + 1-day of birthday leave</li><li>Premium health insurance for employee and <strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ul>',
    '364 Cong Hoa street, ward 13, Quận Tân Bình, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'MANAGER', '2025-05-06 09:00:00', '2025-06-06 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #27
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Senior OutSystems Solution Expert',
    'senior-outsystems-solution-expert-bosch-27',
    '<ul><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ul>',
    '<p>To be a part of the Project Team to deliver a custom-built software application on a low-code platform by following Agile Frameworks and DevOps practices</p><p><strong>Your Key Responsibilities</strong></p><ul><li>Working as an Agile Team Member, managing and executing a variety of tasks</li><li>Lead development projects using the OutSystems platform, ensure projects meet business requirements and goals, fulfill end-user requirements, and identify and resolve systems issues.</li><li>Optimize the OutSystems applications for maximum speed and scalability.</li><li>Attain a detailed understanding of the customer’s business needs and apply the OutSystems technology to meet those needs.</li><li>Interacting with Business Users as necessary to clarify requirements</li><li>Taking responsibility for the quality of the software developed and delivered</li><li>User Story Effort Estimation</li><li>Software Development including meeting the Definition of Done</li><li>Software Testing including fulfilling the Acceptance Criteria</li><li>Creating Software Documents as require</li></ul><p><strong>Skills And Attributes For Success</strong></p><ul><li>Contributing to setting-up, and execution of DevOps practices</li><li>Software Deployment</li><li>Software Maintenance and Support</li></ul>',
    '<p><strong>To qualify for the role, you must have</strong></p><ul><li>At least 3-5 years of experience working with OutSystems platform</li><li>At least a degree or diploma in a relevant technical field</li><li>Familiarity with the whole web stack, including protocols and web server optimization techniques.</li><li>Experienced in Agile Software Development</li><li>Experienced in Web Applications, HTML, CSS and JavaScript</li><li>Experienced in Software Integration using APIs and Web Services</li><li>Experienced in Database Systems</li><li>Advanced knowledge of the OutSystems platform, with the ability to code and debug issues.</li></ul><p><strong>Ideally, you’ll also have</strong></p><ul><li>OutSystems experience is a distinct advantage</li><li>Scrum Ceremonies and Artefacts experience is a distinct advantage</li><li>.NET Framework experience is an advantage</li><li>Additional Business Education is a distinct advantage</li><li>Low-code platform certification is a distinct advantage</li><li>Scrum Certification is an advantage</li></ul><p><strong>What We Look For</strong></p><p>Highly motivated individuals with excellent problem-solving skills and the ability to prioritize shifting workloads in a rapidly changing industry. An effective communicator, you’ll be a confident team player that collaborates with people from various teams while looking to develop your career in a dynamic organization.</p>',
    '<p>Why <strong>BOSCH</strong>?</p><p>Because we do not just follow trends, we <strong>create </strong>them. Together we turn ideas into reality, working every day to make the world of tomorrow a better place. Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.<br> </p><p><strong>Benefits and Career Opportunities</strong><br> </p><ul><li>Working in one of the <strong>Best Places to Work</strong> in Vietnam and Top 30 of the <strong>Most Innovative Companies </strong>all over the world</li><li><strong>English-speaking</strong> environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our <strong>diverse training</strong> programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible </strong>working time</li><li><strong>13th-month</strong> salary bonus + attractive <strong>performance bonus</strong> (you''ll love it!) + annual performance appraisal</li><li><strong>100% offered salary</strong> and mandatory <strong>social insurances</strong> in 2-month probation</li><li><strong>15++ days</strong> of annual leave + 1-day of birthday leave</li><li>Premium health insurance for employee and <strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ul>',
    '364 Cong Hoa street, ward 13, Quận Tân Bình, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'SENIOR', '2025-05-06 09:00:00', '2025-06-06 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #28
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Senior IT Consultant Lead/Manager',
    'senior-it-consultant-lead-manager-bosch-28',
    '<ul><li>Committed 13th-mth bonus + attractive yearly bonus</li><li>Premium Healthcare for you and 2 family members</li><li>16++ days of paid leave per year</li></ul>',
    '<p><strong>Key Responsibilities: </strong></p><ul><li><strong>Leadership and Mentorship:</strong> Provide inspirational leadership and guidance to a team of BAs and IT consultants, fostering a collaborative and high-performing environment that encourages professional development and knowledge sharing. </li><li><strong>Workflows Platform Modernization:</strong> Lead the analysis of workflows platform, meticulously documenting requirements and identifying gaps to facilitate a seamless migration to new technologies. Your expertise will be essential in understanding the complexities of existing systems and ensuring a successful transition to modern platforms. </li><li><strong>Requirements Elicitation and Documentation</strong>: Engage with diverse stakeholders across the organization to elicit, analyze, and document business requirements, translating them into clear, concise, and actionable user stories that drive development efforts. </li><li><strong>Cross-Functional Collaboration:</strong> Act as a liaison between business units and the development team, fostering clear communication, managing expectations, and ensuring successful project delivery. Your ability to navigate both technical and business domains will be key to establishing strong partnerships and achieving project goals. </li><li><strong>Data-Driven Decision Making:</strong> Design and implement business insights dashboards, providing stakeholders with actionable intelligence and key performance indicators to facilitate informed decision-making and strategic planning. </li><li><strong>Strategic Planning and Advisory:</strong> Contribute to the development of business plans, reports, and strategic initiatives, leveraging data-driven insights to improve product efficiency, streamline migration timelines, and drive overall business value. Ensure that the Business Plan and its resulting outcomes are not only actionable but also resonate with all stakeholders, fostering a sense of ownership and engagement. </li><li><strong>Agile Adoption and Advocacy:</strong> Champion Agile methodologies, actively participating in sprint planning, backlog grooming, and retrospectives, and cultivating an Agile mindset within the team. Your leadership will be instrumental in ensuring the team delivers value iteratively and incrementally. </li></ul><p><strong>Work Packages & Additional Responsibilities: </strong></p><ul><li><strong>Stakeholder Management:</strong> Cultivate and maintain strong relationships with stakeholders across the organization, adeptly managing expectations, addressing concerns, and resolving conflicts. Inspire the adoption of new technologies at every step of the product delivery process, effectively communicating their benefits and addressing any potential challenges. </li><li><strong>Process Optimization:</strong> Continuously identify opportunities to optimize existing processes and workflows, driving efficiency gains and contributing to a culture of continuous improvement. </li><li><strong>Change Management:</strong> Play an active role in organizational change management efforts, supporting users through the adoption of new systems and processes. Your ability to communicate change effectively, build trust, and address concerns will be essential in facilitating smooth transitions and minimizing disruption. </li><li><strong>User Acceptance Testing:</strong> Plan and execute comprehensive user acceptance testing (UAT), ensuring that solutions meet business requirements, user needs, and adhere to quality standards. </li><li><strong>Training & Documentation:</strong> Develop clear and concise training materials and user documentation to facilitate seamless adoption of new technologies and processes. </li><li><strong>Cross-Functional Collaboration:</strong> Thrive in a multinational team with diverse backgrounds and aspirations, fostering intensive collaboration and establishing effective cross-functional development practices. </li><li><strong>Functional Work Item Tracking:</strong> Ensure functional work items are clearly defined, tracked, and managed throughout the project lifecycle. </li><li><strong>Non-Functional Work Item Creation:</strong> Identify, define, and prioritize non-functional requirements, ensuring they are incorporated into the project plan. </li><li><strong>Engagement Activities:</strong> Support or plan activities to engage stakeholders and foster a collaborative environment. </li></ul>',
    '<ul><li><strong>Proven Experience:</strong> 5+ years of Business Analysis experience, with a demonstrable track record of success in internal IT solutions and workflows platform migration projects. </li><li><strong>Education Background:</strong> Graduate in Bachelor’s degree or preferably Master’s degree in Information Technology Business Management or Computer Science. </li><li><strong>Leadership & Mentorship:</strong> Proven ability to lead, inspire, and mentor a team of BAs and consultants, fostering a high-performing and collaborative environment. </li><li><strong>Analytical Acumen:</strong> Exceptional analytical and problem-solving skills, with the ability to dissect complex systems and processes and identify opportunities for improvement. </li><li><strong>Exceptional Communication:</strong> Superior written and verbal communication skills, adept at tailoring your message to both technical and non-technical audiences and building strong relationships with stakeholders at all levels. </li><li><strong>Data-Driven Decision Making:</strong> Proficiency in data analysis and visualization tools, with a demonstrated ability to derive actionable insights from complex datasets. </li><li><strong>Agile Expertise:</strong> Experience working in an Agile environment, with a solid understanding of Agile principles, practices, and ceremonies. </li><li><strong>Technical Aptitude:</strong> Familiarity with the software development lifecycle, relevant technologies, and architectural principles. </li><li><strong>Certifications:</strong> Relevant certifications such as CBAP, PMI-PBA, or Agile certifications are highly desirable. </li><li><strong>Cross-Cultural Sensitivity:</strong> Ability to work effectively in a diverse and multinational environment, demonstrating respect and appreciation for different perspectives and cultural nuances.</li></ul>',
    '<p>Why <strong>BOSCH</strong>?</p><ul><li>Because we don''t just follow trends, we <strong>create </strong>them.</li><li>Because we do not just follow trends, we <strong>create </strong>them. Together we turn ideas into reality, working every day to make the world of tomorrow a better place. </li></ul><p>Do you have high standards when it comes to your job? So do we. At Bosch, you will discover more than just work.</p><p><strong>Benefits and Career Opportunities</strong></p><ul><li>Working in one of the <strong>Best Places to Work</strong> in Vietnam and Top 30 of the <strong>Most Innovative Companies </strong>all over the world</li><li><strong>English-speaking</strong> environment, with opportunity to be part of innovation team and work in global projects</li><li><strong>Onsite opportunities</strong></li><li>Engage in our <strong>diverse training</strong> programs which surely help strengthen both your personal and professionalism</li><li><strong>Flexible </strong>working time and working model</li><li><strong>13th-month</strong> salary bonus + attractive <strong>performance bonus</strong> (you''ll love it!) + annual performance appraisal</li><li><strong>100% offered salary</strong> and mandatory <strong>social insurances</strong> in 2-month probation</li><li><strong>15++ days</strong> of annual leave + 1-day of birthday leave</li><li>Premium health insurance for employee and <strong>02 family members</strong></li><li>Lunch and parking allowance</li><li>Good benefits of company activities such as: football, badminton, yoga, Aerobic, team building…</li></ul>',
    '364 Cong Hoa street, ward 13, Quận Tân Bình, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'FLEXIBLE', 'SENIOR', '2025-04-10 09:00:00', '2025-05-11 09:00:00', 'ACTIVE'
  );
-- =========================================
-- JOB #29
-- =========================================
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Chuyên viên Hỗ trợ ứng dụng',
    'chuyen-vien-ho-tro-ung-dung-ssi-securities-corporation-29',
    '<ul><li>Attractive salary and bonus package</li><li>Premium AON healthcare insurance</li><li>Fully sponsored training to build your career</li></ul>',
    '<p><strong>1. Vận hành ứng dụng Công nghệ Thông tin:</strong></p><p> </p><p>- Thực hiện vận hành, giám sát hàng ngày và bảo trì các ứng dụng để đảm bảo vận hành hệ thống ổn định và hiệu quả</p><p> </p><p>- Xây dựng tài liệu hướng dẫn vận hành hệ thống</p><p> </p><p><strong>2. Hỗ trợ ứng dụng Công nghệ Thông tin:</strong></p><p> </p><p>- Hỗ trợ các bộ phận nghiệp vụ trong việc xử lý lỗi/sự cố hàng ngày ở cấp độ 2[HTX1] [DNQ2]</p><p> </p><p>- Phân tích các lỗi xảy ra ở môi trường Product, theo dõi các giải pháp xử lý lỗi từ đội dự án hoặc đối tác để phản hồi kịp lúc cũng như đảm bảo xử lý đúng tiến độ</p><p> </p><p>- Thu thập, đánh giá nhu cầu sử dụng của người dùng và theo dõi, cung cấp thông tin năng lực của các ứng dụng tương ứng để lập kế hoạch bổ sung và quy hoạch năng lực xử lý cho các ứng dụng</p><p> </p><p>- Xác định mức độ sẵn sàng của ứng dụng/ giải pháp khi tiếp nhận vận hành để đảm bảo hệ thống đủ điều kiện hoạt động</p><p> </p><p><strong>3. Giám sát ứng dụng Công nghệ Thông tin:</strong></p><p> </p><p>- Kiểm tra, giám sát vận hành và phát hiện các cảnh báo phát sinh của các hệ thống</p><p> </p><p>- Thực hiện xử lý khi có cảnh báo phát sinh của các hệ thống</p><p> </p><p>- Rà soát, cập nhật tiêu chí cho các loại cảnh báo để đảm bảo hệ thống giảm sát hoạt động đúng với hiện trạng thực tế</p><p> </p><p><strong>4. Hỗ trợ các công việc khác trong bộ phận theo phân công</strong></p><p> </p><p>- Thực hiện các công việc hỗ trợ dự án:</p><p> </p><p>+ Tiếp nhận vận hành hệ thống từ giai đoạn kiểm thử (UAT)</p><p> </p><p>+ Hỗ trợ dự án xây dựng bộ tài liệu bàn giao vận hành hoàn chỉnh</p><p> </p><p>+ Tham gia nghiên cứu, vận hành các dự án liên quan đến công nghệ mới (Cloud, DevOps…)</p><p> </p><p>- Thực hiện các công việc hỗ trợ khác trong bộ phận:</p><p> </p><p>+ Hỗ trợ lập kế hoạch năm cho nhóm</p><p> </p><p>+ Hỗ trợ xây dựng, cập nhật danh mục dịch vụ hỗ trợ tiêu chuẩn, tài liệu cho người sử dụng</p><p> </p><p>+ Đề xuất và hỗ trợ xây dựng các công cụ, quy trình, giải pháp nâng cao hiệu quả hoạt động</p><p> </p><p>+ Hỗ trợ hướng dẫn, kèm cặp vị trí chuyên viên xử lý các vấn đề phức tạp</p><p> </p><p>+ Thực hiện một số công việc khác theo phân công của Trưởng bộ phận.</p>',
    '<p>- Tốt nghiệp đại học chính quy chuyên ngành Công nghệ thông tin;</p><p>- Có 1 năm kinh nghiệm trở lên ở vị trí tương đương;</p><p>- Có kinh nghiệm về Splunk, Solarwinds, K8S;</p><p>- Có khả năng suy luận, tư duy logic về phân tích log, phân tích hệ thống, kỹ năng giải quyết vấn đề;</p><p>- Có khả năng giao tiếp hiệu quả, làm cầu nối giữa đối tác triển khai, nhà cung cấp giải pháp, các nhóm nội bộ và các bộ phận người dùng khác;</p><p>- Có khả năng làm việc độc lập, định hướng công việc chuyên môn cho nhóm;</p><p>- Đọc hiểu tốt các tài liệu kỹ thuật bằng tiếng Anh, giao tiếp cơ bản;</p><p>- Ưu tiên ứng viên:</p><p>Có kinh nghiệm về lập trình;</p><p>Có kinh nghiệm về Application Performance Monitoring hoặc Digital Experience Monitoring[HTX4] [DNQ5];</p><p>Có kinh nghiệm về Cloud Monitoring;</p><p>Có kiến thức về ITIL, ITSM[HTX6] [DNQ7];</p><p>Có kinh nghiệm làm việc trong lĩnh vực tài chính, chứng khoán.</p>',
    '<p><strong>Chứng khoán SSI nhận 3 giải thưởng nơi làm việc tốt nhất: </strong></p><ul><li>Highly competitive remuneration package: Attractive monthly salary, 13th month salary, KPIs cash bonus, Public holiday cash bonus, Birthday gift, Lunar new year gift,...</li><li>Premium AON healthcare insurane and full labor insurance</li><li>12 days Annual leave + 2 days sick leave with full paid</li><li>Luxury team-building trip and varied engagement activities</li><li>Joining the leisure clubs: Football, E-Sport, Running, Gym, Yoga....</li><li>Fully sponsored training to build your career</li><li>Professional, open minded and supportive working enviroment</li></ul>',
    'Dali Tower - 24c Phan Dang Luu, Quận Bình Thạnh, TP Hồ Chí Minh',
    (
      SELECT id
      FROM cities
      WHERE city_name = 'TP Hồ Chí Minh'
      LIMIT 1
    ), NULL, NULL, NULL, 'ONSITE', 'JUNIOR', '2025-04-24 09:00:00', '2025-05-25 09:00:00', 'ACTIVE'
  );
-- Normalize job dates relative to seed load time (legacy fixed dates are in the past)
-- Seeker visibility: ACTIVE + posted_at <= NOW() + (expires_at IS NULL OR expires_at > NOW())
UPDATE jobs j
SET posted_at = DATE_SUB(NOW(), INTERVAL ((j.id % 25) + 1) DAY),
  expires_at = DATE_ADD(NOW(), INTERVAL ((j.id % 45) + 30) DAY),
  published_at = DATE_SUB(NOW(), INTERVAL ((j.id % 25) + 1) DAY),
  closed_at = NULL
WHERE j.status = 'ACTIVE';
UPDATE jobs j
SET posted_at = DATE_ADD(NOW(), INTERVAL ((j.id % 7) + 3) DAY),
  expires_at = DATE_ADD(NOW(), INTERVAL ((j.id % 30) + 60) DAY),
  published_at = NULL,
  closed_at = NULL
WHERE j.status = 'DRAFT';
UPDATE jobs j
SET posted_at = DATE_SUB(NOW(), INTERVAL ((j.id % 20) + 10) DAY),
  expires_at = DATE_SUB(NOW(), INTERVAL ((j.id % 5) + 1) DAY),
  published_at = DATE_SUB(NOW(), INTERVAL ((j.id % 20) + 10) DAY),
  closed_at = DATE_SUB(NOW(), INTERVAL ((j.id % 7) + 1) DAY)
WHERE j.status = 'EXPIRED';
UPDATE jobs j
SET posted_at = DATE_SUB(NOW(), INTERVAL ((j.id % 30) + 15) DAY),
  expires_at = DATE_ADD(NOW(), INTERVAL ((j.id % 20) + 10) DAY),
  published_at = DATE_SUB(NOW(), INTERVAL ((j.id % 30) + 15) DAY),
  closed_at = DATE_SUB(NOW(), INTERVAL ((j.id % 10) + 3) DAY)
WHERE j.status = 'CLOSED';
-- Assign job domains to seeded jobs
UPDATE jobs
SET job_domain_id = (
    SELECT id
    FROM job_domains
    WHERE domain_name = 'IT Services and IT Consulting'
    LIMIT 1
  );
UPDATE jobs j
  JOIN companies c ON j.company_id = c.id
SET j.job_domain_id = (
    SELECT id
    FROM job_domains
    WHERE domain_name = 'Banking'
    LIMIT 1
  )
WHERE c.industry_id = (
    SELECT id
    FROM industries
    WHERE industry_name = 'Banking'
    LIMIT 1
  );
UPDATE jobs j
  JOIN companies c ON j.company_id = c.id
SET j.job_domain_id = (
    SELECT id
    FROM job_domains
    WHERE domain_name = 'Financial Services'
    LIMIT 1
  )
WHERE c.industry_id = (
    SELECT id
    FROM industries
    WHERE industry_name = 'Financial Services'
    LIMIT 1
  );
UPDATE jobs j
  JOIN companies c ON j.company_id = c.id
SET j.job_domain_id = (
    SELECT id
    FROM job_domains
    WHERE domain_name = 'Software Products and Web Services'
    LIMIT 1
  )
WHERE c.industry_id = (
    SELECT id
    FROM industries
    WHERE industry_name = 'Software Products and Web Services'
    LIMIT 1
  );
-- Test Manager
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('MANAGER', 'Tester', 'Automation Test')
WHERE j.slug = 'test-manager-auto-test-performance-test-mb-bank-1';
-- Java Fullstack
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Java', 'MySQL', 'Spring')
WHERE j.slug = 'middle-senior-java-fullstack-developer-spring-mb-bank-2';
-- Python Backend
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Python', 'Django', 'PostgreSQL')
WHERE j.slug = 'middle-senior-python-backend-developer-django-mb-bank-3';
-- Fullstack SE - Data Engineer
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Java', 'PostgreSQL', 'Angular')
WHERE j.slug = 'fullstack-software-engineer-data-engineer-mb-bank-4';
-- Business Customer Data Analyst
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Data Analyst', 'SQL', 'Oracle', 'Angular')
WHERE j.slug = 'business-customer-data-analyst-mb-bank-5';
-- Viedoc - Senior Fullstack .NET
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('.NET', 'SQL', 'Azure')
WHERE j.slug = 'viedoc-senior-fullstack-net-developer-c-sql-azure-scandinavian-software-park-6';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('.NET', 'SQL', 'JavaScript')
WHERE j.slug = 'trapets-fullstack-net-developer-net-sql-js-scandinavian-software-park-7';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Automation Test', 'Python', 'Java')
WHERE j.slug = 'milient-qa-automation-engineer-python-js-java-scandinavian-software-park-8';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Software Architect', 'DevOps', 'Cloud')
WHERE j.slug = 'da-nang-ho-chi-minh-technical-architect-one-tech-stop-9';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Product Manager', 'English', 'UI-UX')
WHERE j.slug = 'ho-chi-minh-da-nang-product-owner-one-tech-stop-10';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('UI-UX', 'Agile', 'Designer')
WHERE j.slug = 'ho-chi-minh-da-nang-uiux-designer-one-tech-stop-11';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('NodeJS', 'TypeScript', 'ReactJS')
WHERE j.slug = 'ho-chi-minh-fullstack-developer-reactjsnodejs-one-tech-stop-12';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Tester', 'Java', 'Automation Test')
WHERE j.slug = 'tester-manual-automation-mcredit-13';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Java', 'Spring', 'J2EE')
WHERE j.slug = 'senior-java-developer-j2ee-spring-mcredit-14';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Java', 'AWS', 'Spring Boot')
WHERE j.slug = 'java-api-engineer-hcm-microservice-aws-tymex-15';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Python', 'AI', 'Java')
WHERE j.slug = 'product-prompt-engineer-java-python-tymex-16';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('iOS', 'Android', 'Team Leader')
WHERE j.slug = 'mobile-technical-lead-ios-android-kotlin-swift-tymex-17';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('QA QC', 'Tester')
WHERE j.slug = 'senior-qa-engineer-manual-mobile-api-testing-tymex-18';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Ruby', 'Ruby on Rails', 'AWS')
WHERE j.slug = 'senior-principal-ruby-on-rails-dev-aws-backend-andpad-19';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Golang', 'MySQL', 'AWS')
WHERE j.slug = 'senior-golang-developer-backend-aws-mysql-andpad-20';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('ReactJS', 'TypeScript', 'VueJS')
WHERE j.slug = 'senior-frontend-developer-reactjs-vuejs-andpad-21';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('iOS', 'Swift')
WHERE j.slug = 'senior-ios-native-engineer-swift-andpad-22';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('ReactJS', 'JavaScript', 'TypeScript')
WHERE j.slug = 'mid-senior-frontend-engineer-reactjs-employment-hero-23';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('NodeJS', 'JavaScript', 'Java')
WHERE j.slug = 'mid-senior-backend-engineer-nodejs-java-go-preferred-employment-hero-24';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN (
    'Project Manager',
    'Software Architect',
    'Embedded'
  )
WHERE j.slug = 'women-leadership-in-tech-bosch-25';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Embedded Android', 'Embedded')
WHERE j.slug = 'android-automotive-expert-bosch-26';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('OutSystems', 'English', 'Agile')
WHERE j.slug = 'senior-outsystems-solution-expert-bosch-27';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Business Analyst', 'Product Manager', 'Presale')
WHERE j.slug = 'senior-it-consultant-lead-manager-bosch-28';
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id,
  s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('IT Support', 'Cloud', 'System Admin')
WHERE j.slug = 'chuyen-vien-ho-tro-ung-dung-ssi-securities-corporation-29';
INSERT INTO applications (
    id,
    seeker_id,
    job_id,
    full_name,
    phone_number,
    cover_letter,
    status,
    employer_message,
    created_at,
    updated_at
  )
VALUES -- 1
  (
    '00000000-0000-0000-0000-000000000001',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    2,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van A,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 2 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 2
  (
    '00000000-0000-0000-0000-000000000002',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    2,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 3
  (
    '00000000-0000-0000-0000-000000000003',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    2,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 4
  (
    '00000000-0000-0000-0000-000000000004',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    2,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 5
  (
    '00000000-0000-0000-0000-000000000005',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    2,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 6
  (
    '00000000-0000-0000-0000-000000000006',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    3,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 3 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Pham Van K,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 3 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 7
  (
    '00000000-0000-0000-0000-000000000007',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    3,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 3 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Thi L đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 8
  (
    '00000000-0000-0000-0000-000000000008',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    3,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 3 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Vu Thi G đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 9
  (
    '00000000-0000-0000-0000-000000000009',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    3,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 3 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 10
  (
    '00000000-0000-0000-0000-000000000010',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    4,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Tran Van H đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 11
  (
    '00000000-0000-0000-0000-000000000011',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    4,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Pham Thi D,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 4 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 12
  (
    '00000000-0000-0000-0000-000000000012',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    4,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Vu Thi G,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 4 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 13
  (
    '00000000-0000-0000-0000-000000000013',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    4,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 14
  (
    '00000000-0000-0000-0000-000000000014',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    4,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Van A đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 15
  (
    '00000000-0000-0000-0000-000000000015',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    4,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 16
  (
    '00000000-0000-0000-0000-000000000016',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    4,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Le Thi I,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 4 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 17
  (
    '00000000-0000-0000-0000-000000000017',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    4,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 18
  (
    '00000000-0000-0000-0000-000000000018',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    4,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 4 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 19
  (
    '00000000-0000-0000-0000-000000000019',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    5,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 5 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 20
  (
    '00000000-0000-0000-0000-000000000020',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    5,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 5 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 21
  (
    '00000000-0000-0000-0000-000000000021',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    5,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 5 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 22
  (
    '00000000-0000-0000-0000-000000000022',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    5,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 5 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Van E đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 23
  (
    '00000000-0000-0000-0000-000000000023',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    6,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Thi F,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 6 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 24
  (
    '00000000-0000-0000-0000-000000000024',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    6,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Le Van C,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 6 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 25
  (
    '00000000-0000-0000-0000-000000000025',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    6,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Vu Thi G đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 26
  (
    '00000000-0000-0000-0000-000000000026',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    6,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Van E đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 27
  (
    '00000000-0000-0000-0000-000000000027',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    6,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Thi L,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 6 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 28
  (
    '00000000-0000-0000-0000-000000000028',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    6,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 6 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Van M đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 29
  (
    '00000000-0000-0000-0000-000000000029',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    8,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 8 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 30
  (
    '00000000-0000-0000-0000-000000000030',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    8,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 8 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Thi N,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 8 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 31
  (
    '00000000-0000-0000-0000-000000000031',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    8,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 8 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 32
  (
    '00000000-0000-0000-0000-000000000032',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    8,
    'Tran Thi B',
    '0912345678',
    'Tôi rất quan tâm đến công việc số 8 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 33
  (
    '00000000-0000-0000-0000-000000000033',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    9,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 9 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Thi L,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 9 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 34
  (
    '00000000-0000-0000-0000-000000000034',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    9,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 9 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 35
  (
    '00000000-0000-0000-0000-000000000035',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    9,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 9 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Pham Thi D đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 36
  (
    '00000000-0000-0000-0000-000000000036',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    9,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 9 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 37
  (
    '00000000-0000-0000-0000-000000000037',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    10,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 10 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Pham Thi D,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 10 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 38
  (
    '00000000-0000-0000-0000-000000000038',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    10,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 10 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van M,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 10 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 39
  (
    '00000000-0000-0000-0000-000000000039',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    10,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 10 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 40
  (
    '00000000-0000-0000-0000-000000000040',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    10,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 10 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 41
  (
    '00000000-0000-0000-0000-000000000041',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    11,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 11 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 42
  (
    '00000000-0000-0000-0000-000000000042',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    11,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 11 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 43
  (
    '00000000-0000-0000-0000-000000000043',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    11,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 11 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Van E,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 11 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 44
  (
    '00000000-0000-0000-0000-000000000044',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    11,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 11 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Vu Thi G,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 11 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 45
  (
    '00000000-0000-0000-0000-000000000045',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    12,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 12 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 46
  (
    '00000000-0000-0000-0000-000000000046',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    12,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 12 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Van M đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 47
  (
    '00000000-0000-0000-0000-000000000047',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    13,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Van H,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 13 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 48
  (
    '00000000-0000-0000-0000-000000000048',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    13,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Le Van C,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 13 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 49
  (
    '00000000-0000-0000-0000-000000000049',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    13,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 50
  (
    '00000000-0000-0000-0000-000000000050',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    13,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 51
  (
    '00000000-0000-0000-0000-000000000051',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    13,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Van E,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 13 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 52
  (
    '00000000-0000-0000-0000-000000000052',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    13,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 53
  (
    '00000000-0000-0000-0000-000000000053',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    13,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 13 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Thi I đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 54
  (
    '00000000-0000-0000-0000-000000000054',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    14,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 55
  (
    '00000000-0000-0000-0000-000000000055',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    14,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Van H,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 14 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 56
  (
    '00000000-0000-0000-0000-000000000056',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    14,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Thi N,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 14 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 57
  (
    '00000000-0000-0000-0000-000000000057',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    14,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 58
  (
    '00000000-0000-0000-0000-000000000058',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    14,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Thi F,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 14 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 59
  (
    '00000000-0000-0000-0000-000000000059',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    14,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 14 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Van C đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 60
  (
    '00000000-0000-0000-0000-000000000060',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    16,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 16 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Van C đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 61
  (
    '00000000-0000-0000-0000-000000000061',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    16,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 16 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 62
  (
    '00000000-0000-0000-0000-000000000062',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    17,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 17 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Pham Van K đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 63
  (
    '00000000-0000-0000-0000-000000000063',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    18,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 18 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Thi I đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 64
  (
    '00000000-0000-0000-0000-000000000064',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    18,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 18 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 65
  (
    '00000000-0000-0000-0000-000000000065',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    18,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 18 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 66
  (
    '00000000-0000-0000-0000-000000000066',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    18,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 18 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Thi L,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 18 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 67
  (
    '00000000-0000-0000-0000-000000000067',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    19,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Thi L,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 19 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 68
  (
    '00000000-0000-0000-0000-000000000068',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    19,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Thi N,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 19 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 69
  (
    '00000000-0000-0000-0000-000000000069',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    19,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Thi F,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 19 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 70
  (
    '00000000-0000-0000-0000-000000000070',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    19,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 71
  (
    '00000000-0000-0000-0000-000000000071',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    19,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Van C đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 72
  (
    '00000000-0000-0000-0000-000000000072',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    19,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van A,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 19 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  );
INSERT INTO applications (
    id,
    seeker_id,
    job_id,
    full_name,
    phone_number,
    cover_letter,
    status,
    employer_message,
    created_at,
    updated_at
  )
VALUES -- 73
  (
    '00000000-0000-0000-0000-000000000073',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    19,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Pham Thi D,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 19 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 74
  (
    '00000000-0000-0000-0000-000000000074',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    19,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Vu Thi G đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 75
  (
    '00000000-0000-0000-0000-000000000075',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    19,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 76
  (
    '00000000-0000-0000-0000-000000000076',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    19,
    'Tran Thi B',
    '0912345678',
    'Tôi rất quan tâm đến công việc số 19 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 77
  (
    '00000000-0000-0000-0000-000000000077',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130003',
    20,
    'Pham Thi D',
    '0981234567',
    'Tôi rất quan tâm đến công việc số 20 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 78
  (
    '00000000-0000-0000-0000-000000000078',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    20,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 20 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 79
  (
    '00000000-0000-0000-0000-000000000079',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    20,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 20 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 80
  (
    '00000000-0000-0000-0000-000000000080',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    21,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 81
  (
    '00000000-0000-0000-0000-000000000081',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    21,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Van H,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 21 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 82
  (
    '00000000-0000-0000-0000-000000000082',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    21,
    'Tran Thi B',
    '0912345678',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Thi B,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 21 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 83
  (
    '00000000-0000-0000-0000-000000000083',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    21,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Pham Van K đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 84
  (
    '00000000-0000-0000-0000-000000000084',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    21,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Van E,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 21 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 85
  (
    '00000000-0000-0000-0000-000000000085',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    21,
    'Võ Thị G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 86
  (
    '00000000-0000-0000-0000-000000000086',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    21,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 21 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Van M đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 87
  (
    '00000000-0000-0000-0000-000000000087',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    22,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 22 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Thi F,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 22 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 88
  (
    '00000000-0000-0000-0000-000000000088',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    22,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 22 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Van E đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 89
  (
    '00000000-0000-0000-0000-000000000089',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    22,
    'Tran Thi B',
    '0912345678',
    'Tôi rất quan tâm đến công việc số 22 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Tran Thi B đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 90
  (
    '00000000-0000-0000-0000-000000000090',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    22,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 22 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Tran Van H đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 91
  (
    '00000000-0000-0000-0000-000000000091',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    22,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 22 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Thi L,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 22 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 92
  (
    '00000000-0000-0000-0000-000000000092',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    23,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Thi L đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 93
  (
    '00000000-0000-0000-0000-000000000093',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    23,
    'Tran Thi B',
    '0912345678',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Thi B,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 23 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 94
  (
    '00000000-0000-0000-0000-000000000094',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    23,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Vu Thi G đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 95
  (
    '00000000-0000-0000-0000-000000000095',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    23,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Pham Van K đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 96
  (
    '00000000-0000-0000-0000-000000000096',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    23,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Van E đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 97
  (
    '00000000-0000-0000-0000-000000000097',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    23,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 23 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van M,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 23 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 98
  (
    '00000000-0000-0000-0000-000000000098',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    24,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 99
  (
    '00000000-0000-0000-0000-000000000099',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    24,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 100
  (
    '00000000-0000-0000-0000-000000000100',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    24,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Thi I đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-02 03:39:17',
    '2025-05-02 03:39:17'
  ),
  -- 101
  (
    '00000000-0000-0000-0000-000000000101',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    24,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Thi L đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 102
  (
    '00000000-0000-0000-0000-000000000102',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130006',
    24,
    'Nguyen Van A',
    '0987654321',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van A,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 24 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 103
  (
    '00000000-0000-0000-0000-000000000103',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    24,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-04 03:39:17',
    '2025-05-04 03:39:17'
  ),
  -- 104
  (
    '00000000-0000-0000-0000-000000000104',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    24,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van M,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 24 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-03 03:39:17',
    '2025-05-03 03:39:17'
  ),
  -- 105
  (
    '00000000-0000-0000-0000-000000000105',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    24,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 24 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Vu Thi G đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 106
  (
    '00000000-0000-0000-0000-000000000106',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    25,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 107
  (
    '00000000-0000-0000-0000-000000000107',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130007',
    25,
    'Vu Thi G',
    '0945678901',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-07 03:39:17',
    '2025-05-07 03:39:17'
  ),
  -- 108
  (
    '00000000-0000-0000-0000-000000000108',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    25,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 109
  (
    '00000000-0000-0000-0000-000000000109',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    25,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Van H,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 25 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-06 03:39:17',
    '2025-05-06 03:39:17'
  ),
  -- 110
  (
    '00000000-0000-0000-0000-000000000110',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    25,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Le Thi I,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 25 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 111
  (
    '00000000-0000-0000-0000-000000000111',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    25,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Nguyen Thi F đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-28 03:39:17',
    '2025-04-28 03:39:17'
  ),
  -- 112
  (
    '00000000-0000-0000-0000-000000000112',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    25,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-29 03:39:17',
    '2025-04-29 03:39:17'
  ),
  -- 113
  (
    '00000000-0000-0000-0000-000000000113',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    25,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 25 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 114
  (
    '00000000-0000-0000-0000-000000000114',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130008',
    26,
    'Tran Van H',
    '0976543210',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Tran Van H,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 26 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 115
  (
    '00000000-0000-0000-0000-000000000115',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130011',
    26,
    'Hoang Thi L',
    '0932109876',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Hoang Thi L đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-04-30 03:39:17',
    '2025-04-30 03:39:17'
  ),
  -- 116
  (
    '00000000-0000-0000-0000-000000000116',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130012',
    26,
    'Nguyen Van M',
    '0910987654',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Van M,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 26 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 117
  (
    '00000000-0000-0000-0000-000000000117',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130013',
    26,
    'Tran Thi N',
    '0909876543',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 118
  (
    '00000000-0000-0000-0000-000000000118',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130002',
    26,
    'Le Van C',
    '0934567890',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'REJECTED',
    '<p>Cảm ơn Le Van C đã quan tâm đến vị trí này. Rất tiếc, lần này chúng tôi quyết định không tiếp tục với hồ sơ của bạn. Chúc bạn may mắn trong tương lai!</p>',
    '2025-05-05 03:39:17',
    '2025-05-05 03:39:17'
  ),
  -- 119
  (
    '00000000-0000-0000-0000-000000000119',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130005',
    26,
    'Nguyen Thi F',
    '0923456789',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Nguyen Thi F,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 26 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 120
  (
    '00000000-0000-0000-0000-000000000120',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130009',
    26,
    'Le Thi I',
    '0965432109',
    'Tôi rất quan tâm đến công việc số 26 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Le Thi I,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 26 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-04-27 03:39:17',
    '2025-04-27 03:39:17'
  ),
  -- 121
  (
    '00000000-0000-0000-0000-000000000121',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130010',
    27,
    'Pham Van K',
    '0954321098',
    'Tôi rất quan tâm đến công việc số 27 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Pham Van K,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 27 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 122
  (
    '00000000-0000-0000-0000-000000000122',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130004',
    28,
    'Hoang Van E',
    '0908765432',
    'Tôi rất quan tâm đến công việc số 28 và tin rằng kỹ năng của tôi phù hợp.',
    'ACCEPTED',
    '<p>Kính gửi anh/chị Hoang Van E,<br>Cảm ơn anh/chị đã ứng tuyển vào vị trí công việc số 28 tại công ty chúng tôi. Chúng tôi rất vui thông báo rằng đơn ứng tuyển của anh/chị đã được <strong>chấp nhận</strong>.<br>Vui lòng tham dự buổi phỏng vấn vào:</p><ul><li><p><strong>Thời gian</strong>: 10:00 AM, ngày 05/05/2025</p></li><li><p><strong>Địa điểm</strong>: Văn phòng công ty, Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</p></li><li><p><strong>Yêu cầu</strong>: Vui lòng mang theo CV bản cứng và các tài liệu liên quan.<br>Trân trọng,<br>Bộ phận Tuyển dụng</p></li></ul><p></p>',
    '2025-05-01 03:39:17',
    '2025-05-01 03:39:17'
  ),
  -- 125
  (
    '00000000-0000-0000-0000-000000000125',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    2,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-04 11:28:53',
    '2025-06-04 11:28:53'
  ),
  -- 126
  (
    '00000000-0000-0000-0000-000000000126',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    3,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-04 11:30:24',
    '2025-06-04 11:30:24'
  ),
  -- 127
  (
    '00000000-0000-0000-0000-000000000127',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    4,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-04 11:31:34',
    '2025-06-04 11:31:34'
  ),
  -- 128
  (
    '00000000-0000-0000-0000-000000000128',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    5,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-04 11:31:40',
    '2025-06-04 11:31:40'
  ),
  -- 129
  (
    '00000000-0000-0000-0000-000000000129',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    13,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-05 09:03:23',
    '2025-06-05 09:03:23'
  ),
  -- 130
  (
    '00000000-0000-0000-0000-000000000130',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    12,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-21 04:35:59',
    '2025-06-21 04:35:59'
  ),
  -- 131
  (
    '00000000-0000-0000-0000-000000000131',
    'a1b2c3d4-e5f6-11ee-s1ek-0111ac130001',
    16,
    'Vuong Dac Hai Veng',
    '0187127876',
    'Tôi rất quan tâm đến công việc số 2 và tin rằng kỹ năng của tôi phù hợp.',
    'PENDING',
    '',
    '2025-06-21 04:50:02',
    '2025-06-21 04:50:02'
  );
INSERT INTO application_cities (application_id, city_id)
VALUES -- 1: Hà Nội, Cần Thơ
  ('00000000-0000-0000-0000-000000000001', 24),
  ('00000000-0000-0000-0000-000000000001', 19),
  -- 2: Hà Nội, Cần Thơ
  ('00000000-0000-0000-0000-000000000002', 24),
  ('00000000-0000-0000-0000-000000000002', 19),
  -- 3: Cần Thơ, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000003', 19),
  ('00000000-0000-0000-0000-000000000003', 16),
  -- 4: Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000004', 16),
  ('00000000-0000-0000-0000-000000000004', 10),
  -- 5: Cần Thơ
  ('00000000-0000-0000-0000-000000000005', 19),
  -- 6: Hải Phòng
  ('00000000-0000-0000-0000-000000000006', 7),
  -- 7: Đà Nẵng, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000007', 10),
  ('00000000-0000-0000-0000-000000000007', 16),
  -- 8: Hải Phòng
  ('00000000-0000-0000-0000-000000000008', 7),
  -- 9: Đà Nẵng
  ('00000000-0000-0000-0000-000000000009', 10),
  -- 10: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000010', 16),
  -- 11: Đà Nẵng, Hải Phòng
  ('00000000-0000-0000-0000-000000000011', 10),
  ('00000000-0000-0000-0000-000000000011', 7),
  -- 12: Hà Nội
  ('00000000-0000-0000-0000-000000000012', 24),
  -- 13: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000013', 10),
  ('00000000-0000-0000-0000-000000000013', 19),
  -- 14: Hải Phòng, Đà Nẵng
  ('00000000-0000-0000-0000-000000000014', 7),
  ('00000000-0000-0000-0000-000000000014', 10),
  -- 15: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000015', 10),
  ('00000000-0000-0000-0000-000000000015', 19),
  -- 16: Hải Phòng, Hà Nội
  ('00000000-0000-0000-0000-000000000016', 7),
  ('00000000-0000-0000-0000-000000000016', 24),
  -- 17: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000017', 10),
  ('00000000-0000-0000-0000-000000000017', 19),
  -- 18: Cần Thơ
  ('00000000-0000-0000-0000-000000000018', 19),
  -- 19: Hải Phòng
  ('00000000-0000-0000-0000-000000000019', 7),
  -- 20: Cần Thơ, Hải Phòng
  ('00000000-0000-0000-0000-000000000020', 19),
  ('00000000-0000-0000-0000-000000000020', 7),
  -- 21: Hà Nội, Đà Nẵng
  ('00000000-0000-0000-0000-000000000021', 24),
  ('00000000-0000-0000-0000-000000000021', 10),
  -- 22: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000022', 16),
  -- 23: Hà Nội, Đà Nẵng
  ('00000000-0000-0000-0000-000000000023', 24),
  ('00000000-0000-0000-0000-000000000023', 10),
  -- 24: Cần Thơ
  ('00000000-0000-0000-0000-000000000024', 19),
  -- 25: Hà Nội
  ('00000000-0000-0000-0000-000000000025', 24),
  -- 26: Cần Thơ, Hải Phòng
  ('00000000-0000-0000-0000-000000000026', 19),
  ('00000000-0000-0000-0000-000000000026', 7),
  -- 27: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000027', 16),
  -- 28: Hà Nội, Đà Nẵng
  ('00000000-0000-0000-0000-000000000028', 24),
  ('00000000-0000-0000-0000-000000000028', 10),
  -- 29: Hồ Chí Minh, Hải Phòng
  ('00000000-0000-0000-0000-000000000029', 16),
  ('00000000-0000-0000-0000-000000000029', 7),
  -- 30: Đà Nẵng, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000030', 10),
  ('00000000-0000-0000-0000-000000000030', 16),
  -- 31: Hải Phòng
  ('00000000-0000-0000-0000-000000000031', 7),
  -- 32: Hồ Chí Minh, Hải Phòng
  ('00000000-0000-0000-0000-000000000032', 16),
  ('00000000-0000-0000-0000-000000000032', 7),
  -- 33: Đà Nẵng
  ('00000000-0000-0000-0000-000000000033', 10),
  -- 34: Cần Thơ
  ('00000000-0000-0000-0000-000000000034', 19),
  -- 35: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000035', 16),
  -- 36: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000036', 10),
  ('00000000-0000-0000-0000-000000000036', 19),
  -- 37: Hồ Chí Minh, Hải Phòng
  ('00000000-0000-0000-0000-000000000037', 16),
  ('00000000-0000-0000-0000-000000000037', 7),
  -- 38: Cần Thơ, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000038', 19),
  ('00000000-0000-0000-0000-000000000038', 16),
  -- 39: Đà Nẵng, Hà Nội
  ('00000000-0000-0000-0000-000000000039', 10),
  ('00000000-0000-0000-0000-000000000039', 24),
  -- 40: Đà Nẵng, Hà Nội
  ('00000000-0000-0000-0000-000000000040', 10),
  ('00000000-0000-0000-0000-000000000040', 24),
  -- 41: Cần Thơ, Hải Phòng
  ('00000000-0000-0000-0000-000000000041', 19),
  ('00000000-0000-0000-0000-000000000041', 7),
  -- 42: Hải Phòng
  ('00000000-0000-0000-0000-000000000042', 7),
  -- 43: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000043', 16),
  -- 44: Hà Nội, Đà Nẵng
  ('00000000-0000-0000-0000-000000000044', 24),
  ('00000000-0000-0000-0000-000000000044', 10),
  -- 45: Hải Phòng, Cần Thơ
  ('00000000-0000-0000-0000-000000000045', 7),
  ('00000000-0000-0000-0000-000000000045', 19),
  -- 46: Đà Nẵng, Hà Nội
  ('00000000-0000-0000-0000-000000000046', 10),
  ('00000000-0000-0000-0000-000000000046', 24),
  -- 47: Hà Nội
  ('00000000-0000-0000-0000-000000000047', 24),
  -- 48: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000048', 10),
  ('00000000-0000-0000-0000-000000000048', 19),
  -- 49: Hà Nội
  ('00000000-0000-0000-0000-000000000049', 24),
  -- 50: Đà Nẵng
  ('00000000-0000-0000-0000-000000000050', 10),
  -- 51: Hà Nội
  ('00000000-0000-0000-0000-000000000051', 24),
  -- 52: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000052', 16),
  -- 53: Cần Thơ
  ('00000000-0000-0000-0000-000000000053', 19),
  -- 54: Hà Nội, Cần Thơ
  ('00000000-0000-0000-0000-000000000054', 24),
  ('00000000-0000-0000-0000-000000000054', 19),
  -- 55: Cần Thơ
  ('00000000-0000-0000-0000-000000000055', 19),
  -- 56: Cần Thơ
  ('00000000-0000-0000-0000-000000000056', 19),
  -- 57: Hà Nội
  ('00000000-0000-0000-0000-000000000057', 24),
  -- 58: Hải Phòng
  ('00000000-0000-0000-0000-000000000058', 7),
  -- 59: Đà Nẵng
  ('00000000-0000-0000-0000-000000000059', 10),
  -- 60: Hà Nội
  ('00000000-0000-0000-0000-000000000060', 24),
  -- 61: Hà Nội
  ('00000000-0000-0000-0000-000000000061', 24),
  -- 62: Đà Nẵng
  ('00000000-0000-0000-0000-000000000062', 10),
  -- 63: Cần Thơ
  ('00000000-0000-0000-0000-000000000063', 19),
  -- 64: Hải Phòng, Hà Nội
  ('00000000-0000-0000-0000-000000000064', 7),
  ('00000000-0000-0000-0000-000000000064', 24),
  -- 65: Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000065', 16),
  ('00000000-0000-0000-0000-000000000065', 10),
  -- 66: Hải Phòng
  ('00000000-0000-0000-0000-000000000066', 7),
  -- 67: Đà Nẵng
  ('00000000-0000-0000-0000-000000000067', 10),
  -- 68: Đà Nẵng
  ('00000000-0000-0000-0000-000000000068', 10),
  -- 69: Đà Nẵng
  ('00000000-0000-0000-0000-000000000069', 10),
  -- 70: Hồ Chí Minh, Hà Nội
  ('00000000-0000-0000-0000-000000000070', 16),
  ('00000000-0000-0000-0000-000000000070', 24),
  -- 71: Hồ Chí Minh, Hải Phòng
  ('00000000-0000-0000-0000-000000000071', 16),
  ('00000000-0000-0000-0000-000000000071', 7),
  -- 72: Cần Thơ, Hải Phòng
  ('00000000-0000-0000-0000-000000000072', 19),
  ('00000000-0000-0000-0000-000000000072', 7);
INSERT INTO application_cities (application_id, city_id)
VALUES -- 73: Đà Nẵng
  ('00000000-0000-0000-0000-000000000073', 10),
  -- 74: Hà Nội, Hải Phòng
  ('00000000-0000-0000-0000-000000000074', 24),
  ('00000000-0000-0000-0000-000000000074', 7),
  -- 75: Đà Nẵng
  ('00000000-0000-0000-0000-000000000075', 10),
  -- 76: Đà Nẵng
  ('00000000-0000-0000-0000-000000000076', 10),
  -- 77: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000077', 16),
  -- 78: Hà Nội, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000078', 24),
  ('00000000-0000-0000-0000-000000000078', 16),
  -- 79: Cần Thơ
  ('00000000-0000-0000-0000-000000000079', 19),
  -- 80: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000080', 16),
  -- 81: Hải Phòng
  ('00000000-0000-0000-0000-000000000081', 7),
  -- 82: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000082', 10),
  ('00000000-0000-0000-0000-000000000082', 19),
  -- 83: Hải Phòng, Đà Nẵng
  ('00000000-0000-0000-0000-000000000083', 7),
  ('00000000-0000-0000-0000-000000000083', 10),
  -- 84: Đà Nẵng
  ('00000000-0000-0000-0000-000000000084', 10),
  -- 85: Đà Nẵng, Hải Phòng
  ('00000000-0000-0000-0000-000000000085', 10),
  ('00000000-0000-0000-0000-000000000085', 7),
  -- 86: Cần Thơ
  ('00000000-0000-0000-0000-000000000086', 19),
  -- 87: Hà Nội
  ('00000000-0000-0000-0000-000000000087', 24),
  -- 88: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000088', 10),
  ('00000000-0000-0000-0000-000000000088', 19),
  -- 89: Hà Nội
  ('00000000-0000-0000-0000-000000000089', 24),
  -- 90: Cần Thơ, Hải Phòng
  ('00000000-0000-0000-0000-000000000090', 19),
  ('00000000-0000-0000-0000-000000000090', 7),
  -- 91: Hải Phòng, Đà Nẵng
  ('00000000-0000-0000-0000-000000000091', 7),
  ('00000000-0000-0000-0000-000000000091', 10),
  -- 92: Cần Thơ, Hà Nội
  ('00000000-0000-0000-0000-000000000092', 19),
  ('00000000-0000-0000-0000-000000000092', 24),
  -- 93: Đà Nẵng
  ('00000000-0000-0000-0000-000000000093', 10),
  -- 94: Cần Thơ
  ('00000000-0000-0000-0000-000000000094', 19),
  -- 95: Cần Thơ
  ('00000000-0000-0000-0000-000000000095', 19),
  -- 96: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000096', 16),
  -- 97: Hà Nội
  ('00000000-0000-0000-0000-000000000097', 24),
  -- 98: Đà Nẵng, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000098', 10),
  ('00000000-0000-0000-0000-000000000098', 16),
  -- 99: Hải Phòng, Đà Nẵng
  ('00000000-0000-0000-0000-000000000099', 7),
  ('00000000-0000-0000-0000-000000000099', 10),
  -- 100: Cần Thơ, Hà Nội
  ('00000000-0000-0000-0000-000000000100', 19),
  ('00000000-0000-0000-0000-000000000100', 24),
  -- 101: Cần Thơ, Hà Nội
  ('00000000-0000-0000-0000-000000000101', 19),
  ('00000000-0000-0000-0000-000000000101', 24),
  -- 102: Hà Nội, Cần Thơ
  ('00000000-0000-0000-0000-000000000102', 24),
  ('00000000-0000-0000-0000-000000000102', 19),
  -- 103: Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000103', 16),
  -- 104: Hồ Chí Minh, Hải Phòng
  ('00000000-0000-0000-0000-000000000104', 16),
  ('00000000-0000-0000-0000-000000000104', 7),
  -- 105: Hải Phòng
  ('00000000-0000-0000-0000-000000000105', 7),
  -- 106: Hải Phòng
  ('00000000-0000-0000-0000-000000000106', 7),
  -- 107: Hà Nội
  ('00000000-0000-0000-0000-000000000107', 24),
  -- 108: Hà Nội, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000108', 24),
  ('00000000-0000-0000-0000-000000000108', 16),
  -- 109: Đà Nẵng, Cần Thơ
  ('00000000-0000-0000-0000-000000000109', 10),
  ('00000000-0000-0000-0000-000000000109', 19),
  -- 110: Hải Phòng
  ('00000000-0000-0000-0000-000000000110', 7),
  -- 111: Đà Nẵng
  ('00000000-0000-0000-0000-000000000111', 10),
  -- 112: Cần Thơ, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000112', 19),
  ('00000000-0000-0000-0000-000000000112', 16),
  -- 113: Cần Thơ
  ('00000000-0000-0000-0000-000000000113', 19),
  -- 114: Hà Nội
  ('00000000-0000-0000-0000-000000000114', 24),
  -- 115: Cần Thơ, Hà Nội
  ('00000000-0000-0000-0000-000000000115', 19),
  ('00000000-0000-0000-0000-000000000115', 24),
  -- 116: Hà Nội
  ('00000000-0000-0000-0000-000000000116', 24),
  -- 117: Cần Thơ, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000117', 19),
  ('00000000-0000-0000-0000-000000000117', 16),
  -- 118: Hải Phòng, Đà Nẵng
  ('00000000-0000-0000-0000-000000000118', 7),
  ('00000000-0000-0000-0000-000000000118', 10),
  -- 119: Hà Nội
  ('00000000-0000-0000-0000-000000000119', 24),
  -- 120: Đà Nẵng, Hà Nội
  ('00000000-0000-0000-0000-000000000120', 10),
  ('00000000-0000-0000-0000-000000000120', 24),
  -- 121: Đà Nẵng
  ('00000000-0000-0000-0000-000000000121', 10),
  -- 122: Hồ Chí Minh, Hà Nội
  ('00000000-0000-0000-0000-000000000122', 16),
  ('00000000-0000-0000-0000-000000000122', 24),
  -- 125: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000125', 24),
  ('00000000-0000-0000-0000-000000000125', 16),
  ('00000000-0000-0000-0000-000000000125', 10),
  -- 126: Hà Nội, Hồ Chí Minh
  ('00000000-0000-0000-0000-000000000126', 24),
  ('00000000-0000-0000-0000-000000000126', 16),
  -- 127: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000127', 24),
  ('00000000-0000-0000-0000-000000000127', 16),
  ('00000000-0000-0000-0000-000000000127', 10),
  -- 128: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000128', 24),
  ('00000000-0000-0000-0000-000000000128', 16),
  ('00000000-0000-0000-0000-000000000128', 10),
  -- 129: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000129', 24),
  ('00000000-0000-0000-0000-000000000129', 16),
  ('00000000-0000-0000-0000-000000000129', 10),
  -- 130: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000130', 24),
  ('00000000-0000-0000-0000-000000000130', 16),
  ('00000000-0000-0000-0000-000000000130', 10),
  -- 131: Hà Nội, Hồ Chí Minh, Đà Nẵng
  ('00000000-0000-0000-0000-000000000131', 24),
  ('00000000-0000-0000-0000-000000000131', 16),
  ('00000000-0000-0000-0000-000000000131', 10);
-- Seed popular tags từ toàn bộ skill và company hiện có
INSERT INTO popular_tags (category, skill_id)
SELECT 'SKILL_AND_EXPERTISE', id
FROM skills;

INSERT INTO popular_tags (category, company_id)
SELECT 'COMPANY', id
FROM companies;

-- ========== DIVERSE DOMAIN JOBS (non-IT focus) ==========
INSERT INTO jobs (
    company_id,
    title,
    slug,
    job_reason,
    job_description,
    job_requirements,
    why_join_us,
    location,
    city_id,
    job_domain_id,
    salary_min,
    salary_max,
    salary_currency,
    job_type,
    experience_level,
    posted_at,
    expires_at,
    status
  )
VALUES
  -- (30) Food and Beverage - Quản lý nhà hàng
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Quản lý Nhà hàng (Restaurant Manager)',
    'quan-ly-nha-hang-restaurant-manager-30',
    '', '', '', '',
    'Quận Hoàn Kiếm, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Food and Beverage' LIMIT 1),
    15000000, 25000000, 'VND', 'ONSITE', 'MID',
    '2025-06-01 08:00:00', '2025-07-01 08:00:00', 'ACTIVE'
  ),
  -- (31) Tourism and Hospitality - Hướng dẫn viên du lịch
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Hướng dẫn viên Du lịch Quốc tế (International Tour Guide)',
    'huong-dan-vien-du-lich-quoc-te-international-tour-guide-31',
    '', '', '', '',
    'Quận Hải Châu, Đà Nẵng',
    (SELECT id FROM cities WHERE city_name = 'Đà Nẵng' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Tourism and Hospitality Services' LIMIT 1),
    12000000, 20000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-02 08:00:00', '2025-07-02 08:00:00', 'ACTIVE'
  ),
  -- (32) Education and Training - Giảng viên tiếng Anh
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'Giảng viên Tiếng Anh (English Lecturer)',
    'giang-vien-tieng-anh-english-lecturer-32',
    '', '', '', '',
    'Quận Cầu Giấy, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Education and Training' LIMIT 1),
    18000000, 30000000, 'VND', 'ONSITE', 'MID',
    '2025-06-03 08:00:00', '2025-07-03 08:00:00', 'ACTIVE'
  ),
  -- (33) Healthcare - Dược sĩ
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Dược sĩ Lâm sàng (Clinical Pharmacist)',
    'duoc-si-lam-sang-clinical-pharmacist-33',
    '', '', '', '',
    'Quận Bình Thạnh, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Healthcare' LIMIT 1),
    20000000, 35000000, 'VND', 'ONSITE', 'MID',
    '2025-06-04 08:00:00', '2025-07-04 08:00:00', 'ACTIVE'
  ),
  -- (34) Real Estate - Chuyên viên kinh doanh BĐS
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Chuyên viên Kinh doanh Bất động sản (Real Estate Sales Executive)',
    'chuyen-vien-kinh-doanh-bat-dong-san-real-estate-sales-34',
    '', '', '', '',
    'Quận 2, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Real Estate, Property and Construction' LIMIT 1),
    10000000, 50000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-05 08:00:00', '2025-07-05 08:00:00', 'ACTIVE'
  ),
  -- (35) Manufacturing and Engineering - Kỹ sư cơ khí
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Kỹ sư Cơ khí Chế tạo (Mechanical Engineer)',
    'ky-su-co-khi-che-tao-mechanical-engineer-35',
    '', '', '', '',
    'KCN Thăng Long, Đông Anh, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Manufacturing and Engineering' LIMIT 1),
    15000000, 28000000, 'VND', 'ONSITE', 'MID',
    '2025-06-06 08:00:00', '2025-07-06 08:00:00', 'ACTIVE'
  ),
  -- (36) Agriculture - Kỹ sư nông nghiệp
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Kỹ sư Nông nghiệp Công nghệ cao (AgriTech Engineer)',
    'ky-su-nong-nghiep-cong-nghe-cao-agritech-engineer-36',
    '', '', '', '',
    'Lâm Đồng',
    (SELECT id FROM cities WHERE city_name = 'Đà Nẵng' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    12000000, 22000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-07 08:00:00', '2025-07-07 08:00:00', 'ACTIVE'
  ),
  -- (37) Media, Advertising and Entertainment - Content Creator
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Chuyên viên Sáng tạo Nội dung (Content Creator)',
    'chuyen-vien-sang-tao-noi-dung-content-creator-37',
    '', '', '', '',
    'Quận 1, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Media, Advertising and Entertainment' LIMIT 1),
    10000000, 18000000, 'VND', 'HYBRID', 'FRESHER',
    '2025-06-08 08:00:00', '2025-07-08 08:00:00', 'ACTIVE'
  ),
  -- (38) Retail and Wholesale - Trưởng ca bán hàng
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Trưởng ca Bán hàng (Retail Shift Leader)',
    'truong-ca-ban-hang-retail-shift-leader-38',
    '', '', '', '',
    'Quận Thanh Xuân, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Retail and Wholesale' LIMIT 1),
    9000000, 14000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-09 08:00:00', '2025-07-09 08:00:00', 'ACTIVE'
  ),
  -- (39) Sports and Fitness - Huấn luyện viên thể hình
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Huấn luyện viên Thể hình (Personal Trainer)',
    'huan-luyen-vien-the-hinh-personal-trainer-39',
    '', '', '', '',
    'Quận Ba Đình, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Sports and Fitness' LIMIT 1),
    8000000, 20000000, 'VND', 'ONSITE', 'FRESHER',
    '2025-06-10 08:00:00', '2025-07-10 08:00:00', 'ACTIVE'
  ),
  -- (40) Insurance - Chuyên viên bồi thường bảo hiểm
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Chuyên viên Bồi thường Bảo hiểm (Insurance Claims Specialist)',
    'chuyen-vien-boi-thuong-bao-hiem-insurance-claims-specialist-40',
    '', '', '', '',
    'Quận Đống Đa, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Insurance' LIMIT 1),
    14000000, 22000000, 'VND', 'ONSITE', 'MID',
    '2025-06-11 08:00:00', '2025-07-11 08:00:00', 'ACTIVE'
  ),
  -- (41) Apparel and Fashion - Thiết kế thời trang
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Nhà Thiết kế Thời trang (Fashion Designer)',
    'nha-thiet-ke-thoi-trang-fashion-designer-41',
    '', '', '', '',
    'Quận 3, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    15000000, 30000000, 'VND', 'HYBRID', 'MID',
    '2025-06-12 08:00:00', '2025-07-12 08:00:00', 'ACTIVE'
  ),
  -- (42) Transportation, Logistics - Quản lý kho
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Quản lý Kho vận (Warehouse & Logistics Manager)',
    'quan-ly-kho-van-warehouse-logistics-manager-42',
    '', '', '', '',
    'KCN Bắc Thăng Long, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Transportation, Logistics and Warehouse' LIMIT 1),
    18000000, 30000000, 'VND', 'ONSITE', 'SENIOR',
    '2025-06-13 08:00:00', '2025-07-13 08:00:00', 'ACTIVE'
  ),
  -- (43) E-commerce - Chuyên viên vận hành sàn
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Chuyên viên Vận hành Sàn TMĐT (E-commerce Operations Specialist)',
    'chuyen-vien-van-hanh-san-tmdt-ecommerce-operations-43',
    '', '', '', '',
    'Quận Cầu Giấy, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'E-commerce' LIMIT 1),
    12000000, 20000000, 'VND', 'HYBRID', 'JUNIOR',
    '2025-06-14 08:00:00', '2025-07-14 08:00:00', 'ACTIVE'
  ),
  -- (44) Pharmaceuticals - Trình dược viên
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Trình Dược viên (Medical Representative)',
    'trinh-duoc-vien-medical-representative-44',
    '', '', '', '',
    'Quận 7, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Pharmaceuticals' LIMIT 1),
    12000000, 25000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-15 08:00:00', '2025-07-15 08:00:00', 'ACTIVE'
  ),
  -- (45) Creative and Design - Graphic Designer
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Thiết kế Đồ hoạ (Graphic Designer)',
    'thiet-ke-do-hoa-graphic-designer-45',
    '', '', '', '',
    'Quận Hai Bà Trưng, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Creative and Design' LIMIT 1),
    10000000, 18000000, 'VND', 'HYBRID', 'FRESHER',
    '2025-06-16 08:00:00', '2025-07-16 08:00:00', 'ACTIVE'
  );

-- Normalize dates for new diverse-domain jobs
UPDATE jobs j
SET posted_at = DATE_SUB(NOW(), INTERVAL ((j.id % 15) + 1) DAY),
  expires_at = DATE_ADD(NOW(), INTERVAL ((j.id % 30) + 30) DAY),
  published_at = DATE_SUB(NOW(), INTERVAL ((j.id % 15) + 1) DAY),
  closed_at = NULL
WHERE j.job_domain_id IS NOT NULL
  AND j.status = 'ACTIVE'
  AND j.job_reason = '';

-- ========== NEW SKILLS FOR DIVERSE-DOMAIN JOBS ==========
INSERT INTO skills (skill_name)
VALUES ('Food Safety'),
  ('Customer Service'),
  ('Communication'),
  ('Sales'),
  ('Marketing'),
  ('Accounting'),
  ('Supply Chain'),
  ('Adobe Photoshop'),
  ('Adobe Illustrator'),
  ('Video Editing'),
  ('Social Media'),
  ('TOEIC'),
  ('Teaching'),
  ('Pharmacy'),
  ('AutoCAD'),
  ('SolidWorks'),
  ('Inventory Management'),
  ('Negotiation'),
  ('Nutrition'),
  ('SEO'),
  ('Excel'),
  ('Leadership'),
  ('Event Planning'),
  ('First Aid'),
  ('Fashion Design'),
  ('Pattern Making');

-- ========== JOB_SKILLS FOR DIVERSE-DOMAIN JOBS ==========
-- (30) Quản lý Nhà hàng
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Food Safety', 'Customer Service', 'Leadership', 'English', 'Communication')
WHERE j.slug = 'quan-ly-nha-hang-restaurant-manager-30';
-- (31) Hướng dẫn viên Du lịch Quốc tế
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('English', 'Communication', 'Event Planning', 'Customer Service', 'Japanese')
WHERE j.slug = 'huong-dan-vien-du-lich-quoc-te-international-tour-guide-31';
-- (32) Giảng viên Tiếng Anh
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('English', 'Teaching', 'TOEIC', 'Communication')
WHERE j.slug = 'giang-vien-tieng-anh-english-lecturer-32';
-- (33) Dược sĩ Lâm sàng
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Pharmacy', 'English', 'Communication', 'Excel')
WHERE j.slug = 'duoc-si-lam-sang-clinical-pharmacist-33';
-- (34) Chuyên viên Kinh doanh BĐS
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Sales', 'Negotiation', 'Communication', 'Customer Service', 'Excel')
WHERE j.slug = 'chuyen-vien-kinh-doanh-bat-dong-san-real-estate-sales-34';
-- (35) Kỹ sư Cơ khí Chế tạo
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('AutoCAD', 'SolidWorks', 'English')
WHERE j.slug = 'ky-su-co-khi-che-tao-mechanical-engineer-35';
-- (36) Kỹ sư Nông nghiệp Công nghệ cao
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Python', 'Excel', 'English')
WHERE j.slug = 'ky-su-nong-nghiep-cong-nghe-cao-agritech-engineer-36';
-- (37) Chuyên viên Sáng tạo Nội dung
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Adobe Photoshop', 'Video Editing', 'Social Media', 'SEO', 'Communication')
WHERE j.slug = 'chuyen-vien-sang-tao-noi-dung-content-creator-37';
-- (38) Trưởng ca Bán hàng
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Customer Service', 'Sales', 'Inventory Management', 'Leadership')
WHERE j.slug = 'truong-ca-ban-hang-retail-shift-leader-38';
-- (39) Huấn luyện viên Thể hình
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Nutrition', 'First Aid', 'Communication', 'Customer Service')
WHERE j.slug = 'huan-luyen-vien-the-hinh-personal-trainer-39';
-- (40) Chuyên viên Bồi thường Bảo hiểm
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Excel', 'Communication', 'Negotiation', 'English')
WHERE j.slug = 'chuyen-vien-boi-thuong-bao-hiem-insurance-claims-specialist-40';
-- (41) Nhà Thiết kế Thời trang
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Fashion Design', 'Adobe Illustrator', 'Adobe Photoshop', 'Pattern Making')
WHERE j.slug = 'nha-thiet-ke-thoi-trang-fashion-designer-41';
-- (42) Quản lý Kho vận
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Supply Chain', 'Inventory Management', 'Excel', 'Leadership', 'English')
WHERE j.slug = 'quan-ly-kho-van-warehouse-logistics-manager-42';
-- (43) Chuyên viên Vận hành Sàn TMĐT
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('SEO', 'Marketing', 'Excel', 'Social Media', 'Customer Service')
WHERE j.slug = 'chuyen-vien-van-hanh-san-tmdt-ecommerce-operations-43';
-- (44) Trình Dược viên
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Pharmacy', 'Sales', 'Communication', 'English')
WHERE j.slug = 'trinh-duoc-vien-medical-representative-44';
-- (45) Thiết kế Đồ hoạ
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id
FROM jobs j
  JOIN skills s ON s.skill_name IN ('Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'UI-UX')
WHERE j.slug = 'thiet-ke-do-hoa-graphic-designer-45';

-- ========== EXTRA JOBS: Agriculture (10), AI Software & Services (10), Apparel and Fashion (10) ==========
INSERT INTO skills (skill_name)
VALUES ('Agronomy'),
  ('Soil Science'),
  ('Irrigation'),
  ('Crop Protection'),
  ('Animal Husbandry'),
  ('Aquaculture'),
  ('Agricultural Economics'),
  ('GIS'),
  ('Organic Farming'),
  ('Machine Learning'),
  ('Deep Learning'),
  ('NLP'),
  ('Computer Vision'),
  ('TensorFlow'),
  ('PyTorch'),
  ('MLOps'),
  ('LLM'),
  ('Prompt Engineering'),
  ('Data Engineering'),
  ('Textile Engineering'),
  ('Garment Production'),
  ('Quality Control'),
  ('Merchandising'),
  ('Sewing Technology'),
  ('Fabric Sourcing'),
  ('Visual Merchandising'),
  ('Embroidery'),
  ('Color Theory');

-- ========== Agriculture — 10 jobs ==========
INSERT INTO jobs (
    company_id, title, slug,
    job_reason, job_description, job_requirements, why_join_us,
    location, city_id, job_domain_id,
    salary_min, salary_max, salary_currency,
    job_type, experience_level,
    posted_at, expires_at, status
  )
VALUES
  -- (46) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Chuyên viên Trồng trọt (Crop Specialist)',
    'chuyen-vien-trong-trot-crop-specialist-46',
    '', '', '', '',
    'Đồng Tháp',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    10000000, 18000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-01 08:00:00', '2025-07-01 08:00:00', 'ACTIVE'
  ),
  -- (47) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Kỹ sư Thuỷ lợi Nông nghiệp (Agricultural Irrigation Engineer)',
    'ky-su-thuy-loi-nong-nghiep-irrigation-engineer-47',
    '', '', '', '',
    'Cần Thơ',
    (SELECT id FROM cities WHERE city_name = 'Đà Nẵng' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    14000000, 24000000, 'VND', 'ONSITE', 'MID',
    '2025-06-02 08:00:00', '2025-07-02 08:00:00', 'ACTIVE'
  ),
  -- (48) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'Chuyên viên Bảo vệ Thực vật (Crop Protection Specialist)',
    'chuyen-vien-bao-ve-thuc-vat-crop-protection-48',
    '', '', '', '',
    'Bình Dương',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    12000000, 20000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-03 08:00:00', '2025-07-03 08:00:00', 'ACTIVE'
  ),
  -- (49) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Quản lý Trang trại (Farm Manager)',
    'quan-ly-trang-trai-farm-manager-49',
    '', '', '', '',
    'Lâm Đồng',
    (SELECT id FROM cities WHERE city_name = 'Đà Nẵng' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    18000000, 30000000, 'VND', 'ONSITE', 'SENIOR',
    '2025-06-04 08:00:00', '2025-07-04 08:00:00', 'ACTIVE'
  ),
  -- (50) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Kỹ sư Chăn nuôi (Livestock Engineer)',
    'ky-su-chan-nuoi-livestock-engineer-50',
    '', '', '', '',
    'Hà Nam',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    13000000, 22000000, 'VND', 'ONSITE', 'MID',
    '2025-06-05 08:00:00', '2025-07-05 08:00:00', 'ACTIVE'
  ),
  -- (51) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Chuyên viên Thuỷ sản (Aquaculture Specialist)',
    'chuyen-vien-thuy-san-aquaculture-specialist-51',
    '', '', '', '',
    'Cà Mau',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    11000000, 19000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-06 08:00:00', '2025-07-06 08:00:00', 'ACTIVE'
  ),
  -- (52) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Nhà nghiên cứu Đất (Soil Scientist)',
    'nha-nghien-cuu-dat-soil-scientist-52',
    '', '', '', '',
    'Quận Cầu Giấy, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    16000000, 28000000, 'VND', 'HYBRID', 'MID',
    '2025-06-07 08:00:00', '2025-07-07 08:00:00', 'ACTIVE'
  ),
  -- (53) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Chuyên viên Nông nghiệp Hữu cơ (Organic Farming Specialist)',
    'chuyen-vien-nong-nghiep-huu-co-organic-farming-53',
    '', '', '', '',
    'Đà Lạt, Lâm Đồng',
    (SELECT id FROM cities WHERE city_name = 'Đà Nẵng' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    10000000, 18000000, 'VND', 'ONSITE', 'FRESHER',
    '2025-06-08 08:00:00', '2025-07-08 08:00:00', 'ACTIVE'
  ),
  -- (54) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Chuyên viên Kinh tế Nông nghiệp (Agricultural Economist)',
    'chuyen-vien-kinh-te-nong-nghiep-agricultural-economist-54',
    '', '', '', '',
    'Quận Ba Đình, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    15000000, 25000000, 'VND', 'HYBRID', 'MID',
    '2025-06-09 08:00:00', '2025-07-09 08:00:00', 'ACTIVE'
  ),
  -- (55) Agriculture
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Kỹ sư GIS Nông nghiệp (Agricultural GIS Engineer)',
    'ky-su-gis-nong-nghiep-agricultural-gis-engineer-55',
    '', '', '', '',
    'Quận Đống Đa, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Agriculture' LIMIT 1),
    18000000, 30000000, 'VND', 'HYBRID', 'MID',
    '2025-06-10 08:00:00', '2025-07-10 08:00:00', 'ACTIVE'
  );

-- ========== AI Software & Services — 10 jobs ==========
INSERT INTO jobs (
    company_id, title, slug,
    job_reason, job_description, job_requirements, why_join_us,
    location, city_id, job_domain_id,
    salary_min, salary_max, salary_currency,
    job_type, experience_level,
    posted_at, expires_at, status
  )
VALUES
  -- (56) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Kỹ sư Machine Learning (Machine Learning Engineer)',
    'ky-su-machine-learning-ml-engineer-56',
    '', '', '', '',
    'Quận 1, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    25000000, 50000000, 'VND', 'HYBRID', 'MID',
    '2025-06-01 08:00:00', '2025-07-01 08:00:00', 'ACTIVE'
  ),
  -- (57) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'Chuyên viên Xử lý Ngôn ngữ Tự nhiên (NLP Engineer)',
    'chuyen-vien-xu-ly-ngon-ngu-tu-nhien-nlp-engineer-57',
    '', '', '', '',
    'Quận Cầu Giấy, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    22000000, 45000000, 'VND', 'HYBRID', 'MID',
    '2025-06-02 08:00:00', '2025-07-02 08:00:00', 'ACTIVE'
  ),
  -- (58) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Kỹ sư Computer Vision (Computer Vision Engineer)',
    'ky-su-computer-vision-cv-engineer-58',
    '', '', '', '',
    'Quận 7, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    28000000, 55000000, 'VND', 'HYBRID', 'SENIOR',
    '2025-06-03 08:00:00', '2025-07-03 08:00:00', 'ACTIVE'
  ),
  -- (59) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Chuyên viên MLOps (MLOps Engineer)',
    'chuyen-vien-mlops-mlops-engineer-59',
    '', '', '', '',
    'Quận Nam Từ Liêm, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    20000000, 40000000, 'VND', 'HYBRID', 'MID',
    '2025-06-04 08:00:00', '2025-07-04 08:00:00', 'ACTIVE'
  ),
  -- (60) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Nghiên cứu viên AI (AI Research Scientist)',
    'nghien-cuu-vien-ai-research-scientist-60',
    '', '', '', '',
    'Quận Bình Thạnh, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    35000000, 70000000, 'VND', 'HYBRID', 'SENIOR',
    '2025-06-05 08:00:00', '2025-07-05 08:00:00', 'ACTIVE'
  ),
  -- (61) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Kỹ sư Prompt & LLM (Prompt / LLM Engineer)',
    'ky-su-prompt-llm-engineer-61',
    '', '', '', '',
    'Quận Hoàn Kiếm, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    18000000, 35000000, 'VND', 'REMOTE', 'JUNIOR',
    '2025-06-06 08:00:00', '2025-07-06 08:00:00', 'ACTIVE'
  ),
  -- (62) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Kỹ sư Dữ liệu AI (AI Data Engineer)',
    'ky-su-du-lieu-ai-data-engineer-62',
    '', '', '', '',
    'Quận Tân Bình, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    22000000, 42000000, 'VND', 'HYBRID', 'MID',
    '2025-06-07 08:00:00', '2025-07-07 08:00:00', 'ACTIVE'
  ),
  -- (63) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Chuyên viên Deep Learning (Deep Learning Engineer)',
    'chuyen-vien-deep-learning-dl-engineer-63',
    '', '', '', '',
    'Quận Thanh Xuân, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    25000000, 48000000, 'VND', 'HYBRID', 'MID',
    '2025-06-08 08:00:00', '2025-07-08 08:00:00', 'ACTIVE'
  ),
  -- (64) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'AI Product Manager',
    'ai-product-manager-64',
    '', '', '', '',
    'Quận 3, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    30000000, 55000000, 'VND', 'HYBRID', 'SENIOR',
    '2025-06-09 08:00:00', '2025-07-09 08:00:00', 'ACTIVE'
  ),
  -- (65) AI Software & Services
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'Thực tập sinh AI (AI Intern)',
    'thuc-tap-sinh-ai-intern-65',
    '', '', '', '',
    'Quận Hai Bà Trưng, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'AI Software & Services' LIMIT 1),
    6000000, 10000000, 'VND', 'ONSITE', 'FRESHER',
    '2025-06-10 08:00:00', '2025-07-10 08:00:00', 'ACTIVE'
  );

-- ========== Apparel and Fashion — 10 jobs ==========
INSERT INTO jobs (
    company_id, title, slug,
    job_reason, job_description, job_requirements, why_join_us,
    location, city_id, job_domain_id,
    salary_min, salary_max, salary_currency,
    job_type, experience_level,
    posted_at, expires_at, status
  )
VALUES
  -- (66) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Quản lý Sản xuất May mặc (Garment Production Manager)',
    'quan-ly-san-xuat-may-mac-garment-production-manager-66',
    '', '', '', '',
    'KCN Tân Tạo, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    20000000, 35000000, 'VND', 'ONSITE', 'SENIOR',
    '2025-06-01 08:00:00', '2025-07-01 08:00:00', 'ACTIVE'
  ),
  -- (67) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000005',
    'Chuyên viên Kiểm soát Chất lượng May (QC Inspector - Garment)',
    'chuyen-vien-kiem-soat-chat-luong-may-qc-inspector-67',
    '', '', '', '',
    'KCN Nhơn Trạch, Đồng Nai',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    10000000, 16000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-02 08:00:00', '2025-07-02 08:00:00', 'ACTIVE'
  ),
  -- (68) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000006',
    'Chuyên viên Merchandising Thời trang (Fashion Merchandiser)',
    'chuyen-vien-merchandising-thoi-trang-fashion-merchandiser-68',
    '', '', '', '',
    'Quận 1, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    14000000, 25000000, 'VND', 'ONSITE', 'MID',
    '2025-06-03 08:00:00', '2025-07-03 08:00:00', 'ACTIVE'
  ),
  -- (69) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000007',
    'Kỹ thuật viên Rập / Mẫu (Pattern Maker)',
    'ky-thuat-vien-rap-mau-pattern-maker-69',
    '', '', '', '',
    'Quận Tân Phú, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    12000000, 20000000, 'VND', 'ONSITE', 'MID',
    '2025-06-04 08:00:00', '2025-07-04 08:00:00', 'ACTIVE'
  ),
  -- (70) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000008',
    'Trưởng nhóm May (Sewing Line Leader)',
    'truong-nhom-may-sewing-line-leader-70',
    '', '', '', '',
    'KCN Bình Dương',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    9000000, 15000000, 'VND', 'ONSITE', 'MID',
    '2025-06-05 08:00:00', '2025-07-05 08:00:00', 'ACTIVE'
  ),
  -- (71) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000009',
    'Chuyên viên Thu mua Vải (Fabric Sourcing Specialist)',
    'chuyen-vien-thu-mua-vai-fabric-sourcing-specialist-71',
    '', '', '', '',
    'Quận 5, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    13000000, 22000000, 'VND', 'ONSITE', 'MID',
    '2025-06-06 08:00:00', '2025-07-06 08:00:00', 'ACTIVE'
  ),
  -- (72) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000001',
    'Thiết kế Kỹ thuật May (Technical Fashion Designer)',
    'thiet-ke-ky-thuat-may-technical-fashion-designer-72',
    '', '', '', '',
    'Quận Hai Bà Trưng, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    14000000, 24000000, 'VND', 'HYBRID', 'MID',
    '2025-06-07 08:00:00', '2025-07-07 08:00:00', 'ACTIVE'
  ),
  -- (73) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000002',
    'Chuyên viên Visual Merchandising (Visual Merchandiser)',
    'chuyen-vien-visual-merchandising-visual-merchandiser-73',
    '', '', '', '',
    'Quận Hoàn Kiếm, Hà Nội',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    12000000, 20000000, 'VND', 'ONSITE', 'JUNIOR',
    '2025-06-08 08:00:00', '2025-07-08 08:00:00', 'ACTIVE'
  ),
  -- (74) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000003',
    'Kỹ sư Dệt may (Textile Engineer)',
    'ky-su-det-may-textile-engineer-74',
    '', '', '', '',
    'KCN Phố Nối, Hưng Yên',
    (SELECT id FROM cities WHERE city_name = 'Hà Nội' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    15000000, 26000000, 'VND', 'ONSITE', 'MID',
    '2025-06-09 08:00:00', '2025-07-09 08:00:00', 'ACTIVE'
  ),
  -- (75) Apparel and Fashion
  (
    'a1b2c3d4-e5f6-11ee-c0mp-000000000004',
    'Chuyên viên Thêu & Hoàn thiện (Embroidery & Finishing Specialist)',
    'chuyen-vien-theu-hoan-thien-embroidery-finishing-75',
    '', '', '', '',
    'Quận Gò Vấp, TP Hồ Chí Minh',
    (SELECT id FROM cities WHERE city_name = 'TP Hồ Chí Minh' LIMIT 1),
    (SELECT id FROM job_domains WHERE domain_name = 'Apparel and Fashion' LIMIT 1),
    8000000, 14000000, 'VND', 'ONSITE', 'FRESHER',
    '2025-06-10 08:00:00', '2025-07-10 08:00:00', 'ACTIVE'
  );

-- Normalize dates for extra 30 jobs
UPDATE jobs j
SET posted_at = DATE_SUB(NOW(), INTERVAL ((j.id % 15) + 1) DAY),
  expires_at = DATE_ADD(NOW(), INTERVAL ((j.id % 30) + 30) DAY),
  published_at = DATE_SUB(NOW(), INTERVAL ((j.id % 15) + 1) DAY),
  closed_at = NULL
WHERE j.slug IN (
  'chuyen-vien-trong-trot-crop-specialist-46',
  'ky-su-thuy-loi-nong-nghiep-irrigation-engineer-47',
  'chuyen-vien-bao-ve-thuc-vat-crop-protection-48',
  'quan-ly-trang-trai-farm-manager-49',
  'ky-su-chan-nuoi-livestock-engineer-50',
  'chuyen-vien-thuy-san-aquaculture-specialist-51',
  'nha-nghien-cuu-dat-soil-scientist-52',
  'chuyen-vien-nong-nghiep-huu-co-organic-farming-53',
  'chuyen-vien-kinh-te-nong-nghiep-agricultural-economist-54',
  'ky-su-gis-nong-nghiep-agricultural-gis-engineer-55',
  'ky-su-machine-learning-ml-engineer-56',
  'chuyen-vien-xu-ly-ngon-ngu-tu-nhien-nlp-engineer-57',
  'ky-su-computer-vision-cv-engineer-58',
  'chuyen-vien-mlops-mlops-engineer-59',
  'nghien-cuu-vien-ai-research-scientist-60',
  'ky-su-prompt-llm-engineer-61',
  'ky-su-du-lieu-ai-data-engineer-62',
  'chuyen-vien-deep-learning-dl-engineer-63',
  'ai-product-manager-64',
  'thuc-tap-sinh-ai-intern-65',
  'quan-ly-san-xuat-may-mac-garment-production-manager-66',
  'chuyen-vien-kiem-soat-chat-luong-may-qc-inspector-67',
  'chuyen-vien-merchandising-thoi-trang-fashion-merchandiser-68',
  'ky-thuat-vien-rap-mau-pattern-maker-69',
  'truong-nhom-may-sewing-line-leader-70',
  'chuyen-vien-thu-mua-vai-fabric-sourcing-specialist-71',
  'thiet-ke-ky-thuat-may-technical-fashion-designer-72',
  'chuyen-vien-visual-merchandising-visual-merchandiser-73',
  'ky-su-det-may-textile-engineer-74',
  'chuyen-vien-theu-hoan-thien-embroidery-finishing-75'
);

-- ========== JOB_SKILLS FOR EXTRA 30 JOBS ==========
-- (46) Chuyên viên Trồng trọt
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Agronomy', 'Crop Protection', 'Excel', 'English')
WHERE j.slug = 'chuyen-vien-trong-trot-crop-specialist-46';
-- (47) Kỹ sư Thuỷ lợi Nông nghiệp
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Irrigation', 'AutoCAD', 'GIS', 'English')
WHERE j.slug = 'ky-su-thuy-loi-nong-nghiep-irrigation-engineer-47';
-- (48) Chuyên viên Bảo vệ Thực vật
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Crop Protection', 'Agronomy', 'Excel', 'Communication')
WHERE j.slug = 'chuyen-vien-bao-ve-thuc-vat-crop-protection-48';
-- (49) Quản lý Trang trại
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Leadership', 'Agronomy', 'Animal Husbandry', 'Excel', 'English')
WHERE j.slug = 'quan-ly-trang-trai-farm-manager-49';
-- (50) Kỹ sư Chăn nuôi
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Animal Husbandry', 'Nutrition', 'Excel', 'English')
WHERE j.slug = 'ky-su-chan-nuoi-livestock-engineer-50';
-- (51) Chuyên viên Thuỷ sản
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Aquaculture', 'Excel', 'Communication', 'English')
WHERE j.slug = 'chuyen-vien-thuy-san-aquaculture-specialist-51';
-- (52) Nhà nghiên cứu Đất
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Soil Science', 'GIS', 'Python', 'Excel')
WHERE j.slug = 'nha-nghien-cuu-dat-soil-scientist-52';
-- (53) Chuyên viên Nông nghiệp Hữu cơ
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Organic Farming', 'Agronomy', 'Communication', 'English')
WHERE j.slug = 'chuyen-vien-nong-nghiep-huu-co-organic-farming-53';
-- (54) Chuyên viên Kinh tế Nông nghiệp
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Agricultural Economics', 'Excel', 'Communication', 'English')
WHERE j.slug = 'chuyen-vien-kinh-te-nong-nghiep-agricultural-economist-54';
-- (55) Kỹ sư GIS Nông nghiệp
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('GIS', 'Python', 'Excel', 'Agronomy')
WHERE j.slug = 'ky-su-gis-nong-nghiep-agricultural-gis-engineer-55';
-- (56) Kỹ sư Machine Learning
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'English')
WHERE j.slug = 'ky-su-machine-learning-ml-engineer-56';
-- (57) Chuyên viên NLP
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('NLP', 'Python', 'Machine Learning', 'LLM', 'English')
WHERE j.slug = 'chuyen-vien-xu-ly-ngon-ngu-tu-nhien-nlp-engineer-57';
-- (58) Kỹ sư Computer Vision
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Computer Vision', 'Deep Learning', 'Python', 'PyTorch', 'English')
WHERE j.slug = 'ky-su-computer-vision-cv-engineer-58';
-- (59) Chuyên viên MLOps
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('MLOps', 'Python', 'Docker', 'Machine Learning', 'English')
WHERE j.slug = 'chuyen-vien-mlops-mlops-engineer-59';
-- (60) Nghiên cứu viên AI
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch')
WHERE j.slug = 'nghien-cuu-vien-ai-research-scientist-60';
-- (61) Kỹ sư Prompt & LLM
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('LLM', 'Prompt Engineering', 'Python', 'NLP', 'English')
WHERE j.slug = 'ky-su-prompt-llm-engineer-61';
-- (62) Kỹ sư Dữ liệu AI
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Data Engineering', 'Python', 'Machine Learning', 'Excel', 'English')
WHERE j.slug = 'ky-su-du-lieu-ai-data-engineer-62';
-- (63) Chuyên viên Deep Learning
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Deep Learning', 'PyTorch', 'TensorFlow', 'Python', 'English')
WHERE j.slug = 'chuyen-vien-deep-learning-dl-engineer-63';
-- (64) AI Product Manager
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Machine Learning', 'Communication', 'Leadership', 'English')
WHERE j.slug = 'ai-product-manager-64';
-- (65) Thực tập sinh AI
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Python', 'Machine Learning', 'TensorFlow', 'English')
WHERE j.slug = 'thuc-tap-sinh-ai-intern-65';
-- (66) Quản lý Sản xuất May mặc
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Garment Production', 'Quality Control', 'Leadership', 'Excel', 'English')
WHERE j.slug = 'quan-ly-san-xuat-may-mac-garment-production-manager-66';
-- (67) QC Inspector - Garment
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Quality Control', 'Garment Production', 'Excel', 'Communication')
WHERE j.slug = 'chuyen-vien-kiem-soat-chat-luong-may-qc-inspector-67';
-- (68) Fashion Merchandiser
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Merchandising', 'Fashion Design', 'Communication', 'Excel', 'English')
WHERE j.slug = 'chuyen-vien-merchandising-thoi-trang-fashion-merchandiser-68';
-- (69) Pattern Maker
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Pattern Making', 'Sewing Technology', 'AutoCAD', 'Fashion Design')
WHERE j.slug = 'ky-thuat-vien-rap-mau-pattern-maker-69';
-- (70) Sewing Line Leader
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Sewing Technology', 'Leadership', 'Quality Control', 'Communication')
WHERE j.slug = 'truong-nhom-may-sewing-line-leader-70';
-- (71) Fabric Sourcing Specialist
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Fabric Sourcing', 'Negotiation', 'Excel', 'English', 'Communication')
WHERE j.slug = 'chuyen-vien-thu-mua-vai-fabric-sourcing-specialist-71';
-- (72) Technical Fashion Designer
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Fashion Design', 'Adobe Illustrator', 'Pattern Making', 'Color Theory')
WHERE j.slug = 'thiet-ke-ky-thuat-may-technical-fashion-designer-72';
-- (73) Visual Merchandiser
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Visual Merchandising', 'Adobe Photoshop', 'Communication', 'Color Theory')
WHERE j.slug = 'chuyen-vien-visual-merchandising-visual-merchandiser-73';
-- (74) Kỹ sư Dệt may
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Textile Engineering', 'Quality Control', 'Excel', 'English')
WHERE j.slug = 'ky-su-det-may-textile-engineer-74';
-- (75) Chuyên viên Thêu & Hoàn thiện
INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, s.id FROM jobs j JOIN skills s ON s.skill_name IN ('Embroidery', 'Sewing Technology', 'Quality Control', 'Communication')
WHERE j.slug = 'chuyen-vien-theu-hoan-thien-embroidery-finishing-75';

-- ========== POPULATE job_reason, job_description, job_requirements, why_join_us ==========

-- (30) Quản lý Nhà hàng
UPDATE jobs SET
  job_reason = '<ul><li>Thu nhập hấp dẫn + thưởng doanh thu hàng tháng</li><li>Bảo hiểm sức khỏe toàn diện</li><li>Cơ hội thăng tiến lên vị trí Giám đốc vùng</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý toàn bộ hoạt động vận hành nhà hàng hàng ngày</li><li>Đào tạo, giám sát và đánh giá nhân viên phục vụ</li><li>Kiểm soát chất lượng món ăn, vệ sinh an toàn thực phẩm</li><li>Quản lý chi phí, tồn kho và lập báo cáo doanh thu</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Cao đẳng trở lên ngành Quản trị nhà hàng khách sạn hoặc tương đương</li><li>Tối thiểu 2 năm kinh nghiệm quản lý nhà hàng</li><li>Kỹ năng lãnh đạo, giao tiếp tốt</li><li>Có chứng chỉ VSATTP là lợi thế</li></ul>',
  why_join_us = '<ul><li>Môi trường làm việc năng động, chuyên nghiệp</li><li>Thưởng doanh thu hấp dẫn theo tháng</li><li>Đào tạo nghiệp vụ quản lý bài bản</li></ul>'
WHERE slug = 'quan-ly-nha-hang-restaurant-manager-30';

-- (31) Hướng dẫn viên Du lịch Quốc tế
UPDATE jobs SET
  job_reason = '<ul><li>Được đi du lịch nhiều nước trên thế giới</li><li>Lương cứng + hoa hồng tour</li><li>Học hỏi đa văn hóa</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Dẫn đoàn khách quốc tế tham quan các điểm du lịch tại Việt Nam</li><li>Thuyết minh lịch sử, văn hóa bằng tiếng Anh hoặc tiếng Nhật</li><li>Lên kế hoạch lịch trình, đặt dịch vụ ăn uống, lưu trú</li><li>Xử lý các tình huống phát sinh trong tour</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Có thẻ hướng dẫn viên du lịch quốc tế</li><li>Tiếng Anh giao tiếp tốt (IELTS 6.0+ hoặc tương đương)</li><li>Yêu thích du lịch, ngoại giao, có sức khỏe tốt</li><li>Kinh nghiệm dẫn tour ít nhất 1 năm</li></ul>',
  why_join_us = '<ul><li>Được tài trợ chi phí đi tour</li><li>Hoa hồng hấp dẫn theo số lượng khách</li><li>Cơ hội đi công tác nước ngoài</li></ul>'
WHERE slug = 'huong-dan-vien-du-lich-quoc-te-international-tour-guide-31';

-- (32) Giảng viên Tiếng Anh
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + phụ cấp giảng dạy</li><li>Môi trường học thuật quốc tế</li><li>Được đào tạo phương pháp giảng dạy hiện đại</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Giảng dạy tiếng Anh cho sinh viên đại học/cao đẳng</li><li>Xây dựng giáo trình, đề thi, tài liệu học tập</li><li>Tham gia hội thảo, nghiên cứu khoa học</li><li>Hướng dẫn sinh viên luyện thi TOEIC/IELTS</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Thạc sĩ ngành Ngôn ngữ Anh hoặc Sư phạm Anh</li><li>IELTS 7.0+ hoặc TOEFL iBT 90+</li><li>Ít nhất 2 năm kinh nghiệm giảng dạy</li><li>Kỹ năng truyền đạt, giao tiếp tốt</li></ul>',
  why_join_us = '<ul><li>Môi trường học thuật, được nghiên cứu và phát triển chuyên môn</li><li>Phụ cấp nghiên cứu khoa học</li><li>Lịch giảng dạy linh hoạt</li></ul>'
WHERE slug = 'giang-vien-tieng-anh-english-lecturer-32';

-- (33) Dược sĩ Lâm sàng
UPDATE jobs SET
  job_reason = '<ul><li>Lương tháng 13 + thưởng KPI</li><li>Bảo hiểm sức khỏe cho bản thân và gia đình</li><li>Cơ hội đào tạo chuyên sâu</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Tư vấn sử dụng thuốc cho bệnh nhân tại bệnh viện</li><li>Kiểm tra đơn thuốc, phát hiện tương tác thuốc</li><li>Phối hợp với bác sĩ trong điều trị lâm sàng</li><li>Quản lý kho dược phẩm, kiểm soát tồn kho</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học Dược chính quy</li><li>Có chứng chỉ hành nghề Dược sĩ</li><li>Kinh nghiệm 2 năm trong môi trường bệnh viện</li><li>Tiếng Anh chuyên ngành tốt</li></ul>',
  why_join_us = '<ul><li>Được đào tạo cập nhật kiến thức dược lâm sàng quốc tế</li><li>Bảo hiểm sức khỏe cao cấp</li><li>Lộ trình thăng tiến rõ ràng</li></ul>'
WHERE slug = 'duoc-si-lam-sang-clinical-pharmacist-33';

-- (34) Chuyên viên Kinh doanh BĐS
UPDATE jobs SET
  job_reason = '<ul><li>Thu nhập không giới hạn (lương + hoa hồng)</li><li>Đào tạo kỹ năng bán hàng chuyên nghiệp</li><li>Thưởng nóng theo deal</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Tìm kiếm, tư vấn khách hàng mua bán bất động sản</li><li>Khảo sát thị trường, đánh giá giá trị tài sản</li><li>Đàm phán, hỗ trợ khách hàng hoàn tất thủ tục pháp lý</li><li>Chăm sóc khách hàng sau giao dịch</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Cao đẳng trở lên</li><li>Kỹ năng đàm phán, thuyết phục tốt</li><li>Ngoại hình ưa nhìn, giao tiếp lưu loát</li><li>Có kinh nghiệm BĐS là lợi thế lớn</li></ul>',
  why_join_us = '<ul><li>Hoa hồng lên đến 40% giá trị giao dịch</li><li>Đào tạo bài bản về thị trường BĐS</li><li>Môi trường trẻ, năng động</li></ul>'
WHERE slug = 'chuyen-vien-kinh-doanh-bat-dong-san-real-estate-sales-34';

-- (35) Kỹ sư Cơ khí Chế tạo
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + phụ cấp KCN</li><li>Làm việc với máy móc, công nghệ hiện đại</li><li>Bảo hiểm đầy đủ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế, lập bản vẽ kỹ thuật bằng AutoCAD/SolidWorks</li><li>Giám sát quy trình sản xuất cơ khí chế tạo</li><li>Kiểm tra chất lượng sản phẩm theo tiêu chuẩn ISO</li><li>Bảo trì, sửa chữa máy móc thiết bị</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Cơ khí chế tạo máy</li><li>Thành thạo AutoCAD, SolidWorks</li><li>Kinh nghiệm 2-3 năm trong nhà máy sản xuất</li><li>Đọc hiểu tiếng Anh kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Được đào tạo công nghệ CNC tiên tiến</li><li>Xe đưa đón KCN</li><li>Thưởng sáng kiến cải tiến kỹ thuật</li></ul>'
WHERE slug = 'ky-su-co-khi-che-tao-mechanical-engineer-35';

-- (36) Kỹ sư Nông nghiệp Công nghệ cao
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc với nông nghiệp 4.0</li><li>Lương + nhà ở miễn phí tại nông trại</li><li>Phụ cấp đi lại</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Ứng dụng IoT, cảm biến vào giám sát cây trồng</li><li>Thu thập, phân tích dữ liệu nông nghiệp bằng Python</li><li>Quản lý hệ thống tưới tiêu tự động</li><li>Nghiên cứu giống cây trồng mới</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Nông nghiệp hoặc CNTT ứng dụng</li><li>Biết lập trình Python cơ bản</li><li>Sẵn sàng làm việc tại nông trại</li><li>Tiếng Anh đọc hiểu tài liệu kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Tiên phong trong lĩnh vực AgriTech tại Việt Nam</li><li>Được nghiên cứu và thực hành trực tiếp</li><li>Phụ cấp nhà ở, ăn uống tại nông trại</li></ul>'
WHERE slug = 'ky-su-nong-nghiep-cong-nghe-cao-agritech-engineer-36';

-- (37) Chuyên viên Sáng tạo Nội dung
UPDATE jobs SET
  job_reason = '<ul><li>Lương + thưởng sáng tạo</li><li>Làm việc Hybrid linh hoạt</li><li>Môi trường sáng tạo, trẻ trung</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Sản xuất nội dung hình ảnh, video cho các kênh mạng xã hội</li><li>Lên ý tưởng chiến dịch truyền thông, quảng cáo</li><li>Tối ưu SEO cho bài viết website</li><li>Phân tích hiệu quả nội dung qua các chỉ số engagement</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Thành thạo Adobe Photoshop, Premiere Pro hoặc CapCut</li><li>Có kiến thức về Social Media Marketing</li><li>Khả năng viết sáng tạo, storytelling tốt</li><li>Portfolio/kênh cá nhân là lợi thế</li></ul>',
  why_join_us = '<ul><li>Tự do sáng tạo, không gò bó</li><li>Được tiếp cận các dự án lớn với nhiều thương hiệu</li><li>Cơ hội phát triển thành Creative Lead</li></ul>'
WHERE slug = 'chuyen-vien-sang-tao-noi-dung-content-creator-37';

-- (38) Trưởng ca Bán hàng
UPDATE jobs SET
  job_reason = '<ul><li>Lương + doanh số bán hàng</li><li>Chiết khấu nhân viên khi mua hàng</li><li>Thưởng tháng, quý</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý ca bán hàng, phân công nhân viên</li><li>Đảm bảo doanh số bán hàng theo chỉ tiêu</li><li>Kiểm kê hàng hóa, báo cáo tồn kho cuối ca</li><li>Xử lý khiếu nại, chăm sóc khách hàng tại cửa hàng</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp THPT trở lên</li><li>Ít nhất 1 năm kinh nghiệm bán hàng, bán lẻ</li><li>Kỹ năng quản lý nhóm, giao tiếp tốt</li><li>Chấp nhận làm ca xoay</li></ul>',
  why_join_us = '<ul><li>Chiết khấu nhân viên hấp dẫn</li><li>Thưởng doanh số hàng tháng</li><li>Cơ hội thăng tiến lên Quản lý cửa hàng</li></ul>'
WHERE slug = 'truong-ca-ban-hang-retail-shift-leader-38';

-- (39) Huấn luyện viên Thể hình
UPDATE jobs SET
  job_reason = '<ul><li>Lương + hoa hồng PT sessions</li><li>Tập gym miễn phí</li><li>Môi trường năng động, khỏe mạnh</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Hướng dẫn, huấn luyện cá nhân cho hội viên</li><li>Xây dựng chương trình luyện tập và dinh dưỡng cá nhân hóa</li><li>Tư vấn, bán gói tập cho khách hàng mới</li><li>Đảm bảo an toàn tập luyện cho hội viên</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Có chứng chỉ PT (ACE, NASM hoặc tương đương)</li><li>Đam mê thể hình, sức khỏe</li><li>Có chứng chỉ sơ cấp cứu là lợi thế</li><li>Kỹ năng giao tiếp, truyền cảm hứng tốt</li></ul>',
  why_join_us = '<ul><li>Tập gym miễn phí tại cơ sở</li><li>Hoa hồng hấp dẫn theo số buổi PT</li><li>Được đào tạo chứng chỉ quốc tế</li></ul>'
WHERE slug = 'huan-luyen-vien-the-hinh-personal-trainer-39';

-- (40) Chuyên viên Bồi thường Bảo hiểm
UPDATE jobs SET
  job_reason = '<ul><li>Lương tháng 13 + thưởng cuối năm</li><li>Bảo hiểm sức khỏe cao cấp</li><li>Nghỉ phép 14+ ngày/năm</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Tiếp nhận, thẩm định hồ sơ yêu cầu bồi thường</li><li>Khảo sát hiện trường, đánh giá mức độ tổn thất</li><li>Đàm phán, giải quyết bồi thường với khách hàng</li><li>Lập báo cáo bồi thường định kỳ</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Tài chính, Bảo hiểm hoặc Luật</li><li>Kinh nghiệm 2 năm trong lĩnh vực bảo hiểm</li><li>Thành thạo Excel, kỹ năng phân tích tốt</li><li>Tiếng Anh giao tiếp</li></ul>',
  why_join_us = '<ul><li>Gói bảo hiểm cao cấp cho nhân viên và gia đình</li><li>Lộ trình thăng tiến rõ ràng</li><li>Đào tạo chuyên môn bảo hiểm quốc tế</li></ul>'
WHERE slug = 'chuyen-vien-boi-thuong-bao-hiem-insurance-claims-specialist-40';

-- (41) Nhà Thiết kế Thời trang
UPDATE jobs SET
  job_reason = '<ul><li>Được sáng tạo bộ sưu tập riêng</li><li>Làm việc Hybrid linh hoạt</li><li>Cơ hội tham gia Fashion Week</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế bộ sưu tập theo mùa/trend</li><li>Nghiên cứu xu hướng thời trang, chất liệu mới</li><li>Phối hợp với bộ phận sản xuất để hiện thực hóa mẫu thiết kế</li><li>Sử dụng Adobe Illustrator, Photoshop để vẽ phác thảo</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Thiết kế Thời trang</li><li>Thành thạo Adobe Illustrator, Photoshop</li><li>Có portfolio thiết kế ấn tượng</li><li>Kinh nghiệm 2 năm trong ngành thời trang</li></ul>',
  why_join_us = '<ul><li>Được sáng tạo tự do trong thiết kế</li><li>Cơ hội tham gia các tuần lễ thời trang</li><li>Chiết khấu sản phẩm thời trang nội bộ</li></ul>'
WHERE slug = 'nha-thiet-ke-thoi-trang-fashion-designer-41';

-- (42) Quản lý Kho vận
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + phụ cấp KCN</li><li>Bảo hiểm toàn diện</li><li>Xe đưa đón nhân viên</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý toàn bộ hoạt động kho vận, logistics</li><li>Lên kế hoạch nhập/xuất hàng, kiểm soát tồn kho</li><li>Quản lý đội ngũ nhân viên kho (10-20 người)</li><li>Tối ưu quy trình vận chuyển, giảm chi phí logistics</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Logistics, Quản trị kinh doanh</li><li>Ít nhất 3 năm kinh nghiệm quản lý kho</li><li>Thành thạo WMS, Excel nâng cao</li><li>Tiếng Anh giao tiếp tốt</li></ul>',
  why_join_us = '<ul><li>Xe đưa đón KCN miễn phí</li><li>Cơm trưa miễn phí</li><li>Thưởng cải tiến quy trình</li></ul>'
WHERE slug = 'quan-ly-kho-van-warehouse-logistics-manager-42';

-- (43) Chuyên viên Vận hành Sàn TMĐT
UPDATE jobs SET
  job_reason = '<ul><li>Lương + thưởng doanh số sàn</li><li>Làm việc Hybrid</li><li>Được đào tạo bài bản về TMĐT</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Vận hành gian hàng trên Shopee, Lazada, TikTok Shop</li><li>Tối ưu listing sản phẩm, SEO sàn</li><li>Lên kế hoạch flash sale, voucher, chiến dịch marketing</li><li>Phân tích dữ liệu bán hàng, báo cáo hiệu quả</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm vận hành sàn TMĐT ít nhất 1 năm</li><li>Biết sử dụng các công cụ phân tích sàn</li><li>Thành thạo Excel, Google Sheets</li><li>Tư duy số liệu, nhạy bén với trend thị trường</li></ul>',
  why_join_us = '<ul><li>Thưởng doanh số sàn hấp dẫn</li><li>Được đào tạo các nền tảng TMĐT mới nhất</li><li>Cơ hội phát triển lên E-commerce Manager</li></ul>'
WHERE slug = 'chuyen-vien-van-hanh-san-tmdt-ecommerce-operations-43';

-- (44) Trình Dược viên
UPDATE jobs SET
  job_reason = '<ul><li>Lương + hoa hồng doanh số</li><li>Xe công tác + điện thoại công ty</li><li>Bảo hiểm sức khỏe cao cấp</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Giới thiệu sản phẩm dược tới bác sĩ, nhà thuốc</li><li>Xây dựng mối quan hệ với các bệnh viện, phòng khám</li><li>Đạt chỉ tiêu doanh số theo tháng/quý</li><li>Báo cáo thông tin thị trường, đối thủ cạnh tranh</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học/Cao đẳng Dược</li><li>Kỹ năng bán hàng, thuyết trình tốt</li><li>Có xe máy và bằng lái</li><li>Tiếng Anh đọc hiểu tài liệu y khoa</li></ul>',
  why_join_us = '<ul><li>Hoa hồng doanh số hấp dẫn</li><li>Hỗ trợ xăng xe, điện thoại</li><li>Cơ hội thăng tiến lên Trưởng vùng</li></ul>'
WHERE slug = 'trinh-duoc-vien-medical-representative-44';

-- (45) Thiết kế Đồ hoạ
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc Hybrid linh hoạt</li><li>Được sáng tạo tự do</li><li>Thiết bị làm việc hiện đại (iMac, Wacom)</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế ấn phẩm truyền thông: banner, poster, brochure</li><li>Thiết kế giao diện UI cho website, app</li><li>Chỉnh sửa hình ảnh, retouch sản phẩm</li><li>Phối hợp với team Marketing triển khai chiến dịch</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Thành thạo Adobe Photoshop, Illustrator, Figma</li><li>Có portfolio thiết kế (Behance/Dribbble là lợi thế)</li><li>Hiểu biết về UI-UX cơ bản</li><li>Tư duy thẩm mỹ, sáng tạo</li></ul>',
  why_join_us = '<ul><li>Cung cấp thiết bị thiết kế cao cấp</li><li>Tự do sáng tạo, không gò bó style</li><li>Cơ hội thăng tiến lên Art Director</li></ul>'
WHERE slug = 'thiet-ke-do-hoa-graphic-designer-45';

-- (46) Chuyên viên Trồng trọt
UPDATE jobs SET
  job_reason = '<ul><li>Phụ cấp nông trại + nhà ở</li><li>Làm việc gần thiên nhiên</li><li>Bảo hiểm đầy đủ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý quy trình canh tác cây trồng theo mùa vụ</li><li>Theo dõi sâu bệnh, đề xuất phương án phòng trừ</li><li>Thu thập dữ liệu năng suất, lập báo cáo mùa vụ</li><li>Hướng dẫn kỹ thuật cho nông dân địa phương</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Nông học, Trồng trọt</li><li>Sẵn sàng làm việc tại vùng nông thôn</li><li>Kiến thức về bảo vệ thực vật, phân bón</li><li>Sử dụng Excel cơ bản</li></ul>',
  why_join_us = '<ul><li>Hỗ trợ nhà ở tại nông trại</li><li>Phụ cấp sinh hoạt vùng sâu</li><li>Được đào tạo kỹ thuật canh tác hiện đại</li></ul>'
WHERE slug = 'chuyen-vien-trong-trot-crop-specialist-46';

-- (47) Kỹ sư Thuỷ lợi Nông nghiệp
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh ngành thuỷ lợi</li><li>Phụ cấp công trình</li><li>Bảo hiểm toàn diện</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế hệ thống tưới tiêu cho vùng nông nghiệp</li><li>Giám sát thi công công trình thuỷ lợi</li><li>Sử dụng AutoCAD, GIS để lập bản đồ thuỷ văn</li><li>Đánh giá nguồn nước, đề xuất giải pháp tiết kiệm nước</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Thuỷ lợi, Kỹ thuật Nông nghiệp</li><li>Thành thạo AutoCAD, phần mềm GIS</li><li>Kinh nghiệm 2 năm thiết kế hệ thống tưới</li><li>Đọc hiểu tài liệu kỹ thuật tiếng Anh</li></ul>',
  why_join_us = '<ul><li>Phụ cấp công trình hấp dẫn</li><li>Được đi thực địa nhiều vùng miền</li><li>Đóng góp trực tiếp vào phát triển nông nghiệp bền vững</li></ul>'
WHERE slug = 'ky-su-thuy-loi-nong-nghiep-irrigation-engineer-47';

-- (48) Chuyên viên Bảo vệ Thực vật
UPDATE jobs SET
  job_reason = '<ul><li>Phụ cấp độc hại</li><li>Bảo hiểm sức khỏe nâng cao</li><li>Cơ hội nghiên cứu thực địa</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Khảo sát, chẩn đoán dịch hại trên cây trồng</li><li>Đề xuất biện pháp phòng trừ sâu bệnh an toàn</li><li>Hướng dẫn sử dụng thuốc BVTV đúng cách</li><li>Lập báo cáo tình hình dịch bệnh theo vùng</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Bảo vệ Thực vật hoặc Nông học</li><li>Kiến thức vững về côn trùng học, bệnh cây</li><li>Sẵn sàng đi công tác vùng nông thôn</li><li>Kỹ năng phân tích, báo cáo tốt</li></ul>',
  why_join_us = '<ul><li>Phụ cấp độc hại theo quy định</li><li>Được tham gia hội thảo khoa học nông nghiệp</li><li>Lộ trình phát triển chuyên gia BVTV</li></ul>'
WHERE slug = 'chuyen-vien-bao-ve-thuc-vat-crop-protection-48';

-- (49) Quản lý Trang trại
UPDATE jobs SET
  job_reason = '<ul><li>Lương cao + nhà ở miễn phí tại trang trại</li><li>Quản lý đội ngũ 20-50 người</li><li>Thưởng năng suất mùa vụ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý toàn bộ hoạt động trang trại (trồng trọt/chăn nuôi)</li><li>Lập kế hoạch sản xuất, kiểm soát chi phí</li><li>Quản lý nhân sự, phân công công việc</li><li>Đảm bảo tiêu chuẩn chất lượng, ATVSTP</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Nông nghiệp, Chăn nuôi</li><li>Ít nhất 3 năm kinh nghiệm quản lý trang trại</li><li>Kỹ năng lãnh đạo, quản lý nhân sự tốt</li><li>Thành thạo Excel, có kiến thức tài chính cơ bản</li></ul>',
  why_join_us = '<ul><li>Nhà ở, ăn uống miễn phí tại trang trại</li><li>Thưởng năng suất hấp dẫn</li><li>Được tự chủ trong quản lý vận hành</li></ul>'
WHERE slug = 'quan-ly-trang-trai-farm-manager-49';

-- (50) Kỹ sư Chăn nuôi
UPDATE jobs SET
  job_reason = '<ul><li>Phụ cấp vùng + nhà ở</li><li>Bảo hiểm sức khỏe</li><li>Thưởng sản lượng</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý kỹ thuật chăn nuôi gia súc, gia cầm</li><li>Xây dựng khẩu phần dinh dưỡng cho vật nuôi</li><li>Theo dõi sức khỏe đàn, phòng chống dịch bệnh</li><li>Báo cáo sản lượng, chi phí thức ăn chăn nuôi</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Chăn nuôi, Thú y</li><li>Kinh nghiệm 2 năm trong trang trại chăn nuôi</li><li>Kiến thức về dinh dưỡng động vật</li><li>Sử dụng Excel quản lý dữ liệu</li></ul>',
  why_join_us = '<ul><li>Phụ cấp vùng sâu hấp dẫn</li><li>Nhà ở miễn phí</li><li>Lộ trình lên Trưởng trại</li></ul>'
WHERE slug = 'ky-su-chan-nuoi-livestock-engineer-50';

-- (51) Chuyên viên Thuỷ sản
UPDATE jobs SET
  job_reason = '<ul><li>Phụ cấp vùng biển</li><li>Bảo hiểm toàn diện</li><li>Thưởng sản lượng nuôi trồng</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý kỹ thuật nuôi trồng thuỷ sản (tôm, cá)</li><li>Kiểm tra chất lượng nước, xử lý môi trường ao nuôi</li><li>Theo dõi tăng trưởng, phòng bệnh cho vật nuôi</li><li>Lập báo cáo sản lượng, chi phí vụ nuôi</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Nuôi trồng Thuỷ sản</li><li>Kinh nghiệm nuôi tôm/cá ít nhất 1 năm</li><li>Kiến thức về xử lý nước, vi sinh</li><li>Sẵn sàng làm việc tại vùng ven biển</li></ul>',
  why_join_us = '<ul><li>Phụ cấp vùng biển hấp dẫn</li><li>Thưởng vụ nuôi đạt sản lượng</li><li>Được đào tạo kỹ thuật nuôi trồng tiên tiến</li></ul>'
WHERE slug = 'chuyen-vien-thuy-san-aquaculture-specialist-51';

-- (52) Nhà nghiên cứu Đất
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc Hybrid</li><li>Phụ cấp nghiên cứu</li><li>Cơ hội công bố khoa học</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Phân tích mẫu đất, đánh giá chất lượng đất canh tác</li><li>Sử dụng GIS, viễn thám để lập bản đồ đất</li><li>Đề xuất cải tạo đất, sử dụng phân bón hợp lý</li><li>Viết báo cáo nghiên cứu, công bố khoa học</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Thạc sĩ ngành Khoa học Đất hoặc Nông học</li><li>Thành thạo phần mềm GIS, Python phân tích dữ liệu</li><li>Có bài báo khoa học là lợi thế</li><li>Tiếng Anh học thuật tốt</li></ul>',
  why_join_us = '<ul><li>Phụ cấp nghiên cứu hấp dẫn</li><li>Cơ hội tham gia hội thảo quốc tế</li><li>Tự do định hướng nghiên cứu</li></ul>'
WHERE slug = 'nha-nghien-cuu-dat-soil-scientist-52';

-- (53) Chuyên viên Nông nghiệp Hữu cơ
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc gần thiên nhiên</li><li>Phụ cấp nông trại</li><li>Đóng góp cho nông nghiệp sạch</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng quy trình canh tác hữu cơ đạt chuẩn</li><li>Hướng dẫn nông dân chuyển đổi từ canh tác truyền thống sang hữu cơ</li><li>Kiểm tra, giám sát chất lượng sản phẩm hữu cơ</li><li>Hỗ trợ xin chứng nhận hữu cơ (USDA, EU Organic)</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Nông nghiệp</li><li>Hiểu biết về tiêu chuẩn nông nghiệp hữu cơ</li><li>Kỹ năng giao tiếp, làm việc với nông dân</li><li>Đọc hiểu tiếng Anh tài liệu kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Phụ cấp đi lại, ăn ở tại nông trại</li><li>Sản phẩm hữu cơ miễn phí cho nhân viên</li><li>Đóng góp trực tiếp vào phát triển nông nghiệp bền vững</li></ul>'
WHERE slug = 'chuyen-vien-nong-nghiep-huu-co-organic-farming-53';

-- (54) Chuyên viên Kinh tế Nông nghiệp
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc Hybrid</li><li>Lương cạnh tranh</li><li>Tham gia dự án quốc tế</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Phân tích thị trường nông sản, dự báo giá cả</li><li>Đánh giá hiệu quả kinh tế các mô hình canh tác</li><li>Xây dựng báo cáo chính sách nông nghiệp</li><li>Tư vấn chiến lược phát triển nông nghiệp cho địa phương</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Kinh tế Nông nghiệp</li><li>Thành thạo Excel, phần mềm thống kê</li><li>Kỹ năng viết báo cáo, phân tích tốt</li><li>Tiếng Anh giao tiếp tốt</li></ul>',
  why_join_us = '<ul><li>Cơ hội tham gia các dự án quốc tế (FAO, World Bank)</li><li>Lộ trình phát triển chuyên gia chính sách</li><li>Môi trường học thuật, nghiên cứu</li></ul>'
WHERE slug = 'chuyen-vien-kinh-te-nong-nghiep-agricultural-economist-54';

-- (55) Kỹ sư GIS Nông nghiệp
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc Hybrid</li><li>Tiếp cận công nghệ viễn thám hiện đại</li><li>Phụ cấp công nghệ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng bản đồ GIS phục vụ quản lý nông nghiệp</li><li>Phân tích dữ liệu viễn thám, ảnh vệ tinh cho giám sát cây trồng</li><li>Lập trình Python xử lý dữ liệu không gian</li><li>Đề xuất ứng dụng công nghệ vào nông nghiệp chính xác</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành GIS, Trắc địa hoặc Nông nghiệp</li><li>Thành thạo ArcGIS/QGIS, Python (geopandas, rasterio)</li><li>Kinh nghiệm 2 năm làm GIS</li><li>Đọc hiểu tiếng Anh kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Được tiếp cận dữ liệu vệ tinh cao cấp</li><li>Phụ cấp thiết bị công nghệ</li><li>Cơ hội tham gia dự án nghiên cứu quốc tế</li></ul>'
WHERE slug = 'ky-su-gis-nong-nghiep-agricultural-gis-engineer-55';

-- (56) Kỹ sư Machine Learning
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh top thị trường AI</li><li>Làm việc Hybrid linh hoạt</li><li>Thiết bị GPU cao cấp</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng, huấn luyện mô hình Machine Learning cho sản phẩm thực tế</li><li>Xử lý dữ liệu lớn, feature engineering</li><li>Triển khai model lên production (serving, monitoring)</li><li>Nghiên cứu, thử nghiệm các thuật toán mới</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành CNTT, Toán ứng dụng, hoặc AI</li><li>Thành thạo Python, TensorFlow/PyTorch</li><li>Kinh nghiệm 2 năm với ML pipeline end-to-end</li><li>Tiếng Anh đọc paper, viết documentation tốt</li></ul>',
  why_join_us = '<ul><li>Cung cấp GPU server cao cấp cho R&D</li><li>Budget tham gia conference quốc tế (NeurIPS, ICML)</li><li>Team AI nhỏ gọn, chất lượng cao</li></ul>'
WHERE slug = 'ky-su-machine-learning-ml-engineer-56';

-- (57) Chuyên viên NLP
UPDATE jobs SET
  job_reason = '<ul><li>Lương hấp dẫn + ESOP</li><li>Làm việc Hybrid</li><li>Nghiên cứu LLM tiên tiến</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng hệ thống xử lý ngôn ngữ tự nhiên (chatbot, tóm tắt, phân loại)</li><li>Fine-tune các mô hình LLM cho tiếng Việt</li><li>Xử lý dữ liệu văn bản, xây dựng dataset</li><li>Viết tài liệu kỹ thuật, chia sẻ kiến thức trong team</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm với NLP/LLM</li><li>Thành thạo Python, HuggingFace Transformers</li><li>Hiểu biết sâu về attention mechanism, fine-tuning</li><li>Tiếng Anh đọc paper tốt</li></ul>',
  why_join_us = '<ul><li>Được nghiên cứu LLM/GenAI tiên tiến</li><li>Chế độ ESOP hấp dẫn</li><li>Team nhỏ, tự chủ cao trong nghiên cứu</li></ul>'
WHERE slug = 'chuyen-vien-xu-ly-ngon-ngu-tu-nhien-nlp-engineer-57';

-- (58) Kỹ sư Computer Vision
UPDATE jobs SET
  job_reason = '<ul><li>Lương gross cao + review 2 lần/năm</li><li>Dự án ứng dụng thực tế</li><li>Budget học tập hàng năm</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Phát triển hệ thống nhận diện hình ảnh, video</li><li>Xây dựng pipeline CV: detection, segmentation, tracking</li><li>Tối ưu model để chạy trên edge device</li><li>Thu thập, đánh nhãn dữ liệu hình ảnh</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Thạc sĩ hoặc kinh nghiệm 3 năm với Computer Vision</li><li>Thành thạo PyTorch, OpenCV</li><li>Hiểu sâu về CNN, YOLO, Transformer-based models</li><li>Kinh nghiệm deploy model trên edge/mobile là lợi thế</li></ul>',
  why_join_us = '<ul><li>Dự án CV ứng dụng thực tế (y tế, giao thông, sản xuất)</li><li>Budget học tập $1,000/năm</li><li>Được publish paper tại conference quốc tế</li></ul>'
WHERE slug = 'ky-su-computer-vision-cv-engineer-58';

-- (59) Chuyên viên MLOps
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + bonus quý</li><li>Làm việc Hybrid</li><li>Hạ tầng cloud hiện đại</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng CI/CD pipeline cho ML models</li><li>Quản lý hạ tầng training/serving (Docker, K8s, cloud)</li><li>Monitoring model performance, data drift</li><li>Tối ưu chi phí cloud, tự động hóa quy trình</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm với DevOps/MLOps</li><li>Thành thạo Docker, Kubernetes, CI/CD</li><li>Biết Python, có kiến thức ML cơ bản</li><li>Kinh nghiệm với AWS/GCP/Azure</li></ul>',
  why_join_us = '<ul><li>Hạ tầng cloud budget không giới hạn cho R&D</li><li>Bonus quý theo hiệu quả hệ thống</li><li>Được training certification cloud miễn phí</li></ul>'
WHERE slug = 'chuyen-vien-mlops-mlops-engineer-59';

-- (60) Nghiên cứu viên AI
UPDATE jobs SET
  job_reason = '<ul><li>Lương top thị trường AI Việt Nam</li><li>Tự do nghiên cứu</li><li>Budget conference quốc tế</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Nghiên cứu thuật toán ML/DL mới, đề xuất ứng dụng thực tế</li><li>Công bố paper tại top-tier conference</li><li>Mentor cho junior researchers và interns</li><li>Phối hợp engineering team đưa research vào sản phẩm</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tiến sĩ hoặc Thạc sĩ AI/ML có publication</li><li>Thành thạo PyTorch/TensorFlow</li><li>Có paper tại NeurIPS, ICML, CVPR, ACL hoặc tương đương</li><li>Tiếng Anh academic xuất sắc</li></ul>',
  why_join_us = '<ul><li>Tự do chọn hướng nghiên cứu</li><li>Tài trợ toàn bộ chi phí tham gia conference quốc tế</li><li>GPU cluster chuyên dụng cho research</li></ul>'
WHERE slug = 'nghien-cuu-vien-ai-research-scientist-60';

-- (61) Kỹ sư Prompt & LLM
UPDATE jobs SET
  job_reason = '<ul><li>Lĩnh vực GenAI hot nhất hiện nay</li><li>Làm việc Remote</li><li>Lương hấp dẫn cho vị trí mới</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế, tối ưu prompt cho các ứng dụng LLM</li><li>Fine-tune LLM cho use case cụ thể (tiếng Việt)</li><li>Xây dựng RAG pipeline, agent framework</li><li>Đánh giá chất lượng output LLM, xây dựng evaluation benchmark</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm làm việc với GPT, Claude, Llama hoặc tương đương</li><li>Thành thạo Python, LangChain/LlamaIndex</li><li>Hiểu biết về NLP, embedding, vector database</li><li>Tiếng Anh đọc documentation tốt</li></ul>',
  why_join_us = '<ul><li>100% Remote, giờ làm việc linh hoạt</li><li>Được tiếp cận API LLM mới nhất</li><li>Startup GenAI tiềm năng, có cơ hội ESOP</li></ul>'
WHERE slug = 'ky-su-prompt-llm-engineer-61';

-- (62) Kỹ sư Dữ liệu AI
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + review 2 lần/năm</li><li>Làm việc Hybrid</li><li>Hạ tầng data hiện đại</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Xây dựng data pipeline phục vụ training ML models</li><li>Thiết kế data warehouse, data lake</li><li>ETL/ELT dữ liệu từ nhiều nguồn khác nhau</li><li>Đảm bảo chất lượng dữ liệu, data governance</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm Data Engineering</li><li>Thành thạo Python, SQL, Spark/Airflow</li><li>Kiến thức cơ bản về ML</li><li>Kinh nghiệm cloud (AWS/GCP) là lợi thế</li></ul>',
  why_join_us = '<ul><li>Data stack hiện đại (dbt, Airflow, Snowflake)</li><li>Review lương 2 lần/năm</li><li>Budget học tập và certification</li></ul>'
WHERE slug = 'ky-su-du-lieu-ai-data-engineer-62';

-- (63) Chuyên viên Deep Learning
UPDATE jobs SET
  job_reason = '<ul><li>Lương hấp dẫn + thưởng dự án</li><li>Làm việc Hybrid</li><li>GPU cluster cao cấp</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế, huấn luyện mô hình Deep Learning (CNN, RNN, Transformer)</li><li>Tối ưu model performance và inference speed</li><li>Nghiên cứu và áp dụng kiến trúc DL mới</li><li>Viết tài liệu kỹ thuật, review code</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm với Deep Learning</li><li>Thành thạo PyTorch hoặc TensorFlow</li><li>Kiến thức vững về toán (linear algebra, probability)</li><li>Tiếng Anh đọc paper, viết doc tốt</li></ul>',
  why_join_us = '<ul><li>GPU cluster A100/H100 cho training</li><li>Thưởng dự án thành công</li><li>Cơ hội publish paper</li></ul>'
WHERE slug = 'chuyen-vien-deep-learning-dl-engineer-63';

-- (64) AI Product Manager
UPDATE jobs SET
  job_reason = '<ul><li>Lương senior + ESOP</li><li>Làm việc Hybrid</li><li>Định hình sản phẩm AI</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Định nghĩa roadmap sản phẩm AI</li><li>Phối hợp AI engineers và business team</li><li>Phân tích thị trường, đối thủ trong lĩnh vực AI</li><li>Quản lý backlog, ưu tiên tính năng theo impact</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 3 năm Product Management, ít nhất 1 năm với AI product</li><li>Hiểu biết cơ bản về ML/AI</li><li>Kỹ năng communication, leadership xuất sắc</li><li>Tiếng Anh thành thạo</li></ul>',
  why_join_us = '<ul><li>Được định hình sản phẩm AI từ zero-to-one</li><li>ESOP cho vị trí senior</li><li>Team kỹ thuật mạnh, văn hóa đổi mới</li></ul>'
WHERE slug = 'ai-product-manager-64';

-- (65) Thực tập sinh AI
UPDATE jobs SET
  job_reason = '<ul><li>Được mentoring bởi AI engineers giàu kinh nghiệm</li><li>Trợ cấp thực tập hấp dẫn</li><li>Cơ hội chuyển chính thức</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Hỗ trợ team trong các dự án ML/AI</li><li>Thu thập, xử lý và đánh nhãn dữ liệu</li><li>Thực hành huấn luyện model dưới sự hướng dẫn</li><li>Viết tài liệu, báo cáo kết quả thử nghiệm</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Sinh viên năm cuối hoặc mới tốt nghiệp ngành CNTT, Toán, AI</li><li>Biết Python, có kiến thức ML cơ bản</li><li>Ham học hỏi, chủ động</li><li>Đọc hiểu tiếng Anh kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Mentoring 1-1 bởi Senior AI Engineer</li><li>Cơ hội convert full-time sau 3 tháng</li><li>Trợ cấp thực tập 6-10 triệu/tháng</li></ul>'
WHERE slug = 'thuc-tap-sinh-ai-intern-65';

-- (66) Quản lý Sản xuất May mặc
UPDATE jobs SET
  job_reason = '<ul><li>Lương cao + thưởng năng suất</li><li>Xe đưa đón KCN</li><li>Bảo hiểm toàn diện</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý toàn bộ quy trình sản xuất may mặc</li><li>Lập kế hoạch sản xuất, kiểm soát tiến độ đơn hàng</li><li>Quản lý đội ngũ 50-100 công nhân</li><li>Đảm bảo chất lượng sản phẩm theo tiêu chuẩn khách hàng</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Công nghệ May hoặc Quản lý sản xuất</li><li>Ít nhất 3 năm kinh nghiệm quản lý xưởng may</li><li>Kỹ năng lãnh đạo, quản lý nhân sự tốt</li><li>Tiếng Anh giao tiếp với khách hàng nước ngoài</li></ul>',
  why_join_us = '<ul><li>Thưởng năng suất hấp dẫn</li><li>Xe đưa đón KCN miễn phí</li><li>Cơm trưa miễn phí</li></ul>'
WHERE slug = 'quan-ly-san-xuat-may-mac-garment-production-manager-66';

-- (67) QC Inspector - Garment
UPDATE jobs SET
  job_reason = '<ul><li>Lương ổn định + phụ cấp KCN</li><li>Đào tạo nghiệp vụ QC bài bản</li><li>Bảo hiểm đầy đủ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Kiểm tra chất lượng sản phẩm may theo AQL</li><li>Phát hiện lỗi, phân loại và báo cáo tỷ lệ lỗi</li><li>Phối hợp với sản xuất để khắc phục lỗi</li><li>Lập báo cáo QC hàng ngày, hàng tuần</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Cao đẳng ngành May hoặc tương đương</li><li>Kinh nghiệm 1 năm QC may mặc</li><li>Biết tiêu chuẩn AQL, kiểm hàng xuất khẩu</li><li>Tỉ mỉ, cẩn thận, trung thực</li></ul>',
  why_join_us = '<ul><li>Đào tạo nghiệp vụ QC quốc tế</li><li>Xe đưa đón KCN</li><li>Cơ hội thăng tiến lên QC Supervisor</li></ul>'
WHERE slug = 'chuyen-vien-kiem-soat-chat-luong-may-qc-inspector-67';

-- (68) Fashion Merchandiser
UPDATE jobs SET
  job_reason = '<ul><li>Lương + thưởng theo mùa hàng</li><li>Được đi công tác nước ngoài</li><li>Chiết khấu sản phẩm thời trang</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Lên kế hoạch bộ sưu tập theo mùa, trend thị trường</li><li>Phối hợp nhà cung cấp, theo dõi tiến độ sản xuất</li><li>Phân tích doanh số, điều phối phân bổ hàng hóa</li><li>Đàm phán giá, MOQ với nhà cung cấp</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Thiết kế Thời trang hoặc Kinh doanh</li><li>Kinh nghiệm 2 năm merchandising thời trang</li><li>Kỹ năng phân tích, đàm phán tốt</li><li>Tiếng Anh giao tiếp tốt</li></ul>',
  why_join_us = '<ul><li>Cơ hội đi sourcing tại Trung Quốc, Hàn Quốc</li><li>Chiết khấu nhân viên 40%</li><li>Lộ trình lên Merchandising Manager</li></ul>'
WHERE slug = 'chuyen-vien-merchandising-thoi-trang-fashion-merchandiser-68';

-- (69) Pattern Maker
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh ngành may</li><li>Được đào tạo phần mềm rập chuyên dụng</li><li>Bảo hiểm đầy đủ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thiết kế rập (pattern) theo mẫu thiết kế thời trang</li><li>Nhảy size, điều chỉnh rập theo yêu cầu sản xuất</li><li>Sử dụng phần mềm rập (Gerber, Optitex, AutoCAD)</li><li>Phối hợp với thiết kế và sản xuất để hoàn thiện mẫu</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp trung cấp/cao đẳng ngành May</li><li>Kinh nghiệm 2 năm làm rập may công nghiệp</li><li>Biết sử dụng phần mềm thiết kế rập</li><li>Tỉ mỉ, chính xác trong đo đạc</li></ul>',
  why_join_us = '<ul><li>Được đào tạo phần mềm rập hiện đại</li><li>Thưởng sáng kiến cải tiến kỹ thuật</li><li>Cơ hội thăng tiến lên Trưởng phòng Kỹ thuật</li></ul>'
WHERE slug = 'ky-thuat-vien-rap-mau-pattern-maker-69';

-- (70) Sewing Line Leader
UPDATE jobs SET
  job_reason = '<ul><li>Lương + phụ cấp chức vụ</li><li>Xe đưa đón KCN</li><li>Thưởng năng suất chuyền</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Quản lý chuyền may 20-30 công nhân</li><li>Phân công công đoạn, đảm bảo tiến độ sản xuất</li><li>Kiểm tra chất lượng sản phẩm tại chuyền</li><li>Đào tạo, hướng dẫn kỹ thuật cho công nhân mới</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm làm chuyền may</li><li>Biết kỹ thuật may các loại sản phẩm</li><li>Kỹ năng quản lý nhóm, giao tiếp tốt</li><li>Chịu áp lực sản xuất theo đơn hàng</li></ul>',
  why_join_us = '<ul><li>Thưởng năng suất chuyền hấp dẫn</li><li>Xe đưa đón miễn phí</li><li>Cơ hội thăng tiến lên Quản đốc xưởng</li></ul>'
WHERE slug = 'truong-nhom-may-sewing-line-leader-70';

-- (71) Fabric Sourcing Specialist
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + thưởng KPI</li><li>Được đi sourcing nước ngoài</li><li>Môi trường quốc tế</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Tìm kiếm, đánh giá nhà cung cấp vải trong và ngoài nước</li><li>Đàm phán giá, MOQ, lead time với nhà cung cấp</li><li>Kiểm tra chất lượng mẫu vải, theo dõi đơn hàng</li><li>Cập nhật xu hướng chất liệu, vải mới</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Kinh nghiệm 2 năm thu mua vải/nguyên phụ liệu may</li><li>Hiểu biết về các loại vải, đặc tính chất liệu</li><li>Kỹ năng đàm phán, negotiation tốt</li><li>Tiếng Anh giao tiếp tốt (làm việc với supplier nước ngoài)</li></ul>',
  why_join_us = '<ul><li>Đi sourcing tại Trung Quốc, Ấn Độ hàng quý</li><li>Thưởng KPI tiết kiệm chi phí</li><li>Môi trường quốc tế, đa văn hóa</li></ul>'
WHERE slug = 'chuyen-vien-thu-mua-vai-fabric-sourcing-specialist-71';

-- (72) Technical Fashion Designer
UPDATE jobs SET
  job_reason = '<ul><li>Làm việc Hybrid</li><li>Sáng tạo kết hợp kỹ thuật</li><li>Chiết khấu sản phẩm nội bộ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Chuyển đổi bản thiết kế thời trang thành tech pack chi tiết</li><li>Vẽ kỹ thuật (technical drawing) bằng Adobe Illustrator</li><li>Phối hợp với nhà máy để đảm bảo mẫu sản xuất đúng thiết kế</li><li>Nghiên cứu chất liệu, phối màu theo mùa</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Thiết kế Thời trang</li><li>Thành thạo Adobe Illustrator, Photoshop</li><li>Hiểu biết kỹ thuật may, rập</li><li>Kinh nghiệm 2 năm làm tech pack</li></ul>',
  why_join_us = '<ul><li>Kết hợp sáng tạo và kỹ thuật</li><li>Chiết khấu sản phẩm nội bộ 50%</li><li>Được tham gia các triển lãm thời trang</li></ul>'
WHERE slug = 'thiet-ke-ky-thuat-may-technical-fashion-designer-72';

-- (73) Visual Merchandiser
UPDATE jobs SET
  job_reason = '<ul><li>Lương + thưởng mùa sale</li><li>Chiết khấu nhân viên</li><li>Môi trường thời trang sáng tạo</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Trưng bày sản phẩm tại cửa hàng theo concept</li><li>Thiết kế layout cửa hàng, vitrine window display</li><li>Phối hợp với Marketing triển khai chiến dịch mùa mới</li><li>Phân tích hiệu quả trưng bày qua doanh số</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp ngành Thiết kế, Mỹ thuật hoặc Marketing</li><li>Có mắt thẩm mỹ, hiểu biết xu hướng thời trang</li><li>Biết sử dụng Photoshop cơ bản</li><li>Kinh nghiệm VM ít nhất 1 năm</li></ul>',
  why_join_us = '<ul><li>Được sáng tạo display theo ý tưởng riêng</li><li>Chiết khấu nhân viên 30-50%</li><li>Cơ hội thăng tiến lên VM Manager</li></ul>'
WHERE slug = 'chuyen-vien-visual-merchandising-visual-merchandiser-73';

-- (74) Kỹ sư Dệt may
UPDATE jobs SET
  job_reason = '<ul><li>Lương cạnh tranh + phụ cấp KCN</li><li>Xe đưa đón miễn phí</li><li>Bảo hiểm toàn diện</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Vận hành, giám sát máy dệt, nhuộm, hoàn tất</li><li>Kiểm tra chất lượng vải theo tiêu chuẩn kỹ thuật</li><li>Nghiên cứu quy trình dệt/nhuộm mới</li><li>Báo cáo năng suất, đề xuất cải tiến quy trình</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Tốt nghiệp Đại học ngành Công nghệ Dệt may</li><li>Kinh nghiệm 2 năm trong nhà máy dệt</li><li>Hiểu biết về quy trình nhuộm, hoàn tất vải</li><li>Đọc hiểu tiếng Anh kỹ thuật</li></ul>',
  why_join_us = '<ul><li>Xe đưa đón KCN miễn phí</li><li>Thưởng sáng kiến cải tiến</li><li>Lộ trình lên Trưởng phòng Kỹ thuật Dệt</li></ul>'
WHERE slug = 'ky-su-det-may-textile-engineer-74';

-- (75) Chuyên viên Thêu & Hoàn thiện
UPDATE jobs SET
  job_reason = '<ul><li>Phụ cấp tay nghề</li><li>Đào tạo kỹ thuật thêu hiện đại</li><li>Bảo hiểm đầy đủ</li></ul>',
  job_description = '<p><strong>Mô tả công việc</strong></p><ul><li>Thực hiện thêu máy/thêu tay theo mẫu thiết kế</li><li>Kiểm tra chất lượng thêu, hoàn thiện sản phẩm</li><li>Vận hành, bảo trì máy thêu công nghiệp</li><li>Đề xuất kỹ thuật thêu mới, nâng cao chất lượng</li></ul>',
  job_requirements = '<p><strong>Yêu cầu</strong></p><ul><li>Có kinh nghiệm thêu máy công nghiệp</li><li>Tỉ mỉ, khéo tay, mắt tốt</li><li>Biết sử dụng phần mềm thiết kế thêu là lợi thế</li><li>Chịu khó, có tinh thần học hỏi</li></ul>',
  why_join_us = '<ul><li>Phụ cấp tay nghề hấp dẫn</li><li>Được đào tạo kỹ thuật thêu Nhật Bản</li><li>Cơ hội thăng tiến lên Tổ trưởng Thêu</li></ul>'
WHERE slug = 'chuyen-vien-theu-hoan-thien-embroidery-finishing-75';
