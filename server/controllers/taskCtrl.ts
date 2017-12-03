import baseDAO from "./baseDAO";
import task from "../models/task";

export default class taskCtrl extends baseDAO{
    model = task;
}