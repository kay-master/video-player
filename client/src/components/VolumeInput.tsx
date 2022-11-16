import * as React from "react";
import { VolumeInputWrapper } from "../styles/volume-input.styled";

interface Props {
  onChange(value: number): void;
}

function VolumeInput(props: Props) {
  const { onChange: onVolumeChange } = props;
  const [muted, setMuted] = React.useState(false);
  const [currentVolume, setCurrentVolume] = React.useState({
    calc: 100,
    value: 1,
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    const min = Number.parseFloat(target.min);
    const max = Number.parseFloat(target.max);
    const value = Number.parseFloat(target.value);
    const calc = ((value - min) * 100) / (max - min);

    onVolumeChange(value);
    setCurrentVolume({
      value,
      calc,
    });

    target.style.backgroundSize = calc + "% 100%";
  }

  function onClick() {
    let backgroundSize = 0;
    let value = 0;

    if (!muted) {
      setMuted(true);
      onVolumeChange(0);
    } else {
      backgroundSize = currentVolume.calc;
      value = currentVolume.value;

      setMuted(false);
      onVolumeChange(value);
    }

    if (inputRef.current) {
      inputRef.current.style.backgroundSize = backgroundSize + "% 100%";
      inputRef.current.value = value.toString();
    }
  }

  function volumeIcon() {
    let icon = "xmark";

    if (muted) {
      return icon;
    }

    if (currentVolume.calc > 40) {
      icon = "high";
    } else if (currentVolume.calc > 0 && currentVolume.calc <= 40) {
      icon = "low";
    }

    return icon;
  }

  return (
    <VolumeInputWrapper tabIndex={0} className="volume">
      <i onClick={onClick} className={`fa-solid fa-volume-${volumeIcon()}`} />
      <div className="input-container">
        <input
          ref={inputRef}
          defaultValue="1"
          type="range"
          onChange={onChange}
          name="volume"
          min={0}
          max={1}
          step={0.2}
        />
      </div>
    </VolumeInputWrapper>
  );
}

export default VolumeInput;
