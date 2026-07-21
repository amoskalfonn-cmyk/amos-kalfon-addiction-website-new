(() => {

  'use strict';



  const OPENING_LINES = [

    'אני עוזר למצוא מידע שכבר קיים באתר ולהפנות לעמודים המתאימים.',

    'איני מבצע אבחון, טיפול או ייעוץ רפואי.'

  ];

  const PRIVACY_SHORT = 'נא לא לכתוב בצ׳אט פרטים מזהים או מידע רפואי רגיש.';

  const PRIVACY_LONG = 'העוזר מיועד להתמצאות במידע שכבר קיים באתר ואינו מהווה טיפול או ייעוץ רפואי.';

  const FALLBACK_TEXT = [

    'לא מצאתי באתר תשובה מלאה לשאלה הזו.',

    'אפשר לנסות לנסח אותה אחרת או לעיין באחד מהנושאים הבאים:'

  ];

  const HISTORY_LIMIT = 8;

  const LOADING_MS = 380;



  const sourceLinks = {

    home: { title: 'דף הבית', href: '/' },

    treatment: { title: 'הכוונה לבחירת מסגרת טיפול', href: '/services/treatment-guidance.html' },

    knowledge: { title: 'מרכז הידע', href: '/knowledge-center.html' },

    faq: { title: 'שאלות ותשובות', href: '/questions-and-answers.html' },

    professionals: { title: 'מידע לאנשי מקצוע', href: '/for-professionals.html' },

    whenHelp: { title: 'מתי נכון לפנות לעזרה', href: '/articles/when-to-seek-help.html' },

    chooseHelp: { title: 'איך לבחור עזרה בהתמכרות', href: '/articles/how-to-choose-addiction-help.html' },

    guidanceVsTreatment: { title: 'ליווי והדרכה מול טיפול', href: '/articles/guidance-vs-treatment.html' },

    notEnough: { title: 'מתי ליווי אינו מספיק', href: '/articles/when-guidance-is-not-enough.html' },

    families: { title: 'משפחות ובני זוג', href: '/knowledge/families.html' },

    refuses: { title: 'בן משפחה מסרב לעזרה', href: '/articles/addict-refuses-help.html' },

    boundaries: { title: 'גבולות במשפחה', href: '/articles/boundaries.html' },

    talk: { title: 'איך לדבר עם בן משפחה שמתמודד עם התמכרות', href: '/articles/talk-to-addicted-family-member.html' },

    gambling: { title: 'התמכרות להימורים', href: '/knowledge/gambling.html' },

    alcohol: { title: 'התמכרות לאלכוהול', href: '/knowledge/alcohol.html' },

    drugs: { title: 'התמכרות לסמים', href: '/knowledge/drugs.html' },

    prescription: { title: 'תרופות מרשם והתמכרות', href: '/knowledge/prescription-drugs.html' },

    disclaimer: { title: 'הצהרת אחריות', href: '/disclaimer.html' }

  };



  const answers = {

    signs: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע שיכול לעזור להבין מתי כדאי לא להישאר לבד עם השאלה הזו.',

        'לפי המידע באתר, סימנים כמו פגיעה בתפקוד, הסתרה, קושי לעצור למרות נזקים, מתחים בבית או מצבי סיכון יכולים להצדיק פנייה לבירור אחראי יותר. זה אינו אבחון, אלא כיוון לקריאה ולהתמצאות.'

      ],

      limitation: 'אם יש סכנה מיידית או מצב רפואי חריף, לא מסתפקים במידע באתר.',

      sources: ['whenHelp', 'chooseHelp'],

      followups: [{ label: 'שאלון ההכוונה', answer: 'questionnaire' }, { label: 'הבנת אפשרויות הליווי', answer: 'options' }],

      contextTopic: 'signs'

    },

    options: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר הסבר על ההבדל בין ליווי והדרכה לבין טיפול, אבחון או גמילה רפואית.',

        'לפי המידע באתר, הכוונה יכולה לעזור לעשות סדר, להבין אילו שאלות לשאול, ולזהות מתי נכון לערב גורם טיפולי או רפואי מוסמך.'

      ],

      limitation: 'העוזר אינו בוחר מסגרת טיפול ואינו מבטיח התאמה או תוצאה.',

      sources: ['guidanceVsTreatment', 'treatment', 'notEnough'],

      followups: [{ label: 'שאלון ההכוונה', answer: 'questionnaire' }, { label: 'מתי ליווי אינו מספיק', answer: 'familyWarning' }],

      contextTopic: 'options'

    },

    questionnaire: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר שאלון הכוונה ראשוני שנועד לעזור לארגן את התמונה לפני פנייה או שיחה.',

        'השאלון לא מאבחן ולא מחליט איזו מסגרת מתאימה, אבל הוא יכול לעזור להגיע לשיחה עם מידע מסודר יותר על מצב, תחום, מוטיבציה ובטיחות.'

      ],

      limitation: 'אם קיימת סכנה מיידית, השאלון אינו מענה מתאים ויש לפנות לגורם חירום או מוסמך.',

      sources: ['treatment'],

      followups: [{ label: 'מה קורה אחרי השאלון?', answer: 'questionnaireNext' }, { label: 'מתי כדאי לפנות לעזרה', answer: 'signs' }],

      contextTopic: 'questionnaire'

    },

    questionnaireNext: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'אחרי מילוי השאלון, אפשר להשאיר פנייה מסודרת כך שסיכום התשובות יצורף לפרטים שנשלחים.',

        'המטרה היא לאפשר שיחה ראשונית ברורה יותר, בלי להפוך את השאלון לאבחון או להמלצה טיפולית.'

      ],

      limitation: 'הפרטים נשלחים רק כאשר המשתמש בוחר לשלוח פנייה ומאשר זאת בטופס.',

      sources: ['treatment'],

      followups: [{ label: 'גבולות השירות', answer: 'professionalBoundaries' }, { label: 'איך לבחור עזרה', href: sourceLinks.chooseHelp.href }],

      contextTopic: 'questionnaire'

    },

    types: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מרכז ידע שמרכז נושאים כמו אלכוהול, סמים, הימורים, תרופות מרשם ומשפחות.',

        'אפשר להתחיל מהנושא הקרוב ביותר למה שמעסיק אותך, ואז לעבור לעמודים שעוסקים בבחירת עזרה או בגבולות השירות.'

      ],

      limitation: 'המידע כללי ואינו מחליף הערכה מקצועית.',

      sources: ['knowledge', 'alcohol', 'drugs'],

      followups: [{ label: 'מרכז הידע', href: sourceLinks.knowledge.href }, { label: 'שאלון ההכוונה', answer: 'questionnaire' }],

      contextTopic: 'types'

    },

    familyTalk: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע שיכול לעזור בנושא הזה.',

        'לפי המידע באתר, כדאי להתחיל בשיחה רגועה, ללא האשמות, ולהתמקד במה שרואים ומרגישים בפועל. המטרה אינה לשכנע בכוח, אלא לפתוח אפשרות לשיחה ולשמור על גבולות.'

      ],

      limitation: 'אם יש אלימות, סכנה או חשש מיידי, יש לעצור את השיחה הרגילה ולפנות לגורם מתאים.',

      sources: ['talk', 'refuses', 'families'],

      followups: [{ label: 'ומה אם הוא מסרב?', answer: 'refuses' }, { label: 'גבולות במשפחה', answer: 'familyBoundaries' }, { label: 'סימני אזהרה', answer: 'familyWarning' }],

      contextTopic: 'familyTalk'

    },

    refuses: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע שמתייחס למצב שבו אדם קרוב מסרב לעזרה.',

        'לפי המידע באתר, למשפחה אין שליטה מלאה על ההחלטה של האדם לקבל עזרה. כן אפשר להשפיע על אופן השיחה, על גבולות הבית, ועל ההחלטה מתי לא להישאר לבד עם המצב.'

      ],

      limitation: 'העוזר אינו מציע כפייה, מניפולציה או החלטות במקום המשפחה.',

      sources: ['refuses', 'families', 'boundaries'],

      followups: [{ label: 'איך לפתוח שיחה', answer: 'familyTalk' }, { label: 'גבולות במשפחה', answer: 'familyBoundaries' }],

      contextTopic: 'refuses'

    },

    familyBoundaries: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר הסבר על גבולות בתוך משפחה שמתמודדת עם התמכרות.',

        'לפי המידע באתר, גבולות אינם עונש. הם דרך להבהיר מה אתם מוכנים לעשות ומה לא, לשמור על בטיחות, ולהפסיק לקחת אחריות על דברים שאינם בשליטתכם.'

      ],

      limitation: 'גבולות אינם תחליף לעזרה מקצועית כאשר יש סכנה או החמרה.',

      sources: ['boundaries', 'families'],

      followups: [{ label: 'איך לדבר עם בן משפחה', answer: 'familyTalk' }, { label: 'מתי ליווי אינו מספיק', answer: 'familyWarning' }],

      contextTopic: 'familyBoundaries'

    },

    familyWarning: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע על מצבים שבהם ליווי או שיחה רגילה אינם מספיקים.',

        'לפי המידע באתר, כאשר יש סכנה מיידית, אלימות, חשש למנת יתר, בלבול חריף או מצב רפואי מסוכן, צריך לערב גורם חירום או גורם מוסמך מתאים.'

      ],

      limitation: 'האתר ועמוס אינם שירותי חירום.',

      sources: ['notEnough', 'whenHelp', 'disclaimer'],

      followups: [{ label: 'מתי נכון לפנות לעזרה', answer: 'signs' }, { label: 'הצהרת אחריות', href: sourceLinks.disclaimer.href }],

      contextTopic: 'safetyInfo'

    },

    professionalFamilies: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע שמיועד לאנשי מקצוע בתחום ההתמכרויות.',

        'העמוד המקצועי מדגיש שפה זהירה, גבולות תפקיד, עבודה עם משפחות והפניה למידע שכבר קיים באתר בלי להחליף הערכה קלינית או טיפול.'

      ],

      limitation: 'המידע אינו יוצר התחייבות לשיתוף פעולה מקצועי או לקבלת הפניה.',

      sources: ['professionals', 'families'],

      followups: [{ label: 'גבולות השירות', answer: 'professionalBoundaries' }, { label: 'הפניה לשאלון ההכוונה', answer: 'questionnaire' }],

      contextTopic: 'professional'

    },

    professionalBoundaries: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע ברור על גבולות השירות.',

        'לפי המידע באתר, אין כאן אבחון, טיפול רפואי או פסיכולוגי, שירות חירום, או הבטחה להתאמה ולתוצאה. אפשר להשתמש במידע כמסגרת ניווט והסבר בלבד.'

      ],

      limitation: 'במצבים רפואיים, נפשיים, משפטיים או חירומיים יש להפנות לגורם מוסמך מתאים.',

      sources: ['professionals', 'disclaimer', 'guidanceVsTreatment'],

      followups: [{ label: 'מידע לאנשי מקצוע', href: sourceLinks.professionals.href }, { label: 'מתי ליווי אינו מספיק', answer: 'familyWarning' }],

      contextTopic: 'professionalBoundaries'

    },

    gambling: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע בנושא התמכרות להימורים.',

        'לפי המידע באתר, אפשר להתחיל מקריאה כללית על הימורים, ובמקביל לבדוק מידע על משפחות, גבולות ובחירת עזרה. האתר אינו מדרג מסגרות ואינו מבטיח תוצאות.'

      ],

      limitation: 'אם ההימורים יוצרים סיכון מיידי, אלימות או פגיעה חמורה, יש לפנות לגורם מוסמך מתאים.',

      sources: ['gambling', 'families', 'chooseHelp'],

      followups: [{ label: 'מידע לבני משפחה', answer: 'familyTalk' }, { label: 'גבולות במשפחה', answer: 'familyBoundaries' }],

      contextTopic: 'gambling'

    },

    alcohol: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע כללי בנושא אלכוהול.',

        'חשוב במיוחד להיזהר מהפסקה פתאומית או גמילה לבד כאשר יש תסמינים גופניים. האתר יכול להפנות למידע, אך אינו נותן הוראות גמילה או ייעוץ רפואי.'

      ],

      limitation: 'שאלות על גמילה, תרופות או תסמינים גופניים דורשות גורם רפואי מוסמך.',

      sources: ['alcohol', 'notEnough', 'disclaimer'],

      followups: [{ label: 'מתי ליווי אינו מספיק', answer: 'familyWarning' }, { label: 'גבולות השירות', answer: 'professionalBoundaries' }],

      contextTopic: 'alcohol'

    },

    drugs: {

      title: 'מה מצאתי באתר',

      paragraphs: [

        'מצאתי באתר מידע כללי בנושא סמים וסימני אזהרה.',

        'אם מדובר בבלבול חריף, אובדן הכרה, אלימות או חשש למנת יתר, זה כבר לא מצב לשיחה רגילה באתר ויש לפנות לגורם מתאים.'

      ],

      limitation: 'המידע באתר אינו אבחון ואינו הנחיות רפואיות.',

      sources: ['drugs', 'whenHelp', 'notEnough'],

      followups: [{ label: 'סימנים שכדאי לפנות לעזרה', answer: 'signs' }, { label: 'שאלון ההכוונה', answer: 'questionnaire' }],

      contextTopic: 'drugs'

    }

  };



  const routes = {

    start: [

      { label: 'מידע עבורי', description: 'מאמרים, סימני אזהרה ושאלון הכוונה', next: 'self', card: true },

      { label: 'מידע לבני משפחה', description: 'שיחה, גבולות והתמודדות עם אדם קרוב', next: 'family', card: true },

      { label: 'מידע לאנשי מקצוע', description: 'כלים, מקורות, גבולות והפניות', next: 'professional', card: true },

      { label: 'שאלה חופשית', description: 'חיפוש תשובה מתוך התוכן הקיים באתר', next: 'ask', card: true }

    ],

    self: {

      prompt: 'במה תרצה להתמקד?',

      actions: [

        { label: 'סימנים שייתכן שכדאי לפנות לעזרה', answer: 'signs' },

        { label: 'הבנת אפשרויות הליווי', answer: 'options' },

        { label: 'שאלון הכוונה', answer: 'questionnaire' },

        { label: 'מידע על סוגי התמכרויות', answer: 'types' },

        { label: 'חזרה להתחלה', next: 'start' }

      ]

    },

    family: {

      prompt: 'באיזה מידע תרצה להיעזר?',

      actions: [

        { label: 'איך לפתוח שיחה', answer: 'familyTalk' },

        { label: 'הצבת גבולות', answer: 'familyBoundaries' },

        { label: 'סימני אזהרה', answer: 'familyWarning' },

        { label: 'מתי ליווי אינו מספיק', answer: 'familyWarning' },

        { label: 'חזרה להתחלה', next: 'start' }

      ]

    },

    professional: {

      prompt: 'איזה מידע מקצועי אתה מחפש?',

      actions: [

        { label: 'עבודה עם משפחות', answer: 'professionalFamilies' },

        { label: 'גבולות השירות', answer: 'professionalBoundaries' },

        { label: 'הפניה לשאלון ההכוונה', answer: 'questionnaire' },

        { label: 'מרכז הידע', answer: 'types' },

        { label: 'מידע לאנשי מקצוע', answer: 'professionalFamilies' },

        { label: 'חזרה להתחלה', next: 'start' }

      ]

    }

  };



  const safetyPatterns = [

    /אובד|להתאבד|רוצה למות|למות עכשיו|מנת יתר|איבד(?:ה)? הכרה|פרכוס|התקף|גמילה קשה|אלימות|לפגוע|ילד.*סכנה|נהיגה.*שיכור|נוהג.*שיכור|חירום|סכנה מיידית/

  ];

  const medicalPatterns = [

    /תרופ|מינון|להפסיק.*תרופ|בנזודיאזפ|אופיאט|אופיואיד|גמילה לבד|להפסיק.*אלכוהול|דטוקס|גמילה.*בית/

  ];

  const keywordMap = [

    [/מסרב|מסרבת|סירוב|לא רוצה עזרה/, 'refuses'],

    [/לדבר|שיחה|איך פותחים/, 'familyTalk'],

    [/משפחה|בן משפחה|בת משפחה|קרוב|זוג/, 'familyTalk'],

    [/הימור|הימורים/, 'gambling'],

    [/אלכוהול|שתייה|שתיה/, 'alcohol'],

    [/סמים|קנאביס|סם/, 'drugs'],

    [/אחרי.*שאלון|מה קורה.*שאלון|אחר כך/, 'questionnaireNext'],

    [/שאלון|הכוונה/, 'questionnaire'],

    [/גבולות|גבול/, 'familyBoundaries'],

    [/שירות|אחריות|תחום|גבולות השירות|אבחון|טיפול/, 'professionalBoundaries'],

    [/איש מקצוע|מקצועי|מטפל|עובד סוציאלי/, 'professionalFamilies']

  ];

  const contextRules = [

    { from: 'familyTalk', pattern: /מסרב|מסרבת|לא רוצה|ומה אם/, answer: 'refuses' },

    { from: 'signs', pattern: /מתי|פונים|עזרה|המשך/, answer: 'signs' },

    { from: 'professional', pattern: /גבול|שירות|אבחון|טיפול|אחריות/, answer: 'professionalBoundaries' },

    { from: 'professionalBoundaries', pattern: /גבול|שירות|אבחון|טיפול|אחריות/, answer: 'professionalBoundaries' },

    { from: 'questionnaire', pattern: /אחרי|קורה|המשך|שולחים/, answer: 'questionnaireNext' },

    { from: 'gambling', pattern: /משפחה|בן משפחה|גבולות|מסרב/, answer: 'familyTalk' }

  ];



  let launcher;

  let dialog;

  let messages;

  let actions;

  let askForm;

  let askInput;

  let validation;

  let statusRegion;

  let closeButton;

  let lastFocus = null;

  let loadingTimer = null;

  let conversation = [];

  let context = { audience: null, lastTopic: null, lastAnswer: null };



  function createWidget() {

    if (document.querySelector('.ai-website-guide-launcher')) return;



    launcher = document.createElement('button');

    launcher.type = 'button';

    launcher.className = 'ai-website-guide-launcher';

    launcher.setAttribute('aria-haspopup', 'dialog');

    launcher.setAttribute('aria-expanded', 'false');

    launcher.classList.remove('is-open');

    launcher.setAttribute('aria-controls', 'aiWebsiteGuideDialog');

    launcher.setAttribute('aria-label', 'פתיחת עוזר AI להתמצאות באתר');

    launcher.innerHTML = `
      <span class="ai-website-guide-launcher__mark" aria-hidden="true">
        <svg class="ai-website-guide-launcher__icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="M12 3.5l1.35 4.05 4.15 1.45-4.15 1.45L12 14.5l-1.35-4.05L6.5 9l4.15-1.45L12 3.5Z"></path>
          <path d="M18.25 13.25l.72 2.15 2.03.72-2.03.71-.72 2.17-.72-2.17-2.03-.71 2.03-.72.72-2.15Z"></path>
          <path d="M6.2 15.1l.52 1.55 1.58.55-1.58.54-.52 1.56-.53-1.56-1.57-.54 1.57-.55.53-1.55Z"></path>
        </svg>
      </span>
      <span class="ai-website-guide-launcher__copy">
        <span class="ai-website-guide-launcher__primary">עוזר <bdi>AI</bdi></span>
        <span class="ai-website-guide-launcher__secondary">התמצאות באתר</span>
      </span>`;



    dialog = document.createElement('section');

    dialog.className = 'ai-website-guide';

    dialog.id = 'aiWebsiteGuideDialog';

    dialog.setAttribute('role', 'dialog');

    dialog.setAttribute('aria-modal', 'false');

    dialog.setAttribute('aria-labelledby', 'aiWebsiteGuideTitle');

    dialog.setAttribute('aria-describedby', 'aiWebsiteGuideDesc');

    dialog.setAttribute('dir', 'rtl');

    dialog.hidden = true;

    dialog.innerHTML = `

      <div class="ai-website-guide__header">

        <div>

          <h2 class="ai-website-guide__title" id="aiWebsiteGuideTitle">איך אפשר לעזור לך?</h2>

          <p class="ai-website-guide__subtitle" id="aiWebsiteGuideDesc">עוזר <bdi>AI</bdi> להתמצאות באתר</p>

          <p class="ai-website-guide__disclosure">עוזר אוטומטי המבוסס על תוכן האתר</p>

        </div>

        <button class="ai-website-guide__close" type="button" aria-label="סגירת עוזר AI">×</button>

      </div>

      <div class="ai-website-guide__body">

        <div class="ai-website-guide__messages" role="log" aria-live="polite" aria-relevant="additions text"></div>

        <div class="ai-website-guide__actions"></div>

        <form class="ai-website-guide__ask" hidden>

          <label for="aiWebsiteGuideQuestion">מה תרצה למצוא באתר?</label>

          <p class="ai-website-guide__ask-help">אל תכתבו פרטים מזהים או מידע רפואי רגיש.</p>

          <div class="ai-website-guide__ask-row">

            <input id="aiWebsiteGuideQuestion" name="question" type="text" maxlength="220" autocomplete="off" placeholder="לדוגמה: איך לדבר עם בן משפחה שמסרב לעזרה?" />

            <button type="submit" aria-label="שליחת שאלה לעוזר AI">שליחה</button>

          </div>

          <p class="ai-website-guide__validation" aria-live="polite" hidden></p>

        </form>

      </div>

      <div class="ai-website-guide__footer">

        <button class="ai-website-guide__utility" type="button" data-utility="reset">איפוס</button>

        <button class="ai-website-guide__utility" type="button" data-utility="error">מצב שגיאה</button>

        <button class="ai-website-guide__utility" type="button" data-utility="unavailable">אי זמינות</button>

      </div>

      <div class="ai-website-guide__status" aria-live="polite"></div>

    `;



    document.body.append(launcher, dialog);

    messages = dialog.querySelector('.ai-website-guide__messages');

    actions = dialog.querySelector('.ai-website-guide__actions');

    askForm = dialog.querySelector('.ai-website-guide__ask');

    askInput = dialog.querySelector('#aiWebsiteGuideQuestion');

    validation = dialog.querySelector('.ai-website-guide__validation');

    statusRegion = dialog.querySelector('.ai-website-guide__status');

    closeButton = dialog.querySelector('.ai-website-guide__close');



    launcher.addEventListener('click', openGuide);

    closeButton.addEventListener('click', closeGuide);

    dialog.addEventListener('keydown', handleDialogKeydown);

    document.addEventListener('keydown', handleDocumentKeydown);

    askForm.addEventListener('submit', handleAskSubmit);

    dialog.querySelector('[data-utility="reset"]').addEventListener('click', renderStart);

    dialog.querySelector('[data-utility="error"]').addEventListener('click', renderLocalError);

    dialog.querySelector('[data-utility="unavailable"]').addEventListener('click', renderUnavailable);



    renderStart();

  }



  function openGuide() {

    lastFocus = document.activeElement;

    dialog.hidden = false;

    launcher.setAttribute('aria-expanded', 'true');

    launcher.classList.add('is-open');

    setTimeout(() => closeButton.focus(), 0);

  }



  function closeGuide() {

    dialog.hidden = true;

    launcher.setAttribute('aria-expanded', 'false');

    launcher.classList.remove('is-open');

    clearLoading();

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();

    else launcher.focus();

  }



  function handleDocumentKeydown(event) {

    if (event.key === 'Escape' && dialog && !dialog.hidden) {

      event.preventDefault();

      closeGuide();

    }

  }



  function handleDialogKeydown(event) {

    if (event.key === 'Escape') {

      event.preventDefault();

      closeGuide();

      return;

    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(dialog.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'))

      .filter((element) => !element.disabled && element.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];

    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {

      event.preventDefault();

      last.focus();

    } else if (!event.shiftKey && document.activeElement === last) {

      event.preventDefault();

      first.focus();

    }

  }



  function renderStart() {

    clearLoading();

    context = { audience: null, lastTopic: null, lastAnswer: null };

    conversation = [

      { kind: 'notice', paragraphs: OPENING_LINES },

      { kind: 'privacy', paragraphs: [PRIVACY_SHORT, PRIVACY_LONG] }

    ];

    askForm.hidden = true;

    askInput.value = '';

    hideValidation();

    renderConversation();

    setActions(routes.start, true);

    announce('עוזר AI להתמצאות באתר אופס לתחילת השיחה');

  }



  function renderRoute(routeName) {

    clearLoading();

    context.audience = routeName;

    context.lastTopic = routeName;

    askForm.hidden = true;

    pushMessage({ kind: 'assistant', paragraphs: [routes[routeName].prompt] });

    setActions(routes[routeName].actions);

    announce(routes[routeName].prompt);

  }



  function renderAnswer(answerKey) {

    const item = answers[answerKey] || null;

    renderLoading(() => {

      askForm.hidden = true;

      if (item) {

        context.lastTopic = item.contextTopic || answerKey;

        context.lastAnswer = answerKey;

        pushMessage({ kind: 'answer', answerKey });

        setActions(defaultActions());

        announce('מוצגת תשובה עם מקורות באתר');

      } else {

        renderFallback();

      }

    });

  }



  function renderAsk(focusInput = true) {

    clearLoading();

    pushMessage({ kind: 'assistant', paragraphs: ['אפשר לשאול שאלה קצרה. אני אחפש התאמה רק בתוך נושאים שהוגדרו מראש מתוך תוכן האתר.'] });

    setActions([{ label: 'חזרה להתחלה', next: 'start' }]);

    askForm.hidden = false;

    hideValidation();

    if (focusInput) setTimeout(() => askInput.focus(), 0);

  }



  function handleAskSubmit(event) {

    event.preventDefault();

    hideValidation();

    const value = askInput.value.trim();

    if (!value) {

      showValidation('יש לכתוב שאלה קצרה לפני השליחה.');

      askInput.focus();

      return;

    }

    if (value.length > 220) {

      showValidation('השאלה ארוכה מדי. נסו לקצר אותה למשפט אחד או שניים.');

      askInput.focus();

      return;

    }

    askForm.hidden = true;

    askInput.value = '';

    pushMessage({ kind: 'user', paragraphs: [value] });

    renderLoading(() => renderQuestionResult(value));

  }



  async function renderQuestionResult(value) {

    const normalized = value.replace(/\s+/g, ' ');

    if (matchesAny(normalized, safetyPatterns)) {

      renderSafety();

      return;

    }

    if (matchesAny(normalized, medicalPatterns)) {

      renderMedicalBoundary();

      return;

    }

    const serverAnswer = await requestGroundedAnswer(normalized);

    if (serverAnswer) {

      renderRemoteAnswer(serverAnswer);

      return;

    }

    const contextAnswer = resolveContextAnswer(normalized);

    if (contextAnswer) {

      renderAnswerDirect(contextAnswer);

      return;

    }

    const found = keywordMap.find(([pattern]) => pattern.test(normalized));

    if (found) {

      renderAnswerDirect(found[1]);

    } else {

      renderFallback();

    }

  }



  async function requestGroundedAnswer(question) {

    if (!window.fetch) return null;

    try {

      const response = await fetch('/.netlify/functions/ai-guide', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ question, path: window.location.pathname })

      });

      if (response.status === 429) {

        return {

          mode: 'unavailable',

          title: 'העוזר קיבל יותר מדי פניות כרגע',

          paragraphs: ['כדאי להמתין רגע ולנסות שוב. בינתיים אפשר לעיין במרכז הידע או בשאלות הנפוצות באתר.'],

          sources: [{ title: sourceLinks.knowledge.title, href: sourceLinks.knowledge.href }, { title: sourceLinks.faq.title, href: sourceLinks.faq.href }]

        };

      }

      if (!response.ok) return null;

      const data = await response.json();

      if (!data || !Array.isArray(data.paragraphs) || !data.paragraphs.length) return null;

      return data;

    } catch (error) {

      return null;

    }

  }



  function renderRemoteAnswer(item) {

    const cardType = item.mode === 'safety' ? 'safety' : item.mode === 'medical-boundary' ? 'medical' : 'answer';
    const followups = item.mode === 'refusal' ? [] : [

        { label: 'שאלה נוספת קצרה', next: 'ask' },

        { label: 'מרכז הידע', href: sourceLinks.knowledge.href },

        { label: 'יצירת קשר', href: '/contact.html' }

      ];

    context.lastTopic = 'groundedAI';

    context.lastAnswer = 'groundedAI';

    pushMessage({

      kind: 'answerCustom',

      cardType,

      title: item.title || 'מה מצאתי באתר',

      paragraphs: item.paragraphs,

      sourceItems: Array.isArray(item.sources) ? item.sources : [],

      followups

    });

    setActions(defaultActions());

    announce('מוצגת תשובה מתוך מידע באתר');

  }



  function renderAnswerDirect(answerKey) {

    const item = answers[answerKey];

    if (!item) {

      renderFallback();

      return;

    }

    context.lastTopic = item.contextTopic || answerKey;

    context.lastAnswer = answerKey;

    pushMessage({ kind: 'answer', answerKey });

    setActions(defaultActions());

    announce('מוצגת תשובה מתוך תוכן האתר');

  }



  function renderFallback() {

    pushMessage({ kind: 'answerCustom', cardType: 'answer', title: 'מה מצאתי באתר', paragraphs: FALLBACK_TEXT, sources: ['knowledge', 'faq', 'treatment'], followups: [

      { label: 'מרכז הידע', href: sourceLinks.knowledge.href },

      { label: 'שאלות ותשובות', href: sourceLinks.faq.href },

      { label: 'שאלון ההכוונה', answer: 'questionnaire' }

    ] });

    setActions([{ label: 'ניסוח שאלה אחרת', next: 'ask', focusInput: true }, { label: 'חזרה להתחלה', next: 'start' }]);

    announce('לא נמצאה תשובה מלאה באתר');

  }



  function renderSafety() {

    pushMessage({ kind: 'answerCustom', cardType: 'safety', title: 'ייתכן שמדובר במצב דחוף', icon: '!', paragraphs: [

      'נראה שהשאלה מתארת מצב שעלול להיות דחוף. עוזר האתר אינו מיועד למצבי חירום, והאתר ועמוס אינם שירותי חירום.',

      'יש לפנות עכשיו לגורם חירום או לאיש מקצוע מוסמך באזור שלך.'

    ], sources: ['notEnough', 'disclaimer'] });

    setActions([{ label: 'חזרה להתחלה', next: 'start' }]);

    announce('אזהרה: ייתכן שמדובר במצב דחוף');

  }



  function renderMedicalBoundary() {

    pushMessage({ kind: 'answerCustom', cardType: 'medical', title: 'גבול רפואי חשוב', icon: 'i', paragraphs: [

      'אני לא יכול להנחות לגבי תרופות, מינונים או גמילה רפואית.',

      'במצבים כאלה חשוב לפנות לרופא או לגורם רפואי מוסמך, משום שהפסקה לא מבוקרת עלולה להיות מסוכנת.'

    ], sources: ['notEnough', 'prescription', 'disclaimer'] });

    setActions([{ label: 'חזרה להתחלה', next: 'start' }, { label: 'מידע כללי במרכז הידע', answer: 'types' }]);

    announce('מוצג גבול רפואי');

  }



  function renderLocalError() {

    clearLoading();

    askForm.hidden = true;

    pushMessage({ kind: 'answerCustom', cardType: 'answer', title: 'לא ניתן להציג תשובה כרגע', paragraphs: [

      'לא ניתן להציג כרגע תשובה מתוך אב־הטיפוס המקומי.',

      'אפשר לחזור להתחלה או לעיין במרכז הידע.'

    ], sources: ['knowledge'] });

    setActions([{ label: 'חזרה להתחלה', next: 'start' }]);

    announce('מוצג מצב שגיאה מקומי');

  }



  function renderUnavailable() {

    clearLoading();

    askForm.hidden = true;

    pushMessage({ kind: 'answerCustom', cardType: 'answer', title: 'עוזר AI להתמצאות באתר אינו זמין כרגע', paragraphs: [

      'עוזר ההתמצאות אינו זמין כרגע בתצוגת ההדגמה.',

      'המידע באתר עדיין נגיש דרך מרכז הידע והעמודים המרכזיים.'

    ], sources: ['knowledge', 'home'] });

    setActions([{ label: 'חזרה להתחלה', next: 'start' }]);

    announce('מוצג מצב אי זמינות');

  }



  function renderLoading(callback) {

    clearLoading();

    askForm.hidden = true;

    pushMessage({ kind: 'loading', paragraphs: ['בודק...'] });

    actions.innerHTML = '';

    actions.className = 'ai-website-guide__actions';

    announce('בודק תשובה');

    const complete = () => {

      removeLoading();

      Promise.resolve(callback()).catch(() => {

        removeLoading();

        renderFallback();

      });

    };

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {

      complete();

    } else {

      loadingTimer = window.setTimeout(complete, LOADING_MS);

    }

  }



  function resolveContextAnswer(value) {

    const candidates = [context.lastTopic, context.lastAnswer, context.audience].filter(Boolean);

    for (const current of candidates) {

      const rule = contextRules.find((item) => item.from === current && item.pattern.test(value));

      if (rule) return rule.answer;

    }

    return null;

  }



  function setActions(actionItems, cards = false) {

    actions.innerHTML = '';

    actions.className = `ai-website-guide__actions${cards ? ' ai-website-guide__actions--cards' : ''}`;

    actionItems.forEach((item, index) => {

      const button = document.createElement('button');

      button.type = 'button';

      button.className = cards

        ? 'ai-website-guide__action ai-website-guide__action-card'

        : `ai-website-guide__action${index === 0 ? ' ai-website-guide__action--primary' : ''}`;

      if (cards) {

        button.innerHTML = `<span class="ai-website-guide__action-card-title">${escapeHTML(item.label)}</span><span class="ai-website-guide__action-card-desc">${escapeHTML(item.description || '')}</span>`;

      } else {

        button.textContent = item.label;

      }

      button.addEventListener('click', () => handleAction(item));

      actions.appendChild(button);

    });

  }



  function handleAction(item) {

    if (item.next === 'start') renderStart();

    else if (item.next === 'ask') renderAsk(item.focusInput !== false);

    else if (item.next && routes[item.next]) renderRoute(item.next);

    else if (item.answer) renderAnswer(item.answer);

  }



  function defaultActions() {

    return [{ label: 'שאלה נוספת', next: 'ask' }, { label: 'חזרה להתחלה', next: 'start' }];

  }



  function pushMessage(message) {

    conversation.push(message);

    trimHistory();

    renderConversation();

  }



  function trimHistory() {

    const fixed = conversation.filter((item) => item.kind === 'notice' || item.kind === 'privacy');

    const rest = conversation.filter((item) => item.kind !== 'notice' && item.kind !== 'privacy');

    while (rest.length > HISTORY_LIMIT) rest.shift();

    conversation = [...fixed, ...rest];

  }



  function removeLoading() {

    conversation = conversation.filter((item) => item.kind !== 'loading');

    renderConversation();

  }



  function renderConversation() {

    messages.innerHTML = '';

    conversation.forEach((item) => {

      if (item.kind === 'answer') addAnswerCard(answers[item.answerKey]);

      else if (item.kind === 'answerCustom') addAnswerCard(item);

      else addSimpleMessage(item);

    });

    messages.scrollIntoView({ block: 'end' });

  }



  function addSimpleMessage(item) {

    const article = document.createElement('article');

    article.className = `ai-website-guide__message ai-website-guide__message--${item.kind}`;

    item.paragraphs.forEach((paragraph) => {

      const p = document.createElement('p');

      p.textContent = paragraph;

      article.appendChild(p);

    });

    messages.appendChild(article);

  }



  function addAnswerCard(item) {

    if (!item) return;

    const type = item.cardType || 'answer';

    const article = document.createElement('article');

    article.className = `ai-website-guide__answer-card ai-website-guide__answer-card--${type}`;

    const icon = item.icon || '▦';

    article.innerHTML = `<h3 class="ai-website-guide__answer-heading"><span class="ai-website-guide__icon" aria-hidden="true">${escapeHTML(icon)}</span>${escapeHTML(item.title || 'מה מצאתי באתר')}</h3>`;

    const text = document.createElement('div');

    text.className = 'ai-website-guide__answer-text';

    item.paragraphs.forEach((paragraph) => {

      const p = document.createElement('p');

      p.textContent = paragraph;

      text.appendChild(p);

    });

    if (item.limitation) {

      const p = document.createElement('p');

      p.textContent = item.limitation;

      text.appendChild(p);

    }

    article.appendChild(text);

    if (item.sourceItems && item.sourceItems.length) article.appendChild(createSourceBox(item.sourceItems));

    else if (item.sources && item.sources.length) article.appendChild(createSourceBox(item.sources));

    if (item.followups && item.followups.length) article.appendChild(createFollowups(item.followups));

    messages.appendChild(article);

  }



  function createSourceBox(sourceKeys) {

    const box = document.createElement('div');

    box.className = 'ai-website-guide__source-box';

    box.innerHTML = '<p class="ai-website-guide__source-title"><span class="ai-website-guide__icon" aria-hidden="true">▦</span>מקור</p>';

    const list = document.createElement('div');

    list.className = 'ai-website-guide__source-list';

    sourceKeys.slice(0, 3).forEach((key) => {

      const source = typeof key === 'string' ? sourceLinks[key] : key;

      if (!source) return;

      const link = document.createElement('a');

      link.href = source.href;

      link.textContent = source.title;

      list.appendChild(link);

    });

    box.appendChild(list);

    const first = typeof sourceKeys[0] === 'string' ? sourceLinks[sourceKeys[0]] : sourceKeys[0];

    if (first) {

      const full = document.createElement('a');

      full.href = first.href;

      full.className = 'ai-website-guide__full-link';

      full.textContent = 'לקריאת העמוד המלא';

      box.appendChild(full);

    }

    return box;

  }



  function createFollowups(followups) {

    const wrap = document.createElement('div');

    wrap.className = 'ai-website-guide__followups';

    wrap.innerHTML = '<p class="ai-website-guide__follow-title">אולי זה יעזור גם</p>';

    const list = document.createElement('div');

    list.className = 'ai-website-guide__follow-list';

    const seen = new Set();

    followups.slice(0, 3).forEach((item) => {

      if (seen.has(item.label)) return;

      seen.add(item.label);

      if (item.href) {

        const link = document.createElement('a');

        link.href = item.href;

        link.textContent = item.label;

        list.appendChild(link);

      } else if (item.answer) {

        const button = document.createElement('button');

        button.type = 'button';

        button.className = 'ai-website-guide__utility';

        button.textContent = item.label;

        button.addEventListener('click', () => renderAnswer(item.answer));

        list.appendChild(button);

      }

    });

    wrap.appendChild(list);

    return wrap;

  }



  function showValidation(text) {

    validation.textContent = text;

    validation.hidden = false;

  }



  function hideValidation() {

    validation.textContent = '';

    validation.hidden = true;

  }



  function clearLoading() {

    if (loadingTimer) {

      window.clearTimeout(loadingTimer);

      loadingTimer = null;

    }

    removeLoading();

  }



  function matchesAny(value, patterns) {

    return patterns.some((pattern) => pattern.test(value));

  }



  function announce(text) {

    statusRegion.textContent = text;

  }



  function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, (character) => ({

      '&': '&amp;',

      '<': '&lt;',

      '>': '&gt;',

      '"': '&quot;',

      "'": '&#039;'

    }[character]));

  }



  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', createWidget, { once: true });

  } else {

    createWidget();

  }

})();

