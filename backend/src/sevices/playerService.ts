import {playerModel} from "../dbModels/player";

export async function list() {
    return await playerModel.findAll();
}
