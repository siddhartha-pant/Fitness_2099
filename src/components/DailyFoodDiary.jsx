import React, { useEffect, useState } from 'react';

const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

const DailyFoodDiary = () => {
  const todayKey = getTodayKey();

  const [foodEntries, setFoodEntries] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');

  // Load today's entries
  useEffect(() => {
    const storedData = localStorage.getItem(`foodLog-${todayKey}`);
    if (storedData) {
      setFoodEntries(JSON.parse(storedData));
    }
  }, [todayKey]);

  // Save on change
  useEffect(() => {
    localStorage.setItem(`foodLog-${todayKey}`, JSON.stringify(foodEntries));
  }, [foodEntries, todayKey]);

  // Clear previous days' entries
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('foodLog-') && key !== `foodLog-${todayKey}`) {
        localStorage.removeItem(key);
      }
    });
  }, [todayKey]);

  const handleAddFood = () => {
    if (!foodName || !carbs || !fats || !proteins) return;

    const foodItem = {
      name: foodName,
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
      proteins: parseFloat(proteins),
      calories: (4 * parseFloat(carbs)) + (9 * parseFloat(fats)) + (4 * parseFloat(proteins)),
    };

    setFoodEntries((prev) => [...prev, foodItem]);
    setFoodName('');
    setCarbs('');
    setFats('');
    setProteins('');
  };

  const handleDelete = (index) => {
    setFoodEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCalories = foodEntries.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="w-full p-6 rounded-xl shadow-lg border mt-4
                    bg-opacity-60 transition-colors duration-500
                    dark:bg-gray-800 dark:border-yellow-700 bg-gray-50 border-yellow-200">
      <h3 className="text-2xl font-bold mb-4 text-center text-yellow-600 dark:text-yellow-400">
        Food Diary for {todayKey}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
        <input
          type="text"
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          className="p-2 rounded-md border"
        />
        <input
          type="number"
          placeholder="Fats (g)"
          value={fats}
          onChange={(e) => setFats(e.target.value)}
          className="p-2 rounded-md border"
        />
        <input
          type="number"
          placeholder="Proteins (g)"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          className="p-2 rounded-md border"
        />
        <button
          onClick={handleAddFood}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
        >
          Add
        </button>
      </div>

      {foodEntries.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No food entries yet today.</p>
      ) : (
        <>
          <table className="w-full text-left table-auto border-collapse mb-4">
            <thead>
              <tr className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                <th className="p-2">Food</th>
                <th className="p-2">Carbs (g)</th>
                <th className="p-2">Fats (g)</th>
                <th className="p-2">Proteins (g)</th>
                <th className="p-2">Calories</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {foodEntries.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.carbs}</td>
                  <td className="p-2">{item.fats}</td>
                  <td className="p-2">{item.proteins}</td>
                  <td className="p-2">{item.calories.toFixed(1)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-lg font-bold text-green-600 dark:text-green-400">
            Total Calories: {totalCalories.toFixed(1)} kcal
          </div>
        </>
      )}
    </div>
  );
};

export default DailyFoodDiary;
