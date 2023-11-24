const request = require("supertest");
const axios = require("axios");
const app = require("./app");
const dataService = require("./dataService");

jest.mock("./dataService", () => ({
  getData: jest.fn(),
}));

jest.mock("axios"); // Mock axios

describe("GET /data", () => {
  it("should return data from the dataService", async () => {
    const mockData = ["mockItem1", "mockItem2"];
    dataService.getData.mockResolvedValue(mockData);

    const response = await request(app).get("/data");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockData });

    expect(dataService.getData).toHaveBeenCalled();
  });

  it("should handle errors from the dataService", async () => {
    dataService.getData.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/data");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });

    expect(dataService.getData).toHaveBeenCalled();
  });
});

describe("GET /performAPICalls", () => {
  it("should respond suceess data from API calls", async () => {
    axios.get.mockResolvedValueOnce({ data: "getData" });
    axios.post.mockResolvedValueOnce({
      data: {
        title: "Updated Title",
        body: "Updated Body",
        userId: 1,
      },
    });
    axios.put.mockResolvedValueOnce({ data: "putData" });
    axios.patch.mockResolvedValueOnce({ data: "patchData" });
    axios.delete.mockResolvedValueOnce({ data: "deleteData" });

    const response = await request(app).get("/performAPICalls");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      getData: "getData",
      postData: {
        title: "Updated Title",
        body: "Updated Body",
        userId: 1,
      },
      putData: "putData",
      patchData: "patchData",
      deleteData: "deleteData",
    });
  });

  it("should handle errors with status 500 and provide an error message", async () => {
    axios.get.mockRejectedValueOnce(new Error("Simulated Error"));

    const response = await request(app).get("/performAPICalls");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});
