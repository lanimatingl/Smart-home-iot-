// 1. FIREBASE CONFIGURATION
// PASTE YOUR CONFIG OBJECT HERE
const firebaseConfig = {
  apiKey: "AIzaSyAKxAqxUk9ikGs7e4VyQMS271wYYqlWPNM",
  authDomain: "iot-project-b47b3.firebaseapp.com",
  databaseURL: "https://iot-project-b47b3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iot-project-b47b3",
  storageBucket: "iot-project-b47b3.firebasestorage.app",
  messagingSenderId: "734853941954",
  appId: "1:734853941954:web:9f1a2b1abe696739bec95b"
};

// 2. INITIALIZE
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
document.getElementById('connection-status').innerText = "Connected ✅";
document.getElementById('connection-status').style.color = "green";

// ==========================================
//  PART A: READING DATA (Sensors -> Web)
// ==========================================

const homeRef = db.ref('smartHome');

homeRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return; // Stop if db is empty

    // --- MODULE 1: SECURITY ---
    const m1 = data.module1_security;
    if (m1) {
        // Door Status
        const doorEl = document.getElementById('m1-door');
        doorEl.innerText = m1.doorOpenStatus ? "OPEN ⚠️" : "Closed";
        doorEl.className = m1.doorOpenStatus ? "danger" : "safe";
        
        // Motion Status
        const motionEl = document.getElementById('m1-motion');
        motionEl.innerText = m1.motionDetected ? "DETECTED 🏃" : "Clear";
        motionEl.className = m1.motionDetected ? "danger" : "safe";
    }

    // --- MODULE 3: CLIMATE ---
    const m3 = data.module3_climate;
    if (m3) {
        document.getElementById('m3-temp').innerText = m3.temperature;
        document.getElementById('m3-hum').innerText = m3.humidity;
    }

    // --- MODULE 4: FIRE ---
    const m4 = data.module4_fire;
    if (m4) {
        document.getElementById('m4-gas').innerText = m4.gasValue;
        
        const flameEl = document.getElementById('m4-flame');
        flameEl.innerText = m4.fireDetected ? "FIRE DETECTED 🔥" : "Safe";
        flameEl.className = m4.fireDetected ? "danger" : "safe";
    }

    // --- MODULE 5: WATER ---
    const m5 = data.module5_water;
    if (m5) {
        document.getElementById('m5-level').innerText = m5.waterLevelDistance;
    }

    // --- MODULE 6: ENERGY ---
    const m6 = data.module6_energy;
    if (m6) {
        document.getElementById('m6-amps').innerText = m6.currentAmps;
        document.getElementById('m6-volt').innerText = m6.batteryVoltage;
    }
});

// ==========================================
//  PART B: WRITING DATA (Web -> Actuators)
// ==========================================

// Module 1 Functions
function updateSecurity(key, value) {
    db.ref('smartHome/module1_security').update({
        [key]: value
    });
}

// Module 2 Functions
function updateLighting(key, value) {
    // If it's the brightness slider, convert string to number
    if (key === 'mainLightBrightness') value = parseInt(value);
    
    db.ref('smartHome/module2_lighting').update({
        [key]: value
    });
}

// Module 3 Functions
function updateClimate(key, value) {
    db.ref('smartHome/module3_climate').update({
        [key]: parseInt(value)
    });
}

// Module 4 Functions
function updateFire(key, value) {
    db.ref('smartHome/module4_fire').update({
        [key]: value
    });
}

// Module 5 Functions
function updateWater(key, value) {
    db.ref('smartHome/module5_water').update({
        [key]: value
    });
}