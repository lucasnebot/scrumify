import baseDAO from "./baseDAO";
import sprint from "../models/sprint";

export default class backlogItemCtrl extends baseDAO {
    model = sprint;
}