import { useTheme } from "../themeContext";

export default function Settings() {
  const { toggleTheme } = useTheme();

  return (
    <div className="settings-page">
      <h1>Settings Page</h1>

      <h2>Lighting Mode</h2>

      <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme} />
      <label htmlFor="darkmode-toggle"></label>
    </div>
  );
}
