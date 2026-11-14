/**
 * English copy for the whole site.
 * Keep this file's structure identical to the other language file (a unit test enforces it).
 * Placeholders such as {count} are filled in by utils/format.js.
 */
const clinicHours = "Mon-Sat: 10 AM-8 PM; Sun: 10 AM-1:30 PM";

const en = {
  clinicName: "Talwar Dental Care",
  nav: {
    about: "Doctor",
    services: "Treatments",
    implants: "Implants",
    rct: "Root canal",
    clinic: "Clinic",
    reviews: "Reviews",
    contact: "Contact",
    play: "Let's Play",
    call: "Call now",
    book: "Book appointment",
    menu: "Menu",
    label: "Main",
  },
  hero: {
    eyebrow: "Dental implants & smile care in Mansarovar, Jaipur",
    title: "Dentist in Mansarovar, Jaipur",
    subtitle: "Calm, precise dental care for a smile you're proud of",
    text: "At Talwar Dental Care on Shipra Path, Mansarovar, Jaipur, Dr. Anish Talwar and the clinical team provide dental implants, root canal treatment and preventive care, with a treatment plan explained before care begins.",
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
        value: "7",
        label: "days a week",
      },
    ],
    badgeTitle: "Mon-Sat: 10 AM-8 PM",
    badgeSub: "Sun: 10 AM-1:30 PM",
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
    profile: "Read the full profile",
  },
  services: {
    title: "Treatments for every stage of your smile",
    text: "Choose a treatment to start your booking, or call us if you are not sure what you need.",
    cta: "Book this treatment",
    more: "Learn more",
    items: [
      {
        id: "implants",
        pageId: "implants",
        title: "Dental implants",
        text: "Single implants to full-mouth rehabilitation, with immediate fixed teeth where suitable.",
      },
      {
        id: "smile",
        pageId: "crowns",
        title: "Smile makeover & crowns",
        text: "Zirconia crowns and cosmetic correction that look natural and last.",
      },
      {
        id: "rct",
        pageId: "rct",
        title: "Root canal treatment",
        text: "Root canal treatment planned around your tooth, often completed in a single sitting.",
      },
      {
        id: "surgery",
        pageId: "surgery",
        title: "Oral & maxillofacial surgery",
        text: "Wisdom tooth removal and jaw surgery, handled by a trained oral surgeon.",
      },
      {
        id: "gums",
        pageId: "gums",
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
    text: "In-house dental imaging and a treatment plan explained before care begins.",
    imageAlt: "Digital dental X-ray unit at Talwar Dental Care",
    items: [
      {
        id: "xray",
        title: "Dental X-rays",
        text: "Accurate digital imaging for precise diagnosis and treatment planning.",
      },
      {
        id: "exam",
        pageId: "cleaning",
        title: "Exams & cleanings",
        text: "Preventive care to maintain healthy teeth and gums.",
      },
      {
        id: "rct",
        title: "Root canal treatment",
        text: "Treatment to help preserve infected teeth, following an individual assessment.",
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
    text: "Patient experiences and independent ratings of Talwar Dental Care.",
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
    hours: clinicHours,
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
    pagesLabel: "Clinic pages",
    rights: "All rights reserved.",
  },
  a11y: {
    toggleLang: "Switch language to Hindi",
    skip: "Skip to content",
    whatsapp: "WhatsApp",
  },
  pages: {
    doctor: {
      nav: "Dr. Anish Talwar",
      seo: {
        title: "Dr. Anish Talwar, Dentist in Mansarovar | Talwar Dental Care",
        description:
          "Dr. Anish Talwar, BDS, MDS Oral & Maxillofacial Surgery, practices at Talwar Dental Care, 79/14 Shipra Path, Mansarovar, Jaipur. Call 098290 76830.",
      },
      kicker: "Dentist in Mansarovar",
      title: "Dr. Anish Talwar",
      lead: "Dr. Anish Talwar is the dentist, implantologist and oral and maxillofacial surgeon at Talwar Dental Care, 79/14 Shipra Path, Sector 7, Mansarovar, Jaipur.",
      aboutTitle: "About Dr. Anish Talwar",
      about: [
        "He holds a BDS and an MDS in Oral & Maxillofacial Surgery, with ten years of clinical practice. He is a member of the Association of Oral and Maxillofacial Surgeons of India, the Indian Dental Association, and the International Congress of Oral Implantologists.",
        "Every visit starts with a diagnosis, a clear plan and a conversation about the options. Patients often say he explains each step, from the treatment plan through aftercare, and that care is arranged so they stay at ease, including if they are nervous.",
        "Digital X-rays are taken in the clinic, so diagnosis and treatment stay in one place. For implants he plans immediate fixed teeth wherever that is clinically suitable. Root canal treatment is often completed in a single sitting. He also provides wisdom-tooth removal and other oral surgery, crowns, gum care, fillings and dentures.",
      ],
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "How a visit is planned",
          text: "Every treatment starts with a diagnosis, a clear plan and a conversation about your options. Patients often say he explains each step, from the plan through aftercare.",
        },
        {
          heading: "Care under one roof",
          text: "Digital X-rays are taken in the clinic, so diagnosis and treatment stay in one place. For implants, the plan includes immediate fixed teeth wherever that is clinically suitable.",
        },
      ],
      pointsTitle: "Qualifications and memberships",
      points: [
        "BDS",
        "MDS – Oral & Maxillofacial Surgery",
        "10 years of clinical practice",
        "Member, Association of Oral and Maxillofacial Surgeons of India",
        "Member, Indian Dental Association",
        "Member, International Congress of Oral Implantologists",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Where is the clinic?",
          a: "79/14, Shipra Path, Sector 7, Mansarovar, Jaipur, Rajasthan 302020.",
        },
        {
          q: "What are the clinic hours?",
          a: clinicHours,
        },
        {
          q: "Which treatments does Dr. Talwar provide?",
          a: "Dental implants, root canal treatment, oral surgery, crowns, gum care, fillings and dentures.",
        },
        {
          q: "How do I book?",
          a: "Call 098290 76830, or send a WhatsApp message from the contact form.",
        },
      ],
      reviewsTitle: "What patients say",
      reviewNames: ["Kanika Sharma", "Anubhav Parashar", "Sumat Kumar"],
      book: "Book a consultation",
      visitTitle: "Visit the clinic",
      relatedTitle: "Treatments",
      related: [
        { pageId: "implants", label: "Dental implants in Mansarovar" },
        { pageId: "rct", label: "Root canal treatment in Mansarovar" },
        { pageId: "crowns", label: "Dental crowns in Mansarovar" },
        { pageId: "surgery", label: "Oral surgery in Mansarovar" },
        { pageId: "gums", label: "Gum treatment in Mansarovar" },
        { pageId: "cleaning", label: "Teeth cleaning in Mansarovar" },
      ],
    },
    implants: {
      nav: "Dental implants",
      seo: {
        title: "Dental Implants in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Single-tooth and full-mouth dental implants at Talwar Dental Care, Shipra Path, Mansarovar. Dr. Anish Talwar is an MDS oral and maxillofacial surgeon. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Dental implants in Mansarovar, Jaipur",
      lead: "Talwar Dental Care plans single implants and full-mouth implant treatment at 79/14 Shipra Path, Mansarovar. Dr. Anish Talwar, MDS in Oral & Maxillofacial Surgery, explains the plan before treatment starts.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "Who implant treatment is for",
          text: "A dental implant replaces a missing tooth root. The plan may be one tooth, several teeth, or a full jaw. It depends on the X-ray and on how you want to eat and speak.",
        },
        {
          heading: "Fixed teeth, when suitable",
          text: "Where it is clinically suitable, the clinic plans a fixed set of teeth from the day of surgery so you are not left without teeth. This is not possible in every case. Dr. Talwar will say so after the X-ray.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "In-house digital X-ray",
        "A clear plan and a conversation about your options",
        "Implant placement by an oral and maxillofacial surgeon",
        "A plan for fixed teeth where that is clinically suitable",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Who places the implants?",
          a: "Dr. Anish Talwar, who holds an MDS in Oral & Maxillofacial Surgery.",
        },
        {
          q: "Can I have teeth the same day?",
          a: "Only where it is clinically suitable. Dr. Talwar assesses your case individually and explains whether immediate fixed teeth are an option before treatment.",
        },
        {
          q: "Do you treat one missing tooth and a full mouth?",
          a: "Yes. Both single implants and full-mouth rehabilitation are planned at this clinic.",
        },
        {
          q: "Where is the clinic, and when is it open?",
          a: `79/14, Shipra Path, Sector 7, Mansarovar, Jaipur 302020. ${clinicHours}. Call 098290 76830.`,
        },
      ],
      reviewsTitle: "What patients say about implants",
      reviewNames: ["Yash Vardhan Sharma", "Dk Goel", "Dilkhush Kushwah"],
      book: "Book an implant consultation",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "rct", label: "Root canal treatment in Mansarovar" },
      ],
    },
    rct: {
      nav: "Root canal treatment",
      seo: {
        title: "Root Canal Treatment in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Root canal treatment at Talwar Dental Care, Shipra Path, Mansarovar, often finished in a single sitting. Dr. Anish Talwar, MDS Oral & Maxillofacial Surgery. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Root canal treatment in Mansarovar, Jaipur",
      lead: "Talwar Dental Care provides root canal treatment on Shipra Path, Mansarovar. Many patients finish the treatment in a single sitting, after the tooth has been examined and the plan explained.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "When a root canal is considered",
          text: "A root canal treats an infected or painful tooth so it can stay in place. It is not the right choice for every tooth. The visit starts with an examination and an X-ray taken in the clinic.",
        },
        {
          heading: "What patients report",
          text: "Patients often describe the treatment as comfortable, including people who arrived nervous or in pain. Comfort varies from person to person. The team explains each step before it happens.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "Examination and an in-house digital X-ray",
        "A plan explained before treatment",
        "Treatment often completed in a single sitting",
        "Aftercare explained before you leave",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Is a root canal always finished in one visit?",
          a: "Often, not always. The tooth and the X-ray decide. The doctor will tell you what your tooth needs.",
        },
        {
          q: "What does treatment feel like?",
          a: "Patients often say it felt comfortable. The clinic explains what to expect for your tooth before starting.",
        },
        {
          q: "Who does the treatment?",
          a: "Dr. Anish Talwar and the clinical team at Talwar Dental Care.",
        },
        {
          q: "How do I book?",
          a: `Call 098290 76830 or use the WhatsApp form. ${clinicHours}. Visit 79/14 Shipra Path, Mansarovar.`,
        },
      ],
      reviewsTitle: "What patients say about root canal treatment",
      reviewNames: ["Suman Sharma", "Laduram Sharma", "Harsh Sundesha"],
      book: "Book a root canal visit",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "crowns", label: "Dental crowns in Mansarovar" },
      ],
    },
    crowns: {
      nav: "Dental crowns",
      seo: {
        title: "Dental Crowns in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Zirconia crowns at Talwar Dental Care, 79/14 Shipra Path, Mansarovar, Jaipur. Dr. Anish Talwar explains the plan before treatment. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Dental crowns in Mansarovar, Jaipur",
      lead: "Talwar Dental Care provides zirconia crowns at 79/14 Shipra Path, Mansarovar. Dr. Anish Talwar explains the plan, from the procedure through aftercare, before treatment starts.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "When a crown is considered",
          text: "A crown covers a tooth that is worn, broken, or restored after a root canal. The visit starts with an examination, so the doctor can say whether a crown is the right option for that tooth.",
        },
        {
          heading: "What patients report",
          text: "Patients who received zirconia crowns often say the teeth look natural. The result depends on the tooth and the plan. Dr. Talwar explains what to expect before treatment.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "An examination before a crown is planned",
        "Zirconia crowns for a natural look",
        "The procedure and aftercare explained in advance",
        "A crown planned with other care, such as a root canal, when the tooth needs both",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "What kind of crowns do you provide?",
          a: "Zirconia crowns, planned after an examination of the tooth.",
        },
        {
          q: "Will a crown look like my own tooth?",
          a: "Patients often say zirconia crowns look natural. The result depends on the tooth, and the doctor explains that before treatment.",
        },
        {
          q: "Who does the treatment?",
          a: "Dr. Anish Talwar and the clinical team at Talwar Dental Care.",
        },
        {
          q: "How do I book?",
          a: `Call 098290 76830 or use the WhatsApp form. ${clinicHours}. Visit 79/14 Shipra Path, Mansarovar.`,
        },
      ],
      reviewsTitle: "What patients say about crowns",
      reviewNames: ["Snigdha Sisodia", "Anamika Chandra", "Dr. M. Kuruvilla"],
      book: "Book a crown consultation",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "rct", label: "Root canal treatment in Mansarovar" },
      ],
    },
    surgery: {
      nav: "Oral surgery",
      seo: {
        title: "Oral Surgery in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Wisdom tooth removal and oral surgery at Talwar Dental Care, Shipra Path, Mansarovar. Dr. Anish Talwar, MDS Oral & Maxillofacial Surgery. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Oral surgery in Mansarovar, Jaipur",
      lead: "Dr. Anish Talwar, MDS in Oral & Maxillofacial Surgery, provides wisdom-tooth removal and other oral surgery at Talwar Dental Care, 79/14 Shipra Path, Mansarovar.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "What this visit covers",
          text: "Wisdom tooth removal and other oral surgery, including jaw surgery when that is the right plan. The visit starts with an examination and an X-ray taken in the clinic.",
        },
        {
          heading: "Who treats you",
          text: "Dr. Talwar holds an MDS in Oral & Maxillofacial Surgery and is a member of the Association of Oral and Maxillofacial Surgeons of India. He explains the plan, and what recovery involves, before treatment starts.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "Examination and an in-house digital X-ray",
        "Wisdom tooth removal",
        "Other oral surgery, including jaw surgery when it is indicated",
        "The plan and aftercare explained before you leave",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Who does the surgery?",
          a: "Dr. Anish Talwar, who holds an MDS in Oral & Maxillofacial Surgery.",
        },
        {
          q: "Do you remove wisdom teeth?",
          a: "Yes. Wisdom tooth removal is planned after an examination and an X-ray.",
        },
        {
          q: "Is surgery needed in every case?",
          a: "No. The examination decides whether surgery is the right plan.",
        },
        {
          q: "Where is the clinic, and when is it open?",
          a: `79/14, Shipra Path, Sector 7, Mansarovar, Jaipur 302020. ${clinicHours}. Call 098290 76830.`,
        },
      ],
      reviewsTitle: "What patients say about oral surgery",
      reviewNames: ["Anubhav Parashar", "Kush Mathur"],
      book: "Book a surgery consultation",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "implants", label: "Dental implants in Mansarovar" },
      ],
    },
    gums: {
      nav: "Gum care",
      seo: {
        title: "Gum Treatment in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Care for bleeding gums, including periodontal flap surgery, at Talwar Dental Care, Shipra Path, Mansarovar. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Gum treatment in Mansarovar, Jaipur",
      lead: "Talwar Dental Care treats bleeding gums at 79/14 Shipra Path, Mansarovar, including periodontal flap surgery when that is the right plan. The visit starts with an examination.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "When gum treatment is considered",
          text: "Bleeding gums need an examination before a plan is made. Some visits stay with cleaning and home care. Some need periodontal flap surgery. Dr. Talwar explains which applies to you.",
        },
        {
          heading: "How a visit is planned",
          text: "When the examination needs it, a digital X-ray is taken in the clinic. You hear the options before treatment starts.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "An examination of the gums",
        "A plan explained before treatment",
        "Care for bleeding gums",
        "Periodontal flap surgery when it is clinically suitable",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Do you treat bleeding gums?",
          a: "Yes. Treatment is planned after an examination.",
        },
        {
          q: "Does every case need flap surgery?",
          a: "No. Periodontal flap surgery is one option for gum disease. Many visits do not need it.",
        },
        {
          q: "Who does the treatment?",
          a: "Dr. Anish Talwar and the clinical team at Talwar Dental Care.",
        },
        {
          q: "How do I book?",
          a: `Call 098290 76830 or use the WhatsApp form. ${clinicHours}. Visit 79/14 Shipra Path, Mansarovar.`,
        },
      ],
      reviewsTitle: "What patients say",
      reviewNames: ["Sumat Kumar", "Smita Dubey", "Priyanka Chaurasiya"],
      book: "Book a gum consultation",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "cleaning", label: "Teeth cleaning in Mansarovar" },
      ],
    },
    cleaning: {
      nav: "Teeth cleaning",
      seo: {
        title: "Teeth Cleaning in Mansarovar, Jaipur | Talwar Dental Care",
        description:
          "Dental exams and teeth cleaning at Talwar Dental Care, 79/14 Shipra Path, Mansarovar, Jaipur. Call 098290 76830.",
      },
      kicker: "Mansarovar, Jaipur",
      title: "Teeth cleaning in Mansarovar, Jaipur",
      lead: "Talwar Dental Care provides dental exams and teeth cleaning at 79/14 Shipra Path, Mansarovar. The visit checks teeth and gums before a problem grows.",
      reviewed: "Reviewed by Dr. Anish Talwar, BDS, MDS (Oral & Maxillofacial Surgery).",
      sections: [
        {
          heading: "What a cleaning visit includes",
          text: "An examination and cleaning to maintain healthy teeth and gums. Patients also come for scaling and polishing. The doctor explains what your teeth need after looking at them.",
        },
        {
          heading: "What patients report",
          text: "Patients who came for scaling say the cleaning was done gently and that stains were addressed. What a visit includes depends on the examination.",
        },
      ],
      pointsTitle: "What the visit includes",
      points: [
        "A dental examination",
        "Cleaning to maintain teeth and gums",
        "Scaling and polishing when that is what the teeth need",
        "Advice before you leave",
      ],
      faqsTitle: "Common questions",
      faqs: [
        {
          q: "Do you offer teeth cleaning?",
          a: "Yes. Exams and cleanings are part of the care at this clinic.",
        },
        {
          q: "Is scaling the same as a routine cleaning?",
          a: "Scaling is a deeper clean. The examination decides what your teeth need.",
        },
        {
          q: "Who does the visit?",
          a: "Dr. Anish Talwar and the clinical team at Talwar Dental Care.",
        },
        {
          q: "How do I book?",
          a: `Call 098290 76830 or use the WhatsApp form. ${clinicHours}. Visit 79/14 Shipra Path, Mansarovar.`,
        },
      ],
      reviewsTitle: "What patients say about cleaning",
      reviewNames: ["Nagendra Singh", "Arun Agrawal"],
      book: "Book a cleaning",
      visitTitle: "Visit the clinic",
      relatedTitle: "Related pages",
      related: [
        { pageId: "doctor", label: "Dr. Anish Talwar" },
        { pageId: "gums", label: "Gum treatment in Mansarovar" },
      ],
    },
  },
  seo: {
    title: "Dentist in Mansarovar, Jaipur | Talwar Dental Care",
    description:
      "Dr. Anish Talwar, MDS Oral & Maxillofacial Surgery, at Talwar Dental Care, 79/14 Shipra Path, Mansarovar, Jaipur. Implants and root canal treatment. Call 098290 76830.",
  },
  play: {
    title: "Let's play",
    text: "A short game from the clinic. Keep the tooth away from the sweets.",
  },
  notFound: {
    seo: {
      title: "Page not found | Talwar Dental Care",
      description:
        "This page does not exist. Visit Talwar Dental Care in Mansarovar, Jaipur, or call 098290 76830.",
    },
    title: "This page doesn't exist",
    text: "The link may be incorrect, or the page may have moved. Let's get you back to healthy smiles.",
    home: "Back to home page",
    call: "Call 098290 76830",
    also: "Or jump straight to:",
    treatments: "Treatments",
    reviews: "Patient reviews",
    book: "Book an appointment",
    gameTitle: "Keep the tooth away from the sweets",
    hint: "Press space, or tap the game, to jump.",
    level: "Level",
    lives: "Lives",
    score: "Score",
    best: "Best",
    play: "Play",
    again: "Play again",
    over: "A sweet caught the tooth",
    challenge: "Challenge a friend",
    challengeText: "I scored {score} at Talwar Dental Care. Can you beat it? Let's play.",
    challengeSaved: "Score card saved. Share the picture with the link.",
  },
  error: {
    title: "Something went wrong",
    text: "Please reload the page. You can also call us and we will book your visit.",
    reload: "Reload page",
  },
};

export default en;
