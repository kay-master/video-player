import { render, screen } from "@testing-library/react";
import VideoPlayer from "../components/VideoPlayer";

test("renders video landing page", () => {
	render(<VideoPlayer videoSelected={0} videos={[]} />);

	expect(screen.getByRole("h1")).toHaveTextContent(/Video Player/i);
});
