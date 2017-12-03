import baseDAO from "./baseDAO";
import backlogItem from "../models/backlogItem";

export default class backlogItemCtrl extends baseDAO {
    model = backlogItem;
}