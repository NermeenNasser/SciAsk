// قائمة الجامعات المصرية
// Egyptian Universities List

export const universities = {
  // الجامعات الحكومية المصرية
  government: [
    { id: 'cairo', name: 'جامعة القاهرة', nameEn: 'Cairo University' },
    { id: 'alexandria', name: 'جامعة الإسكندرية', nameEn: 'Alexandria University' },
    { id: 'ain_shams', name: 'جامعة عين شمس', nameEn: 'Ain Shams University' },
    { id: 'assiut', name: 'جامعة أسيوط', nameEn: 'Assiut University' },
    { id: 'tanta', name: 'جامعة طنطا', nameEn: 'Tanta University' },
    { id: 'mansoura', name: 'جامعة المنصورة', nameEn: 'Mansoura University' },
    { id: 'zagazig', name: 'جامعة الزقازيق', nameEn: 'Zagazig University' },
    { id: 'helwan', name: 'جامعة حلوان', nameEn: 'Helwan University' },
    { id: 'minya', name: 'جامعة المنيا', nameEn: 'Minya University' },
    { id: 'menofia', name: 'جامعة المنوفية', nameEn: 'Menofia University' },
    { id: 'suez_canal', name: 'جامعة قناة السويس', nameEn: 'Suez Canal University' },
    { id: 'south_valley', name: 'جامعة جنوب الوادي', nameEn: 'South Valley University' },
    { id: 'benha', name: 'جامعة بنها', nameEn: 'Benha University' },
    { id: 'fayoum', name: 'جامعة الفيوم', nameEn: 'Fayoum University' },
    { id: 'beni_sweif', name: 'جامعة بني سويف', nameEn: 'Beni Suef University' },
    { id: 'kafr_sheikh', name: 'جامعة كفر الشيخ', nameEn: 'Kafr El Sheikh University' },
    { id: 'sohag', name: 'جامعة سوهاج', nameEn: 'Sohag University' },
    { id: 'port_said', name: 'جامعة بورسعيد', nameEn: 'Port Said University' },
    { id: 'damanhour', name: 'جامعة دمنهور', nameEn: 'Damanhour University' },
    { id: 'damietta', name: 'جامعة دمياط', nameEn: 'Damietta University' },
    { id: 'aswan', name: 'جامعة أسوان', nameEn: 'Aswan University' },
    { id: 'suez', name: 'جامعة السويس', nameEn: 'Suez University' },
    { id: 'el_awlad', name: 'جامعة مدينة السادات', nameEn: 'El Sadat City University' },
    { id: 'arish', name: 'جامعة العريش', nameEn: 'Arish University' },
    { id: 'matrouh', name: 'جامعة مطروح', nameEn: 'Matrouh University' },
    { id: 'new_valley', name: 'جامعة الوادي الجديد', nameEn: 'New Valley University' },
    { id: 'luxor', name: 'جامعة الأقصر', nameEn: 'Luxor University' },
    { id: 'ghardaqa', name: 'جامعة الغردقة', nameEn: 'Hurghada University' },
  ],
  
  // الجامعات الأهلية
  national: [
    { id: 'galala', name: 'جامعة الجلالة', nameEn: 'Galala University' },
    { id: 'king_salman', name: 'جامعة الملك سلمان الدولية', nameEn: 'King Salman International University' },
    { id: 'alamerin', name: 'جامعة العلمين الدولية', nameEn: 'Alameerin International University' },
    { id: 'new_mansoura', name: 'جامعة المنصورة الجديدة', nameEn: 'New Mansoura University' },
    { id: 'alex_national', name: 'جامعة الأسكندرية الأهلية', nameEn: 'Alexandria National University' },
    { id: 'helwan_national', name: 'جامعة حلوان الأهلية', nameEn: 'Helwan National University' },
    { id: 'benha_national', name: 'جامعة بنها الأهلية', nameEn: 'Benha National University' },
    { id: 'mansoura_national', name: 'جامعة المنصورة الأهلية', nameEn: 'Mansoura National University' },
    { id: 'zagazig_national', name: 'جامعة الزقازيق الأهلية', nameEn: 'Zagazig National University' },
    { id: 'menofia_national', name: 'جامعة المنوفية الأهلية', nameEn: 'Menofia National University' },
    { id: 'minya_national', name: 'جامعة المنيا الأهلية', nameEn: 'Minya National University' },
    { id: 'benisweif_national', name: 'جامعة بنى سويف الأهلية', nameEn: 'Beni Suef National University' },
    { id: 'ismailia_new', name: 'جامعة الإسماعيلية الجديدة الأهلية', nameEn: 'New Ismailia National University' },
    { id: 'assiut_national', name: 'جامعة أسيوط الأهلية', nameEn: 'Assiut National University' },
    { id: 'east_portsaid', name: 'جامعة شرق بورسعيد الأهلية', nameEn: 'East Port Said National University' },
    { id: 'south_valley_national', name: 'جامعة جنوب الوادى الأهلية', nameEn: 'South Valley National University' },
    { id: 'nile', name: 'جامعة النيل', nameEn: 'Nile University' },
    { id: 'egypt_elearn', name: 'الجامعة المصرية للتعلم الإلكترونى', nameEn: 'Egyptian University for E-Learning' },
    { id: 'french_egypt', name: 'الجامعة الفرنسيةفى مصر', nameEn: 'French University in Egypt' },
    { id: 'egypt_it', name: 'جامعة مصر للمعلوماتية', nameEn: 'Egypt University of Informatics' },
  ],
  
  // الجامعات الخاصة
  private: [
    { id: 'october6', name: 'جامعة 6 أكتوبر', nameEn: 'October 6 University' },
    { id: 'egypt_science_tech', name: 'جامعة مصر للعلوم والتكنولوجيا', nameEn: 'Egypt University of Science and Technology' },
    { id: 'october_modern', name: 'جامعة أكتوبر للعلوم الحديثة والآداب', nameEn: 'October University for Modern Sciences and Arts' },
    { id: 'egypt_intl', name: 'جامعة مصر الدولية', nameEn: 'Egypt International University' },
    { id: 'german', name: 'الجامعة الألمانية في مصر', nameEn: 'German University in Cairo (GUC)' },
    { id: 'modern_tech', name: 'الجامعة الحديثة للتكنولوجيا والمعلومات', nameEn: 'Modern University for Technology and Information' },
    { id: 'ahram_canadian', name: 'جامعة الأهرام الكندية', nameEn: 'Ahram Canadian University' },
    { id: 'british', name: 'الجامعة البريطانية في مصر', nameEn: 'British University in Egypt' },
    { id: 'sina', name: 'جامعة Sinai', nameEn: 'Sinai University' },
    { id: 'future', name: 'جامعة المستقبل', nameEn: 'Future University' },
    { id: 'faros', name: 'جامعة فاروس', nameEn: 'Pharos University' },
    { id: 'nahda', name: 'جامعة النهضة', nameEn: 'Nahda University' },
    { id: 'egypt_russian', name: 'الجامعة المصرية俄罗斯ية', nameEn: 'Egyptian Russian University' },
    { id: 'delta', name: 'جامعة الدلتا للعلوم والتكنولوجيا', nameEn: 'Delta University for Science and Technology' },
    { id: 'heliopolis', name: 'جامعة هليوبوليس', nameEn: 'Heliopolis University' },
    { id: 'dria', name: 'جامعة دراية', nameEn: 'Dria University' },
    { id: 'badr_cairo', name: 'جامعة بدر بالقاهرة', nameEn: 'Badr University in Cairo' },
    { id: 'giza_new', name: 'جامعة الجيزة الجديدة', nameEn: 'New Giza University' },
    { id: 'horus', name: 'جامعة حورس', nameEn: 'Horus University' },
    { id: 'egypt_chinese', name: 'الجامعة المصرية الصينية', nameEn: 'Egyptian Chinese University' },
    { id: 'salam', name: 'جامعة السلام', nameEn: 'Al Salam University' },
    { id: 'new_salihia', name: 'جامعة الصالحية الجديدة', nameEn: 'New Salihia University' },
    { id: 'sphinx', name: 'جامعة سفنكس', nameEn: 'Sphinx University' },
    { id: 'badr_assiut', name: 'جامعة بدر بأسيوط', nameEn: 'Badr University in Assiut' },
    { id: 'merit', name: 'جامعة ميريت', nameEn: 'Merit University' },
    { id: 'mayo', name: 'جامعة مايو', nameEn: 'Mayo University' },
    { id: 'innovation', name: 'جامعة الابتكار', nameEn: 'Innovation University' },
    { id: 'riyada', name: 'جامعة الريادة للعلوم والتكنولوجيا', nameEn: 'Riyada University for Science and Technology' },
    { id: 'madinet_elcairo', name: 'جامعة المدينة بالقاهرة', nameEn: 'Madinet El Cairo University' },
    { id: 'hayat', name: 'جامعة الحياة', nameEn: 'Hayat University' },
    { id: 'lotus', name: 'جامعة اللوتس بالمنيا', nameEn: 'Lotus University in Minya' },
    { id: 'wadi_nile', name: 'جامعة وادي النيل', nameEn: 'Wadi Nile University' },
    { id: 'badia', name: 'جامعة باديا', nameEn: 'Badia University' },
    { id: 'aboras_tech', name: 'جامعة العبور للعلوم والتكنولوجيا', nameEn: 'Alaboras University for Science and Technology' },
    { id: 'egypt_alamerin', name: 'الجامعة المصرية بالعلمين', nameEn: 'Egyptian University at Alamein' },
  ],
  
  // فروع جامعات دولية
  international: [
    { id: 'knowledge', name: 'جامعات المعرفة الدولية', nameEn: 'International Knowledge Universities' },
    { id: 'prince_edward', name: 'جامعة الأمير إدوارد', nameEn: 'Prince Edward University' },
    { id: 'hertfordshire', name: 'جامعة هيرتفوردشاير', nameEn: 'University of Hertfordshire' },
    { id: 'toronto_metro', name: 'جامعة تورنتو متروبوليتان', nameEn: 'Toronto Metropolitan University' },
    { id: 'european_egypt', name: 'الجامعات الأوروبية في مصر', nameEn: 'European Universities in Egypt' },
  ],
  
  // جامعات ذات طبيعة خاصة
  special: [
    { id: 'zewail', name: 'مدينة زويل للعلوم والتكنولوجيا والابتكار', nameEn: 'Zewail City of Science and Technology' },
    { id: 'japanese', name: 'الجامعة المصرية اليابانية للعلوم والتكنولوجيا', nameEn: 'Egyptian Japanese University for Science and Technology' },
  ],
  
  // مؤسسات تعليمية باتفاقيات دولية
  agreements: [
    { id: 'auc', name: 'الجامعة الأمريكية بالقاهرة', nameEn: 'American University in Cairo' },
    { id: 'senghor', name: 'جامعة سنجور', nameEn: 'Senghor University' },
    { id: 'berlin_gouna', name: 'جامعة برلين التكنولوجية بالجونة', nameEn: 'Berlin University of Technology at Gouna' },
    { id: 'arab_open', name: 'الجامعة العربية المفتوحة بالقاهرة', nameEn: 'Arab Open University - Cairo' },
    { id: 'elscaka', name: 'جامعة اسلسكا مصر', nameEn: 'Eslsca Egypt' },
    { id: 'arab_academy', name: 'الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري', nameEn: 'Arab Academy for Science, Technology and Maritime Transport' },
    { id: 'arab_finance', name: 'الأكاديمية العربية للعلوم المالية والمصرفية', nameEn: 'Arab Academy for Financial and Banking Sciences' },
    { id: 'arab_research', name: 'معهد البحوث والدراسات العربية', nameEn: 'Institute of Arab Research and Studies' },
    { id: 'german_intl', name: 'الجامعة الألمانية الدولية', nameEn: 'German International University' },
  ],
  
  // جامعات عربية
  arab: [
    { id: 'tunisia', name: 'تونس', nameEn: 'Tunisia' },
    { id: 'sudan', name: 'السودان', nameEn: 'Sudan' },
    { id: 'yemen', name: 'اليمن', nameEn: 'Yemen' },
    { id: 'uae', name: 'الإمارات', nameEn: 'UAE' },
    { id: 'morocco', name: 'المغرب', nameEn: 'Morocco' },
    { id: 'syria', name: 'سوريا', nameEn: 'Syria' },
  ]
};

// دالة مساعدة للحصول على اسم الجامعة من الـ ID
export const getUniversityName = (id) => {
  const allUniversities = [
    ...universities.government,
    ...universities.national,
    ...universities.private,
    ...universities.international,
    ...universities.special,
    ...universities.agreements,
    ...universities.arab
  ];
  
  const university = allUniversities.find(u => u.id === id);
  return university ? university.name : id;
};

// دالة مساعدة للحصول على كل الجامعات في قائمة واحدة
export const getAllUniversities = () => {
  return {
    government: universities.government,
    national: universities.national,
    private: universities.private,
    international: universities.international,
    special: universities.special,
    agreements: universities.agreements,
    arab: universities.arab
  };
};

export default universities;
