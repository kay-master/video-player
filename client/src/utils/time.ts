// Convert seconds to proper timestamp
export default function formatTime(seconds: number) {
  const checkSec = isNaN(seconds) ? 0 : seconds;
  const sec = Math.floor(checkSec % 60);
  const minutes = Math.floor((checkSec / 60) % 60);
  const hours = Math.floor(checkSec / 3600);

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    sec.toString().padStart(2, "0"),
  ].join(":");
}
