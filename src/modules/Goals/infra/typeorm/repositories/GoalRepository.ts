import { getRepository, Repository } from "typeorm";

import IGoalRepository from "@modules/Goals/repositories/IGoalRepository";
import GoalModel from "../entities/GoalModel";

class GoalRepository implements IGoalRepository {

    private ormRepo: Repository<GoalModel>

    constructor() {
        this.ormRepo = getRepository(GoalModel)
    }

    public async create() {
        
    }

    public async findAll() {

    }

    public async findOne() {

    }

    public async findByYear() {

    }

    public async exclude() {

    }

    public async save() {

    }
}

export default GoalRepository;