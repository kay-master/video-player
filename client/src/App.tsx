import { Routes, Route, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./App.css";
import "video-react/dist/video-react.css";
import VideoPlayerView from "./views/VideoPlayerView";
import NotFound from "./views/NotFound";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.styled";

function App() {
  return (
    <>
      <Helmet titleTemplate="%s | DSS Challenge" />

      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<VideoPlayerView />} />
            <Route path="watch/:videoTitle" element={<VideoPlayerView />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
