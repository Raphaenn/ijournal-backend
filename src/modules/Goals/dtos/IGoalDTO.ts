export default interface IGoalDTO {
    user_id: string;
    description: string;
    status: string;
    group: string;
    startDate: Date;
    deadDate: Date;
}