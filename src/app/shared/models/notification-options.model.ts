export interface NotificationOptions {
    message: string; //any message
    informationMessage?: string; // any secondary message
    time?: number; // duration in ms (default 3000ms)
    type?: string; // Type of the pop-up (default:fail, success, alert)  *PICK ONE*
    position?: string[]; // position in the screen (default: top, bottom, left, default: rigth)
}
