import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import DailyFoodDiary from "./DailyFoodDiary";
import DailyMoodLog from "./DailyMood";
import Navbar from "./Navbar";
import { getUserProfile } from "../services/profile";
import { loadUserprofile } from "../redux/UserSlice";

const DashboardPage = () => {
  console.log("dashboard");
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [enlargedChart, setEnlargedChart] = useState(null);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedHeight, setEditedHeight] = useState("");
  const [editedWeight, setEditedWeight] = useState("");
  // Corrected the useState initialization for editedTrainingExperience
  const [editedTrainingExperience, setEditedTrainingExperience] = useState("");

  const [currentDate, setCurrentDate] = useState("");

  const token = useSelector((store) => store.auth.token);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatcher = useDispatch();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(token);
      console.log(response, "ye response haui");
      dispatcher(loadUserprofile(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString(undefined, options));

    const fetchUserData = () => {
      setLoadingUser(true);
      const fetchedData = {
        name: "Siddhartha",
        profilePicture:
          "https://placehold.co/150x150/A020F0/FFFFFF/png?text=SD",
        email: "siddhartha@example.com",
        age: 28,
        gender: "Male",
        height: 178,
        weight: 75,
        trainingExperience: "1-2 years",
        joinedDate: "2023-01-15",
        goal: "bulk",
      };
      setUserData(fetchedData);
      setEditedName(fetchedData.name);
      setEditedEmail(fetchedData.email);
      setEditedAge(fetchedData.age.toString()); // Ensure age is string for input value
      setEditedGender(fetchedData.gender);
      setEditedHeight(fetchedData.height.toString()); // Ensure height is string for input value
      setEditedWeight(fetchedData.weight.toString()); // Ensure weight is string for input value
      setEditedTrainingExperience(fetchedData.trainingExperience);
      setCurrentGoal(fetchedData.goal);
      setLoadingUser(false);
    };

    if (true /* isAuthenticated */) {
      fetchUserData();
    } else {
      setLoadingUser(false);
    }
  }, [isAuthenticated]);

  const handleSaveChanges = () => {
    setUserData({
      ...userData,
      name: editedName,
      email: editedEmail,
      age: parseInt(editedAge, 10),
      gender: editedGender,
      height: parseFloat(editedHeight),
      weight: parseFloat(editedWeight),
      trainingExperience: editedTrainingExperience,
      goal: currentGoal,
    });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    if (userData) {
      setEditedName(userData.name);
      setEditedEmail(userData.email);
      setEditedAge(userData.age.toString());
      setEditedGender(userData.gender);
      setEditedHeight(userData.height.toString());
      setEditedWeight(userData.weight.toString());
      setEditedTrainingExperience(userData.trainingExperience);
      setCurrentGoal(userData.goal);
    }
    setIsEditing(false);
  };

  const handleChartClick = (chartId) => {
    setEnlargedChart(enlargedChart === chartId ? null : chartId);
  };

  const backgroundGradient =
    theme === "dark"
      ? "linear-gradient(to right, #1e3a8a, #7f1d1d, #000000)"
      : "linear-gradient(to right, #b57ef5, #FFFFFF, #f3f360)";

  // Define all theme-dependent color variables here
  const textColorPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textColorSecondary =
    theme === "dark" ? "text-gray-300" : "text-gray-700";
  const headingColor = theme === "dark" ? "text-blue-400" : "text-blue-700";
  const inputBgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const inputTextColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputBorderColor =
    theme === "dark" ? "border-gray-700" : "border-gray-300";
  const inputFocusRing =
    theme === "dark" ? "focus:ring-blue-600" : "focus:ring-blue-400";

  const fitnessGoals = [
    {
      id: "bulk",
      name: "Bulk",
      description:
        "Focus on gaining muscle mass and overall body weight. Typically involves a calorie surplus and heavy lifting.",
      image: "https://placehold.co/200x150/4CAF50/FFFFFF?text=BULK",
      colorClass: theme === "dark" ? "border-green-500" : "border-green-400",
    },
    {
      id: "cut",
      name: "Cut",
      description:
        "Focus on losing body fat while preserving muscle mass. Typically involves a calorie deficit and consistent cardio.",
      image: "https://placehold.co/200x150/FF5722/FFFFFF?text=CUT",
      colorClass: theme === "dark" ? "border-orange-500" : "border-orange-400",
    },
    {
      id: "recomp",
      name: "Recomp",
      description:
        "Focus on simultaneously building muscle and losing fat. Often involves maintaining calories and optimizing macronutrients.",
      image: "https://placehold.co/200x150/2196F3/FFFFFF?text=RECOMP",
      colorClass: theme === "dark" ? "border-blue-500" : "border-blue-400",
    },
  ];

  if (loadingUser) {
    return (
      <div
        className="relative min-h-screen w-screen flex items-center justify-center p-4 overflow-hidden"
        style={{
          backgroundImage: backgroundGradient,
          backgroundSize: "200% 200%",
          animation: "gradient 10s ease infinite",
        }}
      >
        <h2 className={`${textColorPrimary} text-3xl font-bold animate-pulse`}>
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div
        className="relative min-h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden"
        style={{
          backgroundImage: backgroundGradient,
          backgroundSize: "200% 200%",
          animation: "gradient 10s ease infinite",
        }}
      >
        <h2 className={`${textColorPrimary} text-3xl font-bold mb-4`}>
          User data not found.
        </h2>
        <p className={`${textColorSecondary}`}>
          Please ensure you are logged in.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen w-screen flex flex-col items-center justify-start p-0 overflow-hidden pt-16"
        style={{
          backgroundImage: backgroundGradient,
          backgroundSize: "200% 200%",
          animation: "gradient 10s ease infinite",
        }}
      >
        <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

        <div
          className={`relative z-10 w-full my-8 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-md
                    flex flex-col space-y-8 transition-colors duration-500 border border-transparent`}
        >
          <header
            className={`flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-opacity-20
                           transition-colors duration-500 bg-transparent
                           ${
                             theme === "dark"
                               ? "border-white/10"
                               : "border-gray-200"
                           }`}
          >
            <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
              <h1
                className={`${headingColor} text-4xl md:text-5xl font-extrabold drop-shadow-lg transition-colors duration-500 text-center sm:text-left`}
              >
                Welcome, {userData.name}!
              </h1>
              <p
                className={`${textColorSecondary} text-lg mt-2 transition-colors duration-500`}
              >
                Your personalized fitness journey awaits.
              </p>
            </div>

            <div
              className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4
                          transition-colors duration-500
                          ${theme === 'dark' ? 'border-blue-500' : 'border-purple-400'}"
            >
              <img
                src={userData.profilePicture}
                alt={`${userData.name}'s Profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x150/CCCCCC/000000?text=User";
                }}
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
            </div>
          </header>

          <section
            className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                         ${
                           theme === "dark"
                             ? "border-white/10"
                             : "border-gray-200"
                         }`}
          >
            <h3
              className={`${headingColor} text-2xl font-bold mb-4 text-center`}
            >
              Daily Insights
            </h3>
            <p
              className={`${textColorPrimary} text-center text-xl font-semibold italic`}
            >
              {currentDate}
            </p>
          </section>

          <section
            className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                         ${
                           theme === "dark"
                             ? "border-white/10"
                             : "border-gray-200"
                         }`}
          >
            <h3
              className={`${headingColor} text-2xl font-bold mb-6 text-center`}
            >
              Choose Your Fitness Goal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fitnessGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => setCurrentGoal(goal.id)}
                  className={`relative p-4 rounded-xl shadow-lg cursor-pointer group
                            flex flex-col items-center text-center bg-transparent
                            transition-all duration-300 ease-in-out transform hover:scale-105
                            ${
                              currentGoal === goal.id
                                ? `${goal.colorClass} scale-105 shadow-xl`
                                : `border-transparent hover:border-blue-500/50 hover:shadow-xl`
                            }
                            ${
                              theme === "dark"
                                ? "border-white/10"
                                : "border-gray-200"
                            }
                            `}
                >
                  <img
                    src={goal.image}
                    alt={goal.name}
                    className="w-24 h-24 rounded-full object-cover mb-3 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <h4 className={`text-xl font-bold mb-2 ${textColorPrimary}`}>
                    {goal.name}
                  </h4>
                  <p className={`text-sm ${textColorSecondary}`}>
                    {goal.description}
                  </p>
                  {currentGoal === goal.id && (
                    <span className="absolute top-2 right-2 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                        ${
                          theme === "dark"
                            ? "border-white/10"
                            : "border-gray-200"
                        }`}
            >
              <h3 className={`${headingColor} text-2xl font-bold mb-3`}>
                Daily Progress
              </h3>
              <p className={`${textColorSecondary}`}>5,200 steps today</p>
              <p className={`${textColorSecondary}`}>
                Workout completed: 45 min cardio
              </p>
            </div>

            <div
              className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                        ${
                          theme === "dark"
                            ? "border-white/10"
                            : "border-gray-200"
                        }`}
            >
              <h3 className={`${headingColor} text-2xl font-bold mb-3`}>
                Next Workout
              </h3>
              <p className={`${textColorSecondary}`}>
                Strength Training - Arms & Shoulders
              </p>
              <p className={`${textColorSecondary}`}>Tomorrow, 7:00 AM</p>
            </div>

            <div
              className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                        ${
                          theme === "dark"
                            ? "border-white/10"
                            : "border-gray-200"
                        }`}
            >
              <h3 className={`${headingColor} text-2xl font-bold mb-3`}>
                Nutrition Goal
              </h3>
              <p className={`${textColorSecondary}`}>
                Calories remaining: 1200 kcal
              </p>
              <p className={`${textColorSecondary}`}>Protein target: 150g</p>
            </div>
          </section>

          <DailyFoodDiary />

          {/* Daily Mood Log Component is rendered here */}
          <DailyMoodLog />

          <section
            className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                         ${
                           theme === "dark"
                             ? "border-white/10"
                             : "border-gray-200"
                         }`}
          >
            <h3 className={`${headingColor} text-2xl font-bold mb-4`}>
              Your Progress Charts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => handleChartClick("weight")}
                className={`w-full flex items-center justify-center rounded-lg shadow-inner cursor-pointer bg-transparent
                          transition-all duration-300 ease-in-out hover:scale-105
                          ${
                            enlargedChart === "weight"
                              ? "h-96 md:col-span-2"
                              : "h-48"
                          }
                          ${
                            theme === "dark"
                              ? "border border-white/10 text-gray-400"
                              : "border border-gray-200 text-gray-600"
                          }`}
              >
                <p className="text-xl font-semibold">
                  Weight Progress Chart (Placeholder)
                </p>
              </div>
              <div
                onClick={() => handleChartClick("activity")}
                className={`w-full flex items-center justify-center rounded-lg shadow-inner cursor-pointer bg-transparent
                          transition-all duration-300 ease-in-out hover:scale-105
                          ${
                            enlargedChart === "activity"
                              ? "h-96 md:col-span-2"
                              : "h-48"
                          }
                          ${
                            theme === "dark"
                              ? "border border-white/10 text-gray-400"
                              : "border border-gray-200 text-gray-600"
                          }`}
              >
                <p className="text-xl font-semibold">
                  Activity Trend Chart (Placeholder)
                </p>
              </div>
            </div>
          </section>

          <section
            className={`p-6 rounded-xl shadow-lg border transition-colors duration-500 bg-transparent
                         ${
                           theme === "dark"
                             ? "border-white/10"
                             : "border-gray-200"
                         }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`${headingColor} text-2xl font-bold`}>
                Your Details
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105
                          ${
                            theme === "dark"
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveChanges();
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Age:
                  </label>
                  <input
                    type="number"
                    value={editedAge}
                    onChange={(e) => setEditedAge(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Gender:
                  </label>
                  <select
                    value={editedGender}
                    onChange={(e) => setEditedGender(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Height (cm):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editedHeight}
                    onChange={(e) => setEditedHeight(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Weight (kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editedWeight}
                    onChange={(e) => setEditedWeight(e.target.value)}
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label
                    className={`${textColorSecondary} block text-sm font-bold mb-1`}
                  >
                    Training Experience:
                  </label>
                  <select
                    value={editedTrainingExperience}
                    onChange={(e) =>
                      setEditedTrainingExperience(e.target.value)
                    }
                    className={`w-full p-2 rounded-md ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing}`}
                  >
                    <option value="0-6 months">0-6 months</option>
                    <option value="6 months-1 year">6 months-1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-4 years">2-4 years</option>
                    <option value="4 years and above">4 years and above</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={`py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105
                              ${
                                theme === "dark"
                                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                              }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105
                              ${
                                theme === "dark"
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className={`${textColorSecondary}`}>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Age:</strong> {userData.age}
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Height:</strong> {userData.height} cm
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Weight:</strong> {userData.weight} kg
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Training Experience:</strong>{" "}
                  {userData.trainingExperience}
                </p>
                <p className={`${textColorSecondary}`}>
                  <strong>Member Since:</strong> {userData.joinedDate}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
