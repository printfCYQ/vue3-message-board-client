import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "../mock/user";

export default function setupProdMockServer() {
  createProdMockServer([...userMock]);
}
