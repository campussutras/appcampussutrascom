import { prod } from "./Api";

export const campussutrasComUrl =
  prod !== "prod" ? "http://localhost:3000" : "https://campussutras.com";
export const campussutrasAppUrl =
  prod !== "prod" ? "http://localhost:5173" : "https://app.campussutras.com";
