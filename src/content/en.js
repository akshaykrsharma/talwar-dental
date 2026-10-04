/**
 * English copy for the whole site.
 * Keep this file's structure identical to the other language file (a unit test enforces it).
 * Placeholders such as {count} are filled in by utils/format.js.
 */
const en = {
  clinicName: "Talwar Dental Care",
  nav: {
    about: "About",
    services: "Treatments",
    clinic: "Clinic",
    reviews: "Reviews",
    contact: "Contact",
    call: "Call now",
    book: "Book appointment",
    menu: "Menu",
    label: "Main",
  },
  hero: {
    eyebrow: "Dental implants & smile care in Mansarovar, Jaipur",
    title: "Calm, precise dental care for a smile you're proud of",
    text: "At Talwar Dental Care, Dr. Anish Talwar explains every step, treats with care, and plans each case around how you want to eat, speak and smile.",
    primary: "Book appointment",
    secondary: "Explore treatments",
    stats: [
      {
        value: "10+",
        label: "years of clinical practice",
      },
      {
        value: "MDS",
        label: "Oral & Maxillofacial Surgery",
      },
      {
        value: "9–6",
        label: "open every day",
      },
    ],
    badgeTitle: "Open every day",
    badgeSub: "9 AM – 6 PM",
    slideshow: {
      label: "Clinic photo gallery",
      prev: "Previous photo",
      next: "Next photo",
      goTo: "Go to photo",
      slides: [
        {
          id: "reception",
          title: "Reception & waiting area",
          text: "A calm, comfortable place to wait.",
        },
        {
          id: "smilewall",
          title: "Waiting lounge",
          text: "“That smile looks good on you.”",
        },
        {
          id: "xray",
          title: "In-house digital X-ray",
          text: "Imaging done on site, no outside lab visits.",
        },
        {
          id: "room",
          title: "Treatment room",
          text: "Bright, clean and fully equipped.",
        },
        {
          id: "chair",
          title: "Dental chair",
          text: "Built for comfort during longer procedures.",
        },
        {
          id: "screen",
          title: "On-screen X-ray review",
          text: "See what we see, before treatment begins.",
        },
        {
          id: "desk",
          title: "Front desk",
          text: "Friendly help with appointments and queries.",
        },
      ],
    },
  },
  welcome: {
    title: "Modern dentistry, explained in plain words",
    text: "From a single root canal to a full-mouth implant rehabilitation, every treatment starts with a proper diagnosis, a clear plan and an honest conversation about your options.",
    cta: "Meet the doctor",
  },
  doctor: {
    kicker: "Your dentist",
    name: "Dr. Anish Talwar",
    role: "Dentist · Implantologist · Oral & Maxillofacial Surgeon",
    bio: "Dr. Talwar holds a BDS and an MDS in Oral & Maxillofacial Surgery, with ten years of clinical practice. Patients often mention how patiently he explains each step, from the treatment plan to aftercare.",
    credTitle: "Qualifications",
    creds: ["BDS", "MDS – Oral & Maxillofacial Surgery", "10 years of clinical practice"],
    memTitle: "Memberships",
    mems: [
      "Association of Oral and Maxillofacial Surgeons of India",
      "Indian Dental Association",
      "International Congress of Oral Implantologists",
    ],
    title: "Care that is explained, comfortable and planned around you",
    features: [
      {
        title: "Every step explained",
        text: "You know what is being done, why, and what to expect afterwards.",
      },
      {
        title: "Comfort comes first",
        text: "Treatment is planned to keep you at ease, including if you are nervous.",
      },
      {
        title: "Teeth from day one",
        text: "In implant cases we plan immediate fixed teeth wherever it is clinically suitable.",
      },
    ],
    cta: "Book a consultation",
  },
  services: {
    title: "Treatments for every stage of your smile",
    text: "Choose a treatment to start your booking, or call us if you are not sure what you need.",
    cta: "Book this treatment",
    items: [
      {
        id: "implants",
        title: "Dental implants",
        text: "Single implants to full-mouth rehabilitation, with immediate fixed teeth where suitable.",
      },
      {
        id: "smile",
        title: "Smile makeover & crowns",
        text: "Zirconia crowns and cosmetic correction that look natural and last.",
      },
      {
        id: "rct",
        title: "Root canal treatment",
        text: "Gentle, pain-free RCT, often completed in a single sitting.",
      },
      {
        id: "surgery",
        title: "Oral & maxillofacial surgery",
        text: "Wisdom tooth removal and jaw surgery, handled by a trained oral surgeon.",
      },
      {
        id: "gums",
        title: "Gum care",
        text: "Treatment for bleeding gums, including periodontal flap surgery.",
      },
      {
        id: "fillings",
        title: "Fillings & dentures",
        text: "Tooth-coloured fillings, and immediate dentures to restore your bite.",
      },
    ],
  },
  oneRoof: {
    title: "Comprehensive dental care under one roof",
    text: "Complete diagnosis and treatment under one roof, with no external referrals.",
    imageAlt: "Digital dental X-ray unit at Talwar Dental Care",
    items: [
      {
        id: "xray",
        title: "Dental X-rays",
        text: "Accurate digital imaging for precise diagnosis and treatment planning.",
      },
      {
        id: "exam",
        title: "Exams & cleanings",
        text: "Preventive care to maintain healthy teeth and gums.",
      },
      {
        id: "rct",
        title: "Root canal treatment",
        text: "Pain-free procedures to save infected teeth.",
      },
      {
        id: "braces",
        title: "Braces & dental implants",
        text: "Advanced solutions for missing or misaligned teeth.",
      },
    ],
  },
  reviews: {
    title: "What patients say",
    text: "Real Google reviews from patients of Talwar Dental Care.",
    source: "Google review",
    outOf: "out of 5",
    cta: "Read more reviews on Google",
    pause: "Pause scrolling reviews",
    play: "Play scrolling reviews",
    stars: "5 out of 5 stars",
    items: [
      {
        name: "Dk Goel",
        topic: "Full-mouth implants",
        quote:
          "I was never left without teeth, not even from the day of surgery. I was given a fixed set of teeth immediately, which made a huge difference to my confidence and daily life.",
      },
      {
        name: "Kanika Sharma",
        topic: "Root canal",
        quote:
          "Dr Anish Talwar is highly knowledgeable and promptly advises you the best plan for the treatment. I had a pain free RCT. The clinic is accessible, clean and the staff is also highly trained.",
      },
      {
        name: "Snigdha Sisodia",
        topic: "Zirconia crowns",
        quote:
          "The teeth look so natural, no one can tell they're caps. Dr. Anish explained everything patiently, from the procedure to aftercare, which really put me at ease.",
      },
      {
        name: "Yash Vardhan Sharma",
        topic: "Dental implants",
        quote:
          "At the age of 70, I was quite hesitant about getting dental implants, but Dr. Anish Talwar and his team made the entire process smooth and comfortable. The implant procedure was painless, and the results are excellent.",
      },
      {
        name: "Naresh Airan",
        topic: "Dental implant",
        quote:
          "The implant procedure was virtually painless, and the clinic was clean, modern, and well equipped. I can now eat and smile with confidence.",
      },
      {
        name: "Anubhav Parashar",
        topic: "Oral surgery & root canal",
        quote:
          "I had a great experience with Dr. Talwar for both oral surgery and a root canal. He’s extremely professional, thorough, and clearly knows what he’s doing.",
      },
      {
        name: "Smita Dubey",
        topic: "Care under one roof",
        quote:
          "His clinic is a highly advanced facility equipped with state-of-the-art technology, offering comprehensive medical services under one roof. Patients receive complete care right there, eliminating the need to visit multiple places for different x-ray or treatments.",
      },
      {
        name: "Suman Sharma",
        topic: "Root canal",
        quote:
          "I was nervous about my root canal treatment, but the team at Talwar Dental Care made the entire experience stress-free. The dentist was gentle, professional, and ensured the RCT was comfortable and virtually pain-free and most importantly it was finished in single sitting.",
      },
      {
        name: "Laduram Sharma",
        topic: "Root canal",
        quote:
          "I got my root canal treatment done in a single sitting. I was a little nervous before, but it was much easier than I expected.",
      },
      {
        name: "Garima Mishra",
        topic: "Upper jaw implants",
        quote:
          "Got my upper jaw rehabilitation done with implants at Talwar Dental Care. I was quite nervous at first, but the doctor explained everything clearly and made the whole process comfortable. The treatment went smoothly and the staff was very supportive throughout.",
      },
      {
        name: "Anamika Chandra",
        topic: "Zirconia crowns",
        quote:
          "I recently got three zirconia crowns on my front teeth, and the makeover looks incredibly natural. The entire process was painless and handled with the utmost professionalism.",
      },
      {
        name: "Anil Sadhwani",
        topic: "Dental implant",
        quote:
          "Got my dental implant done at Talwar Dental Clinic, and the experience was surprisingly comfortable. The procedure was virtually painless, and the doctor was highly skilled and caring.",
      },
      {
        name: "Harsh Sundesha",
        topic: "Root canal",
        quote:
          "I visited Talwar Dental Clinic for a single-sitting root canal, and I was genuinely impressed. The treatment was efficient, painless, and much more comfortable than I had imagined.",
      },
      {
        name: "Dilkhush Kushwah",
        topic: "Immediate implant",
        quote:
          "I had a fractured tooth due to trauma and got an immediate dental implant treatment done by Dr. Anish Talwar. The entire procedure was smooth, painless, and handled with great precision and care.",
      },
      {
        name: "Rajendra Agarwal",
        topic: "Root canal",
        quote:
          "I was in a lot of pain earlier and quite scared after a previous visit elsewhere, but this clinic completely changed that. The treatment was done in a single sitting and was absolutely painless.",
      },
      {
        name: "Nagendra Singh",
        topic: "Teeth scaling",
        quote:
          "Visited Talwar Dental Care for teeth scaling and had a very nice experience. The treatment was done gently and professionally, and the staff was friendly throughout.",
      },
      {
        name: "Anshul Gera",
        topic: "Dental implant",
        quote:
          "My dental implant placement was smooth and without any discomfort thanks to dr talwar. The clinic is spotless, and I felt I was in safe hands.",
      },
      {
        name: "Mukul Soni",
        topic: "Root canal",
        quote:
          "I had a great experience at Talwar Dental Clinic. The root canal procedure was done very smoothly and with utmost care, which made the entire process comfortable and stress-free.",
      },
      {
        name: "Anjali Bai Bairwa",
        topic: "Root canal",
        quote:
          "Had an amazing experience with my RCT—completely painless and smooth from start to finish. Dr. Anish Talwar is truly one of the best dentists for root canal treatment, with great precision and patient care.",
      },
      {
        name: "Arun Agrawal",
        topic: "Scaling & polishing",
        quote:
          "The scaling and polishing experience was excellent. Teeth were thoroughly cleaned, and stains were largely removed. The doctor and staff were very polite and professional.",
      },
      {
        name: "Kalpana Sharma",
        topic: "Dental implant",
        quote:
          "It was practically painless, and the doctor explained everything patiently. The staff was also very friendly and helpful.",
      },
      {
        name: "Anubhuti Dhasmana",
        topic: "Root canal",
        quote:
          "Dr. Aanchal was extremely professional throughout the entire procedure. She took the time to explain each step clearly, which really helped ease my anxiety.",
      },
      {
        name: "Dr. M. Kuruvilla",
        topic: "Root canal & crown",
        quote:
          "Dr. Anish Talwar did my RCT smoothly and I didn’t feel any pain at all. I even got my crown within 24 hours, which was very fast. The clinic is clean, staff is polite, and it’s honestly the best clinic in Mansarovar.",
      },
      {
        name: "Kush Mathur",
        topic: "Wisdom tooth & implant",
        quote:
          "Got wisdom tooth extraction and got implant placed in the adjacent tooth, really happy with the services, highly recommend Talwar dental care, dr Talwar is the best implantologist in the town.",
      },
      {
        name: "Priyanka Chaurasiya",
        topic: "Fillings",
        quote:
          "The experience is phenomenal from good honest professional advice to excellent work skills.",
      },
      {
        name: "Sumat Kumar",
        topic: "Dental care",
        quote:
          "Dr Talwar is very nice person and having very good experience & his associate doctor and other supporting staff is also very cooperative.",
      },
    ],
    basis: "Based on {count} ratings on {source}",
  },
  contact: {
    title: "Book your visit",
    text: "Tell us what you need and we will confirm your slot on WhatsApp or by phone.",
    addressLabel: "Address",
    address: "79/14, Shipra Path, Sector 7, Mansarovar, Jaipur, Rajasthan 302020",
    phoneLabel: "Phone",
    hoursLabel: "Clinic hours",
    hours: "Every day, 9 AM – 6 PM",
    directions: "Get directions",
    form: {
      name: "Your name",
      phone: "Phone number",
      service: "Treatment",
      servicePlaceholder: "Not sure yet",
      message: "Anything we should know? (optional)",
      submit: "Send on WhatsApp",
      nameError: "Please enter your name.",
      phoneError: "Please enter a valid 10-digit phone number.",
      whatsappIntro: "Hello Talwar Dental Care, I would like to book an appointment.",
      whatsappName: "Name",
      whatsappPhone: "Phone",
      whatsappService: "Treatment",
      whatsappNote: "Note",
    },
    mapTitle: "Map showing Talwar Dental Care in Mansarovar, Jaipur",
  },
  footer: {
    tagline: "Dental implants & smile care in Mansarovar, Jaipur.",
    rights: "All rights reserved.",
  },
  a11y: {
    toggleLang: "Switch language to Hindi",
    skip: "Skip to content",
    whatsapp: "WhatsApp",
  },
  seo: {
    title: "Talwar Dental Care | Dental Implants & Smile Care in Mansarovar, Jaipur",
    description:
      "Talwar Dental Care in Mansarovar, Jaipur. Dr. Anish Talwar (BDS, MDS Oral & Maxillofacial Surgery) offers dental implants, smile makeovers, root canal and gum treatment.",
  },
  error: {
    title: "Something went wrong",
    text: "Please reload the page. You can also call us and we will book your visit.",
    reload: "Reload page",
  },
};

export default en;
