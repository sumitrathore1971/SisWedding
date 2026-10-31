/**
 * Centralized Wedding Invitation Data Configuration
 * 
 * Edit this file to customize bride and groom names, event details,
 * dates, timings, venue information, and Hindi invitation text.
 */

export interface EventScheduleItem {
  id: string;
  number: number;
  titleHindi: string;
  dateHindi: string;
  timeHindi: string;
}

export interface PersonDetails {
  name: string;
  relationTitle: string;
  parents: string;
  grandparents?: string;
  bio: string;
  imagePlaceholderLabel: string;
  imageAspectRatio?: string;
}

export interface WeddingEvent {
  id: string;
  sectionNumber: number;
  titleHindi: string;
  titleEnglish: string;
  tagline: string;
  dateHindi: string;
  timeHindi: string;
  venueHindi: string;
  dressCode?: string;
  descriptionHindi: string;
  bannerPlaceholderLabel: string;
  illustrationPlaceholderLabel?: string;
  accentColorClass?: string;
  backgroundImage?: string;
}

export interface WeddingData {
  meta: {
    title: string;
    description: string;
  };
  opening: {
    auspiciousSymbol: string;
    greeting: string;
    coupleHeadline: string;
    celebrationTitleEnglish?: string;
    brideNameEnglish?: string;
    groomNameEnglish?: string;
    tagline: string;
    buttonText: string;
    targetScrollId: string;
    backgroundPlaceholderLabel: string;
    illustrationPlaceholderLabel: string;
    backgroundImage?: string;
  };
  couple: {
    sectionHeading: string;
    sectionSubheading: string;
    bride: PersonDetails;
    groom: PersonDetails;
    quoteHindi: string;
    backgroundImage?: string;
  };
  invitation: {
    sectionHeading: string;
    shlokaHindi: string;
    shlokaTranslation?: string;
    invitationBodyHindi: string;
    welcomingFamilies: string[];
    illustrationPlaceholderLabel: string;
    backgroundImage?: string;
  };
  baratNotice?: string;
  schedule?: EventScheduleItem[];
  events: {
    haldi: WeddingEvent;
    mehendi: WeddingEvent;
    sangeet: WeddingEvent;
    wedding: WeddingEvent;
    reception: WeddingEvent;
  };
  venue: {
    sectionHeading: string;
    venueName: string;
    address: string;
    landmark?: string;
    dateTimeNotice: string;
    mapUrl: string;
    mapButtonText: string;
    parkingNotice: string;
    photoPlaceholderLabel: string;
    backgroundImage?: string;
  };
  closing: {
    sectionHeading: string;
    closingSubheading: string;
    messageHindi: string;
    hostsLabel: string;
    baratNotice?: string;
    contacts: {
      name: string;
      phone: string;
      relation: string;
    }[];
    illustrationPlaceholderLabel: string;
    scrollToTopButtonText: string;
    backgroundImage?: string;
  };
}

export const weddingData: WeddingData = {
  meta: {
    title: "शुभ विवाह आमंत्रण पत्र | पूनम संग अवतरित",
    description: "पूनम एवं इंजि. अवतारित के शुभ विवाह समारोह का ई-आमंत्रण पत्र। शगुन के मधुर पल।",
  },
  opening: {
    auspiciousSymbol: "॥ श्री गणेशाय नमः ॥",
    greeting: "शगुन के मधुर पल",
    coupleHeadline: "पूनम संग अवतारित",
    celebrationTitleEnglish: "WEDDING CELEBRATION OF",
    brideNameEnglish: "Poonam Rathore",
    groomNameEnglish: "Avtarit Sahu",
    tagline: "दो हृदयों का पावन मिलन, नए जीवन के सफर की पावन शुरुआत में आपका स्नेहिल आशीर्वाद प्रार्थनीय है।",
    buttonText: "आमंत्रण खोलें",
    targetScrollId: "invitation-section",
    backgroundPlaceholderLabel: "पृष्ठभूमि सजावट छायाचित्र (Cover Background)",
    illustrationPlaceholderLabel: "पारंपरिक मंगल कलश / पुष्प कलाकृति (Opening Artwork)",
    backgroundImage: "/images/homebg.png",
  },
  couple: {
    sectionHeading: "वर एवं वधू",
    sectionSubheading: "परिणय सूत्र में बंधने जा रहे दो पावन हृदय",
    bride: {
      name: "आयु. पूनम",
      relationTitle: "सुपुत्री",
      parents: "श्री संतोष राठौर",
      grandparents: "स्वर्गीय श्री बाबूलाल राठौर",
      bio: "सुपुत्री श्री संतोष राठौर (पौत्री स्वर्गीय श्री बाबूलाल राठौर)। जीवन के इस नए अध्याय में आपके शुभाशीर्वाद की आकांक्षी।",
      imagePlaceholderLabel: "वधू का चित्र (Bride Photo Placeholder)",
      imageAspectRatio: "3/4",
    },
    groom: {
      name: "चि. इंजि. अवतारित",
      relationTitle: "सुपुत्र",
      parents: "श्री मनोज कुमार साहू",
      grandparents: "श्री वृंदावनलाल साहू",
      bio: "सुपुत्र श्री मनोज कुमार साहू (पौत्र श्री वृंदावनलाल साहू, टीकमगढ़ वाले)। नए सपनों व उमंगों के साथ परिणय के पावन बंधन की ओर अग्रसर।",
      imagePlaceholderLabel: "वर का चित्र (Groom Photo Placeholder)",
      imageAspectRatio: "3/4",
    },
    quoteHindi: "॥ ॐ श्री वरप्रदाय नमः — जहां दो आत्माओं का मिलन प्रभु कृपा से निश्चित होता है ॥",
  },
  invitation: {
    sectionHeading: "स्नेह निमंत्रण",
    shlokaHindi: "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    shlokaTranslation: "विघ्नहर्ता भगवान श्री गणेश हमारे इस मांगलिक कार्य को निर्विघ्न संपन्न करें।",
    invitationBodyHindi:
      "मान्यवर, परमपिता परमेश्वर की असीम अनुकम्पा एवं पूज्य पूर्वजों के आशीर्वाद से, हमारी लाडली सुपुत्री पूनम का शुभ विवाह, चिरंजीवी इंजि. अवतारित (सुपुत्र श्री मनोज कुमार साहू, पौत्र श्री वृंदावनलाल साहू) के साथ संपन्न होना निश्चित हुआ है।\n\nइस मांगलिक अवसर पर आप सपरिवार सादर आमंत्रित हैं। आपकी गरिमामयी उपस्थिति नवयुगल को अपने स्नेह और आशीर्वाद से अभिसिंचित कर हमारे इस उत्सव को स्मरणीय बनाएगी।",
    welcomingFamilies: [
      "श्री संतोष राठौर (वधू पक्ष)",
      "श्री मनोज कुमार साहू (वर पक्ष, टीकमगढ़ वाले)",
      "समस्त राठौर एवं साहू परिवार",
    ],
    illustrationPlaceholderLabel: "श्री गणेश जी / मंगल कलश कलाकृति (Family Invitation Artwork)",
    backgroundImage: "/images/from all.jpg",
  },
  baratNotice: "बारात दिनांक २५ नवंबर २०२६ को श्रीमान मनोज साहू, टीकमगढ़ वालों के यहाँ से आएगी।",
  schedule: [
    {
      id: "ganesh-pujan",
      number: 1,
      titleHindi: "खलमिट्टी एवं गणेश पूजन",
      dateHindi: "रविवार, २२ नवंबर २०२६",
      timeHindi: "शाम ०४:०० बजे",
    },
    {
      id: "haldi-mehendi",
      number: 2,
      titleHindi: "हल्दी एवं मेहंदी",
      dateHindi: "सोमवार, २३ नवंबर २०२६",
      timeHindi: "शाम ०४:०० बजे",
    },
    {
      id: "mandap-sangeet",
      number: 3,
      titleHindi: "मण्डप एवं संगीत",
      dateHindi: "मंगलवार, २४ नवंबर २०२६",
      timeHindi: "शाम ०७:०० बजे",
    },
    {
      id: "tilak",
      number: 4,
      titleHindi: "तिलक",
      dateHindi: "बुधवार, २५ नवंबर २०२६",
      timeHindi: "दोपहर ०२:०० बजे",
    },
    {
      id: "reception",
      number: 5,
      titleHindi: "आशीर्वाद समारोह एवं स्वल्पाहार",
      dateHindi: "बुधवार, २५ नवंबर २०२६",
      timeHindi: "सायं ०७:०० बजे से आपके आगमन तक",
    },
    {
      id: "lagna",
      number: 6,
      titleHindi: "लग्न",
      dateHindi: "गुरुवार, २६ नवंबर २०२६",
      timeHindi: "सुबह ०४:०० बजे",
    },
    {
      id: "vidai",
      number: 7,
      titleHindi: "विदाई",
      dateHindi: "गुरुवार, २६ नवंबर २०२६",
      timeHindi: "सुबह ०७:०० बजे",
    },
  ],
  events: {
    haldi: {
      id: "haldi-section",
      sectionNumber: 4,
      titleHindi: "हल्दी एवं मेहंदी",
      titleEnglish: "Haldi & Mehendi",
      tagline: "उबटन और पीत रंग का पावन उत्सव",
      dateHindi: "सोमवार, २३ नवंबर २०२६",
      timeHindi: "शाम ०४:०० बजे",
      venueHindi: "64, राणा कॉलोनी, इंदौर",
      dressCode: "पारंपरिक पीताम्बरी / पीला परिधान",
      descriptionHindi:
        "हल्दी की पवित्र सुगंध और अपनों के लाड़-प्यार के साथ वैवाहिक उत्सव का मांगलिक शुभारंभ। आइए और नवदंपति को अपने प्यार के रंग में रंग दीजिए।",
      bannerPlaceholderLabel: "हल्दी समारोह मुख्य छायाचित्र (Haldi Event Banner)",
      illustrationPlaceholderLabel: "हल्दी कलश व पुष्प सज्जा कलाकृति (Haldi Illustration)",
      accentColorClass: "border-amber-400/40 text-amber-700 bg-amber-500/10",
      backgroundImage: "/images/haldi.jpg",
    },
    mehendi: {
      id: "mehendi-section",
      sectionNumber: 5,
      titleHindi: "मेहंदी की रात",
      titleEnglish: "Mehendi Celebration",
      tagline: "सपनों के रंग, हिना की सतरंगी तरंग",
      dateHindi: "सोमवार, २३ नवंबर २०२६",
      timeHindi: "शाम ०४:०० बजे",
      venueHindi: "64, राणा कॉलोनी, इंदौर",
      dressCode: "हरा व फ्लोरल एथनिक",
      descriptionHindi:
        "हाथों में सजेगी सखियों के संग सुहाग की मेहंदी। गीतों की मधुर झंकार और खुशियों की रंगीन शाम में आप सभी आमंत्रित हैं।",
      bannerPlaceholderLabel: "मेहंदी समारोह मुख्य छायाचित्र (Mehendi Event Banner)",
      illustrationPlaceholderLabel: "हिना हस्तकला व तोरण कलाकृति (Mehendi Illustration)",
      accentColorClass: "border-emerald-500/40 text-emerald-800 bg-emerald-500/10",
      backgroundImage: "/images/mhendi.jpg",
    },
    sangeet: {
      id: "sangeet-section",
      sectionNumber: 6,
      titleHindi: "मण्डप एवं संगीत",
      titleEnglish: "Mandap & Sangeet",
      tagline: "सुर, ताल और नृत्योत्सव की एक यादगार शाम",
      dateHindi: "मंगलवार, २४ नवंबर २०२६",
      timeHindi: "शाम ०७:०० बजे",
      venueHindi: "64, राणा कॉलोनी, इंदौर",
      dressCode: "ग्लैमरस इंडो-वेस्टर्न / चमकदार परिधान",
      descriptionHindi:
        "मण्डप पूजन एवं संगीत के सुरों में झूमते दोनों परिवार, अंताक्षरी, ढोल की थाप और यादगार पारिवारिक प्रस्तुतियां। आइए, इस जश्न को संग मिलकर मनाते हैं।",
      bannerPlaceholderLabel: "संगीत संध्या मुख्य छायाचित्र (Sangeet Event Banner)",
      illustrationPlaceholderLabel: "सितार, तबला व ढोलक कलाकृति (Sangeet Illustration)",
      accentColorClass: "border-purple-500/40 text-purple-800 bg-purple-500/10",
      backgroundImage: "/images/sangeet.png",
    },
    wedding: {
      id: "wedding-section",
      sectionNumber: 7,
      titleHindi: "लग्न एवं विदाई (शुभ विवाह)",
      titleEnglish: "The Sacred Wedding (Lagna & Vidai)",
      tagline: "सात फेरे, सात पावन वचन — जन्मों का अटूट बंधन",
      dateHindi: "गुरुवार, २६ नवंबर २०२६",
      timeHindi: "लग्न: प्रातः ०४:०० बजे | विदाई: प्रातः ०७:०० बजे",
      venueHindi: "बालकृष्ण बाग, धार रोड, इंदौर",
      dressCode: "पारंपरिक शाही राजपूताना / बनारसी परिधान",
      descriptionHindi:
        "वैदिक मंत्रोच्चार, पवित्र अग्नि की साक्षी और बड़ों के शुभाशीर्वाद के साथ दो आत्माओं का पावन गठबंधन। इस दिव्य क्षण के साक्षी बनें।",
      bannerPlaceholderLabel: "विवाह मंडप मुख्य छायाचित्र (Wedding Mandap Banner)",
      illustrationPlaceholderLabel: "मंडप, हवनकुंड व मंगलसूत्र कलाकृति (Wedding Illustration)",
      accentColorClass: "border-rose-500/40 text-rose-800 bg-rose-500/10",
      backgroundImage: "/images/reception.jpg",
    },
    reception: {
      id: "reception-section",
      sectionNumber: 8,
      titleHindi: "आशीर्वाद समारोह एवं स्वल्पाहार",
      titleEnglish: "Blessings & Refreshments",
      tagline: "नवदंपति के सम्मान में एक गरिमामयी शाम",
      dateHindi: "बुधवार, २५ नवंबर २०२६",
      timeHindi: "सायं ०७:०० बजे से आपके आगमन तक",
      venueHindi: "बालकृष्ण बाग, धार रोड, इंदौर",
      dressCode: "फॉर्मल / भव्य पारंपरिक परिधान",
      descriptionHindi:
        "नवदंपति को अपना स्नेह, प्रेम व शुभाशीर्वाद देने एवं सुरुचिपूर्ण स्वल्पाहार का आनंद लेने हेतु सपरिवार सादर आमंत्रित हैं। बारात २५ नवंबर को श्रीमान मनोज साहू, टीकमगढ़ वालों के यहाँ से आएगी।",
      bannerPlaceholderLabel: "रिसेप्शन स्टेज मुख्य छायाचित्र (Reception Event Banner)",
      illustrationPlaceholderLabel: "शाही स्वागत तोरण व पुष्प सज्जा (Reception Illustration)",
      accentColorClass: "border-amber-600/40 text-amber-900 bg-amber-600/10",
      backgroundImage: "/images/reception.jpg",
    },
  },
  venue: {
    sectionHeading: "विवाह स्थल एवं मार्गदर्शिका",
    venueName: "बालकृष्ण बाग",
    address: "धार रोड, इंदौर (मध्य प्रदेश)",
    landmark: "धार रोड, इंदौर",
    dateTimeNotice: "आशीर्वाद समारोह: २५ नवंबर २०२६ (सायं ०७:०० बजे से) | लग्न: २६ नवंबर २०२६ (प्रातः ०४:०० बजे)",
    mapUrl: "https://maps.google.com/?q=Balkrishna+Bagh+Dhar+Road+Indore",
    mapButtonText: "Location",
    parkingNotice: "अतिथियों के लिए परिसर के अंदर पर्याप्त सुरक्षित पार्किंग की सुविधा उपलब्ध है।",
    photoPlaceholderLabel: "विवाह स्थल मुख्य प्रवेश द्वार / रिसॉर्ट छायाचित्र (Venue Photo)",
    backgroundImage: "/images/footer.jpg",
  },
  closing: {
    sectionHeading: "आपकी उपस्थिति प्रार्थनीय है",
    closingSubheading: "॥ सधन्यवाद ॥",
    messageHindi:
      "हमारे इस पारिवारिक मांगलिक उत्सव में सम्मिलित होकर नवयुगल को अपने स्नेहिल शुभाशीर्वाद से अभिसिंचित करें। आपकी उपस्थिति ही हमारा सबसे बड़ा उपहार है।",
    hostsLabel: "स्वागताकांक्षी एवं दर्शनाभिलाषी",
    baratNotice: "बारात दिनांक २५ नवंबर २०२६ को श्रीमान मनोज साहू, टीकमगढ़ वालों के यहाँ से आएगी।",
    contacts: [
      {
        name: "श्री संतोष राठौर",
        phone: "+91 98765 43210",
        relation: "पिता",
      },
      {
        name: "श्रीमती कलावती राठौर",
        phone: "+91 98765 43211",
        relation: "माता",
      },
    ],
    illustrationPlaceholderLabel: "हाथ जोड़े नमस्कार / मंगलमय कलश प्रतीक (Closing Artwork)",
    scrollToTopButtonText: "Back to Top",
    backgroundImage: "/images/footer.jpg",
  },
};
