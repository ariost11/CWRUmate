import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    constructor(private profileService: ProfileService,
				private router: Router) {
        this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
    }

	invalidSession = false;
    majors = ["Ancient Near / East Egyptian Studies",
		"Anthropology",
		"Art Education",
		"Art History",
		"Asian Studies",
		"Chinese",
		"Classics",
		"Cognitive Science",
		"Communication Sciences",
		"Dance",
		"English",
		"Environmental Studies",
		"French",
		"Francophone Stds",
		"German",
		"German Studies",
		"Gerontological Studies",
		"History",
		"History and Philosophy of Science",
		"International Studies",
		"Japanese Studies",
		"Music",
		"Music Education",
		"Philosophy",
		"Political Science",
		"architecture",
		"Psychology",
		"Religious Studies",
		"Sociology",
		"Spanish",
		"Teacher Education",
		"Theater Arts",
		"Gender Studies",
		"World Literature",
		"Ethnicity",
		"Math and Science",
		"Applied Mathematics",
		"Astronomy",
		"Biochemistry",
		"Biology",
		"Chemical Biology",
		"Chemistry",
		"Data Science and Analytics",
		"Environmental Geology",
		"Evolutionary Biology",
		"Geological Sciences",
		"Mathematics",
		"Mathematics and Physics",
		"Natural Sciences",
		"Neuroscience",
		"Nutrition",
		"Metabolism",
		"Origins Sciences",
		"Physics",
		"Statistics",
		"Systems Biology",
		"Aerospace Engineering",
		"Biomedical Engineering",
		"Chemical Engineering",
		"Civil Engineering",
		"Computer Engineering",
		"Computer Science",
		"Electrical Engineering",
		"Engineering Physics",
		"Engineering undesignated",
		"Materials Science and Engr",
		"Mechanical Engineering",
		"Polymer Science and Engineering",
		"Systems and Control Engineering",
		"Management",
		"Accounting",
		"Economics",
		"Finance",
		"Marketing", 
		"Nursing"
    ];
	clubs = [
		"#MeToo",
		"Academic Integrity Board",
		"Academic Support Resources for Students",
		"Academy of LDS Dentists",
		"Access Services",
		"Acts of Random Kindness",
		"Administrative Professionals Network",
		"Advanced Professional Degree Consulting Club",
		"Advocates for Cleveland Health",
		"Advocates for Immigrants & Diversity",
		"Aerospace Medicine Student and Resident Organization",
		"African American Society",
		"African and African American Studies Minor",
		"African Students Association",
		"Alcohol Use Reporting",
		"Alianza Latina/Latino Alliance",
		"All of Us Program",
		"Alliance for Nontraditional and Transfer Students",
		"Alpha Chi Omega",
		"Alpha Chi Sigma",
		"Alpha Eta Mu Beta",
		"Alpha Gamma Delta",
		"Alpha Kappa Alpha",
		"Alpha Kappa Psi",
		"Alpha Phi",
		"Alpha Phi Alpha",
		"Alpha Phi Omega",
		"American Association of Public Health Dentistry Student Chapter",
		"American Constitution Society",
		"American Dental Education Association",
		"American Institute of Chemical Engineers",
		"American Marketing Association",
		"American Medical Student Association",
		"American Medical Women’s Association: Case Western Reserve University Chapter",
		"American Mock World Health Organization",
		"American Red Cross Club",
		"American Sign Language Club",
		"American Society of Civil Engineers",
		"American Student Dental Association",
		"Amistad (Spanish Conversation Club)",
		"Amnesty International",
		"Anatomy Graduate Student Organization",
		"Animal Legal Defense Fund Student Chapter",
		"Anthropology Student Association",
		"Anti-Trafficking Advocacy Team",
		"App Innovators and Developers Club",
		"Applied Data Science",
		"Arab Medical Student Association",
		"Archery Club",
		"Art Forward",
		"Art to Heart",
		"Asian American Alliance",
		"Asian Law Students' Association",
		"Asian Pacific American Medical Student Association",
		"Association for Computing Machinery",
		"Association for Computing Machinery Women's Student Chapter",
		"Association of Women for Mathematics",
		"Association of Women Surgeons",
		"Atlantis",
		"Auxiliary Services",
		"Awareness for Alzheimer's",
		"Baja SAE",
		"Bangladeshi Student Association",
		"Beta Alpha Psi",
		"Beta Theta Pi",
		"BeTheMatch",
		"Big Brothers Big Sisters at CWRU",
		"Big Buddies",
		"Big Games Club",
		"Billion Bottle Project",
		"Biochemistry",
		"Bioethics Center for Community Health and Genomic Equity",
		"Biomedical Engineering Department",
		"Biomedical Engineering Graduate Student Association",
		"Biomedical Engineering Society",
		"Biomedical Graduate Student Organization",
		"Biomedical Graduate Student Symposium",
		"Biophysics Club",
		"Black Graduate and Professional Student Association",
		"Black Latinx Athlete Coalition",
		"Black Law Students Association",
		"Black Men in Medicine",
		"Bon Appetit Management Company",
		"Boxing Club of CWRU",
		"Boys and Girls CWRU",
		"Brain Exercise Initiative",
		"Brazilian Student Association",
		"Brazilian Undergraduate Cultural Association",
		"Business in Dentistry Club",
		"Buy Nothing Project",
		"Calisthenics Club",
		"Camp Kesem",
		"Campus Canines for a Cure",
		"Car Club",
		"Career Center",
		"Caregivers @ CWRU",
		"Carlton Road Community",
		"Carlton Road Community Council",
		"Case Aeronautics Team",
		"Case Alliance Dental Association",
		"Case Amateur Radio Club",
		"Case Association of Student-Athletes",
		"Case Cares",
		"Case CobRAAS",
		"Case College Republicans",
		"Case Comedy Club",
		"Case Comprehensive Cancer Center",
		"Case Crew",
		"Case Democrats",
		"Case Engineers Council",
		"Case for Life",
		"Case for Sight",
		"Case Glee Club",
		"Case Grill",
		"Case Hinduism Club",
		"Case In Point",
		"Case Iranian Society",
		"Case Kismat Fusion Dance Team",
		"Case Mechanics",
		"Case Med Pride",
		"Case Motorcycle Club",
		"Case Mountain Biking Club",
		"Case Nepali Student Organization",
		"Case Neuroscience Society",
		"Case Origami Circle",
		"Case Quantum Computing",
		"Case Reserve Review",
		"Case Review Club",
		"Case Riding Team",
		"Case Rocket Team",
		"Case Sound Society",
		"Case Sports Analytics Association",
		"Case Surgical Society",
		"Case University Circle Orchestra",
		"Case Western Libertarians",
		"CaseCONNECT",
		"CaseMed Golf Association",
		"CaseMed Real Estate Interest Group",
		"Cedar Magnolia Community Council",
		"Cedar Magnolia Residential Community",
		"Center for Civic Engagement & Learning",
		"CWRUVotes",
		"Center for International Affairs",
		"Center on Trauma and Adversity",
		"Ceramic Art Club",
		"Chabad Student Group",
		"Chemical Engineering Graduate Student Organization",
		"Chemistry Graduate Student Association",
		"Chess Club",
		"Cheza Nzuri Dance Team",
		"Chinese Christian Student Fellowship",
		"Chinese Speaking Christian Ministry",
		"Chinese Student Dental Association",
		"Chinese Students and Scholars Union",
		"Choirs at CWRU",
		"Christian Legal Society",
		"Christians on Campus",
		"Clarke Tower Community",
		"Clarke Tower Community Council",
		"Class of 2023",
		"Class of 2024",
		"Class of 2025",
		"Class of 2026",
		"Class of 2027",
		"Class Officer Collective",
		"Cleveland Liberty Expressions",
		"Cleveland Public Schools Connection",
		"Climate Action Network",
		"Climate Reality Campus Corps: Case Western Reserve University Chapter",
		"Climbing Club",
		"Club Badminton",
		"Club Sports",
		"Water Polo Club",
		"Cognitive Science",
		"Cognitive Science Student Organization",
		"College Diabetes Network",
		"College of Arts and Sciences Dean's Office",
		"Department of Music",
		"Collegiate Connections Peer Mentoring Program",
		"Community of Advocates for Representation in Engineering",
		"Commuter and Off-Campus Organization",
		"Compassion In Action",
		"Competitive Programming",
		"Computer and Data Sciences & Electrical, Computer, and Systems Engineering Student Affairs",
		"Consult Your Community",
		"Cooking Club",
		"Corporate Finance & Law Alliance",
		"Cracking the Case Mystery Book Club",
		"Craniofacial Club",
		"Crespo Research Group",
		"Cricket Club",
		"Crossroads of Healthcare",
		"Cru",
		"CURE CWRU",
		"CWRU American Chemical Society",
		"CWRU Art History Club",
		"CWRU Bookstore",
		"CWRU Boxing",
		"CWRU CampusGroups Support",
		"CWRU Chamber Collective",
		"CWRU China - US Medical Summit",
		"CWRU Club Basketball",
		"CWRU Cycling",
		"CWRU Developer Student Club",
		"CWRU Electrochemical Society Student Chapter",
		"CWRU EMS",
		"CWRU Entrepreneurship",
		"Entrepreneurship Club",
		"CWRU Equal Opportunity for All",
		"CWRU Fashion Club",
		"CWRU Footlighters",
		"CWRU for Autism Acceptance",
		"CWRU Forums",
		"CWRU Geological Society",
		"CWRU Handball",
		"CWRU Health & Wellness Council",
		"CWRU IEEE",
		"CWRU International Genetically Modified Machine (iGEM)",
		"CWRU IRON",
		"CWRU Jump Rope",
		"CWRU LaunchNet",
		"CWRU Law Refugee Outreach Collective",
		"CWRU Law Toastmasters",
		"CWRU Lego Club",
		"CWRU LIFT",
		"CWRU MedWish",
		"CWRU Music Therapy Club",
		"CWRU Pediatric Dentistry Club",
		"CWRU Physician Assistant Student Society",
		"CWRU Podcast",
		"CWRU Poker Club",
		"CWRU Posse",
		"CWRU Postdoctoral Association",
		"CWRU Public Health Association",
		"CWRU Quizbowl",
		"CWRU Sailing Team",
		"CWRU Science and Human Rights Coalition",
		"CWRU Science Olympiad Organization",
		"CWRU Slackline Club",
		"CWRU Smash Club",
		"CWRU Snowmowers",
		"CWRU Society for Biomaterials",
		"CWRU Society for Constitutional Policy",
		"CWRU SPIE Student Chapter",
		"CWRU Sports Dentistry Club",
		"CWRU Student National Dental Association",
		"CWRU Surfing Club",
		"CWRU Taiko",
		"CWRU Taiwanese Student Association",
		"CWRU Thai Student Association",
		"CWRU Undergraduate Biochemistry Society",
		"CWRU Unite for Reproductive and Gender Equity",
		"CWRU Wilderness Society",
		"CWRU Writing Program",
		"CWRUfit",
		"CWRUVotes",
		"Dancaholic",
		"Data Governance Committee",
		"Data Science Club",
		"Debate Club",
		"Deeper Life Campus Fellowship",
		"Delta Chi",
		"Delta Epsilon Mu",
		"Delta Gamma",
		"Delta Sigma Delta Dental Fraternity",
		"Delta Sigma Phi",
		"Delta Sigma Theta",
		"Delta Tau Delta",
		"Delta Theta Phi",
		"Delta Upsilon",
		"Dental Branch of Christian Medical and Dental  Association",
		"Dental Medicine Endodontics Club",
		"Dental Medicine Periodontics Club",
		"Dental Photography Club",
		"Department of Art History and Art",
		"Department of Bioethics",
		"Department of Biology",
		"Department of Biology Director of Graduate Studies' Council",
		"Department of Classics",
		"Department of Economics",
		"Department of Macromolecular Science and Engineering",
		"Department of Modern Languages and Literatures",
		"Department of Music",
		"Department of Neurosciences",
		"Department of Physics",
		"Department of Physiology and Biophysics",
		"Department of Population and Quantitative Health Sciences",
		"Der Deutsche Verein/German Society",
		"Desi Dental Students Club",
		"Design For America",
		"Dhamakapella",
		"digiCWRU",
		"Disability Law Society",
		"Disabled Spartans Alliance",
		"Disc Golf Club",
		"Discussions Undergraduate Research Journal of CWRU",
		"Diversity, Equity, and Inclusion Committee",
		"Division of Engineering Leadership and Professional Practice",
		"Division of Public Safety",
		"Division of Student Affairs",
		"Office of Graduate Student Life",
		"Graduate Student Appreciation Week",
		"Doc Opera",
		"Docs on Rocks Climbing Club",
		"DOPEamine Dance Club",
		"DOSA Social Media Ambassadors",
		"Duolingo",
		"Earth, Environmental, and Planetary Sciences",
		"Electronic Music Cooperative",
		"Emerging Leaders Program",
		"Emeriti Affairs",
		"Empower Expression at CWRU",
		"Engineering Co-op Program",
		"Engineering Graduate Government",
		"Graduate Materials Society",
		"Engineering Peer Advisors",
		"Engineers without Borders/Humanitarian Design Corps",
		"English Graduate Student Association",
		"English Major/Minor, Creative Writing/Film Minors",
		"Ensemble (French Club)",
		"Entrepreneurship Club",
		"Entrepreneurship Through Acquisition",
		"Epic Movement",
		"Esports Club",
		"Eta Sigma Phi",
		"Explore",
		"Faculty Mentoring Collaborative",
		"Faculty Parents' Group",
		"Faculty Senate",
		"Family Medicine Interest Group",
		"Fancy, Always Fancy",
		"Federal Bar Association",
		"Federalist Society",
		"FEMAL: Feminine Empowerment in Media, Arts, and Literature",
		"Fencing Club",
		"Figure Skating Club",
		"Filipino Student Union",
		"Film Minor, English Major with a Concentration in Film",
		"Firearms Club",
		"FIRST Alumni and Robotics at CWRU",
		"First CWRU",
		"First Year Experience",
		"Fitness Exploration Community",
		"Flora Stone Mather Center for Women",
		"Fly Fishing Club",
		"Flying Club",
		"FOCUS Group: Project STEP-UP",
		"Food Recovery Network",
		"Forté Rising Stars",
		"Fowler Center for Business as an Agent of World Benefit",
		"Friends of MSF",
		"Game Development Club",
		"Gamma Sigma Alpha",
		"Garden@Case",
		"Girls Who Code",
		"Global Ethical Leaders Society",
		"Global Health Design Collaborative",
		"Global Medical Brigades",
		"Golden Key International Honour Society",
		"Graduate Art History Association",
		"Graduate Association of Medieval Studies",
		"Graduate Business Student Association",
		"Graduate Civil Engineering Student Association",
		"Graduate Council of Arts & Sciences",
		"Graduate Discourse, The Anthropology Graduate Student Organization",
		"Graduate Materials Society",
		"Graduate Pickleball Club",
		"Graduate Society of Women Engineers",
		"Graduate Student and Postdoc Coaching Program",
		"Graduate Student Appreciation Week",
		"Graduate Student Council",
		"Graduate Student Experience Committee",
		"Graduate Student Nurses Association",
		"Graduate Student Organization of Pharmacology",
		"Graduate Student Peer Review and Editing Program",
		"Grappling Club",
		"Great Lakes Energy Institute",
		"Greek Advisors",
		"Greek Games Committee",
		"Greek Life Office",
		"Guitar Club",
		"Habitat for Humanity",
		"HackCWRU",
		"Health Advocacy Organization",
		"Health Education & Leadership in Physiology",
		"Health Matrix",
		"Henna Art Collective",
		"Hillel",
		"Hispanic Student Dental Association",
		"Holden Surgical Society",
		"Homecoming",
		"Homeless Outreach Medical Education and Support",
		"Horizons at CWRU",
		"HR Professional Development Center",
		"Humanities@Work",
		"HyperCase",
		"Ice Hockey",
		"Impact Movement",
		"IMPROVment",
		"IMPULSE",
		"Inamori International Center for Ethics and Excellence",
		"Independent Living Experience",
		"Institute for Healthcare Improvement Case Open School Chapter",
		"Institute for Smart, Secure and Connected Systems",
		"Interactive Commons",
		"Interfraternity Congress/Panhellenic Council",
		"International Center for Autism Research and Education",
		"International Club",
		"International Law Society",
		"International Student Fellowship",
		"International Studies",
		"InterSociety Council",
		"InterVarsity Christian Fellowship- Undergrad Chapter",
		"japanCASE",
		"Jewels, Incorporated",
		"Jewish Law Students Association",
		"Jewish Student Union",
		"Journal Club",
		"Judo Club",
		"Juggling Club",
		"Juniper Community Council",
		"Juniper Residential Community",
		"K-Pop Dance Club",
		"Kappa Alpha Theta",
		"Kelvin Smith Library",
		"Kendo Club",
		"Kids Against Hunger Cleveland",
		"Know Your Neighbors",
		"Korean American Dental Association",
		"Korean American Student Association",
		"Korean Student Association",
		"Kung Fu Club",
		"La Alianza",
		"La Dolce Vita",
		"Labor and Employment Law Society",
		"Lacrosse Club",
		"Lambda Eta Mu",
		"Lambda Law Students Association",
		"Latino Medical Student Association Pre-Health Latin Undergraduate Society",
		"LatinX Law Students Association",
		"Law and Political Economy Society",
		"Law for Environment, Animals and Food",
		"Law IT",
		"Law Students",
		"Law Students for Reproductive Freedom",
		"Learn To Be",
		"Lesbian Gay Bisexual Transgender Center",
		"Lideres Avanzando CWRU",
		"Local Inspirational Figures Talk",
		"Love Your Melon",
		"LUX",
		"Macromolecular Student Organization",
		"Mahjong Club",
		"Maltz Performing Arts Center",
		"Managing the Cost of Healthcare",
		"Mandel Allies",
		"Mandel Council",
		"Mandel School Academic Affairs",
		"Mandel School Black Student Association",
		"Mandel School Student Services",
		"March For Our Lives",
		"Masculinity Mondays",
		"Master of Engineering and Management Program",
		"Master of Science in Anesthesia Program",
		"Math Club",
		"Mathematics Graduate Student Association",
		"Mather Dance Collective",
		"Mechanical and Aerospace Engineering Grad Student Association",
		"Medical Education Team",
		"Medical Pre-Medical Union",
		"Medicine in Motion",
		"Medicine, Education, Development for Low Income Families Everywhere",
		"Medieval Combat Club",
		"Middle Eastern Cultural Association",
		"Middle Eastern North African",
		"Mindfulness Matters",
		"Minority Association for Premedical Students",
		"Minority Business Alliance",
		"Minority Graduate Student Organization",
		"Mistletoe Community Council",
		"Mistletoe Residential Community",
		"Model United Nations",
		"Mortar Board National College Senior Honor Society Lux Chapter",
		"MSASS Developmental Disabilities Advocacy Group",
		"MSTP Council",
		"MTG at CWRU",
		"Multicultural Club",
		"Murray Hill Community",
		"Murray Hill Community Council",
		"Music Graduate Student Association",
		"Music Undergraduate Student Involvement Committee",
		"Muslim Law Students Association",
		"Muslim Student Association",
		"Naach Di CWRU",
		"Naadam",
		"National Alliance on Mental Illness (NAMI) on Campus",
		"National Lawyer's Guild",
		"National Pan-Hellenic Council",
		"National Residence Hall Honorary",
		"National Security Law Society",
		"National Society of Black Engineers",
		"National Society of Leadership & Success",
		"National Student Speech Language Hearing Association",
		"National Youth Sports Program",
		"Neuroscience Graduate Student Organization",
		"New Website Builder Test Group",
		"Newman Catholic Student Association",
		"Nigerian Student Association",
		"Nritya Dance Team",
		"OB/GYN Interest Group",
		"Office for Diversity, Equity, and Inclusive Engagement",
		"Office of Accommodated Testing & Services",
		"Office of Annual Giving",
		"Office of Energy & Sustainability",
		"Office of Equity",
		"Office of Faculty Development",
		"Office of Foreign Graduate Legal Studies",
		"Office of General Counsel",
		"Office of Government & Community Relations",
		"Office of Graduate Student Life",
		"Graduate Student Appreciation Week",
		"Office of Immigration and Human Resources",
		"Office of Institutional Research",
		"Office of Interprofessional and Interdisciplinary Education and Research",
		"Office of Multicultural Affairs",
		"Office of Research and Technology Management",
		"Office of Residence Life",
		"Office of Student Activities & Leadership",
		"SA&L Event Centers",
		"Sparta Center",
		"Office of the Provost",
		"Ohio Collegiate Music Education Association",
		"Ohio Society of CPAs",
		"Ohio Student Association",
		"One to One Fitness",
		"Open Ground",
		"Operation Smile University Club",
		"Oral and Maxillofacial Surgery Club",
		"Order of Omega",
		"Origins Club",
		"Orthodontics and Craniofacial Orthodontics Club",
		"Orthopedic Interest Group",
		"oSTEM",
		"Paint Club",
		"Pakistani Student Association",
		"Partners In Health Engage",
		"Pathology Graduate Student Council",
		"Peer Health Educators",
		"Peer Tutoring",
		"Pep Band",
		"PERIOD @ CWRU",
		"PhD Student Nurses Association",
		"Phi Alpha Delta",
		"Phi Delta Epsilon",
		"Phi Delta Theta",
		"Phi Gamma Delta",
		"Phi Kappa Psi",
		"Phi Kappa Theta",
		"Phi Mu",
		"Phi Sigma Rho",
		"Phi Sigma Tau",
		"Philosophy",
		"Photography Club",
		"Physical Education & Athletics",
		"Physical Resource Center (Free Store)",
		"Physician Musicians",
		"Physics Graduate Student Association",
		"Pi Beta Phi",
		"Pi Kappa Phi",
		"Pickleball Club",
		"Planned Parenthood at CWRU",
		"Players' Theatre Group",
		"Political Science Department",
		"Polyglot Gathering",
		"Power Automate Interest Group",
		"Pre Dental Society",
		"Pre-Physician Assistant Club",
		"Pre-Veterinary Medical Association",
		"Precious Plastics",
		"Primary Care Progress Student Action Network Chapter",
		"Procurement, Distribution Services and Accounts Payable",
		"Professional Development Day Committee",
		"Project Sunshine",
		"Project Ukraine",
		"Provost Scholars",
		"Psi Omega Dental Fraternity",
		"Psychological Sciences Graduate Student Organization",
		"Puzzle Club",
		"QGrad: The LGBTQA+ Graduate Student Association",
		"Quidditch Team",
		"Racquetball Club",
		"Radical Student Union",
		"Refugee Outreach Collective at CWRU",
		"RElax, Music, Dance and Exercise Club",
		"Relay for Life",
		"Religious Studies",
		"Remote Area Medical CWRU",
		"Research Club for Dental, Oral, and Craniofacial Medicine",
		"Residence Hall Association",
		"Carlton Road Community Council",
		"Cedar Magnolia Community Council",
		"Clarke Tower Community Council",
		"Juniper Community Council",
		"Mistletoe Community Council",
		"Murray Hill Community Council",
		"Triangle Community Council",
		"Upperclass Community Council",
		"Robotics Club",
		"Roleplaying Games Club",
		"SA&L Event Centers",
		"Safety & Wellness Committee",
		"Salsa Dance Club",
		"SATRANG",
		"Saudi Health Practitioners of North America",
		"Saudi Student Union at CWRU",
		"Saudi Students Association at CWRU",
		"School of Dental Medicine Admissions",
		"School of Dental Medicine Class of 2023",
		"School of Dental Medicine Class of 2024",
		"School of Dental Medicine Class of 2025",
		"School of Dental Medicine Class of 2026",
		"School of Engineering Soccer Club",
		"School of Graduate Studies",
		"School of Medicine Committee of Student Representatives",
		"School of Medicine Dean's Office",
		"School of Medicine Development and Alumni Relations",
		"School of Medicine Faculty Affairs and Human Resources",
		"School of Medicine Graduate Education Office",
		"School of Medicine Medical Education",
		"School of Medicine Office of Curricular Affairs",
		"School of Medicine Office of Diversity, Equity, and Inclusive Excellence",
		"School of Medicine Office of Innovation and Entrepreneurship",
		"School of Medicine Office of Student Affairs",
		"School of Medicine Registrar's Office",
		"School of Medicine Students With Families Affinity Group",
		"Schubert Center for Child Studies",
		"Se-xy",
		"Sears think[box]",
		"SEC Allocations Committee",
		"SEC Student Presidents' Roundtable",
		"Senior Week",
		"Sexual Assault and Violence Educators",
		"SGI Buddhists for Happiness",
		"Shadowing Case By Case",
		"Share the Loaf: Making the World a Breader Place",
		"She's the First CWRU",
		"Sigma Alpha Epsilon",
		"Sigma Chi",
		"Sigma Gamma Rho Sorority, Inc.",
		"Sigma Iota Rho",
		"Sigma Lambda Gamma",
		"Sigma Nu",
		"Sigma Phi Epsilon",
		"Sigma Psi",
		"Sigma Sigma Sigma",
		"Sigma Tau Delta, Beta Beta Chapter",
		"Silambam",
		"Ski and Snowboard Club",
		"SKY Campus Happiness",
		"Slow Food",
		"Soccer Club",
		"Social Justice Institute",
		"Social Work and Non-Profit Management",
		"Society for Industrial and Applied Mathematics",
		"Society of Hispanic Professional Engineers",
		"Society of Physics and Astronomy Students",
		"Society of Women Engineers",
		"Sociology Graduate Student Association",
		"Solstice",
		"SOM Black Women Physicians Collaborative",
		"SOURCE",
		"South Asian Law Student Association",
		"South Asian Medical Student Association",
		"Space Law Society",
		"SPARC [conversations]",
		"Sparta Center",
		"Spartan Bhangra",
		"Spartan Bicycle Shop",
		"Spartan Cheer",
		"Spartan Dance Team",
		"Spartan Rugby",
		"Spartan Running Club",
		"Spartan Tappers",
		"Spartans for Special Olympics",
		"SpartanTHON",
		"Special Care Dentistry Club",
		"Spikeball Club",
		"Spoken English Programs and SELP Tutoring",
		"Sports & Entertainment Law Society",
		"Springfest Committee",
		"Sri Lankan Graduate Student Association",
		"Steel Bridge Team",
		"Steel Drum Ensemble",
		"Stop The Bleed",
		"Street Law",
		"StrengthsQuest",
		"Student Activities & Leadership Ambassadors",
		"Student Advocacy Group",
		"Student Affairs Assessment Committee",
		"Student Bar Association",
		"Student Caregivers",
		"Student Community at Covenant",
		"Student Dietetic Association",
		"Student Elections",
		"Student Financial Services",
		"Student Golfers' Association",
		"Student Health Law Association",
		"Student Intellectual Property Law Association",
		"Student Legislative Initiative of Cleveland",
		"Student Life Professional Development Committee",
		"Student Public Interest Law Group",
		"Student Sustainability Council",
		"Student Turning Point Society",
		"Students Against Cancer",
		"Students for a National Health Program",
		"Students for Justice in Palestine",
		"Students For Sensible Drug Policy",
		"Students for Socialist Revolution",
		"Students for the Exploration and Development of Space (SEDS)",
		"Students Meeting About Risk and Responsibility Training",
		"Studio 300",
		"Study Abroad",
		"Summer Experience",
		"Summer Health & Academic Enrichment Program",
		"Sunrise CWRU",
		"Sustainability and Health Student Association",
		"Sustained Dialogue @ CWRU",
		"Swetland Center",
		"Swing Dance Club",
		"Synapse",
		"Systems Biology Society",
		"Table Tennis Club",
		"Tableau User Group",
		"Tabletop Empire",
		"Tabletop Entertainment in Dentistry Club",
		"Taekwondo Club",
		"Taiwanese American Student Association",
		"Tau Sigma Military Dentistry Club",
		"Tea & Chocolate Club",
		"Tea Club",
		"Teacher Education",
		"Technology Transfer Office",
		"TEDx at CWRU",
		"Tennis Club",
		"Test Group",
		"Thai Student Association",
		"The ABC Book Club",
		"The Alumni Association",
		"The Athenian",
		"The Ballet Collective",
		"The Black Student Union",
		"The Board Meeting",
		"The Brotherhood",
		"The Case Orthodontics Club",
		"The Feminist Collective",
		"The Film Society",
		"The Flea Market",
		"The Hidden Opponent at CWRU",
		"The International and Multicultural Exchange",
		"The Interreligious Council",
		"The Letterboxing Club",
		"The Mandel School Student-Alumni Network",
		"The Mediterranean Cultural Club",
		"The Motley CWRU (Scuba Club)",
		"The Observer",
		"The Resistance",
		"The Sisterhood",
		"The Student-Run Health Clinic",
		"The Toastmasters Club",
		"The Underrepresented Minority Women in STEM",
		"The Weatherhead Fund",
		"The Women's Network",
		"Theta Chi",
		"Theta Pi Sigma",
		"Theta Tau",
		"Third Culture Kids at CWRU",
		"Three Minute Thesis Competition",
		"Thwing Student Center",
		"Thwing Study Over Committee",
		"Tour Guides",
		"Triangle Community Council",
		"Triangle Residential Community",
		"Tsunagari Japan",
		"Turkish Student Association",
		"UCITE",
		"UGEN & Executive IT Support",
		"Ultimate Frisbee Club",
		"Ultrasound Interest Group",
		"Unconventional Art Collective",
		"Undergraduate Advising Support",
		"Undergraduate Diversity Collaborative",
		"Brazilian Undergraduate Cultural Association",
		"Cooking Club",
		"Undergraduate Health Sciences Collaborative",
		"Undergraduate Indian Students Association",
		"Undergraduate Macromolecular Student Organization",
		"Undergraduate Materials Society",
		"Undergraduate Military Science Club",
		"Undergraduate Mock Trial",
		"Undergraduate Psychology Student Organization",
		"Undergraduate Research Society",
		"Undergraduate Society for Bioethics and Health Humanities",
		"Undergraduate Student Government",
		"Big Games Club",
		"Spartan Bicycle Shop",
		"Undergraduate Student Nurse's Association",
		"Undivided",
		"UNICEF",
		"UNICEF at CWRU",
		"Union of Turkish Students",
		"United Protestant Campus Ministries",
		"United World Colleges Network",
		"Universal Health Aid at CWRU",
		"Universities Allied for Essential Medicines",
		"University Conduct Board",
		"University Events",
		"University Farm",
		"University Health and Counseling Services",
		"University Housing",
		"University Media Board",
		"CWRU Footlighters",
		"Studio 300",
		"The Athenian",
		"WRUW FM",
		"University Program Board",
		"University Spirit Committee",
		"University Technology",
		"Uplift CWRU",
		"Upperclass Community Council",
		"Upperclass Experience",
		"Vietnamese Student Association",
		"VISA Office",
		"Voices of Glory",
		"Volleyball Club",
		"Vote Everywhere",
		"Wakeboard and Waterski Team",
		"Water Polo Club",
		"Weatherhead Club Leaders",
		"Weatherhead Consulting Club",
		"Weatherhead Design Club",
		"Weatherhead Economics Society",
		"Weatherhead Entrepreneurship Club",
		"Weatherhead Finance Club",
		"Weatherhead GARP",
		"Weatherhead Healthcare Club",
		"Weatherhead Marketing Club",
		"Weatherhead Multicultural Club",
		"Weatherhead Operations Club",
		"Weatherhead Student Experience",
		"Graduate Business Student Association",
		"Weatherhead Consulting Club",
		"Weatherhead Design Club",
		"Weatherhead Entrepreneurship Club",
		"Weatherhead Finance Club",
		"Weatherhead GARP",
		"Weatherhead Healthcare Club",
		"Weatherhead Marketing Club",
		"Weatherhead Multicultural Club",
		"Weatherhead Operations Club",
		"Weatherhead Women in Business",
		"Weatherhead Undergraduate Programs",
		"Weatherhead Women in Business",
		"Wellness and Health Ambassadors",
		"Wolstein Society",
		"Women Faculty of the School of Medicine",
		"Women In Dentistry Club",
		"Women in Economics",
		"Women in Finance",
		"Women in Physics and Astronomy Club",
		"Women in Science and Engineering Roundtable",
		"Women In Science and Humanities Earning Doctorates",
		"Women in Tech Law",
		"Women's Law Association",
		"Women's Weightlifting Club",
		"Writers Writing Words",
		"Wrongful Convictions Club",
		"WRUW FM",
		"X Dance Crew",
		"Yarn Arts Club",
		"Yemen Accountability Project",
		"Yoga Club",
		"Young Writers of Cleveland",
		"Youth Alliance for Activism in Society",
		"Youth for Sewa",
		"Youth Movement Against Alzheimer’s CWRU",
		"Youth Programs",
		"Zeta Beta Tau",		
	];
    questionIndex = 0;
    questions = [
		'What is your name?',
		'Please upload a photo of yourself! (Portrait Aspect Ratio Recommended 9:16)',
		'When is your birthday?',
		'What year are you?',
		'Please create your bio!',
		'What is your gender?',
		'What gender(s) are you looking for?', 
		'What is your Major?', 
		'What clubs are you a part of?', 
		'What is your ideal campus date?', 
		'What are you looking for?',
		'What is your political leaning?',
		'Apple or Android?',
		'What is your religion?',
		'What is your mother\'s maiden name',
		'What is the passphrase to your case email?',
		'Pick one- MELT U, PK, or Pinzas',
		'What is your favorite study spot on campus?',
		'What is your favorite season?',
    ];
    answers: any[] = [];
    caseID = '';
	picture: string = '';
	genderOptions = ['Man', 'Woman', 'Non-Binary', 'Gender Fluid']
	lookingForOptions = ['Short Term', 'Long Term', 'Friends', 'Study Buddies', 'Not Sure'];
	tinkFoods = ['MELT U', 'PK', 'Pinzas'];
	seasons = ['Autumn', 'Winter', 'Spring', 'Summer'];

	onFilesSelected(event: any) {
		const file = event.target.files[0];
		this.answers[this.questionIndex] = file;
		// if (files.length === 0)
		// 	return;

		// code for single file
		// const reader = new FileReader();
		// reader.readAsDataURL(file);
		// reader.onload = (_event) => {
		// 	this.picture = String(reader.result).split(',')[1];
		// 	this.answers[this.questionIndex] = this.picture;
		// }

		// for(let file of files) {
		// 	reader.readAsDataURL(file); 
		// 	reader.onload = (_event) => { 
		// 		this.pictures.push(String(reader.result).split(',')[1]);
		// 	}
		// }

		// if(this.pictures[0] === '')
		// 	this.pictures.shift();
	}

	updateCheckbox() {
		var array = [];
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		
		for (var i = 0; i < checkboxes.length; i++)
			array.push((checkboxes[i] as HTMLInputElement).value);

		this.answers[this.questionIndex] = array;
	}

	setProfile() {
		//setup API call
		console.log(this.answers);
		this.profileService.setProfile(this.caseID, this.answers).subscribe(resp => {
			console.log(resp);
			if(resp.resp === 'SUCCESS') {
				this.invalidSession = false;
				this.router.navigate(['/home'],  { state: {caseID: this.caseID} });
			} else 
				this.invalidSession = true;
		}, err => this.invalidSession = true);
	}

	easyAPI() {
		this.profileService.easySetProfile(this.answers).subscribe(resp => {
			console.log(resp);
			if(resp.resp === 'SUCCESS') {
				this.invalidSession = false;
				this.router.navigate(['/home'],  { state: {caseID: this.caseID} });
			} else 
				this.invalidSession = true;
		}, err => this.invalidSession = true);
	}
}