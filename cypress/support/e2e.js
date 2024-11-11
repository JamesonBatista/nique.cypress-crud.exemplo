
import './commands'
export { crudStorage } from "cypress-crud/src/functions/storage.js";
export const faker = require("generate-datafaker");
import "cypress-plugin-steps";
import "cypress-crud";
import "cypress-plugin-api";
import "cypress-mochawesome-reporter/register";
import spok from "cy-spok";
// export default spok;

// close json file in variable
import _ from "lodash";
export function clone(json) {
  return _.cloneDeep(json);
}