// Added optional mongo and mongoose properties to make object handling easier
export class Milestone {
    _id?: string;
    title: string;
    description: string;
    // Changed from date to string for easier two-way-databinding
    date: string;
    achieved?: Boolean;
    __v?: Number
} 