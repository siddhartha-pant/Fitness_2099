// src/components/DailyMoodLog.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const moods = [
  { score: 1, emoji: '😠', description: 'Very Bad' },
  { score: 2, emoji: '😟', description: 'Bad' },
  { score: 3, emoji: '😐', description: 'Neutral' },
  { score: 4, emoji: '🙂', description: 'Good' },
  { score: 5, emoji: '😁', description: 'Excellent' },
];

const DailyMoodLog = () => {
  const { theme } = useTheme();

  // State to manage the currently viewed date (Date object)
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());

  // State to hold all mood and log data, keyed by ISO date string (YYYY-MM-DD)
  const [allMoodLogs, setAllMoodLogs] = useState(() => {
    try {
      const savedLogs = localStorage.getItem('dailyMoodLogs');
      return savedLogs ? JSON.parse(savedLogs) : {};
    } catch (e) {
      console.error("Failed to parse dailyMoodLogs from localStorage, returning empty object:", e);
      return {}; // Return empty object on error
    }
  });

  // State for the mood score and log entry for the current day
  const [moodScore, setMoodScore] = useState(null);
  const [logEntry, setLogEntry] = useState('');

  // Helper to format date to ISO-MM-DD string for storage key
  const getISODate = useCallback((date) => {
    return date.toISOString().split('T')[0];
  }, []);

  // Effect to load mood/log for the currentDisplayDate
  useEffect(() => {
    const isoDate = getISODate(currentDisplayDate);
    const dayData = allMoodLogs[isoDate] || { mood: null, log: '' };
    setMoodScore(dayData.mood);
    setLogEntry(dayData.log);
  }, [currentDisplayDate, allMoodLogs, getISODate]);

  // Effect to save allMoodLogs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dailyMoodLogs', JSON.stringify(allMoodLogs));
  }, [allMoodLogs]);

  // Function to update mood and log for the current day
  const updateCurrentDayLog = useCallback((newMood, newLog) => {
    const isoDate = getISODate(currentDisplayDate);
    setAllMoodLogs(prevLogs => ({
      ...prevLogs,
      [isoDate]: { mood: newMood, log: newLog }
    }));
  }, [currentDisplayDate, getISODate]);

  // Handlers for mood and log changes
  const handleMoodSelect = (score) => {
    setMoodScore(score);
    updateCurrentDayLog(score, logEntry);
  };

  const handleLogChange = (e) => {
    const newLog = e.target.value;
    setLogEntry(newLog);
    updateCurrentDayLog(moodScore, newLog);
  };

  // Handlers for date navigation
  const handlePreviousDay = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // Format date for display
  const displayDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDisplayDate = currentDisplayDate.toLocaleDateString(undefined, displayDateOptions);

  // Determine colors based on theme for the glass aesthetic
  const sectionBorderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200';
  const textColorPrimary = theme === 'dark' ? 'text-white' : 'text-gray-900'; // Ensured definition
  const textColorSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const headingColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-700';
  const inputBgColor = theme === 'dark' ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-100 bg-opacity-50';
  const inputTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const inputBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const inputFocusRing = theme === 'dark' ? 'focus:ring-blue-600' : 'focus:ring-blue-400';
  const buttonNav = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  return (
    <section className={`p-6 rounded-xl shadow-2xl border backdrop-blur-md transition-colors duration-500 bg-transparent ${sectionBorderColor} w-full min-h-full`}>
      <h3 className={`${headingColor} text-3xl font-bold mb-8 text-center`}>Daily Mood & Log</h3>

      {/* Date Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePreviousDay}
          className={`py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${buttonNav}`}
        >
          &larr; Previous Day
        </button>
        <p className={`${textColorPrimary} text-lg md:text-xl font-semibold`}>
          {formattedDisplayDate}
        </p>
        <button
          onClick={handleNextDay}
          className={`py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${buttonNav}`}
        >
          Next Day &rarr;
        </button>
      </div>

      {/* How do you feel? */}
      <div className={`p-6 rounded-lg shadow-md border bg-transparent mb-8
                     ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
        <h4 className={`${textColorPrimary} text-xl font-bold mb-4 text-center`}>How do you feel today?</h4>
        <div className="flex justify-around items-center space-x-2 sm:space-x-4">
          {moods.map((mood) => (
            <button
              key={mood.score}
              onClick={() => handleMoodSelect(mood.score)}
              className={`flex flex-col items-center p-3 rounded-xl transform transition-all duration-200 ease-in-out
                          ${moodScore === mood.score
                            ? 'scale-125 ring-4 ring-blue-500 shadow-xl'
                            : 'scale-100 hover:scale-110 opacity-70 hover:opacity-100'
                          }
                          ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                          `}
            >
              <span className="text-4xl md:text-5xl">{mood.emoji}</span>
              <span className={`text-xs mt-1 font-medium ${textColorSecondary} hidden sm:block`}>{mood.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Log */}
      <div className={`p-6 rounded-lg shadow-md border bg-transparent
                     ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
        <h4 className={`${textColorPrimary} text-xl font-bold mb-4 text-center`}>Daily Log Entry</h4>
        <textarea
          value={logEntry}
          onChange={handleLogChange}
          placeholder="Write about your day, your workout, your thoughts..."
          rows="8"
          className={`w-full p-4 rounded-lg border focus:outline-none ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing} transition duration-200 resize-y`}
        ></textarea>
      </div>
    </section>
  );
};

export default DailyMoodLog;
