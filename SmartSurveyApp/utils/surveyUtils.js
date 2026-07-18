export const generateSurveyId = () => {
  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SUR-${dateStr}-${randomNum}`;
};
