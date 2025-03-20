import { format } from "date-fns";
import axios from 'axios';

// Astrological effects database
const dashaPredictions = {
  "SUN": {
    "SUN": "Feeling like going away from your surroundings and property for a change of scene, news of death or separation from close and dear people, loss of power and status, all kinds of losses.",
    "MOO": "Having faith in God and learned people, expertise in doing daily duties, affection towards all your relatives.",
    "MAR": "Desire to do cruel deeds, serious trouble from opponents who put the blame on you, even though you are innocent, loss of blood.",
    "RAH": "Fear of robbers, fire and poison, injury caused by fighting, defeat therein, destruction to your intention to do charitable and good works.",
    "JUP": "Invitation from an influential person, respect from his assistants and an interview with him, remaining serene and calm.",
    "SAT": "Trouble from Gods and learned people in connection with robbery, loss of position and status, mental unhappiness.",
    "MER": "Acquisition of special dresses and personal attire, socialising with fine ladies, unexpected gain of fixed assets.",
    "KET": "Goodness, destruction of your greediness, more servants, marriage invitations or reunion with partner, sometimes served by assistants.",
    "VEN": "Good times, prosperity and various income to partner, children, friends and acquaintances."
  },
  "MOO": {
    "MOO": "Buying an ornament or fancy items or other fixed assets, being solicituous towards people doing good work, honouring and rendering service to your superiors or the authorities, a short spell of cheap temperament and base instincts surfacing, an act of supervising something.",
    "MAR": "A short spell of sorrow, a difference of opinion with somebody, a slight stomach upset, danger to father's health, bodily aches, acidity and cold.",
    "RAH": "Argument and hot exchange of words with friends and relatives, feeling dissatisfied with state of affairs in your environment and feeling like going away from your surroundings, shortage of money, being restrained in a strange or far away place.",
    "JUP": "Receiving royal treatment, child birth news or company of children, enjoying happiness and pleasantness everywhere.",
    "SAT": "Penalties imposed on you by the authorities or mental 'loss' due to restrictions imposed on your freedom by your superiors or elders, financial loss due to bad bargains in business transactions, involvement in shady scandals, trouble in connection with learned people.",
    "MER": "Receiving a certificate of honour or a token of respect from your superiors or the authorities, acquisition of fixed assets, enjoying the benefits of a foreign vehicle, company of children and grand children.",
    "KET": "Danger to your health due to plants or vegetables, sharp instruments or common domestic animals, trouble due to heat, fire and sunburn.",
    "VEN": "Marriage invitations or reunion with partner, gain of fixed assets, dresses, ornaments and other personal attire, gain of a new job or starting a new profession, becoming famous.",
    "SUN": "Troubles over troubles, failure in your work, shortage of food, comforts and money, bodily discomforts, loss of fixed assets."
  },
  "MAR": {
    "MAR": "Loss in connection with your fixed assets, mental tensions, skin or body diseases, company of relatives, a down in the dumps feeling due to hostilities shown by near and dear ones.",
    "RAH": "Injury and scar formed thereby, unpopularity with the public, danger to relations of partner, serious danger from fire, heat, sunburn or snakelike insects.",
    "JUP": "Involvement in praying to God, seriously learning to be an adviser or secretary, appreciating the beauty of the world at large, great mental happiness.",
    "SAT": "Release from what you have been tied up with, surrounded by good food and comfortable bedding, sound financial position, more servants and assistants, fixed assets and prosperity.",
    "MER": "Enjoying the benefits of a deluxe vehicle and a royal treatment, suffering from cough.",
    "KET": "Tendency to poke your nose in what is not your business, being insulted everywhere, 'dirty' finish in all your jobs.",
    "VEN": "Company of ladies you like, financial income, enjoying food you like, success in desired matters.",
    "SUN": "Your elders, superiors or the authorities disagreeing with you, fighting with others, hiding reality in your work, condemned by everybody.",
    "MOO": "Mental wounds being cleaned, financial gain, affection from godly and learned people, short sickness."
  },
  "RAH": {
    "RAH": "Going through a spell of sadistic temperament or intention to harm others, indecisions in your work, unceremonious events, improper sentiments.",
    "JUP": "Suffering from long standing diseases, shortage of money, being pleasant and likeable to others, others liking the sight of you, your generosity and charitable intentions surfacing, being resourceful.",
    "SAT": "Gaining a bad reputation due to improper involvements, an urge of cruel and evil tendencies, serving strangers, mingling with useless people and doing stupid acts.",
    "MER": "Enjoying women's company, giving promises, remaining unaffected by worldly happenings, liking to over eat, enjoying good health.",
    "KET": "Being sweet natured, insulted or offended at certain places, confined and bound by some problem, secure longevity, unenthusiastic, danger to life.",
    "VEN": "Release from what you have been bound to, getting a respected position and status, getting fixed assets, rightful acquisition of wealth and material items.",
    "SUN": "Abdomen or stomach pains, pacification of your anger, enjoying the benefits of vehicles, all kinds of happiness.",
    "MOO": "Financial gain in connection with gold or golden items, learning new techniques, showing your sincere desire to be involved in holy and religious functions.",
    "MAR": "A minor failure, being 'chased' by others out of a meeting or party perhaps, anger at others due to your bandan and confinement with a problem, mingling with unscrupulous persons."
  },
  "JUP": {
    "JUP": "Freedom from disappointments, financial gain, worship of Shiva and performing Fire Yagna, enjoying the benefits of a fully covered vehicle.",
    "SAT": "Putting hurdles in religious observances, worship of Sun God, financial loss in far away transactions, inimical with everybody, a small financial loss.",
    "MER": "Becoming wiser by gain of knowledge, prosperous time, becoming a pandit, study of righteous conduct and the shastras, worship of Shiva and performing fire yagna, bhakti in your Guru.",
    "KET": "Financial loss, trouble from learned persons, fire or heat, confined with a problem, loss of status, position and goodwill.",
    "VEN": "Recovery from short sickness, comfortable time, financial gain and also of food items, enjoying a pleasant period with the family.",
    "SUN": "Pains in the joints, acidity and cold problems, sickness due to chemicals or metals, sharp pain in the stomach.",
    "MOO": "Enjoying royal treatment and prosperity, enjoying the company of children or a childbirth in the family, strain to the eyes and stomach pain.",
    "MAR": "Suffering a 'poison' like disagreeable meal prepared by females, confinement by a problem, escaping from a very tight corner, a chance for a foreign or long distance journey, a short period of mental irrationality.",
    "RAH": "Sickness, a big loss due to theft, trouble from snakelike or scorpionlike poisonous insects."
  },
  "SAT": {
    "SAT": "Short sickness, trouble in the family, eating low quality food, great mental sadness. Gain from a business transaction, excelling in education, company of the opposite sex or reunion with partner, gain of fixed assets.",
    "KET": "Being troubled by thieves, fingers not working properly, failure of your efforts, pain affecting the whole body.",
    "VEN": "Good fortunes, prosperity, learning to use a weapon or instrument, enjoying the company of children or a child birth in the family, going to a religious shrine and taking a holy bath, enjoying good health, wealth and love.",
    "SUN": "Increase of administrative power in your hands, a fight in the family, petty bodily ailments.",
    "MOO": "Steady and firm thinking mind, starting a good work, decrease of your personal aura, big expenditure, a pleasant time of enjoying family life with partner and children.",
    "MAR": "Continued damage to your personality and charisma, feeling scared about what to do next, loss of appetite due to reduction of your capcity to digest, mental confusion and gloominess, being angry, a brief spell of muscular pain and acidity.",
    "RAH": "Danger to parents, mental sorrow, big expenses, failure everywhere.",
    "JUP": "Medals, citations or certificates of merit awarded to you, receiving prizes, financial gain and also of food items, gain of fancy items for you and your house."
  },
  "MER": {
    "MER": "Good fortunes, a gift from your superior or the authorities, prosperity due to financial gain, gain of food items, others expressing how nice to see you.",
    "KET": "Sadness in connection with children, being unfortunate, mishap due to fire or heat, infection from ladies, adopting improper ways and means, eating inferior quality food.",
    "VEN": "Enjoying the benefits of a vehicle, financial prosperity, gain through liquids and food products, being praised by others and marital hapiness.",
    "SUN": "Penalties, your superiors being angry with you, mental confusion, sickness, all kinds of losses, arguing with others.",
    "MOO": "Being physically comfortable, firm minded in your decisions, prosperity due to gifts or recommendations from an influential person, good relation with your friends and colleagues.",
    "MAR": "Trouble from fire, heat and poisonus food, influenza, shortage of money, mental frustration, bad times.",
    "RAH": "Trouble from heat, fire, poisonous insects, and from your superiors or the authorities, suffering nuisance and difficulties caused by your opponents, intense frustration may lead you to a short period of madness and irrationality.",
    "JUP": "Acquiring useful household things, sacrificing something, eating good food, prosperity gained through your superiors or the authorities.",
    "SAT": "Gain through business transactions, prosperity from utilizing your knowledge, socialising with the opposite sex, earning a big name."
  },
  "KET": {
    "KET": "Sadness because of family members, partner and children, uneasiness due to bodily ill health, borrowing due to shortage of money.",
    "VEN": "Recovery from sickness, gain of fixed assets, being the pet of your teacher and elders, meeting your relatives.",
    "SUN": "Disputes, loss of something concrete like land, feeling like going away from your surroundings, trouble to intimate friends and misery for you.",
    "MOO": "A superfluity of male and female 'attendants' for you, success in quarrels and arguments, gaining a little fame easily.",
    "MAR": "Fear of accident from riding in horse, two wheelers or other vehicles, trouble from robbers and wicked persons, tumour in the stomach or stomach aches, headaches.",
    "RAH": "Loss to your partner and teacher, a cheap attitude or loss of character on your part due to company of immoral females, a spill of blood, acidity.",
    "JUP": "Enemity with others, prosperity through antogonism, unexpected gain from your superior or the authorities, worried about loss or damage of your property, land and domestic animals.",
    "SAT": "Getting caught in the web of 'apparent' (mitya), mad thinking of an illegimate son, a short spell of hunger, opposition from your partner, breaking of a promise you made.",
    "MER": "Meeting various people, separation from partner, trouble from opponents, increase of income and good fortune."
  },
  "VEN": {
    "VEN": "Defeating your opponents, great mental happiness, enjoying the comforts of a deluxe house or renovating your house, thinking of digging wells, ponds or building a Shiva temple.",
    "SUN": "A slight pain in the chest, being scared therefor, freqauent travelling, sometimes gain and sometimes loss.",
    "MOO": "Enjoying good health, increase of wealth, success in your efforts due to wide travelling, pondering over how to get over your opponents.",
    "MAR": "Tiredness and fatigue, trouble from your opponents, mentally going away from your home and surroundings, a short period of great fear and sorrow.",
    "RAH": "Trouble from your superiors, fire, heat and snakelike animals (even local trains), separation from relatives, a brief spell of feeling sad, loss of rank and position, vulnerable to trouble.",
    "JUP": "Success everywhere, enhancement of your prestige due to acquisition of fixed assets, money and good fortune, good profits from business deals.",
    "SAT": "Trouble from opponents, a brief period of sadness, damage to your 4 legged items, animals or vehicles, harm to the customs and traditions in your family.",
    "MER": "Prosperous time for your kith and kin, smooth business deals, money income, happiness for you from family members.",
    "KET": "News of fire or some small burn, trouble from your superiors and good persons, problems to face, eyes and head, mental agony over hoarded money."
  }
};

// Normalize planet names to match the database keys
const normalizePlanetName = (planet) => {
  const planetMap = {
    "Sun": "SUN",
    "Moon": "MOO",
    "Mars": "MAR",
    "Rahu": "RAH",
    "Jupiter": "JUP",
    "Saturn": "SAT",
    "Mercury": "MER",
    "Ketu": "KET",
    "Venus": "VEN"
  };
  return planetMap[planet] || planet.toUpperCase();
};

// Function to get current date
const getCurrentDate = () => {
  const now = new Date();
  return {
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    month: now.getMonth() + 1, // JavaScript months are 0-indexed
    seconds: now.getSeconds(),
    year: now.getFullYear()
  };
};

// Mock function to get the current planetary positions (since blastro is causing issues)
const getCurrentPlanetaryPositions = (latitude, longitude) => {
  // Return mock planetary positions to avoid using blastro
  return {
    Sun: { longitude: 120.5 },
    Moon: { longitude: 85.2 },
    Mercury: { longitude: 115.7 },
    Venus: { longitude: 140.3 },
    Mars: { longitude: 200.1 },
    Jupiter: { longitude: 315.8 },
    Saturn: { longitude: 280.4 },
    Rahu: { longitude: 45.6 },
    Ketu: { longitude: 225.6 }
  };
};

// Function to get natal chart data
const getNatalChart = async (birthDetails) => {
  try {
    // Simply return mock data for now, to avoid API calls that might fail
    return {
      success: true,
      output: [
        {
          planet: { en: "Moon" },
          nakshatra: String(Math.floor(Math.random() * 27) + 1)
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching natal data:", error);
    throw new Error("Failed to fetch natal chart data");
  }
};

// Function to extract Moon's Nakshatra
const extractMoonNakshatra = (natalData) => {
  try {
    if (!natalData || !natalData.output || !Array.isArray(natalData.output)) {
      return "5"; // Default value if the structure is invalid
    }

    const moonData = natalData.output.find(item => item.planet && item.planet.en === "Moon");
    if (!moonData) {
      return "5"; // Default if Moon data not found
    }

    return moonData.nakshatra || "5"; // Default to 5 if nakshatra is not available
  } catch (error) {
    console.error("Error extracting Moon Nakshatra:", error);
    return "5"; // Default on error
  }
};

// Compute Vimshottari Dasha
const computeVimshottari = (moonNakshatra) => {
  // Nakshatra -> Planet Mapping (Vimshottari Mahadasha Order)
  const vimshottariPlanets = [
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
    "Jupiter", "Saturn", "Mercury"
  ];
  
  // Determine starting Mahadasha based on Moon's Nakshatra
  const nakshatraIndex = (parseInt(moonNakshatra) - 1) % 9;
  let dashaSequence = [];
  
  for (let i = 0; i < 9; i++) {
    dashaSequence.push({
      planet: vimshottariPlanets[(nakshatraIndex + i) % 9],
      duration: [7, 20, 6, 10, 7, 18, 16, 19, 17][(nakshatraIndex + i) % 9] // Duration in years
    });
  }

  return dashaSequence;
};

// Function to get day ruler planet
const getDayRulerPlanet = (day) => {
  const rulerMap = {
    "Sunday": "Sun",
    "Monday": "Moon",
    "Tuesday": "Mars",
    "Wednesday": "Mercury",
    "Thursday": "Jupiter",
    "Friday": "Venus",
    "Saturday": "Saturn"
  };
  
  return rulerMap[day] || "Sun";
};

// Main function to get weekly predictions
const generateSimplePredictions = async (birthDate) => {
  try {
    // Use a combination of date parts to create a deterministic set of predictions
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const predictions = [];
    
    // Mock predictions database
    const mockPredictions = [
      "A moment of clarity will guide an important decision.",
      "An unexpected opportunity may present itself.",
      "Take time to reflect on recent accomplishments.",
      "A conversation with a close friend will provide insight.",
      "Your creative energy will be at its peak.",
      "Focus on balance between work and personal life.",
      "A small act of kindness will have meaningful impact.",
      "Consider exploring a new interest or hobby.",
      "Look for ways to improve your daily routine.",
      "Your persistence will pay off in a challenging situation.",
      "Trust your intuition when making important choices.",
      "A change in perspective will help solve a problem.",
      "Make time for self-care and personal rejuvenation.",
      "An old connection may resurface with new significance."
    ];
    
    // Generate predictions for the next 7 days
    for (let i = 0; i < 7; i++) {
      const dayIndex = (new Date().getDay() + i) % 7;
      const dayName = weekdays[dayIndex];
      const dayRuler = getDayRulerPlanet(dayName);
      
      // Use birth date to create a deterministic prediction index
      const predictionIndex = (day + month + i) % mockPredictions.length;
      
      // Add planetary influence for variety
      const prediction = `${mockPredictions[predictionIndex]} ${dayRuler}'s influence brings focus to relationships and communication.`;
      
      predictions.push(prediction);
    }
    
    return predictions;
  } catch (error) {
    console.error("Error generating predictions:", error);
    // Fallback to basic predictions if anything fails
    return [
      "Take time to reflect on your goals and aspirations.",
      "An unexpected encounter may bring new opportunities.",
      "Focus on self-care and personal well-being.",
      "Your creative energies will be heightened today.",
      "Consider reaching out to an old friend or connection.",
      "A moment of clarity will help resolve a lingering issue.",
      "Balance work and personal time for optimal well-being."
    ];
  }
};

interface PredictionResponse {
  success: boolean;
  predictions: string[];
  error?: string;
}

export const fetchPredictions = async (birthDate: Date): Promise<PredictionResponse> => {
  try {
    console.log("Generating predictions for birth date:", birthDate);
    
    // Generate predictions based on birth date
    const predictions = await generateSimplePredictions(birthDate);
    
    return {
      success: true,
      predictions
    };
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    return {
      success: false,
      predictions: [],
      error: error instanceof Error ? error.message : "Failed to fetch predictions"
    };
  }
};

export {
  getCurrentPlanetaryPositions,
  getNatalChart,
  computeVimshottari,
  generateSimplePredictions
};
