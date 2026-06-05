import task from "../assets/task.png"
import high from "../assets/high.png"
import pending from "../assets/pending.png"
import completed from "../assets/completed.png"

export const cardContent = [
    {
        logo: task,
        cardName: "Total Tasks",
        cardBg: "#5B3EEA",
        cardNameColor: "#DDD6FE"
    },
    {
        logo: completed,
        cardName: "Completed",
        cardBg: "#059669",
        cardNameColor: "#D1FAE5"
    },
    {
        logo: pending,
        cardName: "Pending",
        cardBg: "#D97706",
        cardNameColor: "#FEF3C7"
    },
    {
        logo: high,
        cardName: "High Priority",
        cardBg: "#DC2626",
        cardNameColor: "#FEE2E2"
    }
];