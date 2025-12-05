# Smart Home IoT – Web Interface

This project is a simple, browser-based dashboard for a smart home IoT system. It visualizes sensor readings and lets you control actuators across six modules: Security, Lighting, Climate, Fire Safety, Water Management, and Energy Monitoring.

The UI is built with a minimal HTML page (`index.html`), Firebase Realtime Database for data transport, and a small client script (`script.js`). Styling uses Pico.css for clean, responsive defaults.

**Project Structure**
- `index.html`: The dashboard UI, module cards, inputs and displays.
- `script.js`: Firebase initialization, live sensor subscriptions, and write-actions for controls.
- `README.md`: Project overview and usage instructions.

**Live Data Model (Firebase Realtime Database)**
All data is read/written under the root `smartHome`. Each module has its own child path:
- `smartHome/module1_security`
- `smartHome/module2_lighting`
- `smartHome/module3_climate`
- `smartHome/module4_fire`
- `smartHome/module5_water`
- `smartHome/module6_energy`

**Modules Overview**
- **Security & Access**: Shows `doorOpenStatus` and `motionDetected`. Controls `doorLocked` and `alarmSystemOn`.
- **Smart Lighting**: Controls `mainLightBrightness` (0–255), `rgbColorHex` (e.g., `#ff8800`), and `rgbState` (on/off).
- **Climate Control**: Displays `temperature` (°C) and `humidity` (%). Controls `fanSpeed` (0–255).
- **Fire Safety**: Displays `gasValue` and `fireDetected`. Controls `emergencyRelay`.
- **Water Management**: Displays `waterLevelDistance` (cm). Controls `pumpState`.
- **Energy Monitor**: Displays `currentAmps` (A) and `batteryVoltage` (V).

When the database updates, the UI reflects new sensor values in real-time. When you interact with controls, `script.js` writes updated actuator values back to the corresponding module path.

**How It Works**
- UI elements in `index.html` call small helpers in `script.js` (e.g., `updateSecurity`, `updateLighting`).
- `script.js` subscribes to `smartHome` using `homeRef.on('value', ...)` and updates the DOM.
- Writes are performed with `db.ref('smartHome/<module>').update({ key: value })`.

**Prerequisites**
- A Firebase project with Realtime Database enabled.
- Public read/write rules suitable for your development needs (restrict in production).

**Setup**
1. Create a Firebase project and enable Realtime Database.
2. Copy your Firebase config object into `script.js` replacing the placeholder under `firebaseConfig`.
3. Ensure your database URL matches your region.
4. Open `index.html` in a modern browser.

On successful initialization, the navbar status will show `Connected` and module cards will begin reflecting data under `smartHome`.

**Sample Database Shape**
```
smartHome: {
	module1_security: {
		doorOpenStatus: false,
		motionDetected: false,
		doorLocked: true,
		alarmSystemOn: false
	},
	module2_lighting: {
		mainLightBrightness: 128,
		rgbColorHex: "#00aaff",
		rgbState: true
	},
	module3_climate: {
		temperature: 24.5,
		humidity: 45,
		fanSpeed: 64
	},
	module4_fire: {
		gasValue: 120,
		fireDetected: false,
		emergencyRelay: false
	},
	module5_water: {
		waterLevelDistance: 37,
		pumpState: false
	},
	module6_energy: {
		currentAmps: 1.8,
		batteryVoltage: 12.4
	}
}
```

**Running Locally**
- Open `index.html` directly, or serve the folder with a simple local server:

```powershell
# From the project directory on Windows PowerShell
python -m http.server 8080
# Then visit http://localhost:8080/index.html
```

**Security Notes**
- Do not commit sensitive Firebase credentials for production use.
- Lock down your Firebase Realtime Database rules. For example, restrict reads/writes to authenticated users or device-specific paths.
- Consider debouncing UI writes and validating values server-side or in your device firmware.

**Customization Tips**
- Adjust labels and emojis in `index.html` to fit your branding.
- Extend `script.js` with additional fields and validation.
- Add charts or historical views by logging to separate paths and rendering with a chart library.

**Troubleshooting**
- If the status stays `Connecting...`, check the console for Firebase errors.
- Verify `databaseURL` and that Realtime Database is enabled.
- Ensure CORS is not blocking requests if you host behind an HTTP server.

