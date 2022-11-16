import supertest from "supertest";
import app from "../app";

describe("GET /videos", () => {
	it("Returns paginated data with page size 5", async () => {
		const results = await supertest(app)
			.get("/videos?pageNumber=2&pageSize=1")
			.expect("Content-Type", /json/)
			.expect(200);

		const { body, statusCode } = results;

		const desiredResults = {
			prevPage: 1,
			nextPage: 3,
			hasNextPage: true,
			data: [
				{
					name: "About Bananas",
					path: "https://fed-dss-challenge-qa.s3.amazonaws.com/assets/vid/11/AboutBananas.m3u8",
					thumbnail:
						"https://fed-dss-challenge-qa.s3.amazonaws.com/assets/vid/11/about-bananas-thumb.jpg",
					date: "15 Oct 2021",
					duration: "00:06:28",
				},
			],
		};

		expect(statusCode).toEqual(200);
		expect(body.success).toBe(true);
		expect(body.data).toMatchObject(desiredResults);
	});
});
