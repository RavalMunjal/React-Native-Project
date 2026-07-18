export const validateSurveyField = (name, value) => {
  switch (name) {
    case 'siteName':
      if (!value || value.trim().length === 0) return 'Site name is required.';
      if (value.trim().length < 3) return 'Site name must contain at least 3 characters.';
      return null;
    case 'clientName':
      if (!value || value.trim().length === 0) return 'Client name is required.';
      if (value.trim().length < 2) return 'Client name must contain at least 2 characters.';
      return null;
    case 'description':
      if (!value || value.trim().length === 0) return 'Description is required.';
      return null;
    case 'priority':
      if (!value) return 'Priority must be selected.';
      return null;
    case 'surveyDate':
      if (!value) return 'Survey date is required.';
      return null;
    default:
      return null;
  }
};

export const validateSurvey = (draft) => {
  const errors = {};
  
  const siteNameError = validateSurveyField('siteName', draft.siteName);
  if (siteNameError) errors.siteName = siteNameError;
  
  const clientNameError = validateSurveyField('clientName', draft.clientName);
  if (clientNameError) errors.clientName = clientNameError;
  
  const descriptionError = validateSurveyField('description', draft.description);
  if (descriptionError) errors.description = descriptionError;
  
  const priorityError = validateSurveyField('priority', draft.priority);
  if (priorityError) errors.priority = priorityError;
  
  const surveyDateError = validateSurveyField('surveyDate', draft.surveyDate);
  if (surveyDateError) errors.surveyDate = surveyDateError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
