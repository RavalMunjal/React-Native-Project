import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSurveyId } from '../utils/surveyUtils';

export const SurveyContext = createContext();

export const useSurvey = () => {
  return useContext(SurveyContext);
};

const SURVEY_DRAFT_KEY = 'smart_field_survey_draft';
const SURVEY_HISTORY_KEY = 'smart_field_surveys';

export const SurveyProvider = ({ children }) => {
  const [surveyDraft, setSurveyDraft] = useState({});
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    loadSurveys();
    loadDraft();
  }, []);

  const loadSurveys = async () => {
    try {
      const storedSurveys = await AsyncStorage.getItem(SURVEY_HISTORY_KEY);
      if (storedSurveys) {
        setSurveys(JSON.parse(storedSurveys));
      }
    } catch (e) {
      console.error('Failed to load surveys', e);
    }
  };

  const loadDraft = async () => {
    try {
      const storedDraft = await AsyncStorage.getItem(SURVEY_DRAFT_KEY);
      if (storedDraft) {
        setSurveyDraft(JSON.parse(storedDraft));
      }
    } catch (e) {
      console.error('Failed to load survey draft', e);
    }
  };

  const updateSurveyDraft = async (updates) => {
    const updatedDraft = { ...surveyDraft, ...updates };
    setSurveyDraft(updatedDraft);
    try {
      await AsyncStorage.setItem(SURVEY_DRAFT_KEY, JSON.stringify(updatedDraft));
    } catch (e) {
      console.error('Failed to save survey draft', e);
    }
  };

  const resetSurveyDraft = async () => {
    setSurveyDraft({});
    try {
      await AsyncStorage.removeItem(SURVEY_DRAFT_KEY);
    } catch (e) {
      console.error('Failed to remove survey draft', e);
    }
  };

  const submitSurvey = async () => {
    if (!surveyDraft.siteName || !surveyDraft.clientName || !surveyDraft.surveyDate) {
      return { success: false, error: 'Missing required fields' };
    }
    
    const newSurvey = {
      ...surveyDraft,
      id: generateSurveyId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Submitted'
    };
    
    const updatedSurveys = [newSurvey, ...surveys];
    setSurveys(updatedSurveys);
    
    try {
      await AsyncStorage.setItem(SURVEY_HISTORY_KEY, JSON.stringify(updatedSurveys));
      await resetSurveyDraft();
      return { success: true };
    } catch (e) {
      console.error('Failed to submit survey', e);
      return { success: false, error: 'Failed to save survey' };
    }
  };

  const updateSurvey = async (id, updates) => {
    const surveyIndex = surveys.findIndex(s => s.id === id);
    if (surveyIndex === -1) return { success: false, error: 'Survey not found' };
    
    const updatedSurveys = [...surveys];
    updatedSurveys[surveyIndex] = {
      ...updatedSurveys[surveyIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    setSurveys(updatedSurveys);
    try {
      await AsyncStorage.setItem(SURVEY_HISTORY_KEY, JSON.stringify(updatedSurveys));
      return { success: true };
    } catch (e) {
      console.error('Failed to update survey', e);
      return { success: false, error: 'Failed to save survey' };
    }
  };

  const deleteSurvey = async (id) => {
    const updatedSurveys = surveys.filter(s => s.id !== id);
    setSurveys(updatedSurveys);
    try {
      await AsyncStorage.setItem(SURVEY_HISTORY_KEY, JSON.stringify(updatedSurveys));
      return { success: true };
    } catch (e) {
      console.error('Failed to delete survey', e);
      return { success: false, error: 'Failed to delete survey' };
    }
  };

  const getSurveyById = (id) => {
    return surveys.find(s => s.id === id);
  };
  
  const setSelectedPhoto = (photoData) => {
    updateSurveyDraft({
      photo: photoData.uri,
      photoCapturedAt: photoData.capturedAt || new Date().toISOString()
    });
  };
  
  const setSelectedContact = (contact) => {
    updateSurveyDraft({
      contact: contact
    });
  };
  
  const setCurrentLocation = (location) => {
    updateSurveyDraft({
      location: location
    });
  };
  
  const setNotes = (notes) => {
    updateSurveyDraft({
      notes: notes
    });
  };

  const clearAllHistory = async () => {
    setSurveys([]);
    try {
      await AsyncStorage.removeItem(SURVEY_HISTORY_KEY);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyDraft,
        surveys,
        updateSurveyDraft,
        resetSurveyDraft,
        submitSurvey,
        updateSurvey,
        deleteSurvey,
        getSurveyById,
        setSelectedPhoto,
        setSelectedContact,
        setCurrentLocation,
        setNotes,
        clearAllHistory
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
