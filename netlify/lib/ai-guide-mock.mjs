export function isMockEnabled() {
  if (process.env.AI_GUIDE_USE_MOCK !== 'true') return false;
  const environment = process.env.AI_GUIDE_ENV || process.env.NODE_ENV || 'development';
  if (environment === 'production' && process.env.AI_GUIDE_ALLOW_PRODUCTION_MOCK !== 'true') return false;
  return true;
}

function output(payload) {
  return JSON.stringify(payload);
}

function inferScenario(question, scenario) {
  if (scenario) return scenario;
  const text = String(question || '').toLowerCase();
  if (text.includes('family') || text.includes('משפחה')) return 'family_answer';
  if (text.includes('professional') || text.includes('אנשי מקצוע')) return 'professional_answer';
  if (text.includes('questionnaire') || text.includes('שאלון')) return 'questionnaire_answer';
  if (text.includes('insufficient') || text.includes('אין מידע')) return 'insufficient_information';
  if (text.includes('malformed')) return 'malformed_output';
  if (text.includes('external')) return 'external_url';
  if (text.includes('unsupported')) return 'unsupported_source';
  if (text.includes('excessive')) return 'excessive_sources';
  if (text.includes('timeout')) return 'timeout';
  if (text.includes('server_error')) return 'server_error';
  if (text.includes('model_rate_limit')) return 'rate_limit';
  return 'grounded_answer';
}

export async function callMockResponsesApi({ question, scenario, sources = [] }) {
  scenario = inferScenario(question, scenario);
  const primary = sources[0]?.path || '/knowledge-center.html';
  const secondary = sources[1]?.path || '/questions-and-answers.html';
  const family = sources.find((source) => source.path.includes('/knowledge/families'))?.path || primary;
  const professional = sources.find((source) => source.path.includes('/for-professionals'))?.path || primary;
  const questionnaire = sources.find((source) => source.path.includes('/services/treatment-guidance'))?.path || primary;

  switch (scenario) {
    case 'family_answer':
      return output({
        mode: 'answer',
        title: 'מידע למשפחה מתוך האתר',
        paragraphs: [
          'לפי המידע באתר, למשפחה אין שליטה מלאה על הבחירות של האדם המתמודד, אבל יש לה השפעה על אופן השיחה, הגבולות והפנייה לעזרה.',
          'חשוב לשמור על שיחה רגועה, להימנע מכפייה, ולבדוק מצבי סיכון שבהם נדרש גורם מוסמך.'
        ],
        source_paths: [family]
      });
    case 'professional_answer':
      return output({
        mode: 'answer',
        title: 'מידע לאנשי מקצוע',
        paragraphs: [
          'האתר כולל עמוד ייעודי לאנשי מקצוע, עם גבולות שירות והבהרה שהליווי אינו אבחון או טיפול קליני.',
          'במקרים שבהם נדרשת הערכה רפואית, פסיכיאטרית או טיפולית, יש להפנות לגורם מוסמך.'
        ],
        source_paths: [professional, secondary]
      });
    case 'questionnaire_answer':
      return output({
        mode: 'answer',
        title: 'שאלון ההכוונה הראשוני',
        paragraphs: [
          'השאלון באתר נועד לעזור לעשות סדר לפני שיחת הכוונה, ולא לקבוע אבחנה או מסגרת טיפול.',
          'לאחר מילוי השאלון אפשר להשאיר פרטים כדי שהפנייה תגיע בצורה מסודרת יותר.'
        ],
        source_paths: [questionnaire]
      });
    case 'insufficient_information':
      return output({
        mode: 'fallback',
        title: 'אין מספיק מידע באתר',
        paragraphs: [
          'לא מצאתי באתר מקור מאושר שמספיק כדי לענות על השאלה הזו בצורה אחראית.',
          'אפשר לנסח את השאלה אחרת או להתחיל מהעמודים המרכזיים של מרכז הידע והשאלות הנפוצות.'
        ],
        source_paths: [primary]
      });
    case 'malformed_output':
      return '{not valid json';
    case 'unsupported_source':
      return output({
        mode: 'answer',
        title: 'מקור לא מאושר',
        paragraphs: ['זה ניסיון להשתמש במקור שלא נמצא בתוצאות האחזור המאושרות.'],
        source_paths: ['/about.html']
      });
    case 'external_url':
      return output({
        mode: 'answer',
        title: 'מקור חיצוני',
        paragraphs: ['זה ניסיון להחזיר מקור חיצוני שאינו חלק מהאתר.'],
        source_paths: ['https://example.com/provider']
      });
    case 'excessive_sources':
      return output({
        mode: 'answer',
        title: 'יותר מדי מקורות',
        paragraphs: ['התשובה כוללת יותר מקורות מהמותר ולכן תוגבל למקורות המאושרים הראשונים.'],
        source_paths: sources.slice(0, 5).map((source) => source.path)
      });
    case 'timeout':
      await new Promise((resolve) => setTimeout(resolve, 25));
      throw new Error('Mock timeout');
    case 'rate_limit': {
      const error = new Error('Mock rate limit');
      error.statusCode = 429;
      throw error;
    }
    case 'server_error':
      throw new Error('Mock server error');
    case 'grounded_answer':
    default:
      return output({
        mode: 'answer',
        title: 'מה מצאתי באתר',
        paragraphs: [
          'מצאתי באתר מידע שמסביר איך להתחיל בבירור אחראי של אפשרויות עזרה בהתמכרות.',
          'העוזר יכול להפנות למידע קיים באתר, אך אינו מחליף אבחון, טיפול, ייעוץ רפואי או החלטה מקצועית.'
        ],
        source_paths: [primary, secondary].filter(Boolean)
      });
  }
}
