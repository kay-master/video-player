import styled from "styled-components";

export const VolumeInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;

  .input-container {
    position: absolute;
    display: none;
    top: -9px;
    left: 14px;
    transform: rotate(270deg);
    transform-origin: left;
    padding: 8px 10px 11.5px;
    border-radius: 10px;
    transition: display 0.2s ease-in-out;

    input[type="range"] {
      -webkit-appearance: none;
      width: 95px;
      height: 4px;
      background: #d1d1d1;
      border-radius: 5px;
      background-image: linear-gradient(
        ${({ theme }) => theme.colors.purple},
        ${({ theme }) => theme.colors.purple}
      );
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.purple};
      cursor: ns-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.purple};
      cursor: ns-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-ms-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.purple};
      cursor: ns-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      background: ${({ theme }) => theme.colors.lightPurple};
      cursor: grab;
    }

    input[type="range"]::-moz-range-thumb:hover {
      background: ${({ theme }) => theme.colors.lightPurple};
      cursor: grab;
    }

    input[type="range"]::-ms-thumb:hover {
      background: ${({ theme }) => theme.colors.lightPurple};
      cursor: grab;
    }

    input[type="range"]::-webkit-slider-thumb:active {
      cursor: grabbing;
    }

    input[type="range"]::-moz-range-thumb:active {
      cursor: grabbing;
    }

    input[type="range"]::-ms-thumb:active {
      cursor: grabbing;
    }

    /* track */
    input[type="range"]::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    input[type="range"]::-moz-range-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    input[type="range"]::-ms-track {
      -webkit-appearance: none;
      box-shadow: none;
      cursor: pointer;
      border: none;
      background: transparent;
    }
  }

  &:hover {
    .input-container {
      display: block;
    }
  }
`;
